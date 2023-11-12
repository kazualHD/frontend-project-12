import { selectCurrentChannel } from './channels.js';

const selectMessagesForCurrentChannel = (state) => {
  const currentChannel = selectCurrentChannel(state);
  const allMessages = state.messages.ids.map((id) => state.messages.entities[id]);

  return allMessages.filter(({ channelId }) => channelId === currentChannel.id);
};

export default selectMessagesForCurrentChannel;
