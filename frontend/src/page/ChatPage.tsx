import React, {useEffect, useState} from "react";
import {IChat} from "../interfaces/chat.interface";
import {chatService} from "../services/chat.service";
import {socket} from "../utils/socket";

const ChatPage = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const fetchChats = async () => {
        try {
            // const chatList = await chatService.getChats();
            // setChats(chatList);
        } catch (error) {
            console.error("Failed to fetch chats:", error);
        }
    };


    const handleCreateChat = async () => {
        if (!firstName || !lastName) {
            alert("Both fields are required");
            return;
        }
        try {
            const newChat = await chatService.createChat({firstName, lastName});
            socket.emit("chatCreated", newChat);
            setFirstName("");
            setLastName("");
        } catch (error) {
            console.error("Failed to create chat:", error);
        }
    };


    const handleDeleteChat = async (chatId: string) => {
        if (window.confirm("Are you sure you want to delete this chat?")) {
            try {
                await chatService.removeChat(chatId);
                socket.emit("chatDeleted", chatId);
            } catch (error) {
                console.error("Failed to delete chat:", error);
            }
        }
    };


    useEffect(() => {
        fetchChats();

        socket.on("chatCreated", (newChat: IChat) => {
            setChats((prevChats) => [...prevChats, newChat]);
        });

        socket.on("chatDeleted", (deletedChatId: string) => {
            setChats((prevChats) =>
                prevChats.filter((chat) => chat._id !== deletedChatId)
            );
        });

        return () => {
            socket.off("chatCreated");
            socket.off("chatDeleted");
        };
    }, []);

    return (
        <div>
            <h2>Chat List</h2>
            <ul>
                {chats.map((chat) => (
                    <li key={chat._id}>
                        {chat.firstName} {chat.lastName}
                        <button onClick={() => handleDeleteChat(chat._id)}>Delete</button>
                    </li>
                ))}
            </ul>
sda
            <h3>Create New Chat</h3>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={handleCreateChat}>Create</button>
        </div>
    );
};

export default ChatPage;
