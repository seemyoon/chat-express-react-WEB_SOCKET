import React, {FC, useState} from "react";

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
        <div>
            <h4>Create a New Chat</h4>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newChatData.firstName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newChatData.lastName}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create Chat"}
            </button>
        </div>
    );
};

export default HandleCreateChatComponent;
