import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {chatService} from "../services/chat.service";

export const loadChats = createAsyncThunk(
    "chatSlice/loadChats",
    async (_, thunkAPI) => {
        try {
            const resp = await chatService.getChats()
            return thunkAPI.fulfillWithValue(resp)
        } catch (error) {
            const axiosError = error as AxiosError
            return thunkAPI.rejectWithValue(axiosError?.response?.data)
        }
    }
)

export const loadChatById = createAsyncThunk(
    "chatSlice/loadChatById",
    async (id: string, thunkAPI) => {
        try {
            const resp = await chatService.getChatById(id)
            return thunkAPI.fulfillWithValue(resp)
        } catch (error) {
            const axiosError = error as AxiosError
            return thunkAPI.rejectWithValue(axiosError?.response?.data)
        }

    }
)
