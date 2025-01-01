import { Server, Socket } from "socket.io";

import { messageService } from "./message.service";

class SocketService {
  private io: Server;

  public initialize(io: Server) {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("a user connected");

      socket.on("sendMessage", async (data) => {
        const { chatId, text, sender } = data;
        const message = await messageService.sendMessage(chatId, text, sender);
        this.io.emit("receiveMessage", message);
      });

      socket.on("startAutoSend", (data) => {
        const { randomMessage, chatId, interval } = data;
        messageService.startAutoSend(randomMessage, chatId, interval);
        socket.emit("autoSendStarted", "auto send is turn on");
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  public emit(event: string, data: any) {
    this.io.emit(event, data);
  }
}

export const socketService = new SocketService();
