import { useState, type FormEvent } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types/auth';
import { NitwBrand } from '../components/NitwBrand';

const roles: Role[] = ['Student', 'Faculty', 'HOD', 'Registrar', 'Verifier'];
export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('Student');
  const [googleError, setGoogleError] = useState('');

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(selectedRole, userId);
    navigate(selectedRole === 'Student' ? '/select-profile' : `/${selectedRole.toLowerCase()}`);
  };

  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    hosted_domain: 'nitw.ac.in',
    scope: 'openid email profile',
    prompt: 'select_account',
    onSuccess: async ({ access_token: token }) => {
      try {
        setGoogleError('');
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userResponse.ok) throw new Error('Google could not verify this account.');

        const profile = await userResponse.json() as { sub: string; name: string; email: string };
        const email = profile.email.trim().toLowerCase();
        const isStudent = email.endsWith('@student.nitw.ac.in');
        const isFacultyOrStaff = email.endsWith('@nitw.ac.in') && !isStudent;

        if (!isStudent && !isFacultyOrStaff) {
          setGoogleError('Access restricted. Use your official @nitw.ac.in or @student.nitw.ac.in account.');
          return;
        }

        const response = await fetch('/api/auth/google/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) throw new Error('The institute account could not be verified.');
        const payload = await response.json() as { success: boolean; message?: string };
        if (!payload.success) throw new Error(payload.message || 'The institute account could not be verified.');

        const role = isStudent ? 'Student' : 'Faculty';
        login(role, email);
        navigate(isStudent ? '/select-profile' : '/faculty');
      } catch (error) {
        setGoogleError(error instanceof Error ? error.message : 'Google authentication failed.');
      }
    },
    onError: () => setGoogleError('Google Workspace sign-in was cancelled or failed.'),
    onNonOAuthError: () => setGoogleError('The Google sign-in window could not be opened.'),
  });

  const handleGoogleLogin = () => {
    if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      setGoogleError('Google Workspace sign-in is not configured. Add VITE_GOOGLE_CLIENT_ID to the frontend environment.');
      return;
    }
    googleLogin();
  };

  return (
    <main className="login-page">
      <header className="site-header">
        <NitwBrand />
        <div className="header-meta"><span className="live-dot" /> NITWAS <span className="meta-divider" /> 2026–27</div>
      </header>

      <section className="login-hero">
        <div className="hero-copy">
          <p className="eyebrow">One campus. Every workflow.</p>
          <h1>Welcome to the<br /><em>academic commons.</em></h1>
          <p className="hero-description">Your single window for learning, administration, and the people who keep NIT Warangal moving.</p>
          <div className="hero-rule"><span /> <small>EST. 1959 · WARANGAL, TELANGANA</small></div>
        </div>

        <div className="portal-grid">
          <section className="login-card">
            <div className="card-kicker">Secure access <span>↗</span></div>
            <h2>NITWAS Portal</h2>
            <p className="card-description">Use your NITW account or continue with Google Workspace.</p>
            <form onSubmit={handleLogin}>
              <label htmlFor="user-id">Username or email address</label>
              <input id="user-id" value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="you@nitw.ac.in" required />
              <div className="password-label"><label htmlFor="password">Password</label><button type="button" onClick={() => setGoogleError('Password recovery will be connected to NITW identity services.')}>Forgot password?</button></div>
              <input id="password" type="password" placeholder="Enter your password" required />
              <label htmlFor="role">Profile</label>
              <div className="select-wrap"><select id="role" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as Role)}>{roles.map((role) => <option key={role}>{role}</option>)}</select><span>⌄</span></div>
              <button className="primary-button credential-button" type="submit">Sign in <span>→</span></button>
            </form>
            <div className="oauth-divider"><span>or</span></div>
            <div className="alternative-auth">
              <button className="alternative-button" type="button" onClick={handleGoogleLogin}><span className="google-logo" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><path fill="#4285F4" d="M21.35 12.27c0-.7-.06-1.37-.18-2.02H12v3.83h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.2Z"/><path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.7Z"/><path fill="#FBBC05" d="M6.53 13.79A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.22.3-1.79V7.68H3.28A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.32l3.25-2.53Z"/><path fill="#EA4335" d="M12 6.18c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.72 5.38l3.25 2.53C7.3 7.9 9.46 6.18 12 6.18Z"/></svg></span> Login with Google <span className="google-arrow">↗</span></button>
            </div>
            {googleError && <p className="oauth-error" role="alert">{googleError}</p>}
            <div className="card-footer"><span className="lock">▣</span> Your session is protected by NITW identity services <a href="#help">Need help?</a></div>
          </section>
        </div>
      </section>
      <footer className="login-footer"><span>© 2026 NIT Warangal</span><span>Privacy &nbsp;·&nbsp; Accessibility &nbsp;·&nbsp; Contact IT Services</span></footer>
    </main>
  );
}
