// selectors/channels.js
import { createSelector } from '@reduxjs/toolkit';

const selectChannels = (state) => state.channels;

export const selectChannelsIds = (state) => state.channels.currentChannelId ?? 0;

export const selectAllChannels = createSelector(
  [selectChannels],
  (channels) => {
    const allChannels = channels.ids ? channels.ids.map((id) => channels.entities[id]) : [];
    return allChannels;
  },
);

export const selectCurrentChannel = createSelector(
  selectChannels,
  (channels) => {
    if (!channels.entities) {
      return null;
    }

    const defaultId = channels.ids && channels.ids.length > 0 ? channels.ids[0] : null;
    const id = channels.currentChannelId ?? defaultId;
    return channels.entities[id];
  },
);
