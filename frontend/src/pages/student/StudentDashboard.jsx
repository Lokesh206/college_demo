import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Calendar, Clock, Award, BookOpen, 
  CreditCard, CheckCircle2, AlertCircle, FileText, Download, 
  Play, RefreshCw, BarChart2 
} from 'lucide-react';
import { api } from '../../services/api';
import PaymentModal from '../../components/fees/PaymentModal';
import CBTExamEngine from '../../components/exams/CBTExamEngine';

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, attendance, marks, timetable, materials, fees
  const [feeRecord, setFeeRecord] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTestId, setActiveTestId] = useState(null);

  useEffect(() => {
    async function loadStudentData() {
      try {
        setLoading(true);
        const dashData = await api.getStudentDashboard();
        setData(dashData);

        if (dashData.student?.id) {
          const feeRes = await api.getStudentFee(dashData.student.id);
          setFeeRecord(feeRes.fee_record);
        }
      } catch (err) {
        console.error('Failed to load student dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStudentData();
  }, []);

  const handlePaymentSuccess = (res) => {
    setFeeRecord(res.updated_fee_record);
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8">
        <RefreshCw className="w-10 h-10 text-gold-500 animate-spin mb-3" />
        <p className="text-sm text-slate-600 font-medium">Accessing student academic profile...</p>
      </div>
    );
  }

  const student = data?.student || {};
  const attendance = data?.attendance || {};
  const marks = data?.marks || [];
  const timetable = data?.timetable || [];
  const materials = data?.materials || [];

  if (activeTestId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CBTExamEngine testId={activeTestId} onExit={() => setActiveTestId(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Welcome Header Card */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex gap-4 items-center">
          <img
            src={student.photo_url || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"}
            alt={student.full_name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-gold-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black font-serif text-white">{student.full_name}</h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold-500 text-navy-950">Active</span>
            </div>
            <p className="text-xs text-gold-400 font-semibold mt-0.5">
              Admission No: {student.admission_no} • Roll No: {student.roll_no}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              {student.year} • {student.stream_name} ({student.combination_name} - Sec {student.section}) • Target: {student.target_exams}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTestId(1)}
            className="px-4 py-2.5 bg-gold-600 hover:bg-gold-500 text-navy-950 font-bold rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch KCET CBT Mock</span>
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className="px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold rounded-xl border border-navy-700 transition flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-gold-400" />
            <span>Fee Status</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'overview', label: 'Academic Overview' },
          { id: 'attendance', label: 'Attendance Record' },
          { id: 'marks', label: 'Internal Exam Marks' },
          { id: 'timetable', label: 'Class Timetable' },
          { id: 'materials', label: 'Notes & Formula Sheets' },
          { id: 'fees', label: 'Fee Management & Receipts' }
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

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Key Metric Gauges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Attendance</span>
              <div className="text-3xl font-black text-emerald-700 mt-1">
                {attendance.attendance_percentage}%
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{attendance.present_classes} of {attendance.total_classes} Classes Attended</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Latest Midterm Score</span>
              <div className="text-3xl font-black text-navy-950 mt-1">
                94.4%
              </div>
              <p className="text-[11px] text-gold-600 font-bold mt-0.5">Grade A+ (Distinction Track)</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">KCET Sprint Accuracy</span>
              <div className="text-3xl font-black text-navy-950 mt-1">
                88.0%
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Top 5% in College Cohort</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Outstanding Balance</span>
              <div className="text-3xl font-black text-amber-700 mt-1">
                ₹ {feeRecord ? feeRecord.balance_amount.toLocaleString() : '28,000'}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{feeRecord?.status || 'Partial'} Status</p>
            </div>
          </div>

          {/* Recent Internal Marks Table Preview */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-navy-950 font-serif text-sm">Recent Mid-Term Examination Scores</h3>
              <button onClick={() => setActiveTab('marks')} className="text-xs text-gold-700 font-bold">
                View All Marks
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-navy-950 text-white uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Examination Type</th>
                    <th className="p-3">Marks Obtained</th>
                    <th className="p-3">Max Marks</th>
                    <th className="p-3">Percentage</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3">Faculty Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {marks.slice(4, 9).map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-navy-950">{m.subject_name}</td>
                      <td className="p-3">{m.exam_type}</td>
                      <td className="p-3 font-bold text-emerald-700">{m.marks_obtained}</td>
                      <td className="p-3">{m.max_marks}</td>
                      <td className="p-3 font-bold">{m.percentage}%</td>
                      <td className="p-3 font-bold text-gold-600">{m.grade}</td>
                      <td className="p-3 text-slate-500 italic">{m.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-6 p-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-950 font-serif">Daily Attendance Ledger</h3>
              <p className="text-xs text-slate-500">Official PU Board attendance register requirement: Minimum 75%.</p>
            </div>
            <div className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold">
              Eligible for Board Exams ({attendance.attendance_percentage}%)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-navy-950 text-white uppercase text-[11px]">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Subject / Session</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(attendance.recent_logs || []).map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">{log.date}</td>
                    <td className="p-3 font-semibold text-navy-950">{log.subject_name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{log.remarks || 'Standard session'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Marks */}
      {activeTab === 'marks' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-6 p-6 animate-in fade-in">
          <h3 className="text-base font-bold text-navy-950 font-serif">All Internal Marks & Grade Transcripts</h3>
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
                  <th className="p-3">Faculty Feedback</th>
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
                    <td className="p-3 text-slate-500 italic">{m.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Timetable */}
      {activeTab === 'timetable' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-6 p-6 animate-in fade-in">
          <h3 className="text-base font-bold text-navy-950 font-serif">2nd PU Science (Section A) Weekly Timetable</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-navy-950 text-white uppercase text-[11px]">
                <tr>
                  <th className="p-3">Timing</th>
                  <th className="p-3">Monday</th>
                  <th className="p-3">Tuesday</th>
                  <th className="p-3">Wednesday</th>
                  <th className="p-3">Thursday</th>
                  <th className="p-3">Friday</th>
                  <th className="p-3">Saturday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {timetable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-navy-950">{row.time}</td>
                    <td className="p-3">{row.mon}</td>
                    <td className="p-3">{row.tue}</td>
                    <td className="p-3">{row.wed}</td>
                    <td className="p-3">{row.thu}</td>
                    <td className="p-3 font-semibold text-blue-900">{row.fri}</td>
                    <td className="p-3 font-bold text-gold-700">{row.sat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Materials */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
          {materials.map((m) => (
            <div key={m.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-navy-950 bg-slate-100 px-2 py-0.5 rounded">
                  {m.subject} • {m.material_type}
                </span>
                <h4 className="text-sm font-bold text-navy-950 font-serif mt-2">{m.title}</h4>
                <p className="text-xs text-slate-500 mt-1">Uploaded by: {m.uploaded_by}</p>
              </div>
              <button
                onClick={() => alert(`Downloading study resource: ${m.title}`)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Notes / PDF</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Fee Management & Receipts */}
      {activeTab === 'fees' && feeRecord && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-950 font-serif">Fee Ledger & Payment Receipts</h3>
              <p className="text-xs text-slate-500">Academic Year: {feeRecord.academic_year}</p>
            </div>
            {feeRecord.balance_amount > 0 && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Outstanding Balance (₹ {feeRecord.balance_amount.toLocaleString()})</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Scheduled Gross Fee:</span>
              <div className="text-lg font-black text-slate-900 mt-1">₹ {feeRecord.total_fee.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Merit Concession:</span>
              <div className="text-lg font-black text-emerald-700 mt-1">- ₹ {feeRecord.concession_amount.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Amount Paid:</span>
              <div className="text-lg font-black text-navy-950 mt-1">₹ {feeRecord.paid_amount.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-amber-800">Remaining Balance:</span>
              <div className="text-lg font-black text-amber-900 mt-1">₹ {feeRecord.balance_amount.toLocaleString()}</div>
            </div>
          </div>

          {/* Transactions & PDF Receipts */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-navy-950 font-serif">Official Payment Receipts</h4>
            {(feeRecord.transactions || []).length === 0 ? (
              <p className="text-xs text-slate-500">No payment transactions recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {feeRecord.transactions.map((txn) => (
                  <div key={txn.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-navy-950">Receipt No: {txn.receipt_no}</div>
                      <div className="text-slate-500 font-mono text-[11px]">Txn Ref: {txn.transaction_ref} • {txn.payment_date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-black text-sm text-navy-950">₹ {txn.amount.toLocaleString()}</span>
                        <div className="text-[10px] text-emerald-600 font-bold">Successful</div>
                      </div>
                      <a
                        href={api.getReceiptPdfUrl(txn.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-navy-950 text-gold-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-navy-900 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Receipt</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && feeRecord && (
        <PaymentModal
          studentId={student.id}
          balanceAmount={feeRecord.balance_amount}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

    </div>
  );
}

