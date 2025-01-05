import { IChat } from "../interfaces/chat.interface";
import { chatRepository } from "../repository/chat.repository";

class ChatService {
  public async createChat(firstName: string, lastName: string): Promise<IChat> {
    return await chatRepository.createChat({ firstName, lastName });
  }

  public async updateChat(
    chatId: string,
    firstName: string,
    lastName: string,
  ): Promise<IChat> {
    return await chatRepository.updateChat(chatId, {
      firstName,
      lastName,
    });
  }

  public async removeChat(chatId: string): Promise<void> {
    await chatRepository.removeChat(chatId);
  }

  public async getChats(): Promise<IChat[]> {
    return await chatRepository.getChats();
  }

  public async getChatById(chatId: string): Promise<IChat> {
    return await chatRepository.getChatById(chatId);
  }

  public async searchChats(query: string): Promise<IChat[]> {
    return await chatRepository.searchChats(query);
  }
}

export const chatService = new ChatService();
