import { Sender } from "../enum/sender.enum";
import { Chat } from "../model/chat.model";
import { messageRepository } from "../repository/message.repository";
import { axiosService } from "./axios.service";
import { socketService } from "./socket.service";

class MessageService {
  private messageQueue: Promise<void> = Promise.resolve(); // this is a kind of "empty" Promise that starts the task
  // queue

  public async sendMessage(chatId: string, text: string, sender: Sender) {
    try {
      const userMessage = await messageRepository.saveMessage(
        chatId,
        text,
        sender,
      );

      if (sender === Sender.Me) {
        this.addToQueue(() => this.sendAutoResponse(chatId));
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

      const autoResponseMessage = await messageRepository.saveMessage(
        chatId,
        `Bot: ${randomQuote.quote}`,
        Sender.BOT,
      );

      socketService.emit("receiveMessage", autoResponseMessage);
    } catch (error) {
      console.error("Error while sending auto-response:", error);
      throw error;
    }
  }

  private addToQueue(task: () => Promise<void>) {
    this.messageQueue = this.messageQueue // is updated, which ensures that a new task will be executed only after the previous one has been completed.
      .then(() => task())
      .catch((error) => {
        console.error("Error in message queue:", error);
      });
  }

  public async updateMessage(messageId: string, text: string) {
    try {
      return await messageRepository.updateMessage(messageId, text);
    } catch (error) {
      console.error("Error in updateMessage:", error);
      throw error;
    }
  }

  public async getMessages(chatId: string) {
    const chatExists = await Chat.findById(chatId);
    if (!chatExists) {
      throw { status: 404, message: "Chat not found" };
    }
    return await messageRepository.getMessages(chatId);
  }

  public async toggleAutoResponse(toggle: boolean): Promise<void> {
    if (toggle) {
      if (this.autoResponseInterval === null) {
        this.autoResponseInterval = setInterval(async () => {
          try {
            const randomChat = await this.randomChat();
            const randomQuote = await axiosService.getRandomQuote();
            if (randomQuote && randomChat) {
              const userMessage = await this.sendMessage(
                randomChat,
                `Me: ${randomQuote.quote}`,
                Sender.Me,
              );
              socketService.emit("receiveMessage", userMessage);
            }
          } catch (error) {
            console.error("Error during auto-response toggle:", error);
          }
        }, 2000);
      }
    } else {
      if (this.autoResponseInterval !== null) {
        clearInterval(this.autoResponseInterval as any);
        this.autoResponseInterval = null;
      }
    }
  }

  private async randomChat() {
    try {
      const randomChat = await Chat.aggregate([{ $sample: { size: 1 } }]);
      return randomChat[0]._id;
    } catch (error) {
      console.error("Error fetching random chat:", error);
    }
  }

  private autoResponseInterval: NodeJS.Timer | null = null; //by storing the interval ID in a variable, you can
  // easily: - stop it when needed (clearInterval).// check if the interval is running (if the variable is null,
  // then the interval is not running).
}

export const messageService = new MessageService();
