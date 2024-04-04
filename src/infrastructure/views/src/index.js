import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import MovieStore from './store/MovieStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new MovieStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);