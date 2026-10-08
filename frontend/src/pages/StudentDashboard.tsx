import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NitwBrand } from '../components/NitwBrand';

interface StudentData { id: string; name: string; gpa: number; program: string }

export function StudentDashboard() {
  const { user, logout } = useAuth();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { fetch('/api/students').then((response) => { if (!response.ok) throw new Error('Unable to load students'); return response.json() as Promise<StudentData[]>; }).then(setStudents).catch(() => setError('Student records are temporarily unavailable.')).finally(() => setLoading(false)); }, []);
  return <main className="dashboard-page"><header className="site-header compact"><NitwBrand /><button className="header-logout" onClick={logout}>Sign out ↗</button></header><section className="dashboard-content"><div className="breadcrumb">NITWAS <span>/</span> Student dashboard</div><div className="dashboard-top"><div><p className="eyebrow">Student services</p><h1>Good morning, {user?.name.split(' ')[0]}.</h1><p className="muted">Here is your academic snapshot for the current term.</p></div><div className="term-chip">2026–27 <span>Current term</span></div></div><div className="metric-grid"><div className="metric-card"><span>Current GPA</span><strong>3.82</strong><small>+0.14 this term</small></div><div className="metric-card"><span>Credits earned</span><strong>112</strong><small>of 160 total credits</small></div><div className="metric-card"><span>Attendance</span><strong>94%</strong><small>Across 6 courses</small></div></div><section className="student-list-section"><div className="section-heading"><div><p className="eyebrow">Mock API · MSW</p><h2>Student directory</h2></div><span>{loading ? 'Loading…' : `${students.length} records`}</span></div>{error ? <p className="error-message">{error}</p> : loading ? <div className="loading-row">Loading student records<span className="loading-bar" /></div> : <div className="role-table-wrap"><table><thead><tr><th>Student ID</th><th>Name</th><th>Programme</th><th>GPA</th></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td className="mono">{student.id}</td><td><strong>{student.name}</strong></td><td>{student.program}</td><td><span className="gpa-value">{student.gpa.toFixed(1)}</span></td></tr>)}</tbody></table></div>}</section></section></main>;
}
