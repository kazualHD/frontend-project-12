import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const channelsAdapter = createEntityAdapter();

const channelsState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        ...channelsState,
        currentChannelId: null,
        myChannel: null,
    },
    reducers: {
        updateChannels: channelsAdapter.setAll,
        addChannel: (state, action) => {
           channelsAdapter.addOne(state, action);
        },
        removeChannel: (state, action) => {
            channelsAdapter.removeOne(state, action);
            const id = action.payload;
           if (id === state.currentChannelId) {
               state.currentChannelId = null;
           }
        },
        renameChannel: channelsAdapter.updateOne,
        setCurrentChannelId: (state, action) => {
            const id  = action.payload;
            state.currentChannelId = id;
        },
        setMyChannel: (state, action) => {
            const myChannel = action.payload;
            state.myChannel = myChannel;
        }
    
    }
});

export const selectors = channelsAdapter.getSelectors(state => state.channels);
export default channelsSlice.reducer;
export const { actions } = channelsSlice;
