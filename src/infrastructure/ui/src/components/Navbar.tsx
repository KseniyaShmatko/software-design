import React, { useContext, useState } from 'react';
import { Context } from '../index';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LOGIN_ROUTE, MAIN_ROUTE, MOVIE_ROUTE, PROFILE_ROUTE } from '../utils/consts';
import { useNavigate, NavLink } from 'react-router-dom';
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NavBar.css'
import { getOneMovieByName } from '../http/movieAPI';

const NavBar = observer( () => {
   const navigate = useNavigate();
    const {user} = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');

    const logOut = () => {
      localStorage.removeItem('token');
      user.setUser({});
      user.setIsAuth(false);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      getOneMovieByName(searchTerm).then(data => {
        navigate(MOVIE_ROUTE + '/' +  data.id);
      }).catch(error => {
        console.error('Error fetching movies:', error);
      });
    };
    return (
        <>
        <Navbar data-bs-theme="dark" key='md' expand='md' className="bg-body-tertiary nav">
          <Container className='container'>
            <Navbar.Brand as={NavLink} to={MAIN_ROUTE} className='nav-brand'>Кино<span className='nav-brand-span'>Скоро</span></Navbar.Brand>
            <div className='navbar-right'>
              <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md' />
              <Navbar.Offcanvas
                id='offcanvasNavbar-expand-md'
                aria-labelledby='offcanvasNavbarLabel-expand-md'
                placement="end"
                className='my-offcanvas'
              >
                <Offcanvas.Header className='offcanvas-header' closeButton>
                  <Offcanvas.Title className='offcanvas-title'>Меню</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='offcanvas-body'>
                  <Form className="d-flex form" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="Найти"
                      className="me-2 nav-form-search"
                      aria-label="Search" 
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <Button variant="outline-info" className='nav-form-button' type="submit">Поиск</Button>
                  </Form>
                  {user.isAuth
                  ?
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link key="profile_link" href={PROFILE_ROUTE} className='my-nav-link'>Профиль</Nav.Link>
                    <Nav.Link key="exit_link" onClick={() => logOut()} className='my-nav-link'>Выйти</Nav.Link>
                  </Nav>
                  :
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link key="login_link" href={LOGIN_ROUTE} className='my-nav-link'>Войти</Nav.Link>
                  </Nav>
                  }
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Container>
        </Navbar>
    </>
    );
});

export default NavBar;