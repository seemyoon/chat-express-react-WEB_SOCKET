import axios from "axios";
import { setInterval } from "timers";

import { IQuoteResponse } from "../interfaces/quote-response";
import { Chat } from "../model/chat.model";
import { Message } from "../model/message.model";
import { messageRepository } from "../repository/message.repository";
import { socketService } from "./socket.service";

class MessageService {
  private autoSendInterval: NodeJS.Timeout | null = null;

  public async sendMessage(chatId: string, text: string, sender: string) {
    return await messageRepository.sendMessage(chatId, text, sender);
  }

  public async getMessage(chatId: string) {
    return await messageRepository.getMessage(chatId);
  }

  public async startAutoSend() {
    if (this.autoSendInterval) {
      throw new Error("Auto send is already running");
    }

    this.autoSendInterval = setInterval(async () => {
      try {
        const response = await axios.get("https://dummyjson.com/quotes/random");
        const data = response.data;

        if (this.isQuoteResponse(data)) {
          const randomQuote = data.quote;

          const chats = await Chat.find();
          if (chats.length === 0) {
            console.log("No chats available");
            return;
          }

          const randomChat = chats[Math.floor(Math.random() * chats.length)];

          const message = new Message({
            text: randomQuote,
            sender: "AutoResponder",
            chatId: randomChat._id,
          });

          await message.save();
          socketService.emit("receiveMessage", message);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching random quote:", error);
      }
    }, 3000);
  }

  private isQuoteResponse(data: unknown): data is IQuoteResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "quote" in data &&
      "id" in data &&
      "author" in data
    );
  }

  public stopAutoSend() {
    if (this.autoSendInterval) {
      clearInterval(this.autoSendInterval);
      this.autoSendInterval = null;
      console.log("Auto send stopped.");
    } else {
      console.log("No active auto send to stop.");
    }
  }
}

export const messageService = new MessageService();
