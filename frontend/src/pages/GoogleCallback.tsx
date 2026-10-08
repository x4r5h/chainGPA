import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types/auth';
import { NitwBrand } from '../components/NitwBrand';

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeLogin } = useAuth();
  const [message, setMessage] = useState('Verifying your institute account…');

  useEffect(() => {
    const code = searchParams.get('code');
    const returnedState = searchParams.get('state');
    const savedState = sessionStorage.getItem('google_oauth_state');

    if (!code || !returnedState || returnedState !== savedState) {
      setMessage('This Google sign-in link is invalid or has expired.');
      return;
    }

    fetch('/api/auth/google/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/google/callback` }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('The institute account could not be verified.');
        return response.json() as Promise<{ success: boolean; user?: User }>;
      })
      .then((payload) => {
        if (!payload.success || !payload.user) throw new Error('The institute account could not be verified.');
        sessionStorage.removeItem('google_oauth_state');
        completeLogin(payload.user);
        navigate(payload.user.role === 'Student' ? '/select-profile' : `/${payload.user.role.toLowerCase()}`, { replace: true });
      })
      .catch((error: Error) => setMessage(error.message));
  }, [completeLogin, navigate, searchParams]);

  return <main className="oauth-callback"><NitwBrand /><p className="eyebrow">NITWAS identity services</p><h1>{message}</h1><p>You may close this window if verification does not complete.</p><a href="/login">Return to login</a></main>;
}
