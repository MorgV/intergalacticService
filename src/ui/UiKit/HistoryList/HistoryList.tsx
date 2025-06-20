import { HistoryListStroke } from '../HistoryListStroke/HistoryListStroke';
import styles from './HistoryList.module.css';

type HistoryListType = {
    fileName: string,
    date: string,
    success: boolean
}

const list: HistoryListType[] = [
    {
        fileName: "Имя файла",
        date: "12.12.2003",
        success: true
    },
    {
        fileName: "Имя файла",
        date: "14.12.2002",
        success: false
    },
]


export const HistoryList = () => {
    return (
        <div className={styles['wrapper-HistoryList']}>
            {list.map(({ fileName, date, success }) => <HistoryListStroke key={fileName + date} fileName={fileName} date={date} success={success} />)}
        </div>
    )
}
