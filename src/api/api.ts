const API_BASE = "http://localhost:3000";

export async function fetchReportStream(params: {
  size: number;
  withErrors?: "on" | "off";
  maxSpend?: string;
  onProgress?: (percent: number) => void;
}): Promise<Blob> {
  const { size, withErrors = "off", maxSpend = "1000", onProgress } = params;

  const url = `${API_BASE}/report?size=${size}&withErrors=${withErrors}&maxSpend=${maxSpend}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Не удалось получить поток данных");
  }

  const totalBytes = size * 1024 * 1024 * 1024; // Пример: 1 GB в байтах
  let receivedLength = 0;
  const chunks: Uint8Array[] = [];

  let lastUpdateTime = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      receivedLength += value.length;

      const now = performance.now();
      if (onProgress && now - lastUpdateTime > 100) {
        // обновляем прогресс не чаще чем раз в 100ms
        onProgress(Math.min((receivedLength / totalBytes) * 100, 100));
        lastUpdateTime = now;
      }
    }
  }
  if (onProgress) {
    onProgress(100);
  }

  return new Blob(chunks, { type: "text/csv" });
}
