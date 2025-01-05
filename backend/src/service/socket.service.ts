import { Server, Socket } from "socket.io";

import { IChat } from "../interfaces/chat.interface";
import { chatService } from "./chat.service";
import { messageService } from "./message.service"; // Добавим импорт messageService

class SocketService {
  private io: Server;

  public initialize(io: Server) {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      // Обработка события создания чата
      socket.on("chatCreateRequested", async (newChatData: IChat) => {
        try {
          const createdChat = await chatService.createChat(
            newChatData.firstName,
            newChatData.lastName,
          );

          this.io.emit("chatCreated", createdChat);
        } catch (error) {
          console.error("Error creating chat:", error);
        }
      });

      // Обработка события удаления чата
      socket.on("chatDeleteRequested", async (chatId: string) => {
        try {
          await chatService.removeChat(chatId);
          this.io.emit("chatDeleted", chatId);
        } catch (error) {
          console.error("Error deleting chat:", error);
        }
      });

      // Обработка события обновления чата
      socket.on(
        "chatUpdateRequested",
        async (updatedChatData: {
          chatId: string;
          firstName: string;
          lastName: string;
        }) => {
          const { chatId, firstName, lastName } = updatedChatData;
          try {
            const updatedChat = await chatService.updateChat(
              chatId,
              firstName,
              lastName,
            );
            this.io.emit("chatUpdated", updatedChat);
          } catch (error) {
            console.error("Error updating chat:", error);
          }
        },
      );

      // Обработка отправки сообщения
      socket.on(
        "sendMessage",
        async (data: { chatId: string; text: string }) => {
          try {
            const message = await messageService.sendMessage(
              data.chatId,
              data.text,
            );
            this.emit("receiveMessage", message); // Центральный вызов для отправки сообщений через сокет
          } catch (error) {
            console.error("Error sending message:", error);
          }
        },
      );

      // Обработка отключения пользователя
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  // Метод для отправки сообщений через сокет
  public emit(event: string, data: any) {
    this.io.emit(event, data);
  }
}

export const socketService = new SocketService();
