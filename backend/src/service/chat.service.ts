import { chatRepository } from "../repository/chat.repository";
import { socketService } from "./socket.service";

class ChatService {
  public async createChat(firstName: string, lastName: string) {
    const chat = await chatRepository.createChat({ firstName, lastName });
    console.log("asdas");
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

  public async sendAutoResponse(chatId: string, message: string) {
    setTimeout(async () => {
      const autoResponseMessage = {
        text: `Auto Response: ${message}`,
        sender: "AutoResponder",
        chatId,
      };
      socketService.emit("receiveMessage", autoResponseMessage);
    }, 3000);
  }
}

export const chatService = new ChatService();
