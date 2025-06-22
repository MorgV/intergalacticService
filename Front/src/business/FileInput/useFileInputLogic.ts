import { useRef, useState } from "react";

export const useFileInputLogic = (
  onFileSelect: (file: File | null) => void
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const clearError = () => internalError && setInternalError(false);

  const isCsvFile = (file: File) => file.name.toLowerCase().endsWith(".csv");

  const handleFile = (file: File) => {
    clearError();
    onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isCsvFile(file)) {
        setInternalError(true);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      handleFile(file);
    }
  };

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    setInternalError(false);
    onFileSelect(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!isCsvFile(file)) {
        setInternalError(true);
        return;
      }
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return {
    inputRef,
    isDragging,
    internalError,
    handleChange,
    handleClear,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
};
