import { chatRepository } from "../repository/chat.repository";
import { socketService } from "./socket.service";

class ChatService {
  public async createChat(firstName: string, lastName: string) {
    const chat = await chatRepository.createChat({ firstName, lastName });
    socketService.emit("newChat", chat);
    return chat;
  }

  public async updateChat(chatId: string, firstName: string, lastName: string) {
    const updatedChat = await chatRepository.updateChat(chatId, {
      firstName,
      lastName,
    });
    socketService.emit("chatUpdated", updatedChat);
    return updatedChat;
  }

  public async removeChat(chatId: string) {
    const deletedChat = await chatRepository.removeChat(chatId);
    socketService.emit("chatRemoved", deletedChat);
    return deletedChat;
  }

  public async getChats() {
    return await chatRepository.getChats();
  }

  public async searchChats(query: string) {
    return await chatRepository.searchChats(query);
  }
}

export const chatService = new ChatService();
