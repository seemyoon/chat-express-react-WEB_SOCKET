import { model, Schema } from "mongoose";

import { IMessage } from "../interfaces/message.interface";

const messageSchema = new Schema(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      enum: ["Me", "Bot"],
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

messageSchema.index({ chatId: 1, createdAt: 1 });

export const Message = model<IMessage>("Message", messageSchema);
