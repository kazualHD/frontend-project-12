import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

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
      const newState = { ...state };
      channelsAdapter.removeOne(newState, id);
      if (id === newState.currentChannelId) {
        newState.currentChannelId = null;
      }
      return newState; // Верните новое состояние
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, action) => {
      const newState = { ...state };
      newState.currentChannelId = action.payload;
      return newState;
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
