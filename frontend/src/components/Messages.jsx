import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from './Message';
import NewMessageForm from './NewMessage';
import { selectCurrentChannel } from '../selectors/channels';
import selectMessagesForCurrentChannel from '../selectors/messages.js';

const Messages = () => {
  const { t } = useTranslation();

  const currentChannel = useSelector(selectCurrentChannel);

  const messages = useSelector(selectMessagesForCurrentChannel);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (currentChannel)
    ? (
      <Col className="p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b>{`# ${currentChannel.name}`}</b></p>
            <span className="text-muted">{t('messages.messages', { count: messages.length })}</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <NewMessageForm channelId={currentChannel.id} />
        </div>
      </Col>
    )
    : null;
};

export default Messages;
