import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, Award, BookOpen, GraduationCap, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

export default function FacultyPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);

  const departments = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Commerce', 'Arts'];

  useEffect(() => {
    async function fetchFaculty() {
      try {
        setLoading(true);
        const params = {};
        if (selectedDept !== 'All') params.department = selectedDept;
        if (search) params.search = search;
        const data = await api.getFaculty(params);
        setFacultyList(data);
      } catch (err) {
        console.error('Failed to load faculty:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFaculty();
  }, [selectedDept, search]);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Mentorship Council</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Distinguished Faculty Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Meet our team of 64+ scholarly lecturers and national competitive exam specialists committed to your academic victory.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Department Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, subject, specialization..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-900"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedDept === dept
                    ? 'bg-navy-950 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 text-gold-500 animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading faculty profiles...</p>
          </div>
        ) : facultyList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-600">No faculty members found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facultyList.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200/90 p-6 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={f.photo_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                    alt={f.full_name}
                    className="w-24 h-28 rounded-xl object-cover border-2 border-slate-200 shadow-sm shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      ID: {f.employee_id} • {f.department}
                    </span>
                    <h3 className="text-lg font-bold text-navy-950 font-serif leading-tight">
                      {f.full_name}
                    </h3>
                    <div className="text-xs font-semibold text-gold-600">
                      {f.designation}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium">
                      {f.qualifications} ({f.experience_years} Years Experience)
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  {f.specialization && (
                    <div>
                      <strong className="text-navy-950">Specialization:</strong> {f.specialization}
                    </div>
                  )}

                  {f.kcet_exp && (
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px]">
                      <span className="font-bold text-navy-950 block">Competitive Entrance Mentorship:</span>
                      <span>KCET: {f.kcet_exp}</span><br />
                      {f.neet_exp && <span>NEET: {f.neet_exp}</span>}
                    </div>
                  )}

                  {f.teaching_methodology && (
                    <div className="text-[11px] italic text-slate-600">
                      "{f.teaching_methodology}"
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap justify-between items-center text-[11px] text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{f.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{f.cabin || 'Block A Faculty Room'}</span>
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

