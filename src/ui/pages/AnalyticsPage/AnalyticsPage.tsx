import { useState } from "react";
import { BoldSpan } from "../../UiKit/BoldSpan/BoldSpan";
import { FileInput } from "../../UiKit/FileInput/FileInput";
import style from "./AnalyticsPage.module.css";
import { Button } from "../../UiKit/Button/Button";
import { Highlights } from "../../UiKit/Highlights/Highlights";

export const AnalyticsPage = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const err = false;
    let submitButton;
    if (!err) {
        submitButton = (
            <Button
                onClick={() => console.log("Отправить")}
                color={fileName ? "green" : "dark-grey"}
                label="Отправить"
                minWidth="200px"
                disabled={!fileName}
            />
        );
    }

    return (
        <div className={style.wrapper}>
            <p>
                Загрузите <BoldSpan>csv</BoldSpan> файл и получите <BoldSpan>полную информацию</BoldSpan> о нём за сверхнизкое время
            </p>
            <FileInput
                onFileSelect={(file: File | null) => {
                    if (file) {
                        setFileName(file.name);
                        console.log(file.name);
                    } else {
                        setFileName(null); // сбрасываем имя файла при очистке
                        console.log("файл удалён");
                    }
                }}
                message="или перетащите сюда"
                err={err}
            />
            {submitButton}
            <Highlights />
        </div>
    );
};
