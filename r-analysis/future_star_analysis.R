# ============================================================
# Future Stars - Data Analysis (R Script)
# ============================================================
# Loads cleaned young player data and performs:
#   1. Exploratory Data Analysis (EDA)
#   2. Scatter Plot: Age vs Future Star Score
#   3. Bar Chart: Top 15 Future Stars
#   4. Linear Regression: Predict Goals from Shots on Target
# ============================================================

cat("Loading cleaned data...\n")
data <- read.csv("output/cleaned_future_stars.csv", stringsAsFactors = FALSE)
cat("Loaded", nrow(data), "players.\n\n")

# ---- 1. EDA ----
cat("=============================================\n")
cat("  EXPLORATORY DATA ANALYSIS\n")
cat("=============================================\n\n")

cat("--- Summary Statistics ---\n")
summary(data[, c("Age", "Goals", "Assists", "MinutesPlayed", "FutureStarScore")])

cat("\n--- Top 15 Players by Future Star Score ---\n")
top15 <- data[order(-data$FutureStarScore), ][1:15, c("Name", "Age", "Club", "FutureStarScore")]
print(top15, row.names = FALSE)

# ---- 2. Scatter Plot: Age vs Future Star Score ----
cat("\nGenerating scatter plot...\n")
png("output/scatter_age_vs_score.png", width = 900, height = 600)

positions <- data$Position
colors <- ifelse(positions %in% c("CF", "RW", "LW"), "tomato",
           ifelse(positions %in% c("AM", "CM", "DM"), "dodgerblue", "seagreen"))

plot(
  data$Age, data$FutureStarScore,
  col = colors, pch = 19, cex = 1.5,
  xlab = "Age",
  ylab = "Future Star Score",
  main = "Age vs Future Star Score by Position"
)

# Label top 5
top5 <- data[order(-data$FutureStarScore), ][1:5, ]
text(top5$Age, top5$FutureStarScore, labels = top5$Name,
     pos = 3, cex = 0.75, col = "gray20")

legend("topright",
  legend = c("Forward", "Midfielder", "Defender"),
  col = c("tomato", "dodgerblue", "seagreen"), pch = 19
)

dev.off()
cat("  Saved: output/scatter_age_vs_score.png\n")

# ---- 3. Bar Chart: Top 15 Future Stars ----
cat("Generating bar chart...\n")
top15_sorted <- top15[order(top15$FutureStarScore), ]

png("output/bar_top_future_stars.png", width = 900, height = 650)

par(mar = c(5, 10, 4, 2))
barplot(
  top15_sorted$FutureStarScore,
  names.arg = top15_sorted$Name,
  col = colorRampPalette(c("steelblue", "gold"))(15),
  main = "Top 15 Future Stars",
  xlab = "Future Star Score",
  horiz = TRUE,
  las = 1,
  cex.names = 0.8
)

dev.off()
cat("  Saved: output/bar_top_future_stars.png\n")

# ---- 4. Linear Regression ----
cat("\n=============================================\n")
cat("  LINEAR REGRESSION: Goals ~ ShotsOnTarget\n")
cat("=============================================\n\n")

model <- lm(Goals ~ ShotsOnTarget, data = data)
print(summary(model))

png("output/regression_goals_vs_shots.png", width = 900, height = 600)

plot(
  data$ShotsOnTarget, data$Goals,
  col = "steelblue", pch = 19, cex = 1.3,
  xlab = "Shots on Target",
  ylab = "Goals",
  main = "Linear Regression: Goals vs Shots on Target"
)
abline(model, col = "red", lwd = 2)

r_sq <- round(summary(model)$r.squared, 3)
legend("topleft",
  legend = paste("R-squared =", r_sq),
  bty = "n", cex = 1.2
)

dev.off()
cat("  Saved: output/regression_goals_vs_shots.png\n")

cat("\n=============================================\n")
cat("  Analysis Complete! Check output/ folder.\n")
cat("=============================================\n")
