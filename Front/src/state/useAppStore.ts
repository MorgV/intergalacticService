import { create } from "zustand";
import { createHistorySlice } from "./slices/historySlice";
import { createResultsSlice } from "./slices/resultsSlice";
import { createGenerationSlice } from "./slices/generationSlice";
import type { GenerationSlice } from "./slices/generationSlice";
import type { ResultsSlice } from "./slices/resultsSlice";
import type { HistorySlice } from "./slices/historySlice";

type AppStore = HistorySlice & ResultsSlice & GenerationSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createHistorySlice(...a),
  ...createResultsSlice(...a),
  ...createGenerationSlice(...a),
}));
