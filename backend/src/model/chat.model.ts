import { model, Schema } from "mongoose";

import { IChat } from "../interfaces/chat.interface";

const chatSchema = new Schema<IChat>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Chat = model<IChat>("Chat", chatSchema);
