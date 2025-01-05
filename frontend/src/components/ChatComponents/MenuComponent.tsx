import React from 'react';
import {Link} from "react-router-dom";
import SearchChatComponent from "./SearchChatComponent";

const MenuComponent = () => {
    return (
        <div>
            <button><Link to={"google"}>Login in via google</Link></button>
            <SearchChatComponent/>
        </div>
    );
};

export default MenuComponent;