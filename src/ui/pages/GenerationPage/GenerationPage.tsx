import { Button } from '../../UiKit/Button/Button';
import { Loader } from '../../UiKit/Loader/Loader';
import styles from './GenerationPage.module.css';

export const GenerationPage = () => {
    return (
        <div className={styles.wrapper}>
            <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
            <Button label='Начать генерацию' color='green' onClick={
                () => setTimeout(() => {
                    console.log("✔️ Ответ от сервера получен (через 1.5 секунды)");
                }, 1500)}
            ></Button>
            <Button label='Ошибка' color='orange' onClick={
                () => setTimeout(() => {
                    console.log("✔️ Ответ от сервера получен (через 1.5 секунды)");
                }, 1500)}
            ></Button>
            <Button label='Done!' color='light-green' onClick={
                () => setTimeout(() => {
                    console.log("✔️ Ответ от сервера получен (через 1.5 секунды)");
                }, 1500)}
            ></Button>
            <Loader />
            <p>идёт процесс генерации</p>
            <p>файл сгенерирован</p>
            <p>упс, не то...</p>
        </div>
    )
}
