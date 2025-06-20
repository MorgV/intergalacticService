import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { Button } from "../Button/Button";

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
};

const modalRoot = document.getElementById("modal-root")!;

export const Modal = ({ children, onClose }: ModalProps) => {
    // Создаем div, в который будем рендерить модалку
    const el = useRef(document.createElement("div"));

    useEffect(() => {
        // При монтировании добавляем div в modalRoot
        modalRoot.appendChild(el.current);

        // При размонтировании убираем div
        return () => {
            modalRoot.removeChild(el.current);
        };
    }, []);

    // Закрытие по клику на бекдроп
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                {children}
                <div className={styles.closeButton}>
                    <Button
                        onClick={onClose}
                        color="black-color"
                        ButtonType="close"
                        height="50px"
                        width="50px"
                    />
                </div>

            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, el.current);
};
