import React, { useState } from 'react';
import { 
  GraduationCap, Award, Compass, ShieldCheck, HeartHandshake, 
  Lightbulb, Users, Calendar, Target, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const milestones = [
    { year: '2008', title: 'Inception & Foundation', desc: 'Sri Vidya Educational Trust established the campus in Outer Ring Road Bengaluru with 120 Science students.' },
    { year: '2012', title: 'State Board Recognition', desc: 'Awarded "Grade A PU College" by Karnataka Pre-University Education Board with 100% first class result.' },
    { year: '2016', title: 'Integrated KCET/NEET Hub', desc: 'Launched dedicated entrance coaching laboratories and recruited senior Kota & Bengaluru faculties.' },
    { year: '2020', title: 'Smart Digital Campus', desc: 'Installed interactive smart boards across 60 classrooms and created cloud-based CBT mock exam systems.' },
    { year: '2024', title: 'Top 3 Karnataka Ranks', desc: 'Sri Vidya students secured State 2nd rank in Science and State 4th rank in Commerce, with 345 Distinctions.' },
    { year: '2026', title: 'Innovation & Research Wing', desc: 'Inauguration of Sir C.V. Raman advanced STEM laboratories and Turing AI robotics research cell.' }
  ];

  const management = [
    {
      name: 'Dr. Sri Vidya Sagar',
      role: 'Founder & Visionary Patron',
      qualification: 'M.Tech, Ph.D. (Cantab), D.Sc. (Former Vice-Chancellor & Philanthropist)',
      desc: 'Dedicated his career and personal endowment to establishing an integrated educational powerhouse combining Karnataka PU Board excellence with national entrance success.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Smt. Shakuntala Vidya Sagar',
      role: 'Co-Founder & Managing Trustee',
      qualification: 'M.A., B.Ed., M.Phil. in Educational Administration',
      desc: 'Pioneer of girls\' STEM scholarship programs in Karnataka. Ensures comprehensive hostel security, student counseling, and financial merit aid.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sri B.S. Krishnamurthy',
      role: 'Co-Founder & Chairman, Governing Board',
      qualification: 'B.Sc., LL.M., Senior Advocate High Court of Karnataka',
      desc: 'Provides strategic legal, statutory, and institutional governance to maintain gold-standard academic integrity and zero capitation fees.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. R. Narayan, M.Sc., Ph.D.',
      role: 'Co-Founder, Principal & Academic Dean',
      qualification: 'Ph.D. in Physics, Former State PU Board Syllabus Committee Member',
      desc: '34 years of illustrious leadership in Pre-University pedagogy, mentoring over 40 State Top 10 rankers into AIIMS and IITs.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Smt. Gayatri Rao',
      role: 'Secretary & Director of Academics',
      qualification: 'M.Ed., M.Phil. in Educational Psychology',
      desc: 'Oversees student mentorship frameworks, remedial coaching initiatives, and comprehensive faculty development across Science and Commerce.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Legacy of Educational Distinction</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            About Sri Vidya International PU College
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Nurturing intellectual rigor, ethical values, and competitive excellence since 2008 in the Silicon Capital of India.
          </p>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 mb-10 no-scrollbar">
          {[
            { id: 'overview', label: 'Institutional Profile' },
            { id: 'leadership', label: 'Management & Principal' },
            { id: 'vision', label: 'Vision, Mission & Values' },
            { id: 'timeline', label: 'Milestones & History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-gold-600 text-navy-950 bg-slate-50'
                  : 'border-transparent text-slate-500 hover:text-navy-900 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Profile & Principal Message */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-sm">
                <h2 className="text-2xl font-bold text-navy-950 font-serif">
                  A Beacon of Academic Rigor in Bengaluru
                </h2>
                <p>
                  Sri Vidya International Pre-University College was founded under the aegis of the Sri Vidya Educational Trust with a resolute commitment: to bridge the gap between rigorous PU Board academic depth and high-speed competitive aptitude needed for <strong>KCET, NEET, and JEE</strong>.
                </p>
                <p>
                  Situated on an expansive 8.5-acre green campus along the tech corridor of Outer Ring Road, Marathahalli-Sarjapur Junction, the college combines tranquil learning environs with cutting-edge academic infrastructure. Over the last 18 years, Sri Vidya has established an enviable benchmark, boasting a 99.52% overall PU Board pass rate, with more than 82% students achieving First Class with Distinction.
                </p>
                <div className="p-4 bg-navy-50 border border-navy-100 rounded-xl space-y-2">
                  <div className="font-bold text-navy-950 text-xs uppercase tracking-wider">Affiliation & Compliance</div>
                  <p className="text-xs text-slate-600">
                    Recognised by the Government of Karnataka | Department of Pre-University Education. College Board Code: <strong>AS-0482</strong>.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                    alt="Campus Building"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4 bg-white text-center text-xs text-slate-500">
                    Vidya Soudha Central Administrative & Academic Block
                  </div>
                </div>
              </div>
            </div>

            {/* Principal's Message */}
            <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-2xl p-8 lg:p-10 shadow-xl border border-navy-800">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 text-center md:text-left space-y-3">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                    alt="Dr. R. Narayan"
                    className="w-32 h-32 rounded-2xl object-cover mx-auto md:mx-0 border-2 border-gold-400 shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold font-serif">Dr. R. Narayan</h3>
                    <p className="text-xs text-gold-400 font-semibold">Principal & Academic Dean</p>
                    <p className="text-[11px] text-slate-400">M.Sc., Ph.D. (IISc Fellow)</p>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3 text-sm text-slate-200 leading-relaxed italic">
                  <div className="text-2xl text-gold-400 font-serif">“</div>
                  <p>
                    Pre-University is undeniably the most defining crossroads of a student's educational trajectory. At Sri Vidya, our educational philosophy transcends rote memorization. We train our students to think methodically, dissect complex scientific and commercial principles from first principles, and cultivate emotional resilience.
                  </p>
                  <p>
                    Whether your dream is donning a white coat through NEET, innovating algorithms at an IIT via JEE, founding a financial enterprise through CA, or shaping public governance through UPSC, Sri Vidya offers the exact mentorship ecosystem you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leadership & Management */}
        {activeTab === 'leadership' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-navy-950 font-serif">Board of Trustees & Leadership</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Eminent academicians, jurists, and philanthropists guiding Sri Vidya toward global standards in secondary education.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {management.map((m, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-premium border border-slate-200/90 overflow-hidden flex flex-col justify-between">
                  <img src={m.photo} alt={m.name} className="w-full h-56 object-cover" />
                  <div className="p-5 space-y-2 flex-1">
                    <h4 className="text-base font-bold text-navy-950 font-serif">{m.name}</h4>
                    <div className="text-xs font-bold text-gold-600 uppercase">{m.role}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{m.qualification}</div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Vision, Mission & Values */}
        {activeTab === 'vision' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-premium border border-slate-200/90 p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center border border-gold-200">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 font-serif">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To be the foremost Pre-University academic institution in South India, recognized for transforming passionate students into ethical leaders, world-class scientists, transformative entrepreneurs, and socially conscious citizens.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-premium border border-slate-200/90 p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center border border-navy-200">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 font-serif">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To provide holistic, experiential education combining rigorous NCERT board mastery with targeted competitive entrance preparation. We foster an inclusive, technology-enabled environment that nurtures curiosity and character.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-premium border border-slate-200/90 p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 font-serif">Core Values</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Academic Integrity:</strong> Uncompromising dedication to truth and disciplined effort.</li>
                <li>• <strong>Individual Mentorship:</strong> Recognizing that every student learns with a unique rhythm.</li>
                <li>• <strong>Civic Responsibility:</strong> Community service and environmental consciousness.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Milestones Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-navy-950 font-serif">Institutional Journey</h2>
              <p className="text-xs text-slate-600">Key milestones in our 18 years of academic leadership.</p>
            </div>

            <div className="relative border-l-2 border-gold-500/40 ml-4 md:ml-32 space-y-8 py-4">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative pl-6 md:pl-8 group">
                  <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-navy-950 border-4 border-gold-500 group-hover:scale-125 transition-transform" />
                  <div className="md:absolute md:-left-28 md:top-1 font-black text-gold-600 text-sm md:text-right md:w-20">
                    {m.year}
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                    <h4 className="text-sm font-bold text-navy-950 font-serif">{m.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

