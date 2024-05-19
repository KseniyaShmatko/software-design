import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createContext } from 'react';
import UserStore from './store/UserStore';
import MainStore from './store/MainStore';
import { REACT_APP_API_URL } from './utils/consts';

interface ContextType {
  user: UserStore;
  main: MainStore
}

export const Context = createContext<ContextType>({ user: new UserStore(), main: new MainStore()});

const element = document.getElementById('root');
const root = createRoot(element!)

root.render(
  <React.StrictMode>
    <Context.Provider value={{ user: new UserStore(), main: new MainStore() } as ContextType}>
      <App />
    </Context.Provider>
  </React.StrictMode>
)