import { Message } from "../model/message.model";

class MessageRepository {
  public async sendMessage(chatId: string, text: string) {
    return await Message.create({
      chatId,
      text,
      sender: "User",
      createdAt: new Date(),
    });
  }

  public async getMessages(chatId: string) {
    return await Message.find({ chatId }).sort({ createdAt: 1 });
  }
}

export const messageRepository = new MessageRepository();
