import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat} from "../../interfaces/chat.interface";
import {loadChatById, loadChats} from "../../reducers/chatSlice.extra.reducers";

type ChatType = {
    chats: IChat[]
    chat: IChat | null
}

const initialChatSliceState: ChatType = {
    chats: [],
    chat: null
}

export const chatSlice = createSlice({
    name: "chatSlice",
    initialState: initialChatSliceState,
    reducers: {
        addChat: (state, action: PayloadAction<IChat>) => {
            state.chats.push(action.payload);  // adds the new chat to the list of chats
        },
        deleteChat: (state, action: PayloadAction<string>) => {
            state.chats = state.chats.filter(chat => chat._id !== action.payload);  // Removes the chat with the matching ID from the list
        },
        updateChat: (state, action: PayloadAction<IChat>) => {
            const index = state.chats.findIndex(chat => chat._id === action.payload._id);  // Finds the index of the chat that needs to be updated
            if (index !== -1) {
                state.chats[index] = action.payload;  // updates the chat with new data
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChats.fulfilled, (state, action) => {
                state.chats = action.payload
            })
            .addCase(loadChatById.fulfilled, (state, action) => {
                state.chat = action.payload
            })
    }
})

export const chatActions = {
    ...chatSlice.actions,
    loadChats,
    loadChatById,
}