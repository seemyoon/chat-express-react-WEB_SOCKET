import { model, Schema } from "mongoose";

import { IMessage } from "../interfaces/message.interface";

const messageSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Message = model<IMessage>("Message", messageSchema);
