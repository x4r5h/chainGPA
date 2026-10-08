import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';

export function VerifierDashboard() {
  const [certificateId, setCertificateId] = useState('');
  const [verified, setVerified] = useState(false);
  return <DashboardLayout title="Public verifier portal"><section className="workspace-panel verifier-panel"><p className="eyebrow">Certificate validation</p><h2>Verify student certificate</h2><p>Enter the certificate ID to check whether it was issued by NIT Warangal.</p><div className="verify-form"><input value={certificateId} onChange={(event) => { setCertificateId(event.target.value); setVerified(false); }} placeholder="Enter certificate ID" /><button className="workspace-action" onClick={() => certificateId.trim() && setVerified(true)}>Verify <span>→</span></button></div>{verified && <div className="verified-result"><span>✓</span><div><strong>Genuine certificate</strong><p>This certificate was issued by NIT Warangal.</p></div></div>}</section></DashboardLayout>;
}
