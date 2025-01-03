import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { chatService } from "../services/chat.service";
import { IChat } from "../interfaces/chat.interface";
import { socket } from "../utils/socket";

const ChatsPage = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [loading, setLoading] = useState(false);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [newChatData, setNewChatData] = useState<{ firstName: string; lastName: string }>({
        firstName: "",
        lastName: "",
    });

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
            console.log("chatCreated event received:", newChat);
            setChats((prevChats) => {
                if (!prevChats.find(chat => chat._id === newChat._id)) {
                    return [...prevChats, newChat];
                }
                return prevChats;
            });
        });

        socket.on("chatDeleted", (chatId: string) => {
            console.log("chatDeleted event received:", chatId);
            setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
        });

        return () => {
            socket.off("chatCreated");
            socket.off("chatDeleted");
        };
    }, []);

    const handleCreateChat = () => {
        setLoading(true);
        chatService.createChat(newChatData)
            .then((createdChat) => {
                setChats((prevChats) => [...prevChats, createdChat]);
                setIsCreatingChat(false);
                setNewChatData({ firstName: "", lastName: "" });
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
                setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
                socket.emit("chatDeleted", chatId);
            })
            .catch((error) => {
                console.error("Error deleting chat:", error);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewChatData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h3>Chats</h3>
            <button onClick={() => setIsCreatingChat(true)}>Create New Chat</button>

            {isCreatingChat && (
                <div>
                    <h4>Create a New Chat</h4>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={newChatData.firstName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={newChatData.lastName}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleCreateChat} disabled={loading}>
                        {loading ? "Creating..." : "Create Chat"}
                    </button>
                    <button onClick={() => setIsCreatingChat(false)}>Cancel</button>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {chats.map((chat) => (
                        <li key={chat._id}>
                            <Link to={`/chat/${chat._id}`}>
                                {chat.firstName} {chat.lastName}
                            </Link>
                            <button onClick={() => handleDeleteChat(chat._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatsPage;
