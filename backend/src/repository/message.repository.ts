import { Sender } from "../enum/sender.enum";
import { Message } from "../model/message.model";

class MessageRepository {
  public async saveMessage(chatId: string, text: string, sender: Sender) {
    return await Message.create({
      chatId,
      text,
      sender,
      createdAt: new Date(),
    });
  }
  public async updateMessage(messageId: string, text: string) {
    return await Message.findByIdAndUpdate(messageId, { text }, { new: true });
  }

  public async getMessages(chatId: string) {
    return await Message.find({ chatId }).sort({ createdAt: 1 });
  }
}

export const messageRepository = new MessageRepository();
