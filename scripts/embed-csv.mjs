// Re-embeds output/cleaned_future_stars.csv into webapp/app.js (UTF-8 safe).
import { readFileSync, writeFileSync } from "node:fs";
const jsPath = new URL("../webapp/app.js", import.meta.url);
const csvPath = new URL("../output/cleaned_future_stars.csv", import.meta.url);
const js = readFileSync(jsPath, "utf8");
const csv = readFileSync(csvPath, "utf8").trim();
const next = js.replace(/var csvData = `[\s\S]*?`;/, () => "var csvData = `\n" + csv + "`;");
if (next === js) {
  console.error("EMBED FAILED: csvData block not found");
  process.exit(1);
}
writeFileSync(jsPath, next, "utf8");
console.log("embedded cleaned CSV into webapp/app.js");
