import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {messageService} from "../services/message.service";

export const loadMessages = createAsyncThunk(
    "messageSlice/loadMessages",
    async (chatId: string, thunkAPI) => {
        try {
            const resp = await messageService.getMessages(chatId);
            return thunkAPI.fulfillWithValue(resp)
        } catch (error) {
            const axiosError = error as AxiosError
            return thunkAPI.rejectWithValue(axiosError?.response?.data)
        }
    }
)
