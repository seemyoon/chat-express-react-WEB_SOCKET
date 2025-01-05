import React, {FC, useEffect} from "react";
import {IChat} from "../../interfaces/chat.interface";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {chatActions} from "../../redux/slices/chatSlice";
import {Link} from "react-router-dom";

interface Props {
    handleDeleteChat: (chatId: string) => void;
    updateChatState: (chat: IChat) => void;
}

const ChatsComponent: FC<Props> = ({handleDeleteChat, updateChatState}) => {
    const dispatch = useAppDispatch();
    const {chats} = useAppSelector(state => state.chatSliceState)
    useEffect(() => {
        dispatch(chatActions.loadChats())
            .catch((error) => {
                console.error("Error fetching chats:", error);
            })
    }, [dispatch]);
    return (
        <div>
            {chats.map((chat) => (
                <p key={chat._id}>
                    <Link to={"/" + chat._id}>
                        <span>
                        {chat.firstName} {chat.lastName}
                        </span>
                    </Link>
                    <button onClick={() => handleDeleteChat(chat._id)}>Delete</button>
                    <button onClick={() => updateChatState(chat)}>Update</button>
                </p>
            ))}
        </div>
    );
};

export default ChatsComponent;
