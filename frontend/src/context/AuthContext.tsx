import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role, User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (role: Role, userId: string) => void;
  completeLogin: (user: User) => void;
  logout: () => void;
}

const studentProfile: Omit<User, 'role'> = {
  id: '23ECB1F08',
  name: 'Ibrahim Azeem Mohammed',
  email: 'ia23ecb1f08@student.nitw.ac.in',
  department: 'Electronics and Communication Engineering',
  gsuiteEmail: 'ia23ecb1f08@student.nitw.ac.in',
  assignedRoles: [
    {
      roleId: 'D4',
      roleName: 'Non-research Student',
      type: 'Default',
      accessFrom: '-',
      accessTo: '-',
      status: 'Active',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: Role, userId: string) => {
    setUser(
      role === 'Student'
        ? { ...studentProfile, id: userId || studentProfile.id, role }
        : {
            id: userId || 'demo-user',
            name: `Demo ${role}`,
            role,
            email: `demo.${role.toLowerCase()}@nitw.ac.in`,
            department: 'National Institute of Technology Warangal',
            gsuiteEmail: `demo.${role.toLowerCase()}@nitw.ac.in`,
            assignedRoles: [],
          },
    );
  };

  return <AuthContext.Provider value={{ user, login, completeLogin: setUser, logout: () => setUser(null) }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
