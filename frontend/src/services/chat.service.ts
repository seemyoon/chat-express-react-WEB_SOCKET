import {IChat} from "../interfaces/chat.interface";
import {urlBuilder} from "../constants/url";
import {axiosInstance} from "../utils/axios";

const chatService = {
    getChats: async (): Promise<IChat[]> => {
        const response = await axiosInstance.get<IChat[]>(urlBuilder.chat.getAllChats())
        return response.data
    },
    getChatById: async (chartId: string): Promise<IChat> => {
        const response = await axiosInstance.get<IChat>(urlBuilder.chat.getChatById(chartId))
        return response.data
    },
    removeChat: async (chatId: string): Promise<void> => {
        const response = await axiosInstance.delete<void>(urlBuilder.chat.removeChat(chatId))
        return response.data
    },
    searchChat: async (query: string) => {
        const url = urlBuilder.chat.searchChats(query);
        const response = await axiosInstance.get<IChat[]>(url);
        return response.data;
    },

}

export {chatService}


