import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, Shield, User, Lock, ArrowRight, 
  Sparkles, CheckCircle2, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [role, setRole] = useState('student'); // student, parent, faculty, admin
  const [username, setUsername] = useState('student.rohit');
  const [password, setPassword] = useState('student123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleRoleTabChange = (newRole) => {
    setRole(newRole);
    setError(null);
    if (newRole === 'student') {
      setUsername('student.rohit');
      setPassword('student123');
    } else if (newRole === 'parent') {
      setUsername('parent.rohit');
      setPassword('parent123');
    } else if (newRole === 'faculty') {
      setUsername('faculty.physics');
      setPassword('faculty123');
    } else if (newRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login(username, password);
      redirectByRole(data.user.role);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoClick = async (demoRole) => {
    setLoading(true);
    setError(null);
    try {
      const data = await demoLogin(demoRole);
      redirectByRole(data.user.role);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (userRole) => {
    switch (userRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'faculty':
        navigate('/faculty-portal');
        break;
      case 'parent':
        navigate('/parent-portal');
        break;
      default:
        navigate('/student-portal');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Top College Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 border border-gold-500/50 flex items-center justify-center shadow">
              <GraduationCap className="w-7 h-7" />
            </div>
          </Link>
          <h2 className="text-2xl font-black text-navy-950 font-serif">
            Sri Vidya Smart Portal
          </h2>
          <p className="text-xs text-slate-500">
            Secure digital access for students, parents, faculty & administration
          </p>
        </div>

        {/* 1-Click Demo Evaluation Pills */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Instant 1-Click Demo Logins:</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">No typing required</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoClick('student')}
              className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-left font-medium transition flex flex-col"
            >
              <span className="font-bold">Student Portal</span>
              <span className="text-[10px] text-blue-700">Rohit (2nd PU PCMB)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoClick('parent')}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-left font-medium transition flex flex-col"
            >
              <span className="font-bold">Parent Portal</span>
              <span className="text-[10px] text-purple-700">Smt. Sunita Sharma</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoClick('faculty')}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-left font-medium transition flex flex-col"
            >
              <span className="font-bold">Faculty Portal</span>
              <span className="text-[10px] text-emerald-700">Dr. Anand Rao (Physics)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoClick('admin')}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-left font-medium transition flex flex-col"
            >
              <span className="font-bold">Admin Portal</span>
              <span className="text-[10px] text-rose-700">Dr. R. Narayan (Principal)</span>
            </button>
          </div>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          
          {/* Role Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            {[
              { id: 'student', label: 'Student' },
              { id: 'parent', label: 'Parent' },
              { id: 'faculty', label: 'Faculty' },
              { id: 'admin', label: 'Admin' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleRoleTabChange(t.id)}
                className={`py-1.5 rounded-lg transition ${
                  role === t.id
                    ? 'bg-navy-950 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Username or Official Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to {role.toUpperCase()} Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
            Need admission inquiry?{' '}
            <Link to="/admissions" className="text-gold-700 font-semibold hover:underline">
              Submit online application
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

