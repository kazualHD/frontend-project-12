import {
  useState, useRef, useEffect, useContext,
} from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectChannelsIds } from '../selectors/channels';
import { useSocketApi } from '../contexts/SocketContext';
import { AuthorizationContext } from '../contexts/AuthorizatContext';

const NewMessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const { user: { username } } = useContext(AuthorizationContext);
  const api = useSocketApi();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentChannelId = useSelector(selectChannelsIds);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [message, currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <form
        className="py-1 border rounded-2"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          const newMessage = {
            body: message,
            username,
            channelId,
          };
          try {
            await api.newMessage(newMessage);
            setMessage('');
          } catch (err) {
            toast.error(t('newMessageForm.sendError'));
            console.log(err);
          }
          setIsSubmitting(false);
        }}
      >
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label={t('newMessageForm.ariaLabel')}
            placeholder={t('newMessageForm.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={(event) => setMessage(event.target.value)}
            required
            value={message}
            ref={inputRef}
            disabled={isSubmitting}
          />
          <button type="submit" className="btn btn-group-vertical" disabled={isSubmitting}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('newMessageForm.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMessageForm;
