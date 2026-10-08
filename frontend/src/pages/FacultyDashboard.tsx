import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';

export function FacultyDashboard() {
  const [course, setCourse] = useState('EC301');
  const [section, setSection] = useState('A');
  const [submitted, setSubmitted] = useState(false);

  return <DashboardLayout title="Faculty portal"><section className="workspace-panel"><div className="panel-intro"><div><p className="eyebrow">Assessment workflow</p><h2>Upload course marks</h2><p>Select a course and section, then attach the completed marksheet for HOD approval.</p></div><span className="workflow-step">01 / 03</span></div><div className="form-grid"><label>Course<select value={course} onChange={(event) => setCourse(event.target.value)}><option value="EC301">EC301 - VLSI Design</option><option value="EC302">EC302 - Digital Signal Processing</option></select></label><label>Section<select value={section} onChange={(event) => setSection(event.target.value)}><option value="A">Section A</option><option value="B">Section B</option></select></label></div><label className="file-field">Marks file<input type="file" accept=".csv,.xlsx" /></label><button className="workspace-action" onClick={() => setSubmitted(true)}>Submit marks for approval <span>→</span></button>{submitted && <p className="success-message">Marks submitted for HOD approval.</p>}</section></DashboardLayout>;
}
