import React, { useEffect, useState } from "react";
import { chatService } from "../services/chat.service";
import { IChat } from "../interfaces/chat.interface";
import { socket } from "../utils/socket";
import HandleCreateChatComponent from "../components/HandleCreateChatComponent";
import HandleDeleteChatComponent from "../components/HandleDeleteChatComponent";

const ChatsPage = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket.connect();

        setLoading(true);
        chatService.getChats()
            .then((chatList) => {
                setChats(chatList);
            })
            .catch((error) => {
                console.error("Error fetching chats:", error);
            })
            .finally(() => {
                setLoading(false);
            });

        socket.on("chatCreated", (newChat: IChat) => {
            setChats((prevChats) => {
                if (!prevChats.find(chat => chat._id === newChat._id)) {
                    return [...prevChats, newChat];
                }
                return prevChats;
            });
        });

        socket.on("chatDeleted", (chatId: string) => {
            setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
        });

        return () => {
            socket.off("chatCreated");
            socket.off("chatDeleted");
        };
    }, []);

    const handleCreateChat = (newChatData: { firstName: string; lastName: string }) => {
        setLoading(true);
        chatService.createChat(newChatData)
            .then((createdChat) => {
                socket.emit("chatCreated", createdChat);
            })
            .catch((error) => {
                console.error("Error creating chat:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteChat = (chatId: string) => {
        chatService.removeChat(chatId)
            .then(() => {
                socket.emit("chatDeleted", chatId);
            })
            .catch((error) => {
                console.error("Error deleting chat:", error);
            });
    };

    return (
        <div>
            <h3>Chats</h3>
            <HandleCreateChatComponent handleCreateChat={handleCreateChat} loading={loading} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <HandleDeleteChatComponent chats={chats} handleDeleteChat={handleDeleteChat} />
            )}
        </div>
    );
};

export default ChatsPage;
