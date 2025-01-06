import React, {FC, useEffect} from "react";
import {IChat} from "../../interfaces/chat.interface";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {chatActions} from "../../redux/slices/chatSlice";
import {Link} from "react-router-dom";
import '../../index.css';

interface Props {
    handleDeleteChat: (chatId: string) => void;
    updateChatState: (chat: IChat) => void;
}

const ChatsComponent: FC<Props> = ({handleDeleteChat, updateChatState}) => {
    const dispatch = useAppDispatch();
    const {chats} = useAppSelector((state) => state.chatSliceState);

    useEffect(() => {
        dispatch(chatActions.loadChats())
            .catch((error) => {
                console.error("Error fetching chats:", error);
            });
    }, [dispatch]);

    return (
        <div>
            {chats.map((chat) => (
                <div key={chat._id} className="chatItem">
                    <Link to={`/${chat._id}`}>
                        <div className="chatIcon"></div>
                        <div className="chatName">{chat.firstName} {chat.lastName}</div>
                    </Link>
                    <button onClick={() => handleDeleteChat(chat._id)} className="button">Delete</button>
                    <button onClick={() => updateChatState(chat)} className="button">Update</button>
                </div>
            ))}
        </div>
    );
};

export default ChatsComponent;
