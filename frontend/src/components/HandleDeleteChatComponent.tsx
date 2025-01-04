import React, {FC} from "react";
import {IChat} from "../interfaces/chat.interface";

interface HandleDeleteChatProps {
    chats: IChat[];
    handleDeleteChat: (chatId: string) => void;
}

const HandleDeleteChatComponent: FC<HandleDeleteChatProps> = ({chats, handleDeleteChat}) => {
    return (
        <ul>
            {chats.map((chat) => (
                <li key={chat._id}>
                    <span>
                        {chat.firstName} {chat.lastName}
                    </span>
                    <button onClick={() => handleDeleteChat(chat._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default HandleDeleteChatComponent;
