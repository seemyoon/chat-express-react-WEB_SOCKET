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
    createChat: async (data: any): Promise<IChat> => {
        const response = await axiosInstance.post<IChat>(urlBuilder.chat.createChat(), data)
        return response.data
    },
    updateChat: async (data: any): Promise<IChat> => {
        const response = await axiosInstance.put<IChat>(urlBuilder.chat.updateChat(), data)
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


