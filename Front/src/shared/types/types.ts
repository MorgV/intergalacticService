import type { ReactNode } from "react";

export type AggregationResult = {
  average_spend_galactic: number;
  big_spent_at: number;
  big_spent_civ: string;
  big_spent_value: number;
  less_spent_at: number;
  less_spent_civ: string;
  less_spent_value: number;
  rows_affected: number;
  total_spend_galactic: number;
};
export type HighlightsType = {
  value: string;
  parameter: string;
};

export type FileInputProps = {
  fileName: string | null;
  onFileSelect: (file: File | null) => void;
  message: string;
  err?: boolean;
  isLoading?: boolean;
};

export type HighlightItem = {
  parameter: string;
  value: string | number;
};

export type HighlightsProps = {
  columns?: 1 | 2;
  variant?: "white" | "purple";
};
export type HighlightProps = {
  value: string | number;
  parameter: string;
  variant?: "white" | "purple";
};

export type HistoryListType = {
  id: string;
  fileName: string;
  date: string;
  success: boolean;
  onRemove: () => void;
};
export type HistoryItem = {
  id: string;
  fileName: string;
  date: string;
  success: boolean;
};

export type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};
