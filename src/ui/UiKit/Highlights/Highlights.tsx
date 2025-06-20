import { Highlight } from '../Highlight/Highlight';
import styles from './Highlights.module.css';

type ParametersType = {
    value: string;
    parameter: string;
};

const parameters: ParametersType[] = [
    { value: '1000', parameter: 'общие расходы в галактических кредитах' },
    { value: 'Заголовок 2', parameter: 'цивилизация с минимальными расходами' },
    { value: 'Заголовок 3', parameter: 'Описание 3' },
    { value: 'Заголовок 4', parameter: 'Описание 4' },
];

type HighlightsProps = {
    columns?: 1 | 2;
    variant?: 'white' | 'purple';
};


export const Highlights = ({ columns = 2, variant = 'white' }: HighlightsProps) => {
    const gridClass = columns === 1 ? styles.oneColumn : styles.twoColumns;

    return (
        <div className={`${styles.wrapper} ${gridClass}`}>
            {!parameters.length ? (
                <p className={styles.title}>
                    Здесь <br /> появятся хайлайты
                </p>
            ) : (
                parameters.map(({ value, parameter }) => (
                    <Highlight
                        key={value}
                        value={value}
                        parameter={parameter}
                        variant={variant} // <— прокидываем сюда
                    />
                ))
            )}
        </div>
    );
};
