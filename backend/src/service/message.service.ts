import mongoose from "mongoose";

import { Chat } from "../model/chat.model";
import { Message } from "../model/message.model";
import { messageRepository } from "../repository/message.repository";
import { axiosService } from "./axios.service";
import { socketService } from "./socket.service";

class MessageService {
  public async sendMessage(chatId: string, text: string) {
    try {
      const userMessage = await messageRepository.sendMessage(chatId, text);

      setTimeout(async () => {
        try {
          await this.sendAutoResponse(chatId);
        } catch (error) {
          console.error("Failed to send auto-response:", error);
        }
      }, 1000);

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

      const autoMessage = await Message.create({
        chatId,
        text: randomQuote.quote,
        sender: "Bot",
        createdAt: new Date(),
      });

      socketService.emit("receiveMessage", autoMessage);

      return autoMessage;
    } catch (error) {
      console.error("Error while sending auto-response:", error);
      throw error;
    }
  }

  public async getMessages(chatId: string) {
    if (!this.isValidObjectId(chatId)) {
      throw { status: 400, message: "Invalid chat ID format" };
    }

    const chatExists = await Chat.findById(chatId);
    if (!chatExists) {
      throw { status: 404, message: "Chat not found" };
    }

    return await Message.find({ chatId }).sort({ createdAt: 1 });
  }

  private isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

export const messageService = new MessageService();
