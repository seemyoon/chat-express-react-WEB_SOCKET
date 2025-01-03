import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { chatService } from "../services/chat.service";
import { IChat } from "../interfaces/chat.interface";

const ChatPage = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const [chat, setChat] = useState<IChat | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!chatId) return;

        const fetchChat = async () => {
            try {
                setLoading(true);
                const fetchedChat = await chatService.getChatById(chatId);
                setChat(fetchedChat);
            } catch (error) {
                console.error("Error fetching chat:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchChat();
    }, [chatId]);

    return (
        <div>
            <h3>Chat with {chat?.firstName} {chat?.lastName}</h3>
            {loading ? (
                <p>Loading chat...</p>
            ) : (
                <div>
                    <p>Messages go here...</p>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
