import React, {useEffect, useState} from "react";
import {chatService} from "../services/chat.service";
import {IChat} from "../interfaces/chat.interface";
import {socket} from "../utils/socket";
import HandleCreateChatComponent from "../components/HandleCreateChatComponent";
import HandleDeleteChatComponent from "../components/HandleDeleteChatComponent";

const ChatsPage = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket.connect(); // Connect to the server using WebSocket

        setLoading(true);
        chatService.getChats() // Fetch the list of chats from the server
            .then((chatList) => {
                setChats(chatList);
            })
            .catch((error) => {
                console.error("Error fetching chats:", error);
            })
            .finally(() => {
                setLoading(false);
            });

        // Listen for the "chatCreated" event from the server
        socket.on("chatCreated", (newChat: IChat) => {
            setChats((prevChats) => {
                if (!prevChats.find(chat => chat._id === newChat._id)) {
                    return [...prevChats, newChat]; // Add the new chat to the list
                }
                return prevChats;
            });
        });

        // Listen for the "chatDeleted" event from the server
        socket.on("chatDeleted", (chatId: string) => {
            setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId)); // Remove the chat from the list
        });

        return () => {
            // Clean up event listeners when the component is unmounted
            socket.off("chatCreated");
            socket.off("chatDeleted");
        };
    }, []);

    // Emit the "chatCreateRequested" event to the server when creating a chat
    const handleCreateChat = (newChatData: { firstName: string; lastName: string }) => {
        setLoading(true);
        try {
            socket.emit("chatCreateRequested", newChatData); // Emit the "chatCreateRequested" event to the server
        } catch (error) {
            console.error("Error creating chat:", error);
        } finally {
            setLoading(false);
        }
    };

    // Emit the "chatDeleteRequested" event to the server when deleting a chat
    const handleDeleteChat = (chatId: string) => {
        chatService.removeChat(chatId)
            .then(() => {
                socket.emit("chatDeleteRequested", chatId); // Emit the "chatDeleteRequested" event to the server
            })
            .catch((error) => {
                console.error("Error deleting chat:", error);
            });
    };

    return (
        <div>
            <h3>Chats</h3>
            <HandleCreateChatComponent handleCreateChat={handleCreateChat} loading={loading}/>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <HandleDeleteChatComponent chats={chats} handleDeleteChat={handleDeleteChat}/>
            )}
        </div>
    );
};

export default ChatsPage;
