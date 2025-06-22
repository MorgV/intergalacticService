import { useState } from "react";
import { BoldSpan } from "../../UiKit/BoldSpan/BoldSpan";
import { FileInput } from "../../UiKit/FileInput/FileInput";
import style from "./AnalyticsPage.module.css";
import { Button } from "../../UiKit/Button/Button";
import { Highlights } from "../../UiKit/Highlights/Highlights";
import { useAnalytics } from "../../../business/Analytics/useAnalytics";

export const AnalyticsPage = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    console.log('render')
    const { submit, isLoading, error, highlights } = useAnalytics();

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
        setFileName(file?.name || null);
    };

    const handleSubmit = () => {
        submit(selectedFile);
    };

    return (
        <div className={style.wrapper}>
            <p>
                Загрузите <BoldSpan>csv</BoldSpan> файл и получите{" "}
                <BoldSpan>полную информацию</BoldSpan> о нём за сверхнизкое время
            </p>

            <FileInput
                fileName={fileName}
                onFileSelect={handleFileSelect}
                message="или перетащите сюда"
                err={!!error}
                isLoading={isLoading}
            />

            <Button
                onClick={handleSubmit}
                color={fileName ? "green" : "dark-grey"}
                label={isLoading ? "Отправка..." : "Отправить"}
                width="200px"
                disabled={!selectedFile || isLoading}
            />

            {error && <p className={style.err}>{error}</p>}

            <Highlights items={highlights} columns={2} variant="white" />
        </div>
    );
};
