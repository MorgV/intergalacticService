import type { HighlightsType, HistoryItem } from "../../shared/types/types";

const HISTORY_KEY = "history";
const DETAILS_KEY = "historyDetails";

export const getHistory = (): HistoryItem[] => {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
};

export const saveHistory = (items: HistoryItem[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
};

export const getHistoryDetails = (): Record<
  string,
  { fileName: string; highlights: HighlightsType[] }
> => {
  return JSON.parse(localStorage.getItem(DETAILS_KEY) || "{}");
};

export const saveHistoryDetails = (
  details: Record<string, { fileName: string; highlights: HighlightsType[] }>
) => {
  localStorage.setItem(DETAILS_KEY, JSON.stringify(details));
};

export const removeHistoryItemById = (id: string) => {
  const history = getHistory().filter((item) => item.id !== id);
  saveHistory(history);

  const details = getHistoryDetails();
  delete details[id];
  saveHistoryDetails(details);
};

export const clearAllHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(DETAILS_KEY);
};
