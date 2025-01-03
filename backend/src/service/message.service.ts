import mongoose from "mongoose";

import { Chat } from "../model/chat.model";
import { Message } from "../model/message.model";
import { axiosService } from "./axios.service";
import { socketService } from "./socket.service";

class MessageService {
  public async sendMessage(chatId: string, text: string) {
    if (!this.isValidObjectId(chatId)) {
      throw { status: 400, message: "Invalid chat ID format" };
    }

    const chatExists = await Chat.findById(chatId);
    if (!chatExists) {
      throw { status: 404, message: "Chat not found" };
    }

    const userMessage = new Message({ chatId, text, sender: "User" });
    await userMessage.save();

    socketService.emit("receiveMessage", userMessage);

    setTimeout(() => this.sendAutoResponse(chatId), 3000);

    return userMessage;
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

  private async sendAutoResponse(chatId: string) {
    try {
      const chatExists = await Chat.findById(chatId);
      if (!chatExists) {
        console.error("Auto response failed: Chat not found");
        return;
      }

      const { quote } = await axiosService.getRandomQuote();

      const autoMessage = new Message({
        chatId,
        text: quote,
        sender: "AutoResponder",
      });

      await autoMessage.save();

      socketService.emit("receiveMessage", autoMessage);
    } catch (error) {
      console.error("Failed to send auto-response:", error);
    }
  }

  private isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
  // public async startAutoSend() {
  //   if (this.autoSendInterval) {
  //     throw new Error("Auto send is already running");
  //   }
  //
  //   this.autoSendInterval = setInterval(async () => {
  //     try {
  //       const data = await axiosService.getRandomQuote();
  //
  //       if (this.isQuoteResponse(data)) {
  //         const randomQuote = data.quote;
  //
  //         const chats = await Chat.find();
  //         if (chats.length === 0) {
  //           console.log("No chats available");
  //           return;
  //         }
  //
  //         const randomChat = chats[Math.floor(Math.random() * chats.length)];
  //
  //         const message = new Message({
  //           text: randomQuote,
  //           sender: "AutoResponder",
  //           chatId: randomChat._id,
  //         });
  //
  //         await message.save();
  //         socketService.emit("receiveMessage", message);
  //       } else {
  //         throw new Error("Invalid data structure");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching random quote:", error);
  //     }
  //   }, 3000);
  // }
  //
  // private isQuoteResponse(data: unknown): data is IQuoteResponse {
  //   return (
  //     typeof data === "object" &&
  //     data !== null &&
  //     "quote" in data &&
  //     "id" in data &&
  //     "author" in data
  //   );
  // }
  //
  // public stopAutoSend() {
  //   if (this.autoSendInterval) {
  //     clearInterval(this.autoSendInterval);
  //     this.autoSendInterval = null;
  //     console.log("Auto send stopped.");
  //   } else {
  //     console.log("No active auto send to stop.");
  //   }
  // }
  // private delay(callback: () => void, ms: number) {
  //   setTimeout(callback, ms);
  // }
  //
  // private async sendAutoResponse(chatId: string) {
  //   try {
  //     const data = await axiosService.getRandomQuote();
  //
  //     if (this.isQuoteResponse(data)) {
  //       const autoResponse = new Message({
  //         text: data.quote,
  //         sender: "AutoResponder",
  //         chatId,
  //       });
  //
  //       await autoResponse.save();
  //       socketService.emit("receiveMessage", autoResponse);
  //     } else {
  //       console.error("Invalid quote data structure received");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching auto-response quote:", error);
  //   }
  // }
}

export const messageService = new MessageService();
