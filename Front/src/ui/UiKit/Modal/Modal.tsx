import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { Button } from "../Button/Button";
import type { ModalProps } from "../../../shared/types/types";
import { createPortal } from "react-dom";


const modalRoot = document.getElementById("modal-root")!;

export const Modal = ({ children, onClose }: ModalProps) => {
    const el = useRef(document.createElement("div"));

    useEffect(() => {
        modalRoot.appendChild(el.current);
        return () => {
            modalRoot.removeChild(el.current);
        };
    }, []);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.closeButton}>
                    <Button
                        onClick={onClose}
                        color="black-color"
                        ButtonType="close"
                        height="50px"
                        width="50px"
                    />
                </div>
                <div className={styles.overflow}>
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, el.current);
};
