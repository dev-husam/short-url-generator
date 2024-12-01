import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>

)
