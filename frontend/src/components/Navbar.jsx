import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const Header = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  return (
    <Navbar className="bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.rootPage()}>{t('header.appName')}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {(user) ? <Button variant="outline-primary" onClick={() => signOut()}>{t('header.signOut')}</Button> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
