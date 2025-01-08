import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {socket} from "../../utils/socket";
import {chatActions} from "../../redux/slices/chatSlice";
import {messageActions} from "../../redux/slices/messageSlice";
import {IMessage} from "../../interfaces/message.interface";
import {Sender} from "../../enum/sender.enum";
import SendMessageComponent from "../../components/MessageComponents/SendMessageComponent/SendMessageComponent";
import styles from "./ChatPage.module.css";

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
            if (message.chatId === params.id) {
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
    const chatExists = chat && chat._id === params.id;
    return (
        <div className={styles.chatPage}>
            {chatExists && (
                <>
                    <h3 className={styles.healingChat}>
                        Chat with {chat?.firstName} {chat?.lastName}
                    </h3>
                    <div className={styles.messages}>
                        {messages
                            .filter((message) => message.chatId === params.id)
                            .map((message) => (
                                <div key={message._id} className={styles.messageItem}>
                                    {editMode === message._id ? (
                                        <div className={styles.editContainer}>
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
                                                {message.sender === Sender.Me
                                                    ? "You"
                                                    : `${chat?.firstName} ${chat?.lastName}`}
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
                    <SendMessageComponent sendMessage={handleSendMessage} />
                </>
            )}
        </div>
    );
};

export default ChatPage;
