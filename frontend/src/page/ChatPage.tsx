import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {chatActions} from "../redux/slices/chatSlice";
import {socket} from "../utils/socket";
import {messageActions} from "../redux/slices/messageSlice";
import {IMessage} from "../interfaces/message.interface";
import SendMessageComponent from "../components/MessageComponents/SendMessageComponent";
import {Sender} from "../enum/sender.enum";

const ChatPage = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const [newMessage, setNewMessage] = useState("");

    const {chat} = useAppSelector((state) => state.chatSliceState);
    const {messages} = useAppSelector((state) => state.messageSliceState);

    useEffect(() => {
        socket.connect();

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
            const messageData = {
                sender: Sender.USER,
                text,
                chatId: params.id || "",
            };

            socket.emit("sendMessage", messageData);
            setNewMessage("");
        }
    };

    return (
        <div>
            <h3>Chat with {chat?.firstName} {chat?.lastName}</h3>
            <SendMessageComponent sendMessage={handleSendMessage}/>
            <div>
                {messages.map((message) => (
                    <p key={message._id}>
                        <strong>{message.sender}</strong>: {message.text}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ChatPage;
