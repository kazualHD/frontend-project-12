import io from 'socket.io-client';
import { toast } from 'react-toastify';
import store from './slices/index';
import { actions as channelsActions } from './slices/channels.js';
import {actions as messageActions} from './slices/messages.js';


const { dispatch } = store;

const onNewMessageEvent = (message) => {
  dispatch(messageActions.addMessage(message));
};

const onNewChannelEvent = (channel) => {
  dispatch(channelsActions.addChannel(channel));
};

const onRemoveChannelEvent = (channel) => {
  const { id } = channel;
  dispatch(channelsActions.removeChannel(id));
};

const onRenameChannelEvent = (channel) => {
  const { id } = channel;
  const changes = channel;
  dispatch(channelsActions.renameChannel({ id, changes }));
};

const initSocket = (i18n) => {
  const { t } = i18n;
  const socket = io();
  socket.on('connect', () => {
    toast.success(t('mainPage.onConnect'));
  });

  socket.on('disconnect', () => {
    toast.error(t('mainPage.onDisconnect'));
  });

  socket.on('error', (err) => {
    console.log('Socket Error:', err.message);
  });

  socket.on('newMessage', onNewMessageEvent);
  socket.on('newChannel', onNewChannelEvent);
  socket.on('removeChannel', onRemoveChannelEvent);
  socket.on('renameChannel', onRenameChannelEvent);

  return socket;
};

export default initSocket;
