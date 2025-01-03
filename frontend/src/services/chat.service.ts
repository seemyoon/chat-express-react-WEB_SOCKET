import {IChat} from "../interfaces/chat.interface";
import {urlBuilder} from "../constants/url";
import {axiosInstance} from "../utils/axios";

const chatService = {
    getChats: async (chartId: string) => {
        const response = await axiosInstance.get<IChat[]>(urlBuilder.chat.getAllChats(chartId))
        return response.data
    },
    createChat: async (data: any) => {
        const response = await axiosInstance.post<IChat>(urlBuilder.chat.createChat(), data)
        return response.data
    },
    updateChat: async (data: any) => {
        const response = await axiosInstance.put<IChat>(urlBuilder.chat.updateChat(), data)
        return response.data
    },
    removeChat: async (chatId: string) => {
        const response = await axiosInstance.delete<void>(urlBuilder.chat.removeChat(chatId))
        return response.data
    }
}

export {chatService}


