// Syncs our raw squad stats from API-Sports (API-Football v3).
// Usage:
//   node scripts/sync-player-stats.mjs            # full sync (needs APISPORTS_KEY env)
//   node scripts/sync-player-stats.mjs --self-test # offline unit tests, no quota spent
//   Env: APISPORTS_KEY (required), SEASON (default 2025), MAX_REQUESTS (default 90),
//        CLUBS (optional comma list to sync only some clubs, e.g. "Arsenal,Ajax")
//
// Strategy (quota-friendly): one /teams?search= call per club (cached in
// scripts/api-map.json), then ONE /players/statistics?team=&season= call per club
// covering its whole squad. Rows that can't be matched keep their old values.
// Only refreshed rows are overwritten, so partial runs are safe to commit.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const API = "https://v3.football.api-sports.io";
const KEY = process.env.APISPORTS_KEY || "";
const SEASON = process.env.SEASON || "2025";
const MAX_REQUESTS = parseInt(process.env.MAX_REQUESTS || "90", 10);
const ONLY_CLUBS = (process.env.CLUBS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
const MAP_PATH = new URL("./api-map.json", import.meta.url);
const RAW_PATH = new URL("../data/raw_young_players.csv", import.meta.url);

let requestCount = 0;

// Our League label -> { names seen in API, country } for matching the right
// competition inside a squad's statistics array.
const LEAGUE_MATCH = {
  "Premier League": { names: ["premier league"], country: "england" },
  "La Liga": { names: ["la liga", "primera division"], country: "spain" },
  "Bundesliga": { names: ["bundesliga"], country: "germany" },
  "Serie A": { names: ["serie a"], country: "italy" },
  "Ligue 1": { names: ["ligue 1"], country: "france" },
  "Eredivisie": { names: ["eredivisie"], country: "netherlands" },
  "Liga Portugal": { names: ["primeira liga", "liga portugal"], country: "portugal" },
  "Championship": { names: ["championship"], country: "england" },
  "Super Lig": { names: ["super lig"], country: "turkiye" },
  "Saudi Pro League": { names: ["pro league", "saudi pro league"], country: "saudi-arabia" },
  "MLS": { names: ["major league soccer"], country: "usa" },
  "Danish SL": { names: ["superliga", "superligaen"], country: "denmark" },
  "Belgian Pro League": { names: ["jupiler pro league", "pro league"], country: "belgium" },
  "Scottish Premiership": { names: ["premiership"], country: "scotland" },
  "Austrian Bundesliga": { names: ["bundesliga"], country: "austria" },
};

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[''ʼ-]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function leagueMatches(ourLeague, apiName, apiCountry) {
  const rule = LEAGUE_MATCH[ourLeague];
  if (!rule) return norm(apiName) === norm(ourLeague);
  const n = norm(apiName);
  return rule.names.some((x) => n === x || n.includes(x)) && norm(apiCountry) === norm(rule.country);
}

function pickStatsEntry(statsArr, ourLeague) {
  if (!Array.isArray(statsArr)) return null;
  return statsArr.find((s) => s && s.league && leagueMatches(ourLeague, s.league.name, s.league.country)) || null;
}

async function api(path) {
  if (requestCount >= MAX_REQUESTS) throw new Error("request budget exhausted (" + MAX_REQUESTS + ")");
  requestCount++;
  const res = await fetch(API + path, { headers: { "x-apisports-key": KEY } });
  if (res.status === 429) throw new Error("rate limited (429) after " + requestCount + " requests");
  const json = await res.json();
  if (json.errors && Object.keys(json.errors).length) {
    throw new Error("API error: " + JSON.stringify(json.errors).slice(0, 200));
  }
  return json;
}

function loadMap() {
  if (existsSync(MAP_PATH)) return JSON.parse(readFileSync(MAP_PATH, "utf8"));
  return { teams: {}, players: {} };
}

async function resolveTeamId(map, club) {
  if (map.teams[club] && map.teams[club].id) return map.teams[club].id;
  const json = await api("/teams?search=" + encodeURIComponent(club));
  const list = json.response || [];
  const target = norm(club);
  const hit =
    list.find((t) => norm(t.team && t.team.name) === target) ||
    list.find((t) => norm(t.team && t.team.name).includes(target)) ||
    list[0];
  if (!hit) return null;
  map.teams[club] = { id: hit.team.id, name: hit.team.name };
  return hit.team.id;
}

function applyStatsToRow(fields, stats) {
  const g = stats.games || {};
  const goals = stats.goals || {};
  const shots = stats.shots || {};
  const passes = stats.passes || {};
  const dribbles = stats.dribbles || {};
  const tackles = stats.tackles || {};
  const num = (v, fb) => (v === null || v === undefined || v === "" ? fb : v);
  fields[6] = String(num(g.minutes, fields[6])); // MinutesPlayed
  fields[7] = String(num(goals.total, fields[7])); // Goals
  fields[8] = String(num(goals.assists, fields[8])); // Assists
  fields[9] = String(num(shots.on, fields[9])); // ShotsOnTarget
  fields[10] = String(num(dribbles.success, fields[10])); // DribblesCompleted
  fields[11] = String(num(passes.accuracy, fields[11])); // PassAccuracy
  fields[12] = String(num(tackles.total, fields[12])); // Tackles
  fields[13] = String(num(tackles.interceptions, fields[13])); // Interceptions
}

async function main() {
  if (!KEY) {
    console.error("Missing APISPORTS_KEY env var.");
    process.exit(2);
  }
  const lines = readFileSync(RAW_PATH, "utf8").trim().split("\n");
  const header = lines[0];
  const rows = lines.slice(1).map((l) => l.split(","));
  const map = loadMap();
  const clubs = [...new Set(rows.map((r) => r[3]))].filter(
    (c) => !ONLY_CLUBS.length || ONLY_CLUBS.includes(c.toLowerCase())
  );

  let refreshed = 0;
  let unmatched = [];
  for (const club of clubs) {
    let teamId;
    try {
      teamId = await resolveTeamId(map, club);
    } catch (e) {
      console.log("STOP [" + club + "]: " + e.message);
      break;
    }
    if (!teamId) {
      console.log("SKIP club (no team id): " + club);
      continue;
    }
    let squad;
    try {
      const json = await api("/players/statistics?team=" + teamId + "&season=" + SEASON);
      squad = json.response || [];
    } catch (e) {
      console.log("STOP [" + club + " squad]: " + e.message);
      break;
    }
    const byName = new Map(squad.map((e) => [norm(e.player && e.player.name), e]));
    for (const fields of rows) {
      if (fields[3] !== club) continue;
      const entry = byName.get(norm(fields[0]));
      if (!entry) {
        unmatched.push(fields[0] + " (" + club + ")");
        continue;
      }
      if (map.players[fields[0] + "|" + club] !== (entry.player && entry.player.id)) {
        map.players[fields[0] + "|" + club] = entry.player && entry.player.id;
      }
      const stats = pickStatsEntry(entry.statistics, fields[4]);
      if (!stats) {
        unmatched.push(fields[0] + " (" + club + ": no " + fields[4] + " split)");
        continue;
      }
      applyStatsToRow(fields, stats);
      refreshed++;
    }
    writeFileSync(MAP_PATH, JSON.stringify(map, null, 2) + "\n", "utf8");
  }

  writeFileSync(RAW_PATH, header + "\n" + rows.map((r) => r.join(",")).join("\n") + "\n", "utf8");
  writeFileSync(MAP_PATH, JSON.stringify(map, null, 2) + "\n", "utf8");
  console.log("--- sync summary ---");
  console.log("requests used: " + requestCount + " | rows refreshed: " + refreshed + "/" + rows.length);
  if (unmatched.length) console.log("unmatched (" + unmatched.length + "):\n - " + unmatched.join("\n - "));
  const summary = process.env.GITHUB_STEP_SUMMARY;
  if (summary) {
    const fs2 = await import("node:fs");
    fs2.appendFileSync(
      summary,
      "## Player stats sync\nRequests: " + requestCount + "\nRefreshed: " + refreshed + "/" + rows.length + "\n"
    );
  }
}

function selfTest() {
  const assert = (c, msg) => {
    if (!c) {
      console.error("FAIL: " + msg);
      process.exit(1);
    }
    console.log("ok: " + msg);
  };
  assert(norm("Myles Lewis-Skelly") === "myles lewisskelly", "hyphen/apostrophe normalization");
  assert(norm("Nico OReilly") === norm("Nico O'Reilly"), "alias-insensitive names");
  assert(leagueMatches("Liga Portugal", "Primeira Liga", "Portugal"), "Primeira Liga alias");
  assert(leagueMatches("MLS", "Major League Soccer", "USA"), "MLS alias");
  assert(leagueMatches("Saudi Pro League", "Pro League", "Saudi-Arabia"), "Saudi Pro League alias");
  assert(leagueMatches("Austrian Bundesliga", "Bundesliga", "Austria"), "Austria over Germany");
  assert(!leagueMatches("Austrian Bundesliga", "Bundesliga", "Germany"), "Germany is not Austria");
  assert(leagueMatches("Danish SL", "Superliga", "Denmark"), "Danish Superliga alias");
  const f = ["", "", "", "", "", "", "2100", "8", "6", "30", "28", "83", "20", "14"];
  applyStatsToRow(f, {
    games: { minutes: 2000 },
    goals: { total: 7, assists: 5 },
    shots: { on: 25 },
    passes: { accuracy: 84 },
    dribbles: { success: 30 },
    tackles: { total: 18, interceptions: 12 },
  });
  assert(f[6] === "2000" && f[7] === "7" && f[8] === "5" && f[11] === "84" && f[13] === "12", "stat mapping");
  const g = ["", "", "", "", "", "", "2100", "8", "6", "30", "28", "83", "20", "14"];
  applyStatsToRow(g, { games: {}, goals: {}, shots: {}, passes: {}, dribbles: {}, tackles: {} });
  assert(g[6] === "2100" && g[7] === "8", "missing API fields keep old values");
  console.log("self-test passed, no quota spent.");
}

if (process.argv.includes("--self-test")) selfTest();
else await main();
