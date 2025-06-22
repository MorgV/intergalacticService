import type { StateCreator } from "zustand";
import type { HistoryItem, HighlightsType } from "../../shared/types/types";
import {
  getHistory,
  saveHistory,
  getHistoryDetails,
  saveHistoryDetails,
  removeHistoryItemById,
  clearAllHistory,
} from "../historyStorage/historyStorage";

export interface HistorySlice {
  history: HistoryItem[];
  loadHistory: () => void;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;
  getHighlightsByHistoryId: (id: string) => HighlightsType[];
  getHighlightsByFileName: (fileName: string) => HighlightsType[];
}

export const createHistorySlice: StateCreator<HistorySlice> = (set) => ({
  history: [],
  loadHistory: () => {
    const stored = getHistory();
    set({ history: stored });
  },
  removeHistoryItem: (id) => {
    removeHistoryItemById(id);
    set({ history: getHistory() });
  },
  clearHistory: () => {
    clearAllHistory();
    set({ history: [] });
  },
  getHighlightsByHistoryId: (id) => {
    const details = getHistoryDetails();
    return details[id]?.highlights || [];
  },
  getHighlightsByFileName: (fileName) => {
    const details = getHistoryDetails();
    for (const entry of Object.values(details)) {
      if (entry.fileName === fileName) return entry.highlights;
    }
    return [];
  },
});
