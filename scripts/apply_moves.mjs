// One-shot: applies verified 2025 summer-window club moves to
// data/raw_young_players.csv, drops over-age players, unifies club spellings,
// and migrates photo keys (api-map.json + wiki-photos.json are Name|Club).
import { readFileSync, writeFileSync } from "node:fs";

const RAW = new URL("../data/raw_young_players.csv", import.meta.url);
// [name, newClub, newLeague]
const MOVES = [
  ["Xavi Simons", "Tottenham", "Premier League"],
  ["Jorrel Hato", "Chelsea", "Premier League"],
  ["Alejandro Garnacho", "Chelsea", "Premier League"],
  ["Jamie Bynoe-Gittens", "Chelsea", "Premier League"],
  ["Mathys Tel", "Tottenham", "Premier League"],
  ["Milos Kerkez", "Liverpool", "Premier League"],
  ["Tyler Dibling", "Everton", "Premier League"],
  ["Facundo Buonanotte", "Chelsea", "Premier League"],
  ["Harvey Elliott", "Aston Villa", "Premier League"],
  ["Ansu Fati", "Monaco", "Ligue 1"],
  ["Oscar Gloukh", "Ajax", "Eredivisie"],
  ["Aaron Anselmino", "Dortmund", "Bundesliga"],
  ["Lucas Hey", "Anderlecht", "Belgian Pro League"],
  ["Clement Bischoff", "Salzburg", "Austrian Bundesliga"],
  ["Djylian Nguessan", "Saint-Etienne", "Ligue 2"],
  ["Youssoufa Moukoko", "FC Copenhagen", "Danish SL"],
  ["Vitor Reis", "Girona", "La Liga"],
  ["Claudio Echeverri", "Leverkusen", "Bundesliga"],
  ["Tommy Watson", "Brighton", "Premier League"],
  ["Kendry Paez", "Strasbourg", "Ligue 1"],
  ["Andrey Santos", "Chelsea", "Premier League"],
  ["Johan Bakayoko", "RB Leipzig", "Bundesliga"],
  ["Eliesse Ben Seghir", "Leverkusen", "Bundesliga"],
  ["Chris Rigg", "Sunderland", "Premier League"],
  ["Gianluca Busio", "Venezia", "Serie B"],
];
const DROPS = ["Noni Madueke"]; // verified age 23, out of U22 scope
const RENAMES = [["Caden Clark", "New York Red Bulls", "NY Red Bulls"]];

const lines = readFileSync(RAW, "utf8").split("\n");
const header = lines[0];
const rows = lines.slice(1).filter((l) => l.trim()).map((l) => l.split(","));
const byName = new Map(rows.map((r) => [r[0], r]));
const photoMoves = [];

for (const [name, club, league] of MOVES) {
  const r = byName.get(name);
  if (!r) throw new Error("not found: " + name);
  photoMoves.push([name + "|" + r[3], name + "|" + club]);
  r[3] = club;
  r[4] = league;
}
for (const [name, from, to] of RENAMES) {
  const r = byName.get(name);
  if (!r || r[3] !== from) throw new Error("rename mismatch: " + name);
  photoMoves.push([name + "|" + from, name + "|" + to]);
  r[3] = to;
}
const kept = rows.filter((r) => !DROPS.includes(r[0]));
if (rows.length - kept.length !== DROPS.length) throw new Error("drop mismatch");
for (const r of kept) {
  if (parseInt(r[1], 10) > 22) throw new Error("over-age remains: " + r[0] + " " + r[1]);
}
writeFileSync(RAW, header + "\n" + kept.map((r) => r.join(",")).join("\n") + "\n", "utf8");
console.log("raw: " + rows.length + " -> " + kept.length + " players, " + MOVES.length + " moves, " + DROPS.length + " drops");

const readJson = (p) => JSON.parse(readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
for (const p of ["./api-map.json", "./wiki-photos.json"]) {
  const url = new URL(p, import.meta.url);
  let map;
  try {
    map = readJson(url);
  } catch {
    continue;
  }
  const store = map.players !== undefined ? map.players : map;
  for (const [oldK, newK] of photoMoves) {
    if (store[oldK] !== undefined && store[newK] === undefined) {
      store[newK] = store[oldK];
      delete store[oldK];
    }
  }
  for (const d of DROPS) {
    for (const k of Object.keys(store)) {
      if (k.split("|")[0] === d) delete store[k];
    }
  }
  writeFileSync(url, JSON.stringify(map.players !== undefined ? { ...map, players: store } : store, null, 2) + "\n", "utf8");
  console.log("migrated keys in " + p);
}
