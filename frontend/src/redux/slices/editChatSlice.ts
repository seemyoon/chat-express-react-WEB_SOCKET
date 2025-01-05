import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EditChatType = {
    newFirstName: string;
    newLastName: string;
};

const initialEditChatSliceState: EditChatType = {
    newFirstName: "",
    newLastName: "",
};

export const editChatSlice = createSlice({
    name: "editChatSlice",
    initialState: initialEditChatSliceState,
    reducers: {
        setNewFirstName: (state, action: PayloadAction<string>) => {
            state.newFirstName = action.payload;
        },
        setNewLastName: (state, action: PayloadAction<string>) => {
            state.newLastName = action.payload;
        },
    },
});

export const editChatActions = {
    ...editChatSlice.actions,
};
