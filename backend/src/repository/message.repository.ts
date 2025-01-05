import { Sender } from "../enum/sender.enum";
import { Message } from "../model/message.model";

class MessageRepository {
  public async sendMessage(chatId: string, text: string, sender: Sender) {
    return await Message.create({
      chatId,
      text,
      sender,
      createdAt: new Date(),
    });
  }

  public async getMessages(chatId: string) {
    return await Message.find({ chatId }).sort({ createdAt: 1 }); // Сортируем сообщения по дате
  }
}

export const messageRepository = new MessageRepository();
