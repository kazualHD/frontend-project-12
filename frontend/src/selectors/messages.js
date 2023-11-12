import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentChannel } from './channels.js';

const selectMessagesForCurrentChannel = createSelector(
  selectCurrentChannel,
  (currentChannel) => (allMessages) => {
    const messages = allMessages.ids.map((id) => allMessages.entities[id]);
    return messages.filter(({ channelId }) => channelId === currentChannel.id);
  },
);

export default selectMessagesForCurrentChannel;
