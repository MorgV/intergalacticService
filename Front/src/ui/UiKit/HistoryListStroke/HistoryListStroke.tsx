import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import styles from './HistoryListStroke.module.css';
import { Highlights } from '../Highlights/Highlights';
import { Modal } from '../Modal/Modal';
import type { HistoryListType } from '../../../shared/types/types';
import { useHistory } from '../../../business/History/useHistory';

export const HistoryListStroke = ({ id, fileName, date, success, onRemove }: HistoryListType) => {
    const [isOpen, setIsOpen] = useState(false);
    const { highlights, isLoading, error, loadHighlights } = useHistory();

    useEffect(() => {
        if (isOpen) {
            loadHighlights(id);
        }
    }, [isOpen]);

    let modalContent = null;
    if (isOpen) {
        modalContent = (
            <Modal onClose={() => setIsOpen(false)}>
                {isLoading && <p>Загрузка...</p>}
                {error && <p className={styles.err}>{error}</p>}
                {!isLoading && !error && (
                    <Highlights items={highlights} columns={1} variant="purple" />
                )}
            </Modal>
        );
    }

    return (
        <div className={styles['wrapper-HistoryListStroke']}>
            <div onClick={() => setIsOpen(true)} className={styles.stroke}>
                <div className={styles.group}>
                    <img src="images/file.png" alt="" />
                    {fileName}
                </div>
                <div>{date}</div>
                <div className={`${styles.group} ${success ? "" : styles.disabled}`}>
                    Обработан успешно <img src="images/fun.png" alt="" />
                </div>
                <div className={`${styles.group} ${success ? styles.disabled : ""}`}>
                    Не удалось обработать <img src="images/sad.png" alt="" />
                </div>
            </div>

            <Button
                ButtonType="trash"
                onClick={onRemove}
                color="white"
                width="60px"
                height="60px"
            />

            {modalContent}
        </div>
    );
};
