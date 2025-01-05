import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { chatActions } from "../redux/slices/chatSlice";
import { socket } from "../utils/socket";
import { messageActions } from "../redux/slices/messageSlice";
import { IMessage } from "../interfaces/message.interface";
import SendMessageComponent from "../components/MessageComponents/SendMessageComponent";

const ChatPage = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const [newMessage, setNewMessage] = useState("");

    const { chat } = useAppSelector((state) => state.chatSliceState);
    const { messages } = useAppSelector((state) => state.messageSliceState);

    useEffect(() => {
        if (params.id) {
            dispatch(chatActions.loadChatById(params.id));
        }

        socket.on("receiveMessage", (message: IMessage) => {
            if (message) {
                dispatch(messageActions.addMessage(message));
            }
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [dispatch, params.id]);

    const handleSendMessage = (text: string) => {
        if (text.trim()) {
            const message: IMessage = {
                _id: new Date().toISOString(),
                sender: "User",
                text,
                chatId: params.id || "",
            };

            socket.emit("sendMessage", message);
            dispatch(messageActions.addMessage(message));
            setNewMessage("");
        }
    };

    return (
        <div>
            <h3>Chat with {chat?.firstName} {chat?.lastName}</h3>
            <SendMessageComponent sendMessage={handleSendMessage} />
            <div>
                <ul>
                    {messages.map((message) => (
                        <li key={message._id}>
                            <strong>{message.sender}</strong>: {message.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatPage;
