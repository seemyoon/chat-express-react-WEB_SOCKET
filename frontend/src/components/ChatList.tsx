import React, { useEffect, useState } from 'react';
import { getChats, createChat, updateChat, removeChat } from '../services/chatService';

const ChatList: React.FC = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [newChat, setNewChat] = useState({ firstName: '', lastName: '' });

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const response = await getChats();
            setChats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateChat = async () => {
        try {
            await createChat(newChat);
            loadChats();
            setNewChat({ firstName: '', lastName: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateChat = async (chat: any) => {
        try {
            await updateChat(chat);
            loadChats();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveChat = async (chatId: string) => {
        try {
            await removeChat(chatId);
            loadChats();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Chats</h2>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id}>
                        {chat.firstName} {chat.lastName}
                        <button onClick={() => handleUpdateChat(chat)}>Update</button>
                        <button onClick={() => handleRemoveChat(chat.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newChat.firstName}
                    onChange={(e) => setNewChat({ ...newChat, firstName: e.target.value })}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    value={newChat.lastName}
                    onChange={(e) => setNewChat({ ...newChat, lastName: e.target.value })}
                    placeholder="Last Name"
                />
                <button onClick={handleCreateChat}>Create Chat</button>
            </div>
        </div>
    );
};

export default ChatList;
