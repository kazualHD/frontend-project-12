// selectors/channels.js
import { createSelector } from '@reduxjs/toolkit';

const selectChannels = (state) => state.channels;

export const selectAllChannels = createSelector(
  [selectChannels],
  (channels) => {
    const allChannels = channels.ids.map((id) => channels.entities[id]);
    return allChannels;
  },
);

export const selectCurrentChannel = createSelector(
  selectChannels,
  (channels) => {
    const [defaultId] = channels.ids;
    const id = channels.currentChannelId ?? defaultId;
    return channels.entities[id];
  },
);
