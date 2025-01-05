import { Server, Socket } from "socket.io";

import { IChat } from "../interfaces/chat.interface";
import { chatService } from "./chat.service";

class SocketService {
  private io: Server;

  public initialize(io: Server) {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      // Handle the "chatCreateRequested" event sent from the client
      socket.on("chatCreateRequested", async (newChatData: IChat) => {
        try {
          const createdChat = await chatService.createChat(
            newChatData.firstName,
            newChatData.lastName,
          );

          this.io.emit("chatCreated", createdChat); // Server sends the "chatCreated" event to all clients with the newly created chat data
        } catch (error) {
          console.error("Error creating chat:", error);
        }

        // try {
        //   const createdChat = await chatService.createChat(
        //     newChatData.firstName,
        //     newChatData.lastName,
        //   );
        //
        //   this.io.emit("chatCreated", createdChat);
        // } catch (error) {
        //   console.error("Error creating chat:", error);
        // }
      });

      // Handle the "chatDeleteRequested" event sent from the client
      socket.on("chatDeleteRequested", async (chatId: string) => {
        try {
          await chatService.removeChat(chatId);
          this.io.emit("chatDeleted", chatId); // Server sends the "chatDeleted" event to all clients with the ID of the deleted chat
        } catch (error) {
          console.error("Error deleting chat:", error);
        }
      });

      // Handle the "sendMessage" event sent from the client
      socket.on("sendMessage", (data) => {
        console.log("Message received:", data);
        this.io.emit("receiveMessage", data); // Server sends the "receiveMessage" event to all clients with the message data
      });

      // Handle client disconnection
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  public emit(event: string, data: any) {
    this.io.emit(event, data); // Send an event to all clients
  }
}

export const socketService = new SocketService();
