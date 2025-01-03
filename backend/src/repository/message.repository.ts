import { Message } from "../model/message.model";

class MessageRepository {
  public async sendMessage(chatId: string, text: string) {
    await Message.create({ chatId, text});
  }

  public async getMessage(chatId: string) {
    await Message.find({ chatId });
  }
}

export const messageRepository = new MessageRepository();
