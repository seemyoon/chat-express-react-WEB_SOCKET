import { setInterval } from "timers";

import { messageRepository } from "../repository/message.repository";
import { socketService } from "./socket.service";

class MessageService {
  public async sendMessage(chatId: string, text: string, sender: string) {
    return await messageRepository.sendMessage(chatId, text, sender);
  }

  public async getMessage(chatId: string) {
    return await messageRepository.getMessage(chatId);
  }

  public async handleAutoSend(randomMessage: string, chatId: string) {
    const message = await this.sendMessage(
      chatId,
      randomMessage,
      "AutoResponder",
    );
    socketService.emit("receiveMessage", message);
  }
  public startAutoSend(
    randomMessage: string,
    chatId: string,
    interval: number,
  ) {
    setInterval(() => {
      this.handleAutoSend(randomMessage, chatId);
    }, interval);
  }
}

export const messageService = new MessageService();
