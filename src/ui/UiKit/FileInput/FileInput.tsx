import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Button } from "../../UiKit/Button/Button";
import styles from './FileInput.module.css';

type FileInputProps = {
    onFileSelect: (file: File | null) => void;
    message: string;
    err?: boolean;
};

// TODO: Крестик кривой 

export const FileInput = ({ onFileSelect, message, err = false }: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleClick = () => inputRef.current?.click();

    const handleFile = (file: File) => {
        setFileName(file.name);
        onFileSelect(file);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleClear = () => {
        setFileName(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        onFileSelect(null); // сообщаем, что файл очищен
    };


    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const wrapperClassName = `
    ${styles.InputWrapper} 
    ${isDragging ? styles.dragActive : ""} 
    ${fileName ? styles.active : ""}
  `.trim();

    let messageText = message;
    if (err) {
        messageText = "упс, не то...";
    } else if (fileName) {
        messageText = "файл загружен!";
    }

    return (
        <div
            className={wrapperClassName}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className={styles.buttons}>
                <Button
                    onClick={handleClick}
                    label={fileName || "Загрузить файл"}
                    color={err ? "orange" : fileName ? "purple" : "white"}
                    width="200px"
                />
                {fileName && (
                    <Button
                        onClick={handleClear}
                        color="black-color"
                        ButtonType="close"
                    />
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleChange}
                accept=".csv"
            />
            <p className={err ? styles.err : ""}>{messageText}</p>
        </div>
    );
};
