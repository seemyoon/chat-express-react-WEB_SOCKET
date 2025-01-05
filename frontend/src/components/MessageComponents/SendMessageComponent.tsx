import React, { useState } from 'react';

interface Props {
    sendMessage: (text: string) => void;
}

const SendMessageComponent: React.FC<Props> = ({ sendMessage }) => {
    const [messageText, setMessageText] = useState("");

    const handleSend = () => {
        if (messageText.trim()) {
            sendMessage(messageText);
            setMessageText("");
        }
    };

    return (
        <div>
            <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default SendMessageComponent;
