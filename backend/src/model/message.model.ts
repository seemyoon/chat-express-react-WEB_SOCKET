import { model, Schema } from "mongoose";

import { IMessage } from "../interfaces/user.interface";

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

// Создание модели
export const Message = model<IMessage>("Message", messageSchema);
