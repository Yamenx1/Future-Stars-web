# Future Stars - U22 Soccer Scouting Dashboard

A data pipeline + web app that scouts high-potential footballers (22 and under) across 17 leagues by computing a custom **Future Star Score** from goals, assists, dribbles, pass accuracy, and an age bonus for younger talent.

> **Live demo:** https://YOUR-DEPLOYMENT-URL.vercel.app *(replace with your Vercel URL)*

## What it does

- **Interactive scouting dashboard** (`webapp/`) — filter by position/league, search 200+ prospects, sortable league-style data table with rank + frozen columns
- **Player profile modals** — click any card for photos, full stat lines, and a visual breakdown of exactly how each score is computed
- **Stat leaders & league power ranking** — top scorer / assister / dribbler / youngest star, plus every league ranked by average score
- **Shareable links** — every player has a `?player=` deep link with copy-to-clipboard
- **Real headshots** where available (API-Sports + Wikipedia matching), monogram fallback elsewhere

## How it works

1. **Data Preprocessing (Java)** — `src/budgetstar/FutureStarPreprocessor.java` filters out players under 500 minutes, enforces the U22 age cap, and writes `output/cleaned_future_stars.csv` with per-90 metrics and scores.
2. **Data Analysis (R)** — `r-analysis/future_star_analysis.R` runs EDA, plots (age vs score, top-15 bar chart) and a goals-vs-shots regression into `output/`.
3. **Live Stats Sync (API-Sports)** — `scripts/sync-player-stats.mjs` refreshes stats weekly via GitHub Actions (quota-budgeted, resumable, offline self-test included). Needs an `APISPORTS_KEY` repo secret.
4. **Player Photos (Wikipedia)** — `scripts/fetch-wiki-photos.mjs` matches headshots with strict full-name checks; `scripts/embed-csv.mjs` bakes data + photos into the static site.

## Project Structure

```text
Future-Stars-web/
├── src/budgetstar/      # Java preprocessing (filtering, scoring)
├── data/                # raw_young_players.csv (source of truth)
├── output/              # cleaned_future_stars.csv + R plots
├── r-analysis/          # EDA + regression (R)
├── webapp/              # static dashboard (HTML/CSS/JS + crest)
├── scripts/             # sync-player-stats, fetch-wiki-photos, embed-csv
└── .github/workflows/   # Pages deploy + weekly stats sync
```

## Setup & Execution

### 1. Java Preprocessing
This is built as a NetBeans Ant project. You can run the `FutureStarPreprocessor` class via your IDE (NetBeans/IntelliJ/Eclipse) or compile and run it from the command line. Upon execution, it reads from the `data/` folder and writes `cleaned_future_stars.csv` to the `output/` folder.

### 2. R Analysis
Make sure R is installed. You can execute the R script using RStudio or the command line:
```bash
Rscript r-analysis/future_star_analysis.R
```
Visualizations will be written to the `output/` folder.

### 3. Web Dashboard
Open `webapp/index.html` in any modern web browser to view the interactive player dashboard.

### 4. Live Stats Sync (API-Sports, optional)
`scripts/sync-player-stats.mjs` refreshes `data/raw_young_players.csv` from API-Football v3
(one request per club, ID mappings cached in `scripts/api-map.json`), then the Java
preprocessor recomputes scores and `scripts/embed-csv.mjs` re-embeds the data into the site.
Runs weekly via `.github/workflows/sync-stats.yml`, or manually from the Actions tab.
Needs an `APISPORTS_KEY` repo secret (Settings → Secrets → Actions). Syntax check and
offline tests: `node scripts/sync-player-stats.mjs --self-test` (spends zero quota).

### 5. Player Photos (Wikipedia, optional)
`scripts/fetch-wiki-photos.mjs` matches the squad against Wikipedia page images
(strict full-name matching, monogram fallback for the rest) into
`scripts/wiki-photos.json`, merged into the site by `scripts/embed-csv.mjs`.
Free, keyless, re-runnable: `node scripts/fetch-wiki-photos.mjs`. 
