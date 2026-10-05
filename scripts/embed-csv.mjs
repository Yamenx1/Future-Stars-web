// Re-embeds output/cleaned_future_stars.csv into webapp/app.js (UTF-8 safe),
// plus player photo IDs collected in scripts/api-map.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const jsPath = new URL("../webapp/app.js", import.meta.url);
const csvPath = new URL("../output/cleaned_future_stars.csv", import.meta.url);
const mapPath = new URL("./api-map.json", import.meta.url);
const js = readFileSync(jsPath, "utf8");
const csv = readFileSync(csvPath, "utf8").trim();
let next = js.replace(/var csvData = `[\s\S]*?`;/, () => "var csvData = `\n" + csv + "`;");
if (next === js) {
  console.error("EMBED FAILED: csvData block not found");
  process.exit(1);
}
if (existsSync(mapPath)) {
  const map = JSON.parse(readFileSync(mapPath, "utf8"));
  const photos = map.players || {};
  next = next.replace(/var playerPhotos = \{[\s\S]*?\};/, () => "var playerPhotos = " + JSON.stringify(photos) + ";");
}
writeFileSync(jsPath, next, "utf8");
console.log("embedded cleaned CSV + player photos into webapp/app.js");
