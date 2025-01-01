import { Message } from "../model/message.model";

class MessageRepository {
  public async sendMessage(chatId: string, text: string, sender: string) {
    await Message.create({ chatId, text, sender });
  }

  public async getMessage(chatId: string) {
    await Message.find({ chatId });
  }
}

export const messageRepository = new MessageRepository();
