import { Button } from "../../UiKit/Button/Button";
import { Loader } from "../../UiKit/Loader/Loader";
import styles from './FileInput.module.css';
import type { FileInputProps } from "../../../shared/types/types";
import { useFileInputLogic } from "../../../business/FileInput/useFileInputLogic";

export const FileInput = ({
    fileName,
    onFileSelect,
    message,
    err = false,
    isLoading = false,
}: FileInputProps) => {
    const {
        inputRef,
        isDragging,
        internalError,
        handleChange,
        handleClear,
        handleDrop,
        handleDragOver,
        handleDragLeave,
    } = useFileInputLogic(onFileSelect);

    const wrapperClassName = `
        ${styles.InputWrapper}
        ${isDragging ? styles.dragActive : ""}
        ${fileName ? styles.active : ""}
    `.trim();

    const showError = internalError || err;

    let messageText = message;
    if (showError) {
        messageText = "упс, не то...";
    } else if (fileName) {
        messageText = "файл загружен!";
    }

    const renderButtons = () => {
        if (isLoading) {
            return <Loader indeterminate />;
        }

        return (
            <>
                <Button
                    onClick={() => inputRef.current?.click()}
                    label={fileName || "Загрузить файл"}
                    color={showError ? "orange" : fileName ? "purple" : "white"}
                    width="300px"
                />
                {fileName && (
                    <Button
                        onClick={handleClear}
                        color="black-color"
                        ButtonType="close"
                    />
                )}
            </>
        );
    };

    return (
        <div
            className={wrapperClassName}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className={styles.buttons} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {renderButtons()}
            </div>

            <input
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleChange}
                accept=".csv"
                disabled={isLoading}
            />
            <p className={showError ? styles.err : ""}>{messageText}</p>
        </div>
    );
};
