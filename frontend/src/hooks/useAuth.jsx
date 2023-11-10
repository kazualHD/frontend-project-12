import { useContext } from 'react';
import { AuthorizationContext } from '../contexts/AuthorizatContext';

const useAuth = () => useContext(AuthorizationContext);

export default useAuth;
