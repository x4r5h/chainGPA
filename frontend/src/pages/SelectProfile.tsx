import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NitwBrand } from '../components/NitwBrand';

export function SelectProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return <main className="profile-page">
    <header className="site-header compact"><NitwBrand /><button className="header-logout" onClick={logout}>Sign out ↗</button></header>
    <section className="profile-content">
      <div className="breadcrumb">NITWAS <span>/</span> Profiles</div>
      <div className="profile-heading"><div><p className="eyebrow">Identity & access</p><h1>Select profile</h1></div><span className="session-status"><span className="live-dot" /> Session active</span></div>
      <section className="identity-card"><div className="avatar">IA</div><div className="identity-main"><div className="identity-name"><h2>{user.id} <span>~</span> Student</h2><button className="circle-button" aria-label="Open student profile" onClick={() => navigate('/student')}>↗</button></div><p>{user.name}, Department of {user.department}</p><div className="identity-details"><span><b>Email</b> {user.email}</span><span><b>Mobile</b> +91 90007 92200</span><span><b>G-Suite</b> {user.gsuiteEmail}</span></div></div></section>
      <div className="notice-banner"><span className="notice-icon">!</span><div><strong>Storage reminder</strong><p>Students are requested to limit their Google Drive storage to <b>5 GB</b>.</p></div><span className="banner-arrow">↗</span></div>
      <section className="roles-section"><div className="section-heading"><div><p className="eyebrow">Access matrix</p><h2>Assigned roles</h2></div><span>1 active role</span></div><div className="role-table-wrap"><table><thead><tr><th>Role ID</th><th>Role name</th><th>Type</th><th>Access from</th><th>Access to</th><th>Status</th></tr></thead><tbody>{user.assignedRoles.map((role) => <tr key={role.roleId}><td className="mono">{role.roleId}</td><td><strong>{role.roleName}</strong></td><td>{role.type}</td><td>{role.accessFrom}</td><td>{role.accessTo}</td><td><span className="status-badge"><span />{role.status}</span></td></tr>)}</tbody></table></div></section>
    </section>
  </main>;
}
