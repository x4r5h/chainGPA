import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/google/callback', async ({ request }) => {
    await request.json() as { token?: string };
    return HttpResponse.json({
      success: true,
      user: {
        id: '23ECB1F08',
        name: 'Ibrahim Azeem',
        email: 'ia23ecb1f08@student.nitw.ac.in',
        role: 'Student',
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
      },
    });
  }),
  http.get('/api/students', () =>
    HttpResponse.json([
      { id: 'S101', name: 'Alice Smith', gpa: 3.8, program: 'B.Tech ECE' },
      { id: 'S102', name: 'Bob Jones', gpa: 3.5, program: 'B.Tech CSE' },
      { id: 'S103', name: 'Charlie Brown', gpa: 3.9, program: 'B.Tech EEE' },
    ]),
  ),
];
