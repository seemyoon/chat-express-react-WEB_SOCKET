import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { sendMessage, getMessages } from '../services/messageService';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        // Подключение к WebSocket серверу
        const socket = io('http://localhost:3200');
        setSocket(socket);

        // Получение сообщений с сервера
        socket.on('new-message', (message: any) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        loadMessages();

        return () => {
            socket.disconnect();
        };
    }, []);

    const loadMessages = async () => {
        try {
            const response = await getMessages();
            setMessages(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage && socket) {
            try {
                await sendMessage({ text: newMessage });
                socket.emit('send-message', newMessage);
                setNewMessage('');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Chat Window</h2>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message.text}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatWindow;
