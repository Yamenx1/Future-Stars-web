// Resolves player headshots from Wikipedia page images (free, no key, hotlinkable).
// Usage: node scripts/fetch-wiki-photos.mjs [--limit N]
// Writes scripts/wiki-photos.json: { "Name|Club": thumbUrl }.
// Matching is conservative: skips disambiguation pages and titles that don't
// contain the player's surname. Unmatched players keep monogram avatars.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const RAW_PATH = new URL("../data/raw_young_players.csv", import.meta.url);
const OUT_PATH = new URL("./wiki-photos.json", import.meta.url);

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/ß/g, "ss")
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/ø/g, "o")
    .replace(/ł/g, "l")
    .replace(/đ/g, "d")
    .replace(/þ/g, "th")
    .replace(/ð/g, "d")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(s) {
  return norm(s).replace(/ /g, "");
}

// Mononyms / common names -> exact Wikipedia article title.
const WIKI_ALIASES = {
  "Savinho": "Sávio (footballer, born 2004)",
  "Estevao Willian": "Estêvão Willian",
  "Nico OReilly": "Nico O'Reilly",
};

async function findPhoto(name) {
  const want = compact(name);
  const bareTitles = []; // strict title matches whose pages lack API thumbnails
  const attempt = async (query, limit) => {
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2" +
      "&generator=search&gsrsearch=" + encodeURIComponent(query) +
      "&gsrlimit=" + limit + "&gsrnamespace=0&prop=pageimages|pageprops&piprop=thumbnail&pithumbsize=200";
    let res;
    try {
      res = await fetch(url, { headers: { "User-Agent": "FutureStarsWikiPhotos/1.0" } });
    } catch (e) {
      return { error: "network: " + e.message };
    }
    if (res.status === 429 || res.status >= 500) return { error: "http " + res.status };
    if (!res.ok) return { error: "http " + res.status };
    const json = await res.json();
    const pages = (json.query && json.query.pages) || [];
    const matches = [];
    for (const p of pages) {
      if (!p || p.missing || (p.pageprops && p.pageprops.disambiguation)) continue;
      // STRICT: page title (minus parenthetical) must equal the full name.
      const titleBase = compact(String(p.title).replace(/\(.*\)/, ""));
      if (titleBase !== want) continue;
      if (!p.thumbnail || !p.thumbnail.source) {
        if (!bareTitles.includes(p.title)) bareTitles.push(p.title);
        continue;
      }
      matches.push(p);
    }
    // Bare-title exact match ("Endrick") beats a same-name qualifier
    // ("Endrick (footballer, born 1995)").
    matches.sort((a, b) => (/\(.*\)/.test(a.title) ? 1 : 0) - (/\(.*\)/.test(b.title) ? 1 : 0));
    if (!matches.length) return null;
    return { title: matches[0].title, url: matches[0].thumbnail.source };
  };
  // Pass 0: known alias -> exact title fetch, validated against the alias itself.
  const alias = WIKI_ALIASES[name];
  if (alias) {
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2" +
      "&titles=" + encodeURIComponent(alias) +
      "&prop=pageimages|pageprops&piprop=thumbnail&pithumbsize=200";
    try {
      const res = await fetch(url, { headers: { "User-Agent": "FutureStarsWikiPhotos/1.0" } });
      if (res.ok) {
        const json = await res.json();
        const p = ((json.query && json.query.pages) || [])[0];
        if (p && !p.missing && !(p.pageprops && p.pageprops.disambiguation) && p.thumbnail && p.thumbnail.source) {
          return { title: p.title, url: p.thumbnail.source };
        }
      }
    } catch {
      // fall through to search passes
    }
    await sleep(1000);
  }
  const first = await attempt(name + " footballer", 10);
  if (first && (first.url || first.error)) return first;
  await sleep(1000);
  const second = await attempt(name, 20);
  if (second && (second.url || second.error)) return second;
  // Pass 3: OpenSearch suggestion -> exact title fetch (catches ranking misses).
  await sleep(1000);
  try {
    const osUrl =
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2" +
      "&search=" + encodeURIComponent(name) + "&limit=5&namespace=0";
    const osRes = await fetch(osUrl, { headers: { "User-Agent": "FutureStarsWikiPhotos/1.0" } });
    if (osRes.ok) {
      const suggestions = (await osRes.json())[1] || [];
      for (const title of suggestions) {
        if (compact(String(title).replace(/\(.*\)/, "")) !== want) continue;
        await sleep(1000);
        const tUrl =
          "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2" +
          "&titles=" + encodeURIComponent(title) +
          "&prop=pageimages|pageprops&piprop=thumbnail&pithumbsize=200";
        const tRes = await fetch(tUrl, { headers: { "User-Agent": "FutureStarsWikiPhotos/1.0" } });
        if (!tRes.ok) continue;
        const tJson = await tRes.json();
        const p = ((tJson.query && tJson.query.pages) || [])[0];
        if (p && !p.missing && !(p.pageprops && p.pageprops.disambiguation) && p.thumbnail && p.thumbnail.source) {
          return { title: p.title, url: p.thumbnail.source };
        }
      }
    }
  } catch {
    // fall through
  }
  // Pass 4: strict-title pages without API thumbnails -> parse the infobox
  // portrait straight from the article wikitext.
  for (const title of bareTitles) {
    await sleep(1000);
    try {
      const wUrl =
        "https://en.wikipedia.org/w/api.php?action=parse&format=json&formatversion=2" +
        "&page=" + encodeURIComponent(title) + "&prop=wikitext&section=0";
      const wRes = await fetch(wUrl, { headers: { "User-Agent": "FutureStarsWikiPhotos/1.0" } });
      if (!wRes.ok) continue;
      const wJson = await wRes.json();
      const wt = (wJson.parse && wJson.parse.wikitext) || "";
      const imgM = wt.match(/\|\s*image\s*=\s*([^\n|}]+)/i);
      if (!imgM) continue;
      const file = imgM[1].trim().replace(/^File:/i, "");
      if (!/\.(jpe?g|png|webp|gif|tiff?|svg)$/i.test(file)) continue;
      return {
        title: title + " (infobox)",
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=200",
      };
    } catch {
      // fall through
    }
  }
  return null;
}

