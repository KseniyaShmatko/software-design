import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import AppRouter from './components/AppRouter';
import NavBar from './components/Navbar';
import { Context } from '.';
import { check } from './http/userAPI';
import {Spinner} from "react-bootstrap";

const App = observer(() => { 
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
      check()
      .then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(() => {
        user.setUser({});
        user.setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);

      if(loading) {
        return <Spinner animation={'grow'}/>
      }

    return (
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    );
});

export default App;
