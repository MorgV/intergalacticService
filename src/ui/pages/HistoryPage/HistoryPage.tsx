import { Button } from '../../UiKit/Button/Button';
import { HistoryList } from '../../UiKit/HistoryList/HistoryList';
import styles from './HistoryPage.module.css';


export const HistoryPage = () => {
    return (
        <div className={styles.wrapper}>
            <HistoryList />
            <div className={styles.buttons}>
                <Button onClick={() => console.log('asd')} color='green' label='Сгенерировать больше' />
                <Button onClick={() => console.log('asd')} color='black-color' label='Очистить всё' />
            </div>
        </div>
    )
}