async function main() {
  const limit = parseInt((process.argv.find((a) => a.startsWith("--limit=")) || "=").split("=")[1] || "0", 10);
  const lines = readFileSync(RAW_PATH, "utf8").trim().split("\n").slice(1);
  const existing = existsSync(OUT_PATH) ? JSON.parse(readFileSync(OUT_PATH, "utf8").replace(/^\uFEFF/, "")) : {};
  // Keys are Name|Club to match the app's photo lookup.
  let names = [...new Set(lines.map((l) => { const c = l.split(","); return c[0] + "|" + c[3]; }))];
  if (limit > 0) names = names.slice(0, limit);
  let hit = 0;
  let skip = 0;
  let err = 0;
  for (const key of names) {
    if (existing[key]) {
      hit++;
      continue;
    }
    const [name] = key.split("|");
    await sleep(2500);
    let found = await findPhoto(name);
    // Back off and retry throttled lookups; still throttled -> try again next run.
    for (let r = 0; r < 3 && found && found.error && /429/.test(found.error); r++) {
      console.log("  backing off 30s for:", name);
      await sleep(30000);
      found = await findPhoto(name);
    }
    if (found && found.url) {
      existing[key] = found.url;
      hit++;
      // Incremental save: slow runs never lose progress.
      writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2) + "\n", "utf8");
      console.log("HIT:", name, "->", found.title);
    } else if (found && found.error) {
      err++;
      console.log("RATE:", name, found.error);
    } else {
      skip++;
      console.log("MISS:", name);
    }
  }
  writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2) + "\n", "utf8");
  console.log("wiki photos: " + hit + " have URLs (" + skip + " true misses, " + err + " rate errors), total keys: " + Object.keys(existing).length);
}

await main();
