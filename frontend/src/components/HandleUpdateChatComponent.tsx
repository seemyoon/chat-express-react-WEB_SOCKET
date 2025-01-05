import React, { FC, useState } from "react";

interface HandleUpdateChatProps {
    handleUpdateChat: (chatId: string, updatedData: { firstName: string; lastName: string }) => void;
    chatId: string;
}

const HandleUpdateChatComponent: FC<HandleUpdateChatProps> = ({ handleUpdateChat, chatId }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = () => {
        const updatedData = { firstName, lastName };
        handleUpdateChat(chatId, updatedData);
        setFirstName("");
        setLastName("");
    };

    return (
        <div>
            <h4>Update Chat</h4>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
            />
            <button onClick={handleSubmit}>Update Chat</button>
        </div>
    );
};

export default HandleUpdateChatComponent;
