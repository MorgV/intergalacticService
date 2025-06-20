import type { FC, ReactNode } from "react"
import styles from './BoldSpan.module.css';

export const BoldSpan: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <span className={styles.wrapper}>{children}</span>
    )
}
