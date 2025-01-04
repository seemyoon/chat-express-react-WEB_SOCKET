import { Chat } from "../model/chat.model";

class ChatRepository {
  public async createChat(chatData: { firstName: string; lastName: string }) {
    return await Chat.create(chatData);
  }

  public async updateChat(
    chatId: string,
    chatData: { firstName: string; lastName: string },
  ) {
    return await Chat.findByIdAndUpdate(chatId, chatData, { new: true });
  }

  public async removeChat(chatId: string) {
    return await Chat.findByIdAndDelete(chatId);
  }

  public async getChatById(chatId: string) {
    return await Chat.findById(chatId);
  }

  public async getChats() {
    return await Chat.find();
  }

  public async searchChats(query: string) {
    return await Chat.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    });
  }
}

export const chatRepository = new ChatRepository();
