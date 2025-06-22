import { useState } from "react";
import { useAppStore } from "../../state/useAppStore";

export const useGeneration = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const generateTestTableFile = useAppStore(
    (state) => state.generateTestTableFile
  );

  const generate = async () => {
    setStatus("loading");
    setProgress(0);
    setError(null);

    try {
      const blob = await generateTestTableFile(
        0.01,
        "off",
        "1000",
        setProgress
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "report.csv";
      link.click();

      setStatus("success");
      setProgress(1);
    } catch (e) {
      setError("Ошибка при генерации файла");
      setStatus("error");
      setProgress(0);
    }
  };

  const reset = () => {
    setStatus("idle");
    setProgress(0);
    setError(null);
  };

  return {
    status,
    progress,
    error,
    generate,
    reset,
  };
};
