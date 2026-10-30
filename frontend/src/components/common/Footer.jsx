import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t-4 border-gold-500 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Institutional Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-navy-900 border border-gold-500/60 flex items-center justify-center text-gold-400 shadow">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif tracking-tight">
                  Sri Vidya International
                </h3>
                <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
                  Pre-University College • Bengaluru
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering young minds with holistic Pre-University education in Science, Commerce, and Arts. Premier integrated coaching for KCET, NEET, and JEE with 99.52% board pass records.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>#42, Vidya Soudha Campus, ORR, Marathahalli-Sarjapur Jnc, Bengaluru - 560103</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 80 2845 7890 / 7891 | Helpline: 1800 212 9988</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>admissions@srividyapuc.edu.in | contact@srividyapuc.edu.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Streams */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
              Academic Streams
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/academics" className="hover:text-gold-400 transition">PCMB (Science)</Link></li>
              <li><Link to="/academics" className="hover:text-gold-400 transition">PCMC (Computer Science)</Link></li>
              <li><Link to="/academics" className="hover:text-gold-400 transition">CEBA (Commerce)</Link></li>
              <li><Link to="/academics" className="hover:text-gold-400 transition">SEBA (Statistics)</Link></li>
              <li><Link to="/academics" className="hover:text-gold-400 transition">HEPS (Humanities & Law)</Link></li>
              <li><Link to="/competitive-exams" className="hover:text-gold-400 transition text-gold-300 font-medium">KCET / NEET / JEE Wing</Link></li>
            </ul>
          </div>

          {/* Col 3: Portals & Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
              Digital Portals
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/student-portal" className="hover:text-gold-400 transition">Student Portal</Link></li>
              <li><Link to="/parent-portal" className="hover:text-gold-400 transition">Parent Portal</Link></li>
              <li><Link to="/faculty-portal" className="hover:text-gold-400 transition">Faculty Portal</Link></li>
              <li><Link to="/admin" className="hover:text-gold-400 transition">Administrative Portal</Link></li>
              <li><Link to="/results" className="hover:text-gold-400 transition">Results & Toppers</Link></li>
              <li><Link to="/facilities" className="hover:text-gold-400 transition">360° Virtual Campus Tour</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Affiliation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to official PU board circulars, scholarship updates, and admission alerts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full px-3 py-2 text-xs rounded bg-navy-900 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded text-xs flex items-center justify-center transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to college circulars!</span>
                </div>
              )}
            </form>

            <div className="mt-4 p-2.5 bg-navy-900/60 rounded border border-navy-800 text-[11px] text-slate-400">
              <span className="font-semibold text-gold-400">Karnataka PU Board Code:</span> AS-0482<br />
              Recognised by Govt. of Karnataka
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 mt-8 border-t border-navy-800 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} Sri Vidya International Pre-University College. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-500 mt-1">
              <strong>Notice:</strong> This web portal is an educational demonstration application. All student records, results, statistics, and personages are realistic fictional demonstration data.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <Link to="/about" className="hover:text-gold-400">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gold-400">Anti-Ragging Cell</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gold-400">Terms of Portal Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

