// store/slices/generationSlice.ts
import type { StateCreator } from "zustand";
import { generateTestTable } from "../../api/api";

export interface GenerationSlice {
  generateTestTableFile: (
    size: number,
    withErrors: "on" | "off",
    maxSpend: string,
    onProgress?: (progress: number) => void
  ) => Promise<Blob>;
}

export const createGenerationSlice: StateCreator<GenerationSlice> = () => ({
  generateTestTableFile: async (size, withErrors, maxSpend, onProgress) => {
    return await generateTestTable(size, withErrors, maxSpend, onProgress);
  },
});
