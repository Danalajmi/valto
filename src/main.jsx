import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserProvider>
  <BrowserRouter>

    <App />
  </BrowserRouter>
  </UserProvider>
  </StrictMode>,
)
