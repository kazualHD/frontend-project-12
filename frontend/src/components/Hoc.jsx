import React from 'react';
import { useAuthorization } from '../contexts/authorizationContext';
import { Navigate } from 'react-router-dom';
import routes from '../routes';

const UseUserHoc = ({children}) => {
  const auth = useAuthorization();
    if (!auth.user) {
      return <Navigate to={routes.login()} />;
    }

    return children
  };

export default UseUserHoc;
