import {Outlet} from "react-router-dom";
import MenuComponent from "../components/MenuComponent";

const ChatMainLayout = () => {
    return (
        <div>
            <MenuComponent/>
            <Outlet/>
        </div>
    );
};

export default ChatMainLayout;
