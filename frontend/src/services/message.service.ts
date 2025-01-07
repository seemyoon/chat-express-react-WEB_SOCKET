import {urlBuilder} from "../constants/url";
import {IMessage} from "../interfaces/message.interface";
import {axiosInstance} from "../utils/axios";

const messageService = {
    getMessages: async (chatId: string) => {
        const response = await axiosInstance.get<IMessage[]>(urlBuilder.message.getMessages(chatId))
        return response.data
    },
}

export {messageService}