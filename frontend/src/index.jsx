import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import initI18next from './i18next';
import initSocket from './socket';
import initLeoProfanity from './leoProfanity';
import App from './App';
import reportWebVitals from './reportWebVitals';

const i18next = await initI18next('ru');
const socket = initSocket(i18next);
initLeoProfanity();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
);

reportWebVitals();