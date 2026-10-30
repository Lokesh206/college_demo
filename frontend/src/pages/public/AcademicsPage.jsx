import React, { useState, useEffect } from 'react';
import { 
  Atom, TrendingUp, Landmark, BookOpen, Clock, Award, 
  ChevronRight, Download, CheckCircle2, FileText, Calendar 
} from 'lucide-react';
import { api } from '../../services/api';

export default function AcademicsPage() {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState('Science');

  useEffect(() => {
    async function loadStreams() {
      try {
        const data = await api.getStreams();
        setStreams(data);
      } catch (err) {
        console.error('Failed to load streams:', err);
      }
    }
    loadStreams();
  }, []);

  const streamDetails = {
    Science: {
      hod: 'Dr. Anand Rao, M.Sc., Ph.D.',
      hodRole: 'HOD Science & Physics Specialist (Former IISc Fellow)',
      hodPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      description: 'The Department of Science offers intensive 2-year Pre-University courses designed for aspirants aiming for national medical and engineering gateways. We operate 4 specialized laboratories equipped with research-grade instruments.',
      methodology: 'Integrated curriculum blending Karnataka State Board NCERT theory in the morning with high-speed problem-solving and numerical workshops in the afternoon.',
      combinations: [
        {
          code: 'PCMB',
          name: 'Physics, Chemistry, Mathematics, Biology',
          careers: 'MBBS, BDS, Biotechnology, Pure Science Research (IISc / IISER), Biomedical Engineering, Agricultural Sciences.',
          intake: 160
        },
        {
          code: 'PCMC',
          name: 'Physics, Chemistry, Mathematics, Computer Science',
          careers: 'B.Tech / B.E in Artificial Intelligence, Computer Science, Robotics, Data Science, Software Architecture, Cybersecurity.',
          intake: 140
        }
      ],
      labs: ['Sir C.V. Raman Physics Lab', 'Marie Curie Analytical Chemistry Lab', 'Charles Darwin Biotech & Zoology Lab', 'Turing 120-PC High-Performance Computing Lab']
    },
    Commerce: {
      hod: 'Prof. Rekha Hegde, M.Com., M.Phil., FCA',
      hodRole: 'HOD Commerce & Corporate Accounting Fellow',
      hodPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      description: 'The Department of Commerce equips students with mastery over financial reporting, economic principles, taxation frameworks, and business law. Supported by an integrated CA Foundation and CS coaching club.',
      methodology: 'Case-study discussions, real-time stock simulation exercises, corporate balance-sheet analysis, and regular guest lectures by practicing Chartered Accountants.',
      combinations: [
        {
          code: 'CEBA',
          name: 'Computer Science, Economics, Business Studies, Accountancy',
          careers: 'Chartered Accountancy (CA), FinTech, Investment Banking, B.Com, BBA, Corporate Law, Management Consulting.',
          intake: 100
        },
        {
          code: 'SEBA',
          name: 'Statistics, Economics, Business Studies, Accountancy',
          careers: 'Actuarial Sciences, Econometrics, Quantitative Analytics, Financial Modeling, Civil Services (IES).',
          intake: 80
        }
      ],
      labs: ['Modern Tally & ERP Accounting Lab', 'Data Analytics & Statistics Simulator']
    },
    Arts: {
      hod: 'Dr. Suresh Kumar, M.A., Ph.D.',
      hodRole: 'HOD Arts & Senior Lecturer in Political Science',
      hodPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      description: 'The Department of Arts & Humanities provides an intellectual platform for world history, political systems, sociological inquiry, and legal thought, acting as a direct springboard for UPSC Civil Services aspirants.',
      methodology: 'Socratic seminars, Model United Nations (MUN), moot courts, field trips to the Karnataka Legislative Assembly (Vidhana Soudha), and research essay writing.',
      combinations: [
        {
          code: 'HEPS',
          name: 'History, Economics, Political Science, Sociology',
          careers: 'UPSC Civil Services (IAS, IFS, IPS), KAS, Constitutional Law (BA LLB), International Diplomacy, Journalism, Policy Think Tanks.',
          intake: 60
        }
      ],
      labs: ['Model Parliament & Moot Court Chamber', 'Digital Archives & Historical Cartography Cell']
    }
  };

  const currentInfo = streamDetails[selectedStream] || streamDetails.Science;

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Karnataka PU Board Syllabus</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Academic Departments & Combinations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Rigorous 2-year Pre-University courses designed to build unshakeable fundamentals for higher education.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Stream Selector Tabs */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { id: 'Science', label: 'Science Stream', icon: Atom },
            { id: 'Commerce', label: 'Commerce Stream', icon: TrendingUp },
            { id: 'Arts', label: 'Arts & Humanities', icon: Landmark }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedStream(id)}
              className={`p-4 rounded-xl border text-center transition flex flex-col items-center gap-2 ${
                selectedStream === id
                  ? 'bg-navy-950 text-white border-navy-950 shadow-lg ring-2 ring-gold-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-6 h-6 ${selectedStream === id ? 'text-gold-400' : 'text-slate-500'}`} />
              <span className="text-xs sm:text-sm font-bold">{label}</span>
            </button>
          ))}
        </div>

        {/* Selected Department Overview */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 md:p-10 space-y-8 animate-in fade-in">
          
          {/* Header & HOD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Department Overview</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-serif">
                Department of {selectedStream}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentInfo.description}
              </p>
              <div className="text-xs text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
                <strong className="text-navy-950 block mb-1">Pedagogical Methodology:</strong>
                {currentInfo.methodology}
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-center gap-4">
              <img
                src={currentInfo.hodPhoto}
                alt={currentInfo.hod}
                className="w-16 h-16 rounded-xl object-cover border-2 border-gold-500"
              />
              <div className="text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500">Head of Department</span>
                <h4 className="font-bold text-navy-950 text-sm font-serif">{currentInfo.hod}</h4>
                <p className="text-slate-600 text-[11px] mt-0.5">{currentInfo.hodRole}</p>
              </div>
            </div>
          </div>

          {/* Subject Combinations Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-navy-950 font-serif">
              Available Subject Combinations ({selectedStream})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentInfo.combinations.map((comb) => (
                <div key={comb.code} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-navy-950 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                      {comb.code}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">Annual Intake: {comb.intake} Seats</span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800">
                    {comb.name}
                  </p>

                  <div className="pt-2 text-xs text-slate-600">
                    <strong className="text-navy-950 block mb-0.5">Career & Undergraduate Pathways:</strong>
                    {comb.careers}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="p-5 bg-gold-50/50 border border-gold-200/80 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-navy-950 font-serif">Language Options (Part I)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every student must select <strong>English</strong> as compulsory Part I Language 1, along with one elective from <strong>Kannada, Hindi, or Sanskrit</strong> as Part I Language 2. Special remedial grammar classes are provided for Sanskrit novices.
            </p>
          </div>

          {/* Laboratories & Practicals */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-navy-950 font-serif">Laboratories & Practical Learning</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentInfo.labs.map((lab, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">{lab}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

