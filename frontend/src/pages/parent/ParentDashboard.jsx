import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, AlertCircle, Calendar, CreditCard, 
  MessageSquare, FileText, Phone, Download, RefreshCw 
} from 'lucide-react';
import { api } from '../../services/api';
import PaymentModal from '../../components/fees/PaymentModal';

export default function ParentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);
  const [activeTab, setActiveTab] = useState('child_profile'); // child_profile, attendance, results, fees, ptm

  useEffect(() => {
    async function loadParentData() {
      try {
        setLoading(true);
        const res = await api.getParentDashboard();
        setData(res);
      } catch (err) {
        console.error('Failed to load parent dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadParentData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8">
        <RefreshCw className="w-10 h-10 text-gold-500 animate-spin mb-3" />
        <p className="text-sm text-slate-600 font-medium">Connecting to Parent Access Gateway...</p>
      </div>
    );
  }

  const parent = data?.parent || {};
  const studentData = data?.primary_student_data || {};
  const student = studentData.profile || {};
  const attendance = studentData.attendance_summary || {};
  const marks = studentData.marks || [];
  const feeSummary = studentData.fee_summary || {};
  const ptm = data?.ptm_schedule || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Parent Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Guardian Portal</span>
          <h1 className="text-2xl font-black font-serif text-white mt-1">Welcome, {parent.full_name}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Linked Ward: <strong>{student.full_name}</strong> ({student.admission_no}) • {student.year} {student.stream_name} ({student.combination_name})
          </p>
        </div>

        <div className="flex gap-2">
          {feeSummary.balance_amount > 0 && (
            <button
              onClick={() => setShowPayModal(true)}
              className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
            >
              Pay Balance (₹ {feeSummary.balance_amount.toLocaleString()})
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'child_profile', label: 'Ward Academic Overview' },
          { id: 'attendance', label: 'Attendance & Leave Logs' },
          { id: 'results', label: 'Exam Marks & Grades' },
          { id: 'fees', label: 'Fees & Payment Receipts' },
          { id: 'ptm', label: 'PTM & Teacher Meeting' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-gold-600 text-navy-950 bg-slate-50'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Ward Overview */}
      {activeTab === 'child_profile' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Attendance Status</span>
              <div className="text-3xl font-black text-emerald-700 mt-1">{attendance.percentage}%</div>
              <p className="text-[11px] text-slate-500 mt-0.5">{attendance.present} Present / {attendance.total} Held</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Mid-Term Grade</span>
              <div className="text-3xl font-black text-navy-950 mt-1">94.4%</div>
              <p className="text-[11px] text-gold-600 font-bold mt-0.5">Top 5 in Section A</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Fee Status</span>
              <div className="text-3xl font-black text-amber-700 mt-1">₹ {feeSummary.balance_amount?.toLocaleString()}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Balance Remaining</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Next PTM Date</span>
              <div className="text-xl font-black text-navy-950 mt-2">Nov 08, 2026</div>
              <p className="text-[11px] text-slate-500 mt-0.5">09:30 AM (Block A)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-navy-950 font-serif text-base">Faculty Mentor Remarks for Rohit</h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>Dr. Anand Rao (HOD Physics & Mentor):</strong> "Rohit demonstrates outstanding analytical clarity in Mechanics and Electromagnetism. His numerical speed in KCET practice tests is consistent above 88%. Recommend continued focus on organic chemical reactions before pre-boards."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
          <h3 className="text-base font-bold text-navy-950 font-serif">Attendance Overview for {student.full_name}</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Total Lectures</span>
              <div className="text-2xl font-black text-navy-950">{attendance.total}</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs text-emerald-700">Present</span>
              <div className="text-2xl font-black text-emerald-800">{attendance.present}</div>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-xs text-rose-700">Absent / Leave</span>
              <div className="text-2xl font-black text-rose-800">{attendance.absent}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Results */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
          <h3 className="text-base font-bold text-navy-950 font-serif">Academic Test Scores & Board Preparatory Marks</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-navy-950 text-white uppercase text-[11px]">
                <tr>
                  <th className="p-3">Exam Type</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Marks Obtained</th>
                  <th className="p-3">Max Marks</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {marks.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-navy-950">{m.exam_type}</td>
                    <td className="p-3 font-bold text-slate-900">{m.subject_name}</td>
                    <td className="p-3 font-bold text-emerald-700">{m.marks_obtained}</td>
                    <td className="p-3">{m.max_marks}</td>
                    <td className="p-3 font-bold">{m.percentage}%</td>
                    <td className="p-3 font-bold text-gold-600">{m.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Fees */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-navy-950 font-serif">Fee Ledger & Receipts</h3>
            {feeSummary.balance_amount > 0 && (
              <button
                onClick={() => setShowPayModal(true)}
                className="px-4 py-2 bg-gold-600 text-navy-950 rounded-lg text-xs font-bold"
              >
                Pay Outstanding Balance
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Gross Fee:</span>
              <div className="text-lg font-black text-slate-900">₹ {feeSummary.total_fee?.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Merit Concession:</span>
              <div className="text-lg font-black text-emerald-700">- ₹ {feeSummary.concession_amount?.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Paid Amount:</span>
              <div className="text-lg font-black text-navy-950">₹ {feeSummary.paid_amount?.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-amber-800">Remaining Balance:</span>
              <div className="text-lg font-black text-amber-900">₹ {feeSummary.balance_amount?.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: PTM */}
      {activeTab === 'ptm' && (
        <div className="space-y-4 animate-in fade-in">
          {ptm.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gold-600">{p.date}</span>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{p.time}</span>
              </div>
              <h4 className="text-base font-bold text-navy-950 font-serif">{p.event}</h4>
              <p className="text-xs text-slate-600">{p.agenda}</p>
              <div className="pt-2 text-xs text-slate-500">
                Venue: <strong>{p.venue}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {showPayModal && (
        <PaymentModal
          studentId={student.id}
          balanceAmount={feeSummary.balance_amount || 0}
          onSuccess={() => { setShowPayModal(false); window.location.reload(); }}
          onClose={() => setShowPayModal(false)}
        />
      )}

    </div>
  );
}

