import styles from './Highlight.module.css';

type HighlightProps = {
    value: string;
    parameter: string;
    variant?: 'white' | 'purple';
};

export const Highlight = ({ value, parameter, variant = 'white' }: HighlightProps) => {
    const bgClass = variant === 'purple' ? styles.purple : styles.white;

    return (
        <div className={`${styles.wrapper} ${bgClass}`}>
            <h1>{value}</h1>
            <p>{parameter}</p>
        </div>
    );
};
