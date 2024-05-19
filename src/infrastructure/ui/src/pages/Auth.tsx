import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import '../styles/Auth.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { loginReq, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const click = async() => {
        let userData;
        if (isLogin) {
            userData = await loginReq(login, password);
        }
        else {
            userData = await registration(name, surname, login, password);
        }
        user.setUser(user);
        user.setIsAuth(true);
        navigate(MAIN_ROUTE);
    }

    return (
       <div className='auth-div'>
        <Container fluid className='auth-container'>
            <Card className='card'>
                <h2 className='card-h2'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='card-form'> 
                    {isLogin ? 
                        <>
                            <Form.Control placeholder='Введите логин' className='control-input' style={{fontSize: '18px'}} value={login} onChange={e => setLogin(e.target.value)}/>
                            <Form.Control placeholder='Введите пароль' className='control-input' type='password' style={{fontSize: '18px'}} value={password} onChange={e => setPassword(e.target.value)}/>
                        </>
                        :
                        <>
                            <Form.Control placeholder='Введите имя' className='control-input' style={{fontSize: '18px'}} value={name} onChange={e => setName(e.target.value)}/>
                            <Form.Control placeholder='Введите фамилию' className='control-input' style={{fontSize: '18px'}} value={surname} onChange={e => setSurname(e.target.value)}/>
                            <Form.Control placeholder='Введите логин' className='control-input' style={{fontSize: '18px'}} value={login} onChange={e => setLogin(e.target.value)}/>
                            <Form.Control placeholder='Введите пароль' className='control-input' type='password' style={{fontSize: '18px'}} value={password} onChange={e => setPassword(e.target.value)}/>
                        </>
                    }
                    <Row className='auth-row'>
                        <Button key="button_login" variant="outline-info" onClick={click} className='auth-form-button'>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                        <p className='auth-p'>{isLogin ? 'Нет аккаунта? ' : 'Есть аккаунт? '}<NavLink className='auth-navlink' to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLogin ? 'Зарегистрируйтесь!' : 'Войдите!'}</NavLink></p>
                    </Row>
                </Form>
            </Card>
        </Container>
       </div>
    );
});

export default Auth;