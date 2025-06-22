import type {
  AggregationResult,
  HighlightsType,
} from "../../shared/types/types";

export const formatDateDDMMYYYY = (date: Date): string => {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
};

export const generateId = (): string =>
  Math.random().toString(36).substring(2, 9);

export const dayOfYearToDateString = (dayOfYear: number): string => {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const date = new Date(start);
  date.setDate(start.getDate() + dayOfYear - 1);

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
};

export const resultsToParameters = (
  results: AggregationResult[]
): HighlightsType[] => {
  return results.flatMap((result) => [
    {
      value: result.total_spend_galactic?.toString() ?? "",
      parameter: "общие расходы в галактических кредитах",
    },
    {
      value: result.less_spent_civ ?? "",
      parameter: "цивилизация с минимальными расходами",
    },
    {
      value: result.rows_affected?.toString() ?? "",
      parameter: "количество обработанных записей",
    },
    {
      value:
        result.big_spent_at !== undefined && result.big_spent_at !== null
          ? dayOfYearToDateString(Number(result.big_spent_at))
          : "",
      parameter: "день года с максимальными расходами",
    },
    {
      value:
        result.less_spent_at !== undefined && result.less_spent_at !== null
          ? dayOfYearToDateString(Number(result.less_spent_at))
          : "",
      parameter: "день года с минимальными расходами",
    },
    {
      value: result.big_spent_value?.toString() ?? "",
      parameter: "максимальная сумма расходов за день",
    },
    {
      value: result.big_spent_civ ?? "",
      parameter: "цивилизация с максимальными расходами",
    },
    {
      value: result.average_spend_galactic?.toString() ?? "",
      parameter: "средние расходы в галактических кредитах",
    },
  ]);
};
