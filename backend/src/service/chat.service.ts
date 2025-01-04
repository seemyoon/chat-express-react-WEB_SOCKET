import { chatRepository } from "../repository/chat.repository";

class ChatService {
  public async createChat(firstName: string, lastName: string) {
    return await chatRepository.createChat({ firstName, lastName });
  }

  public async updateChat(chatId: string, firstName: string, lastName: string) {
    return await chatRepository.updateChat(chatId, {
      firstName,
      lastName,
    });
  }

  public async removeChat(chatId: string) {
    await chatRepository.removeChat(chatId);
  }

  public async getChats() {
    return await chatRepository.getChats();
  }

  public async getChatById(chatId: string) {
    return await chatRepository.getChatById(chatId);
  }

  public async searchChats(query: string) {
    return await chatRepository.searchChats(query);
  }
}

export const chatService = new ChatService();
