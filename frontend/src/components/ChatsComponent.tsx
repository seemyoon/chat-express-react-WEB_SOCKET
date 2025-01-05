import React, {FC} from "react";
import {IChat} from "../interfaces/chat.interface";

interface Props {
    chats: IChat[];
    handleDeleteChat: (chatId: string) => void;
    updateChatState: (chat: IChat) => void;
}

const ChatsComponent: FC<Props> = ({chats, handleDeleteChat, updateChatState}) => {
    return (
        <ul>
            {chats.map((chat) => (
                <li key={chat._id}>
                    <span>
                        {chat.firstName} {chat.lastName}
                    </span>
                    <button onClick={() => handleDeleteChat(chat._id)}>Delete</button>
                    <button onClick={() => updateChatState(chat)}>Update</button>
                </li>
            ))}
        </ul>
    );
};

export default ChatsComponent;
