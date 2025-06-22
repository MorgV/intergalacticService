import type { AggregationResult } from "../shared/types/types";

export const BASE_URL = "http://localhost:3000";

type ProgressCallback = (progress: number) => void;

/**
 * Общий метод для загрузки файлов с сервера с отслеживанием прогресса.
 */
const httpStream = async (
  endpoint: string,
  onChunk: (chunk: Uint8Array, progress: number) => void
): Promise<Blob> => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok || !response.body) {
    throw new Error("Ошибка загрузки потока");
  }

  const contentLength = response.headers.get("Content-Length");
  const total = contentLength ? parseInt(contentLength) : 0;

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    if (value) {
      chunks.push(value);
      received += value.length;

      const progress = total > 0 ? received / total : 0;
      onChunk(value, progress);
    }
  }

  return new Blob(chunks, {
    type: response.headers.get("Content-Type") || "application/octet-stream",
  });
};

/**
 * Отправляет файл на сервер для агрегации. Принимает поток JSON-объектов.
 */
export const sendAggregateFile = async (
  file: File,
  rows: number,
  onData: (data: AggregationResult) => void
): Promise<void> => {
  console.log("[sendAggregateFile] Начинаю отправку файла:", file.name);

  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/aggregate?rows=${rows}`, {
      method: "POST",
      body: formData,
    });
  } catch (networkError) {
    console.error("[sendAggregateFile] Ошибка сети:", networkError);
    throw networkError;
  }

  if (!response.ok || !response.body) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line) as AggregationResult;
          onData(json);
        } catch (e) {
          console.warn("[sendAggregateFile] Ошибка парсинга:", line, e);
        }
      }
    }
  }

  // Обработка остатка
  if (buffer.trim()) {
    try {
      const json = JSON.parse(buffer) as AggregationResult;
      onData(json);
    } catch (e) {
      console.warn("[sendAggregateFile] Ошибка в остатке буфера:", buffer, e);
    }
  }

  console.log("[sendAggregateFile] Завершено.");
};

/**
 * Запрашивает тестовый CSV-отчёт от сервера.
 */
export const generateTestTable = async (
  size = 1,
  withErrors: "on" | "off" = "off",
  maxSpend = "1000",
  onProgress?: ProgressCallback
): Promise<Blob> => {
  const params = new URLSearchParams({
    size: size.toString(),
    withErrors,
    maxSpend,
  });

  return await httpStream(`/report?${params.toString()}`, (_, progress) => {
    if (onProgress) onProgress(progress);
  });
};
