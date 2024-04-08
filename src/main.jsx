import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter } from 'react-router-dom';
import { AuthProviderWrapper } from '../src/Context/auth.context.jsx';
import "bootstrap/dist/css/bootstrap.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProviderWrapper>
    <App />
    </AuthProviderWrapper>
  </BrowserRouter>,
)
