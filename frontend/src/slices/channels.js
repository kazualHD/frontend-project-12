import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

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
    removeChannel(state, action) {
      channelsAdapter.removeOne(state, action);
      const id = action.payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = null;
      }
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId(state, action) {
      const currentChannelId = action.payload;
      state.currentChannelId = currentChannelId;
    },
    setMyChannel: (state, action) => {
      const newState = { ...state };
      newState.myChannel = action.payload;
      return newState;
    },
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
export const { actions } = channelsSlice;
