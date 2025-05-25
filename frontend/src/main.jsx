import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast'; // Importing Toaster for notifications
// Assuming you have a db.js file to handle database connection

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
  </StrictMode>
);
