import { createContext } from 'react';
import useAuth from '../hooks/login';
import { useContext } from 'react';

const AuthorizationContext = createContext();
const useAuthorization = () => useContext(AuthorizationContext);

const AuthProvider = ({ children }) => {
    const authorization = useAuth();
    return (
        <AuthorizationContext.Provider value={ authorization }>
            {children}
        </AuthorizationContext.Provider>
    );
}
export  {AuthProvider, useAuthorization};