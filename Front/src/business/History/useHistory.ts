// business/History/useHistory.ts
import { useEffect, useState } from "react";
import { useAppStore } from "../../state/useAppStore";
import type { HighlightsType, HistoryItem } from "../../shared/types/types";

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>(
    useAppStore.getState().history
  );
  const [highlights, setHighlights] = useState<HighlightsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { clearHistory, removeHistoryItem, getHighlightsByHistoryId } =
    useAppStore.getState();

  useEffect(() => {
    const unsub = useAppStore.subscribe((state) => {
      setHistory(state.history);
    });
    return () => unsub();
  }, []);

  const removeItem = (id: string) => {
    removeHistoryItem(id);
  };

  const loadHighlights = (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = getHighlightsByHistoryId(id);
      setHighlights(data);
    } catch (e) {
      setError("Ошибка загрузки деталей истории");
      setHighlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    history,
    removeItem,
    clearHistory,
    highlights,
    isLoading,
    error,
    loadHighlights,
  };
};
