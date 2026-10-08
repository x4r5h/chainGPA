export type Role = 'Registrar' | 'Faculty' | 'HOD' | 'Student' | 'Verifier';

export interface AssignedRole {
  roleId: string;
  roleName: string;
  type: string;
  accessFrom: string;
  accessTo: string;
  status: 'Active' | 'Inactive';
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  department: string;
  gsuiteEmail: string;
  assignedRoles: AssignedRole[];
}
