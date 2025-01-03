const baseUrl = "http://localhost:5200"
const authUrl = "http://localhost:3200/api/auth"

const urlBuilder = {
    chat: {
        base: baseUrl + "/chat",
        getAllChats: (): string => urlBuilder.chat.base + '/getChats',
        getChatById: (chatId: string): string => urlBuilder.chat.base + `/getChat/${chatId}`,
        createChat: (): string => urlBuilder.chat.base + "/createChat",
        updateChat: (): string => urlBuilder.chat.base + "/updateChat",
        removeChat: (chatId: string): string => urlBuilder.chat.base + `/removeChat/${chatId}`,
        searchChats: (query: string): string => urlBuilder.chat.base + `/searchChats?query=${query}`,
    },
    message: {
        base: baseUrl + "/message",
        getMessages: (chatId: string): string => urlBuilder.message.base + `/getMessages/${chatId}`,
        sendMessage: (): string => urlBuilder.message.base + "/sendMessage",
        startAutoSend: (): string => urlBuilder.message.base + "/startAutoSend",
        stopAutoSend: (): string => urlBuilder.message.base + `/stopAutoSend`
    },
    auth: {
        loginWithGoogle: (): string => authUrl + "/googleLogin",
        logout: (): string => authUrl + "/logout"
    }
}

export {baseUrl, urlBuilder, authUrl}

