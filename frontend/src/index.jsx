import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from './appInitializer';
import App from './App';

async function runApp() {
  const { socket } = await initializeApp();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App socket={socket} />
    </React.StrictMode>,
  );

  reportWebVitals();
}

runApp();
