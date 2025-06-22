import type { HighlightItem, HighlightsProps } from '../../../shared/types/types';
import { Highlight } from '../Highlight/Highlight';
import styles from './Highlights.module.css';

interface Props extends HighlightsProps {
    items: HighlightItem[];
}

export const Highlights = ({ columns = 2, variant = 'white', items }: Props) => {
    const gridClass = columns === 1 ? styles.oneColumn : styles.twoColumns;

    return (
        <div className={`${styles.wrapper} ${gridClass}`}>
            {!items.length ? (
                <p className={styles.title}>
                    Здесь <br /> появятся хайлайты
                </p>
            ) : (
                items.map(({ value, parameter }) => (
                    <Highlight
                        key={parameter}
                        value={value}
                        parameter={parameter}
                        variant={variant}
                    />
                ))
            )}
        </div>
    );
};
