import { getExchangeRate } from "../exhangeRates.js";

export const CIVS = ["humans", "blobs", "monsters"];

export function isValidCiv(civ) {
  return CIVS.includes(civ);
}

export function isValidDate(date) {
  return !isNaN(date) && date >= 0 && date <= 364;
}

export function isValidSpend(spend) {
  return !isNaN(spend) && spend >= 0;
}

export function createInitialStats() {
  return {
    total_spend_galactic: 0,
    rows_affected: 0,
    less_spent_at: null,
    big_spent_at: null,
    less_spent_value: Infinity,
    big_spent_value: -Infinity,
    average_spend_galactic: 0,
    big_spent_civ: "",
    less_spent_civ: "",
    ivalid_rows: 0,
  };
}

export function processValidLine(
  { civ, date, spend },
  stats,
  civSpendMap,
  daySpendMap,
  usedDays
) {
  const rate = getExchangeRate(civ);
  const spendGalactic = spend * rate;

  stats.total_spend_galactic += spendGalactic;
  stats.rows_affected += 1;

  civSpendMap[civ] += spendGalactic;
  daySpendMap[date] += spendGalactic;

  const dayTotal = daySpendMap[date];

  if (!usedDays.has(date)) {
    usedDays.add(date);
  }

  // Обновляем максимум
  if (dayTotal > stats.big_spent_value) {
    stats.big_spent_value = dayTotal;
    stats.big_spent_at = date;
  }

  // Обновляем минимум (но только если это первый раз или обновился)
  if (dayTotal < stats.less_spent_value || stats.less_spent_at === date) {
    stats.less_spent_value = dayTotal;
    stats.less_spent_at = date;
  }

  const sortedCivs = Object.entries(civSpendMap).sort((a, b) => b[1] - a[1]);
  stats.big_spent_civ = sortedCivs[0][0];
  stats.less_spent_civ = sortedCivs[sortedCivs.length - 1][0];

  stats.average_spend_galactic =
    stats.rows_affected > 0
      ? stats.total_spend_galactic / stats.rows_affected
      : 0;
}

export function parseCSVLine(line, headers = null) {
  const parts = line
    .trim()
    .split(",")
    .map((v) => v.trim());

  if (headers) {
    if (parts.length !== headers.length) return null;
    const row = {};
    headers.forEach((key, i) => {
      row[key] = parts[i];
    });
    return row;
  }

  if (parts.length !== 5) return null;

  const [, civ, , dateStr, spendStr] = parts;
  return {
    civ,
    date: Number(dateStr),
    spend: Number(spendStr),
  };
}

export function initMaps() {
  return {
    civSpendMap: {
      humans: 0,
      blobs: 0,
      monsters: 0,
    },
    daySpendMap: new Array(365).fill(0),
    usedDays: new Set(),
  };
}
