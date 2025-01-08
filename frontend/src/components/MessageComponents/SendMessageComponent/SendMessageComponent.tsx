import React, {FC, useState} from 'react';
import styles from './SendMessageComponent.module.css';

interface IProps {
    sendMessage: (text: string) => void;
}

const SendMessageComponent: FC<IProps> = ({ sendMessage }) => {
    const [messageText, setMessageText] = useState("");

    const handleSend = () => {
        if (messageText.trim()) {
            sendMessage(messageText);
            setMessageText("");
        }
    };

    return (
        <div className={styles.messageContainer}>
            <input
                className={styles.input}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
            />
            <button className={styles.button} onClick={handleSend}>
                Send
            </button>
        </div>
    );
};

export default SendMessageComponent;
