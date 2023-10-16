import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthorization } from '../contexts/authorizationContext';
import routes from '../routes.js';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../components/Navbar';
import {actions as channelsActions} from '../slices/channels.js';
import {actions as messagesActions} from '../slices/messages.js';



const getHeader = (user) => {
    if (user && user.token) {
        return {
            Authorization: `Bearer ${user.token} `
        }
    }
    return {};
     
}
const MainPage = () => {
  const {user,  logOut} = useAuthorization();
  const dispatch = useDispatch();


    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const config = {
                    headers: getHeader(user)
                }
                const response = await axios.get(routes.apiData(), config)
                const {data} = response;
                const {channels, messages, currntChannelId } = data;
                dispatch(channelsActions.setChannels(channels));
                dispatch(messagesActions.setMessages(messages));
                dispatch(channelsActions.setCurrentChanelId(currntChannelId));
                console.log(data)
    
            }catch(e) {
                if (e.name === 'AxiosError' && e.response.status === 401) {
                    logOut();
                  }
                  console.log(e);
            }
        }

        getUserInfo();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
     <Container>
       <NavBar/>
       
     </Container>
 )
}

export default MainPage;