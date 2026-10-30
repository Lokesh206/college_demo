import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, Menu, X, ChevronDown, User, LogOut, 
  Sparkles, Shield, Award, Phone, Mail, Megaphone,
  Volume2, VolumeX
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);

  const { user, profile, logout, demoLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleQuickDemo = async (role) => {
    try {
      await demoLogin(role);
      setPortalDropdownOpen(false);
      setMobileMenuOpen(false);
      if (role === 'admin') navigate('/admin');
      else if (role === 'faculty') navigate('/faculty-portal');
      else if (role === 'parent') navigate('/parent-portal');
      else navigate('/student-portal');
    } catch (err) {
      console.error('Quick demo login error:', err);
    }
  };

  const getPortalRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'faculty': return '/faculty-portal';
      case 'parent': return '/parent-portal';
      default: return '/student-portal';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md select-none">
      
      {/* 1. TOP UTILITY BAR (CORRECT, PROFESSIONAL, ACCURATE INFO & SOCIAL LINKS) */}
      <div className="bg-navy-950 text-slate-200 text-xs py-2 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-3">
          
          {/* Left: Essential Verified College Info */}
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="bg-navy-900 text-gold-400 font-bold px-2.5 py-0.5 rounded border border-gold-500/40 flex items-center gap-1.5 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-gold-400" />
              <span>Govt. PU Board Code: AS-0482</span>
            </span>

            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admissions 2026–2027 Open</span>
            </span>

            <span className="hidden md:inline text-slate-500">•</span>

            <a href="tel:+918028457890" className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition">
              <Phone className="w-3 h-3 text-gold-400" />
              <span>+91 80 2845 7890</span>
            </a>

            <span className="hidden lg:inline text-slate-500">•</span>

            <a href="mailto:admissions@srividyapuc.edu.in" className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-white transition">
              <Mail className="w-3 h-3 text-gold-400" />
              <span>admissions@srividyapuc.edu.in</span>
            </a>
          </div>

          {/* Right: Social Media Icons + Quick Demo Switcher + Login */}
          <div className="flex items-center space-x-3">
            
            {/* Social Media Links */}
            <div className="hidden sm:flex items-center space-x-2 text-slate-400 border-r border-navy-800 pr-3">
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-red-400 transition" 
                title="YouTube - Campus Lectures"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition" 
                title="Instagram - @srividyapuc_official"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition" 
                title="LinkedIn - Official Network"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a 
                href="https://wa.me/919845011223" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-emerald-400 transition" 
                title="WhatsApp Admissions Chat"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>

            {/* Quick Demo Switcher */}
            <div className="relative">
              <button 
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="inline-flex items-center gap-1.5 bg-gold-600 hover:bg-gold-500 text-navy-950 font-bold px-2.5 py-1 rounded-lg text-xs transition shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-navy-950" />
                <span>Demo Switcher</span>
                <ChevronDown className="w-3 h-3 text-navy-950" />
              </button>

              {portalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Instant 1-Click Role Login
                  </div>
                  <button onClick={() => handleQuickDemo('student')} className="w-full text-left px-3.5 py-2 text-xs hover:bg-blue-50 flex items-center justify-between text-slate-700 transition">
                    <div>
                      <div className="font-bold text-slate-900">Student Portal</div>
                      <div className="text-[10px] text-slate-500">Rohit Sharma (2nd PU)</div>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">PCMB</span>
                  </button>
                  <button onClick={() => handleQuickDemo('parent')} className="w-full text-left px-3.5 py-2 text-xs hover:bg-purple-50 flex items-center justify-between text-slate-700 transition">
                    <div>
                      <div className="font-bold text-slate-900">Parent Portal</div>
                      <div className="text-[10px] text-slate-500">Smt. Sunita Sharma</div>
                    </div>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">Parent</span>
                  </button>
                  <button onClick={() => handleQuickDemo('faculty')} className="w-full text-left px-3.5 py-2 text-xs hover:bg-emerald-50 flex items-center justify-between text-slate-700 transition">
                    <div>
                      <div className="font-bold text-slate-900">Faculty Portal</div>
                      <div className="text-[10px] text-slate-500">Dr. Anand Rao (HOD)</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Physics</span>
                  </button>
                  <button onClick={() => handleQuickDemo('admin')} className="w-full text-left px-3.5 py-2 text-xs hover:bg-rose-50 flex items-center justify-between text-slate-700 transition">
                    <div>
                      <div className="font-bold text-slate-900">Admin Portal</div>
                      <div className="text-[10px] text-slate-500">Dr. R. Narayan</div>
                    </div>
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">Principal</span>
                  </button>
                </div>
              )}
            </div>

            {/* Portal Login / User Chip */}
            {user ? (
              <div className="flex items-center space-x-2 bg-navy-900 px-2 py-1 rounded-lg border border-navy-700">
                <Link to={getPortalRoute()} className="text-gold-400 hover:text-gold-300 font-semibold text-xs">
                  {user.username}
                </Link>
                <button onClick={logout} title="Sign Out" className="text-slate-400 hover:text-rose-400">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-2.5 py-1 text-slate-300 hover:text-white transition font-semibold text-xs">
                Portal Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & UNCLUTTERED NAVBAR (GENEROUS MARGINS & NEVER WRAPS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-3 xl:gap-6">
          
          {/* Logo & College Identity */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 border-2 border-gold-500/70 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform p-2 shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-gold-400" />
            </div>
            <div className="shrink-0">
              <div className="text-sm sm:text-base lg:text-[17px] font-black tracking-tight text-navy-950 uppercase font-serif leading-none">
                <span>Sri Vidya International</span>
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-gold-700 tracking-wider uppercase mt-1">
                Pre-University College • Bengaluru
              </div>
            </div>
          </Link>

          {/* Desktop Primary Navigation Links (Always single line, beautifully spaced) */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 text-xs xl:text-[13px] font-semibold text-slate-700">
            
            <Link
              to="/"
              className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                location.pathname === '/'
                  ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                  : 'hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                location.pathname === '/about'
                  ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                  : 'hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            {/* Academics Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAcademicsDropdownOpen(true)}
              onMouseLeave={() => setAcademicsDropdownOpen(false)}
            >
              <Link
                to="/academics"
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  location.pathname === '/academics'
                    ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                    : 'hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                <span>Academics</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </Link>

              {academicsDropdownOpen && (
                <div className="absolute left-0 mt-0 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in">
                  <Link to="/academics" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-navy-950">Science Stream</div>
                    <div className="text-[11px] text-slate-500">PCMB & PCMC Combinations</div>
                  </Link>
                  <Link to="/academics" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-navy-950">Commerce Stream</div>
                    <div className="text-[11px] text-slate-500">CEBA & SEBA Combinations</div>
                  </Link>
                  <Link to="/academics" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-navy-950">Arts & Humanities</div>
                    <div className="text-[11px] text-slate-500">HEPS (UPSC & Law Foundation)</div>
                  </Link>
                  <div className="my-1 border-t border-slate-100"></div>
                  <Link to="/academics" className="block px-4 py-1.5 hover:bg-slate-50 transition text-xs font-semibold text-gold-700">
                    View Course Details & Labs →
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/competitive-exams"
              className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                location.pathname === '/competitive-exams'
                  ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                  : 'hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              KCET / NEET / JEE
            </Link>

            <Link
              to="/results"
              className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                location.pathname === '/results'
                  ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                  : 'hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              Results
            </Link>

            <Link
              to="/facilities"
              className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                location.pathname === '/facilities'
                  ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                  : 'hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              Campus & Labs
            </Link>

            <Link
              to="/admissions"
              className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                location.pathname === '/admissions'
                  ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                  : 'hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              Admissions
            </Link>

            {/* Smart "More Pages" Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  ['/faculty', '/student-life', '/alumni', '/news-events', '/contact'].includes(location.pathname)
                    ? 'text-navy-950 bg-slate-100 font-bold border-b-2 border-gold-500'
                    : 'hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in">
                  <Link to="/faculty" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-navy-950">Faculty Directory</div>
                    <div className="text-[11px] text-slate-500">64+ Ph.D. & M.Sc. Lecturers</div>
                  </Link>
                  <Link to="/student-life" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-navy-950">Student Life & Clubs</div>
                    <div className="text-[11px] text-slate-500">Robotics, Coding, Cultural Fests</div>
                  </Link>
                  <Link to="/alumni" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-navy-950">Alumni Network</div>
                    <div className="text-[11px] text-slate-500">Graduates in AIIMS, IIT, Google</div>
                  </Link>
                  <Link to="/news-events" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-navy-950">News & Events</div>
                    <div className="text-[11px] text-slate-500">Board Circulars & Calendar</div>
                  </Link>
                  <div className="my-1 border-t border-slate-100"></div>
                  <Link to="/contact" className="block px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-gold-700">Contact Us & Campus Helpdesk</div>
                    <div className="text-[11px] text-slate-500">Location Map, Helplines & Visiting Hours</div>
                  </Link>
                </div>
              )}
            </div>

          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-2.5 shrink-0">
            <Link
              to="/admissions"
              className="px-3 xl:px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-500 hover:to-gold-600 rounded-xl shadow-sm border border-gold-300 hover:scale-105 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-navy-950" />
              <span>Apply Online</span>
            </Link>

            {user ? (
              <Link
                to={getPortalRoute()}
                className="px-3 xl:px-3.5 py-2 text-xs font-bold rounded-xl bg-navy-900 text-white hover:bg-navy-800 transition flex items-center gap-1.5 shadow whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-gold-400" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 xl:px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition whitespace-nowrap"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link
              to="/admissions"
              className="px-3 py-1.5 text-xs font-bold text-navy-950 bg-gold-500 rounded-lg shadow"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. DYNAMIC MARQUEE TICKER (ALIGNED WITH LOGO & PROPER MARGINS) */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 text-white text-xs py-2 border-t border-b border-gold-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden">
          <div className="bg-gold-600 text-navy-950 font-black px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0 z-10 flex items-center gap-1 shadow-sm mr-3 whitespace-nowrap">
            <Megaphone className="w-3 h-3" />
            <span>Latest Circulars & Lectures</span>
          </div>

          <div 
            className="flex-1 overflow-hidden relative"
            onMouseEnter={() => setMarqueePaused(true)}
            onMouseLeave={() => setMarqueePaused(false)}
          >
            <div className={`whitespace-nowrap inline-block animate-marquee ${marqueePaused ? 'pause-marquee' : ''}`}>
              <span className="mx-4 text-slate-200">
                ⚡ <strong>Special Lecture:</strong> Dr. K. Radhakrishnan (Former Chairman, ISRO) on <em>"Space Frontiers & Physics Innovations"</em> — Sat 10:00 AM, Radhakrishnan Hall.
              </span>
              <span className="mx-4 text-gold-400">★</span>
              <span className="mx-4 text-slate-200">
                📚 <strong>Lecture Details:</strong> 2nd PU Physics Special Electrodynamics Problem-Solving by Dr. Anand Rao daily at 2:00 PM.
              </span>
              <span className="mx-4 text-gold-400">★</span>
              <span className="mx-4 text-slate-200">
                🏛️ <strong>Founding Vision (2008):</strong> <em>"Empowering young minds with scientific curiosity and unshakeable ethics."</em> — Dr. Sri Vidya Sagar & Smt. Shakuntala Vidya Sagar.
              </span>
              <span className="mx-4 text-gold-400">★</span>
              <span className="mx-4 text-slate-200">
                🎯 <strong>CBT Engine:</strong> KCET & NEET Mock Practice Test #01 is live for all science students with instant scorecards.
              </span>
              <span className="mx-4 text-gold-400">★</span>
              <span className="mx-4 text-slate-200">
                📞 <strong>Connect Info:</strong> Admissions Office: +91 80 2845 7890 | WhatsApp Counseling: +91 98450 11223.
              </span>
            </div>
          </div>

          <button
            onClick={() => setMarqueePaused(!marqueePaused)}
            className="ml-3 text-slate-400 hover:text-gold-400 text-[10px] font-semibold shrink-0"
            title={marqueePaused ? "Resume Ticker" : "Pause Ticker"}
          >
            {marqueePaused ? '▶ Play' : '❚❚ Pause'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="font-bold text-navy-950 mb-1.5">1-Click Instant Demo Login:</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => handleQuickDemo('student')} className="py-1.5 px-2 bg-blue-100 text-blue-900 rounded font-bold text-[11px] text-left">
                Student (Rohit)
              </button>
              <button onClick={() => handleQuickDemo('parent')} className="py-1.5 px-2 bg-purple-100 text-purple-900 rounded font-bold text-[11px] text-left">
                Parent (Sunita)
              </button>
              <button onClick={() => handleQuickDemo('faculty')} className="py-1.5 px-2 bg-emerald-100 text-emerald-900 rounded font-bold text-[11px] text-left">
                Faculty (Dr. Rao)
              </button>
              <button onClick={() => handleQuickDemo('admin')} className="py-1.5 px-2 bg-rose-100 text-rose-900 rounded font-bold text-[11px] text-left">
                Admin (Principal)
              </button>
            </div>
          </div>

          {[
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Academics', path: '/academics' },
            { name: 'Faculty Directory', path: '/faculty' },
            { name: 'Competitive Exams (KCET/NEET/JEE)', path: '/competitive-exams' },
            { name: 'Results & Achievements', path: '/results' },
            { name: 'Campus Facilities', path: '/facilities' },
            { name: 'Student Life & Clubs', path: '/student-life' },
            { name: 'Admissions 2026-27', path: '/admissions' },
            { name: 'Alumni Network', path: '/alumni' },
            { name: 'News & Events', path: '/news-events' },
            { name: 'Contact & Helpdesk', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                location.pathname === link.path
                  ? 'bg-navy-950 text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Sign Out ({user.username})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-navy-950 text-gold-400 text-xs font-bold uppercase tracking-wider"
              >
                Sign In to Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
