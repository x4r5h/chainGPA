import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';

export function HodDashboard() {
  const [status, setStatus] = useState('Pending review');
  return <DashboardLayout title="HOD portal"><section className="workspace-panel"><div className="panel-intro"><div><p className="eyebrow">Department workflow</p><h2>Pending marks approval queue</h2><p>Review submissions before they become part of the official academic record.</p></div><span className="workflow-step">01 pending</span></div><div className="role-table-wrap"><table><thead><tr><th>Course</th><th>Faculty</th><th>Section</th><th>Status</th><th>Action</th></tr></thead><tbody><tr><td><strong>EC301 - VLSI Design</strong></td><td>Dr. K. Sharma</td><td>A</td><td><span className="review-status">{status}</span></td><td><div className="table-actions"><button className="approve-button" onClick={() => setStatus('Approved')}>Approve</button><button className="reject-button" onClick={() => setStatus('Needs changes')}>Reject</button></div></td></tr></tbody></table></div></section></DashboardLayout>;
}
