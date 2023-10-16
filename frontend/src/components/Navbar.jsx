import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAuthorization } from '../contexts/authorizationContext';
import 

const NavBar = () => {
    const auth = useAuthorization();
    return (
       <Container>
       <Navbar expand='lg' >
        <Navbar.Brand > Hexlet Chat </Navbar.Brand>
        {
            (auth.user) ? <Button variant='outline-primary' className='justify-content-end' >  Выйти </Button> : null
        }
       </Navbar>
       </Container>
    )
}


export default NavBar;
