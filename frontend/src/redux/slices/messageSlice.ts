import {createSlice} from "@reduxjs/toolkit";
import {IMessage} from "../../interfaces/message.interface";
import {loadMessages} from "../../reducers/messageSlice.extra.reducers";

interface MessageState {
    messages: IMessage[];
    loading: boolean;
}

const initialState: MessageState = {
    messages: [],
    loading: false,
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.loading = false;
            })
    },
});

export const messageActions = {
    ...messageSlice.actions,
};