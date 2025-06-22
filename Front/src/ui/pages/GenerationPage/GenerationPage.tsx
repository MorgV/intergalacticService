import { useGeneration } from '../../../business/Generation/useGeneration';
import { Button } from '../../UiKit/Button/Button';
import { Loader } from '../../UiKit/Loader/Loader';
import styles from './GenerationPage.module.css';

export const GenerationPage = () => {
    const {
        status,
        progress,
        error,
        generate,
        reset,
    } = useGeneration();

    if (status === 'loading') {
        return (
            <div className={styles.wrapper}>
                <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
                <Loader progress={progress} />
                <p>Идёт процесс генерации</p>
                <p>Файл скачается не сразу</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className={styles.wrapper}>
                <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
                <div className={styles.buttons}>
                    <Button label='Done!' color='light-green' onClick={reset} />
                    <Button onClick={reset} color="black-color" ButtonType="close" />
                </div>
                <p>Файл сгенерирован</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className={styles.wrapper}>
                <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
                <div className={styles.buttons}>
                    <Button label='Ошибка' color='orange' onClick={reset} />
                    <Button onClick={reset} color="black-color" ButtonType="close" />
                </div>
                <p className={styles.err}>{error}</p>
            </div>
        );
    }

    // status === 'idle'
    return (
        <div className={styles.wrapper}>
            <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
            <Button label='Начать генерацию' color='green' onClick={generate} />
        </div>
    );
};
