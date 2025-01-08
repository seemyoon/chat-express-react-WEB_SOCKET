import {createSlice} from "@reduxjs/toolkit";
import {IMessage} from "../../interfaces/message.interface";
import {loadMessages} from "../../reducers/messageSlice.extra.reducers";

interface MessageState {
    messages: IMessage[];
    loading: boolean;
    autoMessages: boolean;
}

const initialState: MessageState = {
    messages: [],
    loading: false,
    autoMessages: false,
};

export const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {
        addMessage(state, action) {
            state.messages.push(action.payload);
            console.log(action.payload)
        },
        updateMessage: (state, action) => {
            const index = state.messages.findIndex((msg) => msg._id === action.payload._id);
            if (index !== -1) {
                state.messages[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.loading = false;
        });
    },
});

export const messageActions = {
    ...messageSlice.actions,
    loadMessages,
};

