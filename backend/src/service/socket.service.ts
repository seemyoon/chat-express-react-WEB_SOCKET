import { NextFunction, Request, Response } from "express";
import { Server, Socket } from "socket.io";

import { messageService } from "./message.service";

class SocketService {
  private io: Server;

  initialize(httpServer: any) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: Socket) => {
      console.log("a user connected");

      socket.on("sendMessage", async (data) => {
        const { chatId, text, sender } = data;
        const message = await messageService.createMessage(
          chatId,
          text,
          sender,
        );
        this.io.emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  // Геттер для io
  public getIo() {
    return this.io;
  }

  public async handleAutoSend(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId, message } = req.body;
      this.getIo().emit("receiveMessage", { chatId, message });
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  public sendMessageToRandomChat(message: string) {
    const clients = Array.from(this.getIo().sockets.sockets.values());
    if (clients.length > 0) {
      const randomClient = clients[Math.floor(Math.random() * clients.length)];
      randomClient.emit("receiveMessage", message);
    }
  }
}

export const socketService = new SocketService();
