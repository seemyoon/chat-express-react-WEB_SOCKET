import { Server, Socket } from "socket.io";

import { Sender } from "../enum/sender.enum"; // Добавим импорт messageService
import { IChat } from "../interfaces/chat.interface";
import { chatService } from "./chat.service";
import { messageService } from "./message.service";

class SocketService {
  private io: Server;

  public initialize(io: Server) {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

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
            this.io.emit("chatUpdated", updatedChat); // Server sends the "chatUpdated" event to all clients
          } catch (error) {
            console.error("Error updating chat:", error);
          }
        },
      );

      // Handle the "sendMessage" event sent from the client
      socket.on(
        "sendMessage",
        async (data: {
          chatId: string;
          text: string;
          sender: "User" | "Bot";
        }) => {
          try {
            const message = await messageService.sendMessage(
              data.chatId,
              data.text,
              data.sender as Sender,
            );
            this.io.emit("receiveMessage", message); /// Server sends the "receiveMessage" event to all clients with the message data
          } catch (error) {
            console.error("Error sending message:", error);
          }
        },
      );

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
