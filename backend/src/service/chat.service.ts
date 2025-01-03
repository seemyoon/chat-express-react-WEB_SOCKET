import { chatRepository } from "../repository/chat.repository";
import { socketService } from "./socket.service";

class ChatService {
  public async createChat(firstName: string, lastName: string) {
    const chat = await chatRepository.createChat({ firstName, lastName });
    socketService.emit("newChat", chat); // Emit to clients
    return chat;
  }

  public async updateChat(chatId: string, firstName: string, lastName: string) {
    const updatedChat = await chatRepository.updateChat(chatId, {
      firstName,
      lastName,
    });
    socketService.emit("chatUpdated", updatedChat); // Emit to clients
    return updatedChat;
  }

  public async removeChat(chatId: string) {
    const deletedChat = await chatRepository.removeChat(chatId);
    socketService.emit("chatRemoved", deletedChat); // Emit to clients
    return deletedChat;
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
