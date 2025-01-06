import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {socket} from "../utils/socket";
import {chatActions} from "../redux/slices/chatSlice";
import {messageActions} from "../redux/slices/messageSlice";
import {IMessage} from "../interfaces/message.interface";
import {Sender} from "../enum/sender.enum";
import SendMessageComponent from "../components/MessageComponents/SendMessageComponent/SendMessageComponent";
import '../index.css';

const ChatPage = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>("");

    const {chat} = useAppSelector((state) => state.chatSliceState);
    const {messages} = useAppSelector((state) => state.messageSliceState);

    useEffect(() => {
        socket.connect();

        if (params.id) {
            dispatch(chatActions.loadChatById(params.id));
            dispatch(messageActions.loadMessages(params.id));
        }

        socket.on("receiveMessage", (message: IMessage) => {
            if (message) {
                dispatch(messageActions.addMessage(message));
            }
        });

        socket.on("messageUpdated", (updatedMessage: IMessage) => {
            dispatch(messageActions.updateMessage(updatedMessage));
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("messageUpdated");
        };
    }, [dispatch, params.id]);

    const handleSendMessage = (text: string) => {
        if (text.trim() && params.id) {
            const messageData = {
                sender: Sender.Me,
                text,
                chatId: params.id,
            };

            socket.emit("sendMessage", messageData);
        }
    };

    const handleEditMessage = (message: IMessage) => {
        if (message.sender === Sender.Me) {
            setEditMode(message._id);
            setEditText(message.text);
        }
    };

    const handleSaveEditedMessage = () => {
        if (editMode && editText.trim()) {
            socket.emit("updateMessageRequested", {messageId: editMode, text: editText});
            setEditMode(null);
            setEditText("");
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditText("");
    };

    return (
        <div>
            <h3 className="healingChats">Chat with {chat?.firstName} {chat?.lastName}</h3>
            <div>
                {messages.map((message) => (
                    <div key={message._id}>
                        {editMode === message._id ? (
                            <div>
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={handleSaveEditedMessage}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <p>
                                <strong>
                                    {message.sender === Sender.Me ? "You" : `${chat?.firstName} ${chat?.lastName}`}
                                </strong>
                                : {message.text}
                                {message.sender === Sender.Me && (
                                    <button onClick={() => handleEditMessage(message)}>Edit</button>
                                )}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <SendMessageComponent sendMessage={handleSendMessage}/>
        </div>
    );
};

export default ChatPage;
