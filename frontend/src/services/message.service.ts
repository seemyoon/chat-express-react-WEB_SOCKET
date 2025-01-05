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
    async sendMessage(chatId: string, text: string) {
        const response = await axios.post(urlBuilder.message.sendMessage(chatId), {
            chatId,
            text,
            sender: "User"
        });
        return response.data;
    }
}

export {messageService}