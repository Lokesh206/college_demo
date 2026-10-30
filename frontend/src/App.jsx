import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ChatbotWidget from './components/common/ChatbotWidget';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import AcademicsPage from './pages/public/AcademicsPage';
import FacultyPage from './pages/public/FacultyPage';
import CompetitiveExamsPage from './pages/public/CompetitiveExamsPage';
import ResultsPage from './pages/public/ResultsPage';
import CampusFacilitiesPage from './pages/public/CampusFacilitiesPage';
import StudentLifePage from './pages/public/StudentLifePage';
import AdmissionsPage from './pages/public/AdmissionsPage';
import AlumniPage from './pages/public/AlumniPage';
import NewsEventsPage from './pages/public/NewsEventsPage';
import ContactPage from './pages/public/ContactPage';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Portals
import StudentDashboard from './pages/student/StudentDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm font-semibold text-slate-500">Checking credentials...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role) && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-gold-500 selection:text-white overflow-x-hidden">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/academics" element={<AcademicsPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/competitive-exams" element={<CompetitiveExamsPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/facilities" element={<CampusFacilitiesPage />} />
              <Route path="/student-life" element={<StudentLifePage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/news-events" element={<NewsEventsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />

              {/* Role-Specific Portals */}
              <Route
                path="/student-portal"
                element={
                  <ProtectedRoute allowedRoles={['student', 'admin']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parent-portal"
                element={
                  <ProtectedRoute allowedRoles={['parent', 'admin']}>
                    <ParentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faculty-portal"
                element={
                  <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                    <FacultyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <ChatbotWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

