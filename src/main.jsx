import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
)
