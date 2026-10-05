// Re-embeds output/cleaned_future_stars.csv into webapp/app.js (UTF-8 safe),
// plus player photo URLs from scripts/api-map.json and scripts/wiki-photos.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const jsPath = new URL("../webapp/app.js", import.meta.url);
const csvPath = new URL("../output/cleaned_future_stars.csv", import.meta.url);
const mapPath = new URL("./api-map.json", import.meta.url);
const wikiPath = new URL("./wiki-photos.json", import.meta.url);

const readJson = (p) => JSON.parse(readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
const js = readFileSync(jsPath, "utf8");
const csv = readFileSync(csvPath, "utf8").trim();

const openTag = "var csvData = `";
const start = js.indexOf(openTag);
const end = js.indexOf("`;", start + openTag.length);
if (start < 0 || end < 0) {
  console.error("EMBED FAILED: csvData block not found");
  process.exit(1);
}
let next = js.slice(0, start) + openTag + "\n" + csv + js.slice(end);

const photos = {};
if (existsSync(mapPath)) {
  const map = readJson(mapPath);
  for (const key of Object.keys(map.players || {})) {
    const id = map.players[key];
    if (id) photos[key] = "https://media.api-sports.io/football/players/" + id + ".png";
  }
}
  if (existsSync(wikiPath)) {
    const wiki = readJson(wikiPath);
  for (const key of Object.keys(wiki)) {
    if (!photos[key] && wiki[key]) photos[key] = wiki[key];
  }
}
const photoTag = "var playerPhotos = ";
const pStart = next.indexOf(photoTag);
const pEnd = next.indexOf("};", pStart + photoTag.length);
if (pStart >= 0 && pEnd >= 0) {
  next = next.slice(0, pStart) + photoTag + JSON.stringify(photos) + next.slice(pEnd + 1);
}
console.log("photo urls embedded: " + Object.keys(photos).length);
writeFileSync(jsPath, next, "utf8");
console.log("embedded cleaned CSV + player photos into webapp/app.js");
