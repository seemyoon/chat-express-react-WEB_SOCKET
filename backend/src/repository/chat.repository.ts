import { Chat } from "../model/chat.model";

class ChatRepository {
  public async createChat(chatData: { firstName: string; lastName: string }) {
    const chat = new Chat(chatData);
    return await chat.save();
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

  public async getChats() {
    return await Chat.find();
  }

  public async searchChats(query: string) {
    return await Chat.find({ firstName: { $regex: query, $options: "i" } });
  }
}

export const chatRepository = new ChatRepository();
