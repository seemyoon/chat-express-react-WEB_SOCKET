import React from 'react';
import {Link} from "react-router-dom";
import SearchChatComponent from "../SearchChatComponent/SearchChatComponent";
import styles from './MenuComponent.module.css';

const MenuComponent = () => {
    return (
        <div className={styles.menuContainer}>
            <button className={styles.button}><Link className={styles.link} to={"google"}>Login in via google</Link></button>
            <SearchChatComponent/>
        </div>
    );
};

export default MenuComponent;