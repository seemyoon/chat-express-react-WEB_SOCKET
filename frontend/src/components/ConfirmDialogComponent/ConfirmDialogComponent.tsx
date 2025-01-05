import React, { FC } from "react";
import styles from "./ConfirmDialogComponentStyles.module.css";

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialogComponent: FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
};


export default ConfirmDialogComponent;
