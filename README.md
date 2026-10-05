# Future Stars (Budget Star) - Soccer Player Analysis

A data processing, analysis, and visualization project designed to scout undervalued and high-potential young football players (22 years old and under). This project demonstrates skills across Java for data preprocessing, R for exploratory analysis and modeling, and a web-based presentation layer (HTML/CSS/JS).

## Project Overview

The main objective of "Future Stars" is to identify "Budget Star" players in major football leagues. The workflow is divided into three main components:

1. **Data Preprocessing (Java)**
   - **Location:** `src/budgetstar/FutureStarPreprocessor.java`
   - Scans raw player statistics from `data/raw_young_players.csv`.
   - Cleans the dataset by filtering out players with fewer than 500 minutes played.
   - Calculates a custom **Future Star Score** based on metrics such as goals, assists per 90, dribbles, pass accuracy, and an age factor (younger = higher bonus).
   - Exports the processed dataset to `output/cleaned_future_stars.csv`.

2. **Data Analysis & Visualization (R)**
   - **Location:** `r-analysis/future_star_analysis.R`
   - Loads the cleaned dataset produced by the Java preprocessor.
   - Performs Exploratory Data Analysis (EDA), outputting summary statistics.
   - Generates insightful plots:
     - Scatter Plot: Age vs Future Star Score (by position).
     - Bar Chart: Top 15 Future Stars ranked by their calculated score.
     - Linear Regression: Predicts goals based on shots on target.
   - Saves final plots as PNGs in the `output/` folder.

3. **Web Application Dashboard (HTML/CSS/JS)**
   - **Location:** `webapp/`
   - A simple, dynamic, football-themed UI.
   - Reads the processed data to display:
     - High-level metrics (Total Players, Avg Age, Top Score, Leagues count).
     - Top 3 Future Stars highlighted.
     - Interactive player cards and a searchable, filterable data table.
   - Features filtering by player position and league. 

## Project Structure

```text
BudgetStar/
├── src/
│   └── budgetstar/          # Java source code for data preprocessing
├── data/                    # Raw input data (raw_young_players.csv)
├── output/                  # Cleaned CSV data and generated R plots
├── r-analysis/              # R scripts for statistical analysis and visualization
├── webapp/                  # HTML, CSS, and JS files for the web dashboard interactives
└── build.xml                # Ant build configuration for the Java project (NetBeans)
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
