import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import initializeApp from './initial.js';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

initializeApp().then(({ socket }) => {
  root.render(
    <React.StrictMode>
      <App socket={socket} />
    </React.StrictMode>,
  );
});
