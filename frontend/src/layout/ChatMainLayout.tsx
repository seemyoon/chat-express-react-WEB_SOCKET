import { Outlet } from "react-router-dom";

const ChatMainLayout = () => {
    return (
        <div>
            <header>
                <h1>Chat Application</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ChatMainLayout;
