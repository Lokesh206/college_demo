import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, GraduationCap, Award, BookOpen, 
  CreditCard, Shield, Download, FileSpreadsheet, Plus, 
  Search, CheckCircle2, AlertCircle, RefreshCw, Eye, Edit3 
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, admissions, students, faculty, audit
  const [analytics, setAnalytics] = useState(null);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status update modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [newStatus, setNewStatus] = useState('Approved');
  const [statusNotes, setStatusNotes] = useState('');

  // Add student form
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentForm, setStudentForm] = useState({
    username: '',
    full_name: '',
    email: '',
    admission_no: '',
    stream_name: 'Science',
    combination_name: 'PCMB',
    year: '1st PU',
    section: 'A'
  });

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        const [aData, appData, sData, fData, logData] = await Promise.all([
          api.getAdminAnalytics(),
          api.getAllApplications(),
          api.getAdminStudents(),
          api.getAdminFaculty(),
          api.getAuditLogs()
        ]);
        setAnalytics(aData);
        setApplications(appData);
        setStudents(sData);
        setFaculty(fData);
        setAuditLogs(logData);
      } catch (err) {
        console.error('Failed to load admin dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;
    try {
      await api.updateApplicationStatus(selectedApp.id, {
        status: newStatus,
        notes: statusNotes
      });
      // Refresh applications
      const updated = await api.getAllApplications();
      setApplications(updated);
      setSelectedApp(null);
      alert('Application status successfully updated.');
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await api.createAdminStudent(studentForm);
      setShowAddStudent(false);
      setStudentForm({
        username: '',
        full_name: '',
        email: '',
        admission_no: '',
        stream_name: 'Science',
        combination_name: 'PCMB',
        year: '1st PU',
        section: 'A'
      });
      const sData = await api.getAdminStudents();
      setStudents(sData);
      alert('New student enrolled successfully.');
    } catch (err) {
      alert('Error creating student: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8">
        <RefreshCw className="w-10 h-10 text-gold-500 animate-spin mb-3" />
        <p className="text-sm text-slate-600 font-medium">Loading Sri Vidya Administrative Console...</p>
      </div>
    );
  }

  const overview = analytics?.overview || {};
  const streamDist = analytics?.stream_distribution || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">System Administration</span>
          <h1 className="text-2xl font-black font-serif text-white mt-1">Sri Vidya Master Control Center</h1>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as Principal & Chief Administrator • Full Institutional Access (32 Modules)
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href="/api/admin/export/admissions-excel"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Admissions (.xlsx)</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'analytics', label: 'Analytics & KPIs' },
          { id: 'admissions', label: `Admissions Pipeline (${applications.length})` },
          { id: 'students', label: `Student Records (${students.length})` },
          { id: 'faculty', label: `Faculty Directory (${faculty.length})` },
          { id: 'audit', label: 'Security & Audit Logs' }
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

      {/* Tab 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Enrolled Students</span>
              <div className="text-3xl font-black text-navy-950 mt-1">{overview.total_students}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Science, Commerce & Arts</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Admissions Enquiries</span>
              <div className="text-3xl font-black text-gold-600 mt-1">{overview.total_enquiries}</div>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">{overview.approved_admissions} Approved</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Fees Reconciled</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">₹ {overview.total_fees_collected?.toLocaleString()}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Pending: ₹ {overview.total_fees_pending?.toLocaleString()}</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">PU Board Pass Rate</span>
              <div className="text-3xl font-black text-navy-950 mt-1">{overview.pass_percentage}%</div>
              <p className="text-[11px] text-gold-600 font-bold mt-0.5">{overview.distinction_percentage}% Distinctions</p>
            </div>
          </div>

          {/* Stream Enrollment Distribution */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-navy-950 font-serif">Academic Stream Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-xs font-bold text-blue-900 block">Science Stream (PCMB & PCMC)</span>
                <div className="text-2xl font-black text-blue-950 mt-1">{streamDist.Science}% of Students</div>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-xs font-bold text-amber-900 block">Commerce Stream (CEBA & SEBA)</span>
                <div className="text-2xl font-black text-amber-950 mt-1">{streamDist.Commerce}% of Students</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <span className="text-xs font-bold text-purple-900 block">Arts & Humanities (HEPS)</span>
                <div className="text-2xl font-black text-purple-950 mt-1">{streamDist.Arts}% of Students</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Admissions Pipeline */}
      {activeTab === 'admissions' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-4 p-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-950 font-serif">2026–2027 Admissions Pipeline</h3>
              <p className="text-xs text-slate-500">Live student inquiries and document verification status.</p>
            </div>
            <a
              href="/api/admin/export/admissions-excel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Excel Roster</span>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-navy-950 text-white uppercase text-[11px]">
                <tr>
                  <th className="p-3">App No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Parent Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">10th %</th>
                  <th className="p-3">Stream / Comb</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-navy-950">{app.application_no}</td>
                    <td className="p-3 font-semibold text-slate-900">{app.student_name}</td>
                    <td className="p-3">{app.parent_name}</td>
                    <td className="p-3 text-[11px]">{app.phone}</td>
                    <td className="p-3 font-bold">{app.previous_marks_pct}%</td>
                    <td className="p-3">{app.preferred_stream} ({app.preferred_combination})</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-gold-100 text-gold-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => { setSelectedApp(app); setNewStatus(app.status); setStatusNotes(app.notes || ''); }}
                        className="px-2.5 py-1 bg-navy-950 text-gold-400 hover:bg-navy-900 rounded text-xs font-semibold"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Students Management */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-4 p-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-950 font-serif">Enrolled Student Directory</h3>
              <p className="text-xs text-slate-500">Official PU Board student registers.</p>
            </div>
            <button
              onClick={() => setShowAddStudent(!showAddStudent)}
              className="px-4 py-2 bg-navy-950 text-gold-400 hover:bg-navy-900 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll New Student</span>
            </button>
          </div>

          {showAddStudent && (
            <form onSubmit={handleCreateStudent} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 mb-4">
              <h4 className="font-bold text-navy-950 text-xs uppercase">New Student Registration</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Username *"
                  value={studentForm.username}
                  onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={studentForm.full_name}
                  onChange={(e) => setStudentForm({ ...studentForm, full_name: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="text"
                  required
                  placeholder="Admission No *"
                  value={studentForm.admission_no}
                  onChange={(e) => setStudentForm({ ...studentForm, admission_no: e.target.value })}
                  className="p-2 border rounded-lg"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-navy-950 text-gold-400 font-bold text-xs rounded-lg">
                Save & Register
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-navy-950 text-white uppercase text-[11px]">
                <tr>
                  <th className="p-3">Admission No</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Stream</th>
                  <th className="p-3">Combination</th>
                  <th className="p-3">Year & Sec</th>
                  <th className="p-3">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-navy-950">{s.admission_no}</td>
                    <td className="p-3 font-semibold">{s.roll_no}</td>
                    <td className="p-3 font-bold text-slate-900">{s.full_name}</td>
                    <td className="p-3">{s.stream_name}</td>
                    <td className="p-3 font-semibold text-gold-700">{s.combination_name}</td>
                    <td className="p-3">{s.year} ({s.section})</td>
                    <td className="p-3 text-[11px]">{s.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Faculty Management */}
      {activeTab === 'faculty' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-4 p-6 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-navy-950 font-serif">Academic Faculty Registry</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-navy-950 text-white uppercase text-[11px]">
                <tr>
                  <th className="p-3">Emp ID</th>
                  <th className="p-3">Faculty Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {faculty.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-navy-950">{f.employee_id}</td>
                    <td className="p-3 font-bold text-slate-900">{f.full_name}</td>
                    <td className="p-3 font-medium text-gold-700">{f.designation}</td>
                    <td className="p-3 font-semibold">{f.department}</td>
                    <td className="p-3">{f.experience_years} Years</td>
                    <td className="p-3">{f.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-4 p-6 animate-in fade-in">
          <h3 className="text-base font-bold text-navy-950 font-serif">System Audit Trail & Security Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-navy-950 text-white uppercase text-[11px]">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">Action Performed</th>
                  <th className="p-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                {auditLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="p-3">{l.timestamp}</td>
                    <td className="p-3 font-bold text-navy-950">{l.username}</td>
                    <td className="p-3 uppercase text-[10px]">{l.role}</td>
                    <td className="p-3 font-sans font-semibold text-gold-700">{l.module}</td>
                    <td className="p-3 font-sans text-slate-800">{l.action}</td>
                    <td className="p-3 text-slate-500">{l.ip_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Update Application Status Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-navy-950 font-serif">Update Application Pipeline Stage</h3>
            <p className="text-xs text-slate-500">
              Application: <strong className="font-mono text-navy-950">{selectedApp.application_no}</strong> ({selectedApp.student_name})
            </p>

            <form onSubmit={handleUpdateStatus} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Pipeline Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                >
                  <option value="New Enquiry">New Enquiry</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Application Submitted">Application Submitted</option>
                  <option value="Documents Pending">Documents Pending</option>
                  <option value="Documents Verified">Documents Verified</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Enrolled">Enrolled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Internal Notes & Remarks</label>
                <textarea
                  rows="3"
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                  placeholder="e.g. Marks verified. Approved for 15% merit concession."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-950 text-gold-400 hover:bg-navy-900 font-bold text-xs rounded-lg shadow"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

