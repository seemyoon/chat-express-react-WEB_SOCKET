import React, {FC} from 'react';
import styles from './SendMessageToRandomChatComponent.module.css';

interface IProps {
    toggleAutoMessage: (toggle: boolean) => void;
}

const SendMessageToRandomChatComponent: FC<IProps> = ({toggleAutoMessage}) => {
    return (
        <div>
            <button className={styles.button} onClick={() => toggleAutoMessage(true)}>Start auto message</button>
            <button className={styles.button} onClick={() => toggleAutoMessage(false)}>Stop auto message</button>
        </div>
    );
};

export default SendMessageToRandomChatComponent;