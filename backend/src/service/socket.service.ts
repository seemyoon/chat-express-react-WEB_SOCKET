import { Server, Socket } from "socket.io";

import { IChat } from "../interfaces/chat.interface";

class SocketService {
  private io: Server;

  public initialize(io: Server) {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("A user connected", socket.id);

      socket.on("chatCreated", (newChat: IChat) => {
        console.log("New chat created:", newChat);
        this.io.emit("chatCreated", newChat);
      });

      socket.on("chatDeleted", (chatId: string) => {
        console.log("Chat deleted:", chatId);
        this.io.emit("chatDeleted", chatId);
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
