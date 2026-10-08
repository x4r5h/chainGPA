import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NitwBrand } from '../components/NitwBrand';

export function GenericDashboard({ title }: { title: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return <main className="dashboard-page"><header className="site-header compact"><NitwBrand /><button className="header-logout" onClick={logout}>Sign out ↗</button></header><section className="dashboard-content"><button className="back-button" onClick={() => navigate(-1)}>← Back</button><p className="eyebrow">Workspace</p><h1>{title}</h1><div className="empty-state"><span className="empty-icon">✦</span><h2>Your workspace is ready</h2><p>Signed in as <strong>{user?.name}</strong>. Role-specific tools will appear here as the portal grows.</p></div></section></main>;
}
