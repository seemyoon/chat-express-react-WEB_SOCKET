import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {chatActions} from "../redux/slices/chatSlice";

const ChatPage = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const {chat} = useAppSelector(state => state.chatSliceState);

    useEffect(() => {
        setLoading(true);
        if (params.id) {
            dispatch(chatActions.loadChatById(params.id))
                .catch((error) => {
                    console.error("Error fetching chats:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    }, [dispatch, params.id]);
    return (
        <div>
            <h3>Chat with {chat?.firstName} {chat?.lastName}</h3>
            {loading ? (
                <p>Loading chat...</p>
            ) : (
                <div>
                    <p>Messages go here...</p>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
