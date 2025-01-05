import { Sender } from "../enum/sender.enum";

export interface IMessage {
  _id: string;
  chatId: string;
  text: string;
  sender: Sender;
  createdAt: Date;
}
