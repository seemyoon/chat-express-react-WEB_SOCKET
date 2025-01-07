import React, {FC} from 'react';
import styles from './SendMessageToRandomChatComponent.module.css';

interface IProps {
    toggleAutoMessage: (toggle: boolean) => void;
}

const SendMessageToRandomChatComponent: FC<IProps> = ({toggleAutoMessage}) => {
    return (
        <div className={styles.mainContainer}>
            <h4 className={styles.healing4}>Send message to random chat:</h4>
            <div className={styles.toggleInputContainer}>
                <button className={styles.button} onClick={() => toggleAutoMessage(true)}>Start</button>
                <button className={styles.button} onClick={() => toggleAutoMessage(false)}>Stop</button>
            </div>
        </div>
    );
};

export default SendMessageToRandomChatComponent;