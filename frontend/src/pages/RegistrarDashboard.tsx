import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';

export function RegistrarDashboard() {
  const [saved, setSaved] = useState(false);
  return <DashboardLayout title="Registrar portal"><div className="workspace-two-column"><section className="workspace-panel"><p className="eyebrow">Student records</p><h2>Create student profile</h2><p>Add a new student identity to the academic system.</p><div className="stacked-form"><input placeholder="Roll number" /><input placeholder="Full name" /><button className="workspace-action" onClick={() => setSaved(true)}>Save student <span>→</span></button></div>{saved && <p className="success-message">Student profile saved.</p>}</section><section className="workspace-panel"><p className="eyebrow">Credentials</p><h2>Issue digital certificate</h2><p>Generate a verifiable academic certificate for an existing student.</p><div className="stacked-form"><input placeholder="Student roll number" /><button className="gold-action" onClick={() => setSaved(true)}>Generate certificate <span>→</span></button></div></section></div></DashboardLayout>;
}
