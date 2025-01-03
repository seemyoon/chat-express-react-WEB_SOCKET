import axios from "axios";
import {baseUrl, urlBuilder} from "../constants/url";
import {IMessage} from "../interfaces/message.interface";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {}
});

const messageService = {
    getMessages: async (chatId: string) => {
        const response = await axiosInstance.get<IMessage[]>(urlBuilder.message.getMessages(chatId))
        return response.data
    },
    sendMessage: async (data: any) => {
        const response = await axiosInstance.post<IMessage>(urlBuilder.message.sendMessage(), data)
        return response.data
    },
    startAutoSend: async () => {
        const response = await axiosInstance.post<void>(urlBuilder.message.startAutoSend())
        return response.data
    },
    stopAutoSend: async () => {
        const response = await axiosInstance.post<void>(urlBuilder.message.stopAutoSend())
        return response.data
    }
}

export {messageService}