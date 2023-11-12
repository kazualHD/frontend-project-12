// selectors/channels.js
import { createSelector } from '@reduxjs/toolkit';

export const selectChannels = (state) => state.channels.currentChannelId ?? 0;

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
