import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import Channels from '../components/Channels';
import Messages from '../components/Messages';
import routes from '../routes';
import { useAuthorization } from '../contexts/AuthorizatContext';
import { actions as channelActions } from '../slices/channels';
import { actions as messagesActions } from '../slices/messages';

const getAuthHeader = (user) => {
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const MainPage = () => {
  const { user, logOut } = useAuthorization();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: getAuthHeader(user),
        };
        const { data } = await axios.get(routes.getData(), config);
        const { channels, messages, currentChannelId } = data;
        dispatch(channelActions.updateChannels(channels));
        dispatch(channelActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.updateMessages(messages));
      } catch (error) {
        const unauthorized = 401;
        if (error.name === 'AxiosError' && error.response.status === unauthorized) {
          logOut();
        }
        console.log(error);
        toast.error(t('mainPage.fetchDataError'));
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;