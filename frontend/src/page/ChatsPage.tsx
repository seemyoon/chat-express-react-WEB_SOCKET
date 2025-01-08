import React, { useState, useEffect } from "react";
import { chatService } from "../services/chat.service";
import { IChat } from "../interfaces/chat.interface";
import { socket } from "../utils/socket";
import HandleCreateChatComponent from "../components/ChatComponents/HandleCreateChatComponent/HandleCreateChatComponent";
import ChatsComponent from "../components/ChatComponents/ChatsComponent";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { chatActions } from "../redux/slices/chatSlice";
import { editChatActions } from "../redux/slices/editChatSlice";
import ConfirmDialogComponent from "../components/ChatComponents/ConfirmDialogComponent/ConfirmDialogComponent";
import SendMessageToRandomChatComponent from "../components/MessageComponents/SendMessageToRandomChatComponent/SendMessageToRandomChatComponent"; // Импортируем компонент модального окна
import '../index.css';

const ChatsPage = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const { newFirstName, newLastName } = useAppSelector((state) => state.editChatSliceState);
    const [editingChat, setEditingChat] = useState<IChat | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);

    useEffect(() => {
        socket.connect();

        setLoading(true);
        dispatch(chatActions.loadChats())
            .catch((error) => {
                console.error("Error fetching chats:", error);
            })
            .finally(() => {
                setLoading(false);
            });

        socket.on("chatCreated", (newChat: IChat) => {
            dispatch(chatActions.addChat(newChat));
        });

        socket.on("chatDeleted", (chatId: string) => {
            dispatch(chatActions.deleteChat(chatId));
        });

        socket.on("chatUpdated", (updatedChat: IChat) => {
            dispatch(chatActions.updateChat(updatedChat));
        });

        return () => {
            socket.off("chatCreated");
            socket.off("chatDeleted");
            socket.off("chatUpdated");
        };
    }, [dispatch]);

    const handleCreateChat = (newChatData: { firstName: string; lastName: string }) => {
        setLoading(true);
        try {
            socket.emit("chatCreateRequested", newChatData);
        } catch (error) {
            console.error("Error creating chat:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteChat = (chatId: string) => {
        setChatToDelete(chatId);
        setShowConfirmDialog(true);
    };

    const confirmDeleteChat = () => {
        if (chatToDelete) {
            chatService.removeChat(chatToDelete)
                .then(() => {
                    socket.emit("chatDeleteRequested", chatToDelete);
                })
                .catch((error) => {
                    console.error("Error deleting chat:", error);
                })
                .finally(() => {
                    setShowConfirmDialog(false);
                    setChatToDelete(null);
                });
        }
    };

    const cancelDeleteChat = () => {
        setShowConfirmDialog(false);
        setChatToDelete(null);
    };

    const handleUpdateChat = () => {
        if (editingChat && newFirstName && newLastName) {
            const updatedData = { firstName: newFirstName, lastName: newLastName };
            socket.emit("chatUpdateRequested", { chatId: editingChat._id, ...updatedData });
            setEditingChat(null);
            dispatch(editChatActions.setNewFirstName(""));
            dispatch(editChatActions.setNewLastName(""));
        }
    };

    const updateChatState = (chat: IChat) => {
        setEditingChat(chat);
        dispatch(editChatActions.setNewFirstName(chat.firstName));
        dispatch(editChatActions.setNewLastName(chat.lastName));
    };

    const toggleAutoMessage = (toggle: boolean) => {
        socket.emit("toggleAutoResponse", toggle);
    };


    return (
        <div className="page">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ChatsComponent handleDeleteChat={handleDeleteChat} updateChatState={updateChatState} />
            )}

            {editingChat && (
                <div>
                    <h4>Edit Chat</h4>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newFirstName}
                        onChange={(e) => dispatch(editChatActions.setNewFirstName(e.target.value))}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newLastName}
                        onChange={(e) => dispatch(editChatActions.setNewLastName(e.target.value))}
                    />
                    <button onClick={handleUpdateChat}>Update</button>
                    <button onClick={() => setEditingChat(null)}>Cancel</button>
                </div>
            )}

            {showConfirmDialog && (
                <ConfirmDialogComponent
                    message="Are you sure you want to delete this chat?"
                    onConfirm={confirmDeleteChat}
                    onCancel={cancelDeleteChat}
                />
            )}
            <HandleCreateChatComponent handleCreateChat={handleCreateChat} loading={loading} />
            <SendMessageToRandomChatComponent toggleAutoMessage={toggleAutoMessage} />
        </div>
    );
};

export default ChatsPage;
