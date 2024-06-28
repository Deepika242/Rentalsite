import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './pages/App/App';
import './style.css';

createRoot(document.querySelector('#app')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
