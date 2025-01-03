const baseUrl = "http://localhost:5200"
const authUrl = "http://localhost:3200/api/auth"

const urlBuilder = {
    chat: {
        base: "/chat",
        getAllChats: (chatId: string): string => urlBuilder.chat.base + `/getChats/${chatId}`,
        createChat: (): string => urlBuilder.chat.base + "/createChat",
        updateChat: (): string => urlBuilder.chat.base + "/updateChat",
        removeChat: (chatId: string): string => urlBuilder.chat.base + `/removeChat/${chatId}`
    },
    message: {
        base: "/message",
        getMessages: (chatId: string): string => urlBuilder.message.base + `/getMessages/${chatId}`,
        sendMessage: (): string => urlBuilder.message.base + "/sendMessage",
        // +`/getMessages/${chatId}
        startAutoSend: (): string => urlBuilder.message.base + "/startAutoSend",
        stopAutoSend: (): string => urlBuilder.message.base + `/stopAutoSend`
    },
    auth: {
        loginWithGoogle: (): string => authUrl + "/googleLogin",
        logout: (): string => authUrl + "/logout"
    }
}

export {baseUrl, urlBuilder, authUrl}

