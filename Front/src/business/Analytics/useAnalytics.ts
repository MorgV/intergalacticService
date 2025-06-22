import { useState } from "react";
import { useAppStore } from "../../state/useAppStore";
import type { HighlightItem } from "../../shared/types/types";

export const useAnalytics = () => {
  const sendFile = useAppStore((s) => s.sendFileAndCollectResults);
  const clearResults = useAppStore((s) => s.clearResults);
  const storeHighlights = useAppStore((s) => s.highlights);
  const loadHistory = useAppStore((s) => s.loadHistory);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (file: File | null) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      await sendFile(file, 1000);
      loadHistory();
    } catch (e) {
      setError("Ошибка загрузки файла");
      clearResults();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    error,
    highlights: storeHighlights as HighlightItem[],
  };
};
