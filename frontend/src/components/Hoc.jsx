import { Navigate } from 'react-router-dom';
import { useAuthorization } from '../contexts/AuthorizatContext'
import routes from '../routes';

const RequireAuth = ({ children }) => {
  const auth = useAuthorization();

  if (!auth.user) {
    return <Navigate to={routes.loginPage()} />;
  }

  return children;
};

export default RequireAuth;