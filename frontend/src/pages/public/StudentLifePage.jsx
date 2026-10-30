import React, { useState } from 'react';
import { 
  Sparkles, Trophy, Users, Shield, Heart, Compass, 
  Lightbulb, Calendar, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function StudentLifePage() {
  const [activeTab, setActiveTab] = useState('clubs');

  const clubs = [
    { name: 'Turing Coding & AI Club', desc: 'Hackathons, algorithmic problem solving, Python coding, and AI prototype showcases.', badge: 'Technology' },
    { name: 'Raman Science & Robotics Society', desc: 'Hands-on rocketry, robotics kits, solar-powered vehicles, and state science exhibitions.', badge: 'Innovation' },
    { name: 'Chanakya Commerce & FinTech Forum', desc: 'Virtual equity trading tournaments, corporate balance-sheet analyses, and CA guest lectures.', badge: 'Finance' },
    { name: 'Kautilya MUN & Debate Society', desc: 'Model United Nations, parliamentary debate format, oratory training, and moot courts.', badge: 'Leadership' },
    { name: 'Prerana NSS & Social Outreach', desc: 'Village literacy drives, tree planting initiatives, blood donation camps, and elderly care.', badge: 'Service' },
    { name: 'Kala Sangama Cultural Troupe', desc: 'Classical Bharatanatyam, Yakshagana, Western acoustics, theatrical drama, and visual arts.', badge: 'Cultural' }
  ];

  const fests = [
    {
      name: 'PRAGYAN - National Science & Tech Fest',
      desc: 'Annual 2-day extravaganza featuring over 80 working science models, competitive robotics maze, and quiz bowl.',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'TARANG - Inter-Collegiate Cultural Festival',
      desc: 'Bengaluru’s vibrant youth festival drawing participants from 40+ colleges for music, drama, fashion, and dance.',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'SPARDHA - Annual Athletic Olympiad',
      desc: 'Three-day athletic showdown across 100m sprint, relay, long jump, football, volleyball, and chess tournaments.',
      img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const welfareCommittees = [
    { title: 'Anti-Ragging Squad & Cell', desc: 'Zero tolerance policy with CCTV monitoring and 24/7 dedicated confidential student helpline.' },
    { title: 'Student Mentorship System', desc: 'Every faculty member is assigned 20 mentees for weekly academic tracking and personal counseling.' },
    { title: 'Women Safety & Grievance Cell', desc: 'Dedicated committee headed by senior women faculty ensuring emotional safety and gender equity.' },
    { title: 'Remedial Academic Clinics', desc: 'Free afternoon reinforcement classes for students needing additional clarity in core subjects.' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Holistic Student Development</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Student Life & Campus Culture
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Beyond academic distinction, Sri Vidya fosters leadership, artistic expression, community empathy, and physical fitness.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex gap-2 -mb-px">
            {[
              { id: 'clubs', label: 'Student Clubs & Societies' },
              { id: 'fests', label: 'Annual Cultural & Tech Fests' },
              { id: 'welfare', label: 'Student Welfare & Support' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-gold-600 text-navy-950 bg-slate-50'
                    : 'border-transparent text-slate-500 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Clubs */}
        {activeTab === 'clubs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            {clubs.map((c, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-premium border border-slate-200 p-6 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-navy-900 bg-gold-50 border border-gold-200 px-2 py-0.5 rounded">
                    {c.badge}
                  </span>
                  <h4 className="text-base font-bold text-navy-950 font-serif mt-2">{c.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{c.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-gold-700 font-semibold">
                  <span>Open for 1st & 2nd PU</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Fests */}
        {activeTab === 'fests' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
            {fests.map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-premium overflow-hidden border border-slate-200 flex flex-col justify-between">
                <div>
                  <img src={f.img} alt={f.name} className="w-full h-52 object-cover" />
                  <div className="p-6 space-y-2">
                    <h4 className="text-base font-bold text-navy-950 font-serif">{f.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  Annual Campus Tradition
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Welfare & Safety */}
        {activeTab === 'welfare' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            {welfareCommittees.map((w, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-premium flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-navy-50 text-navy-900 shrink-0">
                  <Shield className="w-6 h-6 text-gold-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-navy-950 font-serif">{w.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                  <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statutory Committee Active & Monitored</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

