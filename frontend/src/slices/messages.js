import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {actions as channelActions} from './channels.js'

const messagesAdapter = createEntityAdapter();

const messagesState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesState,
    reducers: {
        addMessage: messagesAdapter.addOne,
        updateMessages: messagesAdapter.setAll
    },
    extraReducers: (builder) => {
        builder.addCase(channelActions.removeChannel, (state, action) => {
            const channelId = action.payload;
            const allEntities = Object.values(state.entities);
            const restMessages = allEntities.filter((e)=> e.channelId !== channelId);
            messagesAdapter.setAll(state, restMessages);
        })
    }
   
})

export const selector = messagesAdapter.getSelectors((state) => state.messages
)
export default messagesSlice.reducer;
export const {actions} = messagesSlice;
