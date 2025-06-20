import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './HistoryListStroke.module.css';
import { Highlights } from '../Highlights/Highlights';
import { Modal } from '../Modal/Modal';


type HistoryListType = {
    fileName: string,
    date: string,
    success: boolean
}
export const HistoryListStroke = ({ fileName, date, success }: HistoryListType) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['wrapper-HistoryListStroke']}>
            <div onClick={() => setIsOpen(true)} className={styles.stroke}>
                <div className={styles.group}><img src='images/file.png' alt='' />{fileName}</div>
                <div>{date}</div>
                <div className={`${styles.group} ${success ? "" : styles.disabled}`}>Обработан успешно <img src='images/fun.png' alt='' /></div>
                <div className={`${styles.group} ${success ? styles.disabled : ""}`}>Не удалось обработать <img src='images/sad.png' alt='' /></div>
            </div>
            <Button ButtonType='trash' onClick={() => console.log('asd')} color='white' width='60px' height='60px' />
            {isOpen && <Modal children={<Highlights columns={1} variant='purple' />} onClose={() => setIsOpen(false)} />}
        </div>
    )
}
