import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';
import {UserProvider} from './Context/userContext';

import {ToastContainer} from "react-toastify"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
      <ToastContainer/>
  </ShopContextProvider>

);

