import { useNavigate } from "react-router-dom";
import { useHistory } from "../../../business/History/useHistory";
import { Button } from "../../UiKit/Button/Button";
import { HistoryList } from "../../UiKit/HistoryList/HistoryList";
import styles from "./HistoryPage.module.css";

export const HistoryPage = () => {
    const navigate = useNavigate();
    const { clearHistory } = useHistory();

    return (
        <div className={styles.wrapper}>
            <HistoryList />
            <div className={styles.buttons}>
                <Button
                    onClick={() => navigate("/generation")}
                    color="green"
                    label="Сгенерировать больше"
                />
                <Button onClick={clearHistory} color="black-color" label="Очистить всё" />
            </div>
        </div>
    );
};
