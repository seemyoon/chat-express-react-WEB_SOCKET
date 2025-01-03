import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { chatService } from "../services/chat.service";
import { messageService } from "../services/message.service";
import { IChat } from "../interfaces/chat.interface";
import { IMessage } from "../interfaces/message.interface";
import { socket } from "../utils/socket";
import { toast } from "react-toastify";

const ChatDetailsPage = () => {
    const { id } = useParams();
    const [chat, setChat] = useState<IChat | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        const fetchChatDetails = async () => {
            try {
                if (id) {
                    const chatData = await chatService.getChats(id);
                    if (Array.isArray(chatData) && chatData.length > 0) {
                        setChat(chatData[0]);
                    } else {
                        setChat(null);
                    }
                    const messagesData = await messageService.getMessages(id);
                    setMessages(messagesData);
                }
            } catch (error) {
                console.error("Error fetching chat details:", error);
            }
        };

        fetchChatDetails();
    }, [id]);

    useEffect(() => {
        socket.on("receiveMessage", (message: IMessage) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            toast.success(`New message from ${message.sender}`);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const handleSendMessage = async () => {
        if (!messageText || !id) return;

        try {
            const newMessage = await messageService.sendMessage(id);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessageText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div>
            <h2>Chat with {chat?.firstName} {chat?.lastName}</h2>

            <div>
                <h3>Messages</h3>
                <div>
                    {messages.map((message) => (
                        <div key={message._id}>
                            <p><strong>{message.sender}:</strong> {message.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatDetailsPage;
