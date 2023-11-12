import React from 'react';
import ReactDOM from 'react-dom/client';
import initializeApp from './initializeApp.js';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

(async () => {
  const socket = await initializeApp();
  root.render(
    <React.StrictMode>
      <App socket={socket} />
    </React.StrictMode>,
  );

  reportWebVitals();
})();
