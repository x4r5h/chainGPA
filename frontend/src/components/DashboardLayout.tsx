import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { NitwBrand } from './NitwBrand';

export function DashboardLayout({ title, children }: { title: string; children: ReactNode }) {
  const { user, logout } = useAuth();

  return <main className="workspace-page">
    <header className="site-header compact">
      <NitwBrand />
      <div className="workspace-user"><span>{user?.name} <b>({user?.role})</b></span><button className="header-logout" onClick={logout}>Sign out ↗</button></div>
    </header>
    <section className="workspace-content"><p className="eyebrow">NITWAS workspace</p><h1>{title}</h1>{children}</section>
  </main>;
}
