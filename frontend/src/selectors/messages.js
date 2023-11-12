import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentChannel } from './channels.js';

const selectMessages = (state) => state.messages;

const selectMessagesForCurrentChannel = createSelector(
  [selectCurrentChannel, selectMessages],
  (currentChannel, messages) => {
    const allMessages = messages.ids.map((id) => messages.entities[id]);
    return allMessages.filter(({ channelId }) => channelId === currentChannel.id);
  },
);

export default selectMessagesForCurrentChannel;
