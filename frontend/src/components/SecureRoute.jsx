import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={routes.loginPage()} />;
  }

  return children;
};

export default RequireAuth;
