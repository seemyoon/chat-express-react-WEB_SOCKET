import { Message } from "../model/message.model";

class MessageService {
  public async sendMessage(chatId: string, text: string, sender: string) {
    await Message.create({ chatId, text, sender });
  }

  public async getMessages(chatId: string) {
    await Message.find({ chatId });
  }

  public async createMessage(chatId: string, text: string, sender: string) {
    return await Message.create({ chatId, text, sender });
  }
}

export const messageService = new MessageService();
