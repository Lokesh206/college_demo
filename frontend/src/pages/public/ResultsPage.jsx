import React, { useState, useEffect } from 'react';
import { 
  Trophy, Award, BarChart3, TrendingUp, CheckCircle2, 
  Download, ArrowRight, ShieldCheck, GraduationCap 
} from 'lucide-react';
import { api } from '../../services/api';

export default function ResultsPage() {
  const [data, setData] = useState({ board_results: [], toppers: [], competitive_rankers: [] });
  const [activeTab, setActiveTab] = useState('board'); // board, toppers, competitive
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      try {
        setLoading(true);
        const res = await api.getResults();
        setData(res);
      } catch (err) {
        console.error('Failed to load results:', err);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Karnataka PU Board & National Gateways</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Academic Results & Achievements
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Consistently leading Karnataka Pre-University performance metrics with 99.52% overall pass rate and top 10 state ranks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex gap-2 -mb-px">
            {[
              { id: 'board', label: 'PU Board Performance' },
              { id: 'toppers', label: 'State & College Toppers' },
              { id: 'competitive', label: 'KCET / NEET / JEE Ranks' }
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

        {/* Tab 1: Board Results */}
        {activeTab === 'board' && (
          <div className="space-y-8 animate-in fade-in">
            {/* High-level performance cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">Overall Pass Rate</span>
                <div className="text-3xl font-black text-navy-950 mt-1">99.52%</div>
                <span className="text-[11px] text-emerald-600 font-bold">418 / 420 Passed</span>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">Distinction Ratio</span>
                <div className="text-3xl font-black text-gold-600 mt-1">82.4%</div>
                <span className="text-[11px] text-slate-600 font-medium">345 Distinctions</span>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">Commerce Pass Rate</span>
                <div className="text-3xl font-black text-navy-950 mt-1">100.0%</div>
                <span className="text-[11px] text-emerald-600 font-bold">All 95 Students Passed</span>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">District Standing</span>
                <div className="text-3xl font-black text-navy-950 mt-1">Rank 1</div>
                <span className="text-[11px] text-slate-600 font-medium">Bengaluru South District</span>
              </div>
            </div>

            {/* Historical Board Results Table */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-5 bg-slate-50 border-b border-slate-200 font-bold text-navy-950 font-serif text-sm">
                Year-Wise PU Board Performance Summary
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-navy-950 text-white uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Academic Year</th>
                      <th className="p-3.5">Stream</th>
                      <th className="p-3.5">Appeared</th>
                      <th className="p-3.5">Passed</th>
                      <th className="p-3.5">Distinctions (85%+)</th>
                      <th className="p-3.5">First Class</th>
                      <th className="p-3.5">Pass %</th>
                      <th className="p-3.5">District Standing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.board_results.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-bold text-navy-950">{r.academic_year}</td>
                        <td className="p-3.5 font-semibold text-slate-900">{r.stream}</td>
                        <td className="p-3.5">{r.total_appeared}</td>
                        <td className="p-3.5 font-bold text-emerald-700">{r.passed}</td>
                        <td className="p-3.5 font-bold text-gold-600">{r.distinction_count}</td>
                        <td className="p-3.5">{r.first_class_count}</td>
                        <td className="p-3.5 font-black text-navy-950">{r.pass_percentage}%</td>
                        <td className="p-3.5 text-slate-600">{r.college_rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Toppers */}
        {activeTab === 'toppers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
            {data.toppers.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl shadow-premium border border-slate-200 p-6 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <img
                    src={t.photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
                    alt={t.student_name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-gold-400 shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 p-1.5 bg-navy-950 text-gold-400 rounded-full border-2 border-white shadow">
                    <Award className="w-5 h-5" />
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-navy-950 font-serif">{t.student_name}</h4>
                  <div className="text-xs font-bold text-gold-600 uppercase tracking-wide mt-0.5">{t.rank_title}</div>
                  <div className="text-xs text-slate-500">{t.stream} ({t.combination}) • Batch {t.academic_year}</div>
                </div>

                <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs">
                  <span className="text-slate-500 block">Marks Obtained:</span>
                  <span className="text-xl font-black text-navy-950">{t.score_marks} / {t.total_marks} ({t.percentage}%)</span>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{t.testimonial}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Competitive Rankers */}
        {activeTab === 'competitive' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
            {data.competitive_rankers.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl shadow-premium border border-slate-200 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={r.photo_url || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"}
                    alt={r.student_name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-navy-950 bg-gold-100 px-2 py-0.5 rounded">
                      {r.exam_name} High Ranker
                    </span>
                    <h4 className="font-bold text-navy-950 text-base font-serif mt-1">{r.student_name}</h4>
                    <p className="text-[11px] text-slate-500">Academic Year {r.academic_year}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Score / %ile:</span>
                    <span className="font-bold text-navy-950">{r.score}</span>
                  </div>
                  {r.state_rank && (
                    <div className="flex justify-between text-gold-700">
                      <span>Karnataka State Rank:</span>
                      <span className="font-bold">Rank {r.state_rank}</span>
                    </div>
                  )}
                  {r.all_india_rank && (
                    <div className="flex justify-between text-purple-700">
                      <span>All India Rank (AIR):</span>
                      <span className="font-bold">AIR {r.all_india_rank}</span>
                    </div>
                  )}
                </div>

                {r.college_enrolled && (
                  <div className="text-xs text-slate-700 pt-1">
                    <strong className="text-navy-950 block text-[11px]">Enrolled Institution:</strong>
                    <span>{r.college_enrolled}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

