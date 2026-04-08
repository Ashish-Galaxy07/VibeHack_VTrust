// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx' // Import AppRoutes instead of App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes /> 
  </StrictMode>,
)
