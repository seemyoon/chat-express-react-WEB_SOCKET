import React, {FC, useState} from "react";
import styles from './HandleCreateChatComponent.module.css';

interface HandleCreateChatProps {
    handleCreateChat: (newChatData: { firstName: string; lastName: string }) => void;
    loading: boolean;
}

const HandleCreateChatComponent: FC<HandleCreateChatProps> = ({handleCreateChat, loading}) => {
    const [newChatData, setNewChatData] = useState({firstName: "", lastName: ""});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewChatData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = () => {
        handleCreateChat(newChatData);
        setNewChatData({firstName: "", lastName: ""});
    };

    return (
        <div className={styles.createChatContainer}>
            <h4 className={styles.header}>Create a New Chat</h4>
            <div className={styles.inputContainer}>
            <input
                className={styles.input}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newChatData.firstName}
                onChange={handleInputChange}
            />
            <input
                className={styles.input}
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newChatData.lastName}
                onChange={handleInputChange}
            />
            </div>
            <button className={styles.button} onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create Chat"}
            </button>
        </div>
    );
};

export default HandleCreateChatComponent;
