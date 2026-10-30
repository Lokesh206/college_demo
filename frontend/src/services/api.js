const API_BASE = '/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('sri_vidya_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}: Error processing request`);
  }

  return data;
}

export const api = {
  // Auth
  login: (credentials) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  demoLogin: (role) => apiFetch('/auth/demo-login', { method: 'POST', body: JSON.stringify({ role }) }),
  getMe: () => apiFetch('/auth/me'),

  // Public
  getOverview: () => apiFetch('/public/overview'),
  getStreams: () => apiFetch('/public/streams'),
  getFaculty: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiFetch(`/public/faculty${q ? `?${q}` : ''}`);
  },
  getCompetitiveExams: () => apiFetch('/public/competitive-exams'),
  getResults: () => apiFetch('/public/results'),
  getFacilities: (category) => apiFetch(`/public/facilities${category ? `?category=${category}` : ''}`),
  getNews: () => apiFetch('/public/news'),
  getEvents: () => apiFetch('/public/events'),
  getTestimonials: () => apiFetch('/public/testimonials'),
  getAlumni: () => apiFetch('/public/alumni'),
  getFees: () => apiFetch('/public/fees'),

  // Admissions
  submitEnquiry: (formData) => apiFetch('/admissions/enquiry', { method: 'POST', body: JSON.stringify(formData) }),
  trackApplication: (appNo) => apiFetch(`/admissions/track/${appNo}`),
  getAllApplications: (status) => apiFetch(`/admissions/all${status ? `?status=${status}` : ''}`),
  updateApplicationStatus: (id, payload) => apiFetch(`/admissions/${id}/status`, { method: 'PATCH', body: JSON.stringify(payload) }),

  // Exams & CBT Engine
  getMockTests: (exam) => apiFetch(`/exams/list${exam ? `?exam=${exam}` : ''}`),
  startMockTest: (testId) => apiFetch(`/exams/${testId}/start`),
  submitMockTest: (testId, payload) => apiFetch(`/exams/${testId}/submit`, { method: 'POST', body: JSON.stringify(payload) }),
  getExamHistory: () => apiFetch('/exams/history'),

  // Fees
  getStudentFee: (studentId) => apiFetch(`/fees/student/${studentId}`),
  processSandboxPayment: (payload) => apiFetch('/fees/sandbox-pay', { method: 'POST', body: JSON.stringify(payload) }),
  getReceiptPdfUrl: (txnId) => `/api/fees/receipt/${txnId}/pdf`,

  // Portals
  getStudentDashboard: () => apiFetch('/student/dashboard'),
  getParentDashboard: () => apiFetch('/parent/dashboard'),
  getFacultyDashboard: () => apiFetch('/faculty/dashboard'),
  markAttendance: (payload) => apiFetch('/faculty/mark-attendance', { method: 'POST', body: JSON.stringify(payload) }),
  enterMarks: (payload) => apiFetch('/faculty/enter-marks', { method: 'POST', body: JSON.stringify(payload) }),
  uploadStudyMaterial: (payload) => apiFetch('/faculty/upload-material', { method: 'POST', body: JSON.stringify(payload) }),

  // Admin
  getAdminAnalytics: () => apiFetch('/admin/analytics'),
  getAdminStudents: () => apiFetch('/admin/students'),
  createAdminStudent: (payload) => apiFetch('/admin/students', { method: 'POST', body: JSON.stringify(payload) }),
  getAdminFaculty: () => apiFetch('/admin/faculty'),
  createAdminFaculty: (payload) => apiFetch('/admin/faculty', { method: 'POST', body: JSON.stringify(payload) }),
  getAuditLogs: () => apiFetch('/admin/audit-logs'),

  // Chatbot
  sendChatQuery: (message) => apiFetch('/chatbot/query', { method: 'POST', body: JSON.stringify({ message }) })
};

