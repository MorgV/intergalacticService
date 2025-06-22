import readline from "readline";
import {
  createInitialStats,
  isValidCiv,
  isValidDate,
  isValidSpend,
  processValidLine,
  parseCSVLine,
  initMaps,
} from "../utils/statHelpers.js";

export const aggregateV2asStream = async (req, res) => {
  const stats = createInitialStats();
  const { civSpendMap, daySpendMap, usedDays } = initMaps();

  let isFirstLine = true;
  let headers = [];
  let lineCount = 0;
  const BATCH_SIZE = 10_000;
  let aborted = false;

  req.setEncoding("utf8");

  res.setHeader("Content-Type", "application/json");

  req.on("aborted", () => {
    console.warn("⚠️ Request aborted by client");
    aborted = true;
    rl.close();
  });

  res.on("error", (err) => {
    console.error("❌ Response error:", err);
    aborted = true;
    rl.close();
  });

  const rl = readline.createInterface({
    input: req,
    crlfDelay: Infinity,
  });

  const safeWrite = async (data) => {
    if (aborted || res.writableEnded) return;
    if (!res.write(data)) {
      rl.pause();
      await new Promise((resolve) => res.once("drain", resolve));
      rl.resume();
    }
  };

  rl.on("line", async (line) => {
    if (aborted) return;

    const trimmed = line.trim();
    if (!trimmed) return;

    if (isFirstLine) {
      headers = trimmed.split(",").map((h) => h.trim());
      isFirstLine = false;
      return;
    }

    const row = parseCSVLine(trimmed, headers);
    if (
      !row ||
      !isValidCiv(row.civ) ||
      !isValidSpend(Number(row.spend)) ||
      !isValidDate(Number(row.date))
    ) {
      stats.ivalid_rows++;
      return;
    }

    processValidLine(
      {
        civ: row.civ,
        date: Number(row.date),
        spend: Number(row.spend),
      },
      stats,
      civSpendMap,
      daySpendMap,
      usedDays
    );

    lineCount++;

    if (lineCount % BATCH_SIZE === 0) {
      await safeWrite(
        JSON.stringify({
          ...stats,
          rows_affected: lineCount,
          progress_rows: lineCount,
        }) + "\n"
      );
    }
  });

  rl.on("close", async () => {
    if (aborted || res.writableEnded) return;

    await safeWrite(
      JSON.stringify({
        ...stats,
        rows_affected: lineCount,
        progress_rows: lineCount,
        final: true,
      }) + "\n"
    );

    res.end();
  });

  rl.on("error", (err) => {
    console.error("🔥 Readline error:", err);
    if (!res.writableEnded) {
      res.writeHead(500);
      res.end("Server error");
    }
  });
};
