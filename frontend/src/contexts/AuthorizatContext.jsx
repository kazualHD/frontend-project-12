/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext, useState, useMemo,
} from 'react';

const AuthorizationContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const initialUser = (() => {
      try {
        return JSON.parse(localStorage.getItem('user'));
      } catch (error) {
        return null;
      }
    })();
    return initialUser;
  });

  const signIn = (resData) => {
    localStorage.setItem('user', JSON.stringify(resData));
    setUser(resData);
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  const memoValue = useMemo(
    () => ({
      signIn, signOut, user, getAuthHeader,
    }),
    [signIn, signOut, user, getAuthHeader],
  );

  return (
    <AuthorizationContext.Provider value={memoValue}>
      {children}
    </AuthorizationContext.Provider>
  );
};
export { AuthProvider, AuthorizationContext };
