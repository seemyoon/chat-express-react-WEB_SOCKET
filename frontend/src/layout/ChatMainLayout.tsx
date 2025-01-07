import React from "react";
import MenuComponent from "../components/MenuComponent/MenuComponent";
import ChatsPage from "../page/ChatsPage";
import ChatPage from "../page/ChatPage/ChatPage";
import '../index.css';

const ChatMainLayout = () => {
    return (
        <div className="layout">
            <div className="menu">
                <MenuComponent />
                <ChatsPage />
            </div>
            <div className="chatContainer">
                <ChatPage />
            </div>
        </div>
    );
};

export default ChatMainLayout;
