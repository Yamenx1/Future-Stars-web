package budgetstar;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * FutureStarPreprocessor
 *
 * Reads raw young soccer player data, filters out players with
 * insufficient minutes, and calculates a Future Star Score.
 *
 * Future Star Score formula:
 *   GoalsPer90  = (Goals / MinutesPlayed) * 90
 *   AssistsPer90 = (Assists / MinutesPlayed) * 90
 *   AgeFactor    = (24 - Age) * 0.5   (younger = higher bonus)
 *   Score = (GoalsPer90 * 3) + (AssistsPer90 * 2) + (DribblesCompleted / 10)
 *           + (PassAccuracy / 20) + AgeFactor
 */
public class FutureStarPreprocessor {

    private static final int MIN_MINUTES = 500;

    public static void main(String[] args) {
        String inputFile = "data/raw_young_players.csv";
        String outputFile = "output/cleaned_future_stars.csv";

        System.out.println("=============================================");
        System.out.println("  Future Stars - Data Preprocessor (Java)   ");
        System.out.println("=============================================\n");

        new File("output").mkdirs();

        List<String[]> keptRows = new ArrayList<>();
        String[] header = null;
        int totalPlayers = 0;
        int filteredOut = 0;

        // Step 1: Read raw CSV
        System.out.println("[Step 1] Reading raw data from: " + inputFile);
        try (BufferedReader br = new BufferedReader(new FileReader(inputFile))) {
            String line = br.readLine();
            if (line != null) {
                header = line.split(",");
            }

            while ((line = br.readLine()) != null) {
                String[] fields = line.split(",");
                if (fields.length < 14) continue;
                totalPlayers++;

                int minutesPlayed = Integer.parseInt(fields[6].trim());
                if (minutesPlayed < MIN_MINUTES) {
                    filteredOut++;
                    continue;
                }

                keptRows.add(fields);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return;
        }

        System.out.println("  Total players read    : " + totalPlayers);
        System.out.println("  Filtered out (<" + MIN_MINUTES + " min): " + filteredOut);
        System.out.println("  Players kept          : " + keptRows.size());

        // Step 2: Calculate Future Star Score
        System.out.println("\n[Step 2] Calculating Future Star Scores...");
        System.out.println("[Step 3] Writing cleaned data to: " + outputFile + "\n");

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputFile))) {
            // Write header
            StringBuilder headerLine = new StringBuilder();
            for (String h : header) {
                headerLine.append(h.trim()).append(",");
            }
            headerLine.append("GoalsPer90,AssistsPer90,FutureStarScore");
            bw.write(headerLine.toString());
            bw.newLine();

            for (String[] fields : keptRows) {
                int age = Integer.parseInt(fields[1].trim());
                int minutesPlayed = Integer.parseInt(fields[6].trim());
                int goals = Integer.parseInt(fields[7].trim());
                int assists = Integer.parseInt(fields[8].trim());
                int dribbles = Integer.parseInt(fields[10].trim());
                double passAcc = Double.parseDouble(fields[11].trim());

                double goalsPer90 = (goals / (double) minutesPlayed) * 90.0;
                double assistsPer90 = (assists / (double) minutesPlayed) * 90.0;
                double ageFactor = (24 - age) * 0.5;

                double futureStarScore = (goalsPer90 * 3.0)
                        + (assistsPer90 * 2.0)
                        + (dribbles / 10.0)
                        + (passAcc / 20.0)
                        + ageFactor;

                // Round values
                goalsPer90 = Math.round(goalsPer90 * 100.0) / 100.0;
                assistsPer90 = Math.round(assistsPer90 * 100.0) / 100.0;
                futureStarScore = Math.round(futureStarScore * 100.0) / 100.0;

                StringBuilder row = new StringBuilder();
                for (String f : fields) {
                    row.append(f.trim()).append(",");
                }
                row.append(goalsPer90).append(",");
                row.append(assistsPer90).append(",");
                row.append(futureStarScore);
                bw.write(row.toString());
                bw.newLine();
            }

        } catch (IOException e) {
            System.err.println("Error writing file: " + e.getMessage());
            return;
        }

        System.out.println("=============================================");
        System.out.println("  Done! Cleaned data saved to: " + outputFile);
        System.out.println("  " + keptRows.size() + " players with Future Star Scores");
        System.out.println("=============================================");
    }
}
