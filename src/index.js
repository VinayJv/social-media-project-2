import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { ContextWrapper } from './context/dataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextWrapper>
          <App />
      </ContextWrapper> 
    </BrowserRouter>
  </React.StrictMode>
);

makeServer();