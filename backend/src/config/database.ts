import mongoose from "mongoose";

import { Chat } from "../model/chat.model";
import { configs } from "./config";

const predefinedChats = [
  {
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: "Alex",
    lastName: "Johnson",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function initializeChats() {
  const existingChats = await Chat.countDocuments();
  if (existingChats === 0) {
    await Chat.insertMany(predefinedChats);
    console.log("Predefined chats have been added.");
  }
}

async function connectToDatabase() {
  try {
    await mongoose.connect(configs.APP_MONGO_URL);
    console.log("Connected to the database");
    await initializeChats();
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

export default connectToDatabase;
