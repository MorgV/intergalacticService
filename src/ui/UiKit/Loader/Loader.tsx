import styles from "./Loader.module.css";

export const Loader = () => {

    // TODO: Сделать лоадер
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress / 100);


    return (
        <div className={styles.wrapper}>
            <svg className={styles.svg} width="60" height="60" viewBox="0 0 60 60">
                <circle className={styles.bg} cx="30" cy="30" r={radius} />
                <circle
                    className={styles.progress}
                    cx="30"
                    cy="30"
                    r={radius}
                    style={{ strokeDashoffset }}
                />
            </svg>
            {/* По желанию показать проценты */}
            {/* <div className={styles.label}>{progress}%</div> */}
        </div>
    );
};
