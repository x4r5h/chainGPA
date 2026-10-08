import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './styles.css';

function OAuthBoundary({ children }: { children: ReactNode }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'not-configured';
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') return;
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><OAuthBoundary><AuthProvider><App /></AuthProvider></OAuthBoundary></BrowserRouter></StrictMode>));
