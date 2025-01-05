import { Sender } from "../enum/sender.enum";
import { Chat } from "../model/chat.model";
import { messageRepository } from "../repository/message.repository";
import { axiosService } from "./axios.service";
import { socketService } from "./socket.service";

class MessageService {
  public async sendMessage(chatId: string, text: string, sender: Sender) {
    try {
      const userMessage = await messageRepository.sendMessage(
        chatId,
        text,
        sender,
      );

      if (sender === Sender.USER) {
        setTimeout(async () => {
          try {
            await this.sendAutoResponse(chatId);
          } catch (error) {
            console.error("Failed to send auto-response:", error);
          }
        }, 1000);
      }

      return userMessage;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  }

  private async sendAutoResponse(chatId: string) {
    try {
      const randomQuote = await axiosService.getRandomQuote();

      if (!randomQuote) {
        console.error("Failed to fetch random quote for auto-response");
        return;
      }

      const autoMessage = await messageRepository.sendMessage(
        chatId,
        randomQuote.quote,
        Sender.BOT,
      );

      socketService.emit("receiveMessage", autoMessage);

      return autoMessage;
    } catch (error) {
      console.error("Error while sending auto-response:", error);
      throw error;
    }
  }

  public async getMessages(chatId: string) {
    const chatExists = await Chat.findById(chatId);
    if (!chatExists) {
      throw { status: 404, message: "Chat not found" };
    }

    return await messageRepository.getMessages(chatId); // Используем репозиторий для получения сообщений
  }
}

export const messageService = new MessageService();
