import type { StateCreator } from "zustand";
import type {
  AggregationResult,
  HighlightsType,
  HistoryItem,
} from "../../shared/types/types";
import { sendAggregateFile } from "../../api/api";
import {
  getHistory,
  saveHistory,
  getHistoryDetails,
  saveHistoryDetails,
} from "../historyStorage/historyStorage";
import {
  formatDateDDMMYYYY,
  generateId,
  resultsToParameters,
} from "../../business/Format/format";

export interface ResultsSlice {
  results: AggregationResult[];
  highlights: HighlightsType[];
  clearResults: () => void;
  bufferAndSetResults: (incoming: AggregationResult[]) => void;
  sendFileAndCollectResults: (
    file: File,
    rows: number,
    onProgress?: (progress: number) => void
  ) => Promise<void>;
}

export const createResultsSlice: StateCreator<ResultsSlice> = (set, get) => ({
  results: [],
  highlights: [],

  clearResults: () => set({ results: [], highlights: [] }),

  bufferAndSetResults: (incoming) => {
    set((state) => {
      const highlightsMap = new Map<string, HighlightsType>();
      state.highlights.forEach((h) => highlightsMap.set(h.parameter, h));

      const newHighlights = resultsToParameters(incoming);
      newHighlights.forEach((h) => highlightsMap.set(h.parameter, h));

      return {
        results: [...state.results, ...incoming],
        highlights: Array.from(highlightsMap.values()),
      };
    });
  },

  sendFileAndCollectResults: async (file, rows, onProgress) => {
    get().clearResults();

    try {
      let bufferResults: AggregationResult[] = [];
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      const flushBuffer = () => {
        if (bufferResults.length === 0) return;
        get().bufferAndSetResults(bufferResults);
        bufferResults = [];
        timeoutId = null;
      };

      await sendAggregateFile(file, rows, (result) => {
        bufferResults.push(result);
        if (onProgress) onProgress(result.progress);

        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            flushBuffer();
          }, 100);
        }
      });

      flushBuffer();

      const newItemId = generateId();
      const storedHistory: HistoryItem[] = getHistory();

      const newItem: HistoryItem = {
        id: newItemId,
        fileName: file.name,
        date: formatDateDDMMYYYY(new Date()),
        success: true,
      };

      const updatedHistory = [newItem, ...storedHistory];
      saveHistory(updatedHistory);

      const existingDetails = getHistoryDetails();
      existingDetails[newItemId] = {
        fileName: file.name,
        highlights: get().highlights,
      };
      saveHistoryDetails(existingDetails);
    } catch (e) {
      console.error("Ошибка при загрузке файла:", e);
      throw e;
    }
  },
});
