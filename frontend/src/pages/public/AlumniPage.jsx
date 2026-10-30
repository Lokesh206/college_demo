import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, Briefcase, Building, Quote } from 'lucide-react';
import { api } from '../../services/api';

export default function AlumniPage() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    async function loadAlumni() {
      try {
        const data = await api.getAlumni();
        setAlumni(data);
      } catch (err) {
        console.error('Failed to load alumni:', err);
      }
    }
    loadAlumni();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Global Alumni Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Distinguished Alumni Association
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            From premier hospitals (AIIMS) to global technology frontiers (Google DeepMind) and civil administration (IAS).
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {alumni.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200/90 p-6 flex flex-col justify-between space-y-4 transition-all"
            >
              <div>
                <img
                  src={a.image_url || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80"}
                  alt={a.name}
                  className="w-full h-52 object-cover rounded-xl border border-slate-200 mb-4"
                />
                <span className="text-[10px] uppercase font-bold text-navy-950 bg-gold-100 px-2 py-0.5 rounded">
                  Batch {a.passing_year} • {a.stream}
                </span>
                <h3 className="text-lg font-bold text-navy-950 font-serif mt-2">{a.name}</h3>
                
                <div className="pt-2 text-xs space-y-1 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="font-semibold text-slate-900">{a.current_role}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{a.company_or_institute}</span>
                  </div>
                </div>

                {a.quote && (
                  <p className="text-xs text-slate-600 italic leading-relaxed pt-3 border-t border-slate-100 mt-3">
                    "{a.quote}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

