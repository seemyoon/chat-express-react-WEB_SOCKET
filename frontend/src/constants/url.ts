const baseUrl = "http://localhost:5200"
const authUrl = "http://localhost:5200/auth/"

const urlBuilder = {
    chat: {
        base: baseUrl + "/chat",
        getAllChats: (): string => urlBuilder.chat.base + '/getChats',
        getChatById: (chatId: string): string => urlBuilder.chat.base + `/getChat/${chatId}`,
        removeChat: (chatId: string): string => urlBuilder.chat.base + `/removeChat/${chatId}`,
        searchChats: (query: string): string => urlBuilder.chat.base + `/searchChats?query=${query}`,
    },
    message: {
        base: baseUrl + "/message",
        getMessage: (messageId: string): string => urlBuilder.message.base + `/${messageId}`,
        getMessages: (chatId: string): string => urlBuilder.message.base + `/getMessages/${chatId}`,
    },
    auth: {
        loginWithGoogle: (): string => authUrl + "/googleLogin",
        logout: (): string => authUrl + "/logout"
    }
}

export {baseUrl, urlBuilder, authUrl}

