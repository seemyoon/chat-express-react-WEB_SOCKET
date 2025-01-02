import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5200");

interface Message {
    chatId: string;
    text: string;
    sender: string;
}

const CountryMainLayout: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });

        socket.on("receiveMessage", (data: Message) => {
            console.log("Message received:", data); // Проверяем полученное сообщение на клиенте
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("receiveMessage");
        };
    }, []);

    const sendMessage = () => {
        if (inputValue.trim() === "") return;

        const message: Message = { chatId: "123", text: inputValue, sender: "User" };
        socket.emit("sendMessage", message);
        console.log("Message sent:", message);
        setInputValue("");
    };

    return (
        <div>
            <h1>Socket Test</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message.sender}: {message.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CountryMainLayout;
