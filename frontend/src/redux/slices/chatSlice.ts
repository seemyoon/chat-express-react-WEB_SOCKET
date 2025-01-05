import {createSlice} from "@reduxjs/toolkit";
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
    reducers: {},
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

export const pokemonActions = {
    ...chatSlice.actions,
    loadChats,
    loadChatById,
}