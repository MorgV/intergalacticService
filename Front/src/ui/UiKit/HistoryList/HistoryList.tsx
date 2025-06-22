import { useHistory } from "../../../business/History/useHistory";
import { HistoryListStroke } from "../HistoryListStroke/HistoryListStroke";
import styles from "./HistoryList.module.css";

export const HistoryList = () => {
    const { history, removeItem } = useHistory();

    return (
        <div className={styles["wrapper-HistoryList"]}>
            {history.map(({ id, fileName, date, success }) => (
                <HistoryListStroke
                    key={id}
                    id={id}
                    fileName={fileName}
                    date={date}
                    success={success}
                    onRemove={() => removeItem(id)}
                />
            ))}
        </div>
    );
};
