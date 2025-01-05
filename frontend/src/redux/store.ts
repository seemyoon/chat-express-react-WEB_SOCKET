import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {chatSlice} from "./slices/chatSlice";
import {editChatSlice} from "./slices/editChatSlice";


export const store = configureStore({
    reducer: {
        chatSliceState: chatSlice.reducer,
        editChatSliceState: editChatSlice.reducer,
    }
})
type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

type AppSelector = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<AppSelector>()