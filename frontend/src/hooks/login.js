
import routes from '../routes';
import axios from 'axios';
import useStorage from './localStorage';

const useAuthorization = () => {
    const [user, setUser] = useStorage('user', null);
    const logIn = async (data) => {
      try {
         const response = await axios.post(routes.apiLogin(), data)
         const userData = response.data;
         setUser(userData)
         return userData;
       
    } catch(e) {
     throw new Error(e)
    }
}
  const logOut = () => {
    setUser(null);
  }
    return  {logIn, user, setUser, logOut};

}

export default useAuthorization