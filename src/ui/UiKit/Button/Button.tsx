import type { FC } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    color?: "green" | "yellow" | "light-grey" | "dark-grey" | "black-color" | "orange" | "light-green" | "white" | "purple";
    label?: string;
    onClick: () => void;
    className?: string;
    width?: string;
    height?: string;
    ButtonType?: 'close' | 'trash' | 'default';
    disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
    color = "green",
    label = "Кнопка",
    onClick,
    className = "",
    width,
    height,
    ButtonType = 'default',
    disabled
}) => {
    // Формируем стиль
    const style: React.CSSProperties = {};

    if (width) style.width = width;
    if (height) style.height = height;
    if (ButtonType !== 'default') style.borderRadius = "10px";

    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${styles[color]} ${className}`}
            style={Object.keys(style).length ? style : undefined}
            disabled={disabled}
        >
            {ButtonType === 'close' ? (
                <img src="images/closeIcon.png" alt="×" />
            ) : ButtonType === 'trash' ? (
                <img src="images/trash.png" alt="×" />
            ) : (
                label
            )}
        </button>
    );
};
