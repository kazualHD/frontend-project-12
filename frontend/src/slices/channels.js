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
    addChannel: channelsAdapter.addOne, 
    removeChannel: (state, action) => {
        const id = action.payload;
        channelsAdapter.removeOne(state, id);
        if (id === state.currentChannelId) {
            state.currentChannelId = null;
        };
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, action) => {
        state.currentChannelId = action.payload;
    },
    setMyChannel: (state, action) => {
        state.myChannel = action.payload;
      },
    },
});
export const selectors = channelsAdapter.getSelectors(state => state.channels);
export default channelsSlice.reducer;
export const { actions } = channelsSlice;
