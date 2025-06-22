import styles from "./Loader.module.css";

type LoaderProps = {
    progress?: number;      // прогресс от 0 до 1
    indeterminate?: boolean; // если true — бесконечная анимация (крутится)
};

export const Loader = ({ progress = 0, indeterminate = false }: LoaderProps) => {
    const radius = 12;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    if (indeterminate) {
        return (
            <div className={styles.loaderWrapper}>
                <svg
                    className={`${styles.progressCircle} ${styles.indeterminate}`}
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                >
                    <circle
                        className={styles.progressCircleFill}
                        cx="20"
                        cy="20"
                        r={radius}
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={circumference * 0.75} // например 75% длины
                        strokeDashoffset={0}
                    />
                </svg>
            </div>
        );
    }

    return (
        <div className={styles.loaderWrapper}>
            <svg
                className={styles.progressCircle}
                width="40"
                height="40"
                viewBox="0 0 40 40"
            >
                <circle
                    className={styles.backgroundCircle}
                    cx="20"
                    cy="20"
                    r={radius}
                    strokeWidth="4"
                    fill="none"
                />
                <circle
                    className={styles.progressCircleFill}
                    cx="20"
                    cy="20"
                    r={radius}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
        </div>
    );
};
