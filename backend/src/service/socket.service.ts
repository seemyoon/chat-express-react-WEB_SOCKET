import { Server, Socket } from "socket.io";

import { IChat } from "../interfaces/chat.interface";
import { chatService } from "./chat.service";

class SocketService {
  private io: Server;

  public initialize(io: Server) {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("A user connected", socket.id);

      socket.on("chatCreated", async (newChat: IChat) => {
        console.log("New chat created:", newChat);
        try {
          const createdChat = await chatService.createChat(
            newChat.firstName,
            newChat.lastName,
          );
          this.io.emit("chatCreated", createdChat);
        } catch (error) {
          console.error("Error creating chat:", error);
        }
      });

      socket.on("chatDeleted", async (chatId: string) => {
        console.log("Chat deleted:", chatId);
        try {
          await chatService.removeChat(chatId);
          this.io.emit("chatDeleted", chatId);
        } catch (error) {
          console.error("Error deleting chat:", error);
        }
      });

      socket.on("sendMessage", (data) => {
        console.log("Message received:", data);
        this.io.emit("receiveMessage", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  }

  public emit(event: string, data: any) {
    this.io.emit(event, data);
  }
}

export const socketService = new SocketService();
