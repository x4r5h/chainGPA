import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { SelectProfile } from './pages/SelectProfile';
import { StudentDashboard } from './pages/StudentDashboard';
import { GenericDashboard } from './pages/Dashboards';
import { GoogleCallback } from './pages/GoogleCallback';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { HodDashboard } from './pages/HodDashboard';
import { RegistrarDashboard } from './pages/RegistrarDashboard';
import { VerifierDashboard } from './pages/VerifierDashboard';

export default function App() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/auth/google/callback" element={<GoogleCallback />} />
    <Route path="/unauthorized" element={<main className="unauthorized"><h1>403</h1><p>You do not have access to this workspace.</p><a href="/login">Return to login</a></main>} />
    <Route element={<ProtectedRoute allowedRoles={['Student']} />}><Route path="/select-profile" element={<SelectProfile />} /><Route path="/student" element={<StudentDashboard />} /></Route>
    <Route element={<ProtectedRoute allowedRoles={['Registrar']} />}><Route path="/registrar" element={<RegistrarDashboard />} /></Route>
    <Route element={<ProtectedRoute allowedRoles={['Faculty']} />}><Route path="/faculty" element={<FacultyDashboard />} /></Route>
    <Route element={<ProtectedRoute allowedRoles={['HOD']} />}><Route path="/hod" element={<HodDashboard />} /></Route>
    <Route element={<ProtectedRoute allowedRoles={['Verifier']} />}><Route path="/verifier" element={<VerifierDashboard />} /></Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>;
}
