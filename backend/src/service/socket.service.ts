import { Server, Socket } from "socket.io";

class SocketService {
  private io: Server;

  public initialize(io: Server) {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("A user connected");

      socket.on("sendMessage", (data) => {
        console.log("Message received:", data);
        this.io.emit("receiveMessage", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  public emit(event: string, data: any) {
    this.io.emit(event, data);
  }
}

export const socketService = new SocketService();
