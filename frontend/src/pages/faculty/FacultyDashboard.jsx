import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, Award, BookOpen, Upload, 
  Calendar, Check, AlertCircle, RefreshCw 
} from 'lucide-react';
import { api } from '../../services/api';

export default function FacultyDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('classes'); // classes, attendance, marks, upload

  // Form states
  const [attStudentId, setAttStudentId] = useState('');
  const [attStatus, setAttStatus] = useState('Present');
  const [attSuccess, setAttSuccess] = useState(false);

  const [markStudentId, setMarkStudentId] = useState('');
  const [examType, setExamType] = useState('Unit Test 2');
  const [markScore, setMarkScore] = useState('');
  const [markRemarks, setMarkRemarks] = useState('');
  const [markSuccess, setMarkSuccess] = useState(false);

  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState('Lecture Notes');
  const [matSubject, setMatSubject] = useState('Physics');
  const [matSuccess, setMatSuccess] = useState(false);

  useEffect(() => {
    async function loadFacultyData() {
      try {
        setLoading(true);
        const res = await api.getFacultyDashboard();
        setData(res);
        if (res.student_roster?.length > 0) {
          setAttStudentId(res.student_roster[0].id);
          setMarkStudentId(res.student_roster[0].id);
        }
      } catch (err) {
        console.error('Failed to load faculty dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFacultyData();
  }, []);

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await api.markAttendance({
        student_id: parseInt(attStudentId),
        status: attStatus,
        subject_name: data?.faculty?.department || 'Physics',
        remarks: 'Class attendance recorded by faculty'
      });
      setAttSuccess(true);
      setTimeout(() => setAttSuccess(false), 4000);
    } catch (err) {
      alert('Error recording attendance: ' + err.message);
    }
  };

  const handleEnterMarks = async (e) => {
    e.preventDefault();
    try {
      await api.enterMarks({
        student_id: parseInt(markStudentId),
        exam_type: examType,
        subject_name: data?.faculty?.department || 'Physics',
        max_marks: 50.0,
        marks_obtained: parseFloat(markScore),
        remarks: markRemarks || 'Performance evaluated'
      });
      setMarkSuccess(true);
      setMarkScore('');
      setTimeout(() => setMarkSuccess(false), 4000);
    } catch (err) {
      alert('Error entering marks: ' + err.message);
    }
  };

  const handleUploadMaterial = async (e) => {
    e.preventDefault();
    try {
      await api.uploadStudyMaterial({
        title: matTitle,
        subject: matSubject,
        stream: 'Science',
        material_type: matType
      });
      setMatSuccess(true);
      setMatTitle('');
      setTimeout(() => setMatSuccess(false), 4000);
    } catch (err) {
      alert('Error uploading material: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8">
        <RefreshCw className="w-10 h-10 text-gold-500 animate-spin mb-3" />
        <p className="text-sm text-slate-600 font-medium">Accessing Faculty Instructional Management Portal...</p>
      </div>
    );
  }

  const faculty = data?.faculty || {};
  const assignedClasses = data?.assigned_classes || [];
  const studentRoster = data?.student_roster || [];
  const materials = data?.uploaded_materials || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Faculty Header Card */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex gap-4 items-center">
          <img
            src={faculty.photo_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
            alt={faculty.full_name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-gold-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black font-serif text-white">{faculty.full_name}</h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold-500 text-navy-950">Faculty</span>
            </div>
            <p className="text-xs text-gold-400 font-semibold mt-0.5">
              {faculty.designation} • Dept. of {faculty.department}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              {faculty.qualifications} • Employee ID: {faculty.employee_id} • {faculty.experience_years} Yrs Exp.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2.5 bg-gold-600 hover:bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
          >
            Mark Daily Attendance
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'classes', label: 'Assigned Classes & Roster' },
          { id: 'attendance', label: 'Take Attendance' },
          { id: 'marks', label: 'Enter Internal Marks' },
          { id: 'upload', label: 'Upload Study Material' }
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

      {/* Tab 1: Assigned Classes */}
      {activeTab === 'classes' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assignedClasses.map((cls) => (
              <div key={cls.code} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-navy-950 bg-slate-100 px-2 py-0.5 rounded">
                  {cls.code}
                </span>
                <h4 className="text-base font-bold text-navy-950 font-serif">{cls.name}</h4>
                <div className="text-xs text-slate-500">Subject: <strong>{cls.subject}</strong></div>
                <div className="text-xs text-slate-500">Enrolled Students: <strong>{cls.students_count}</strong></div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-navy-950 font-serif">Class Students Roster</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-navy-950 text-white uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Admission No</th>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Stream & Combination</th>
                    <th className="p-3">Section</th>
                    <th className="p-3">Target Exam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {studentRoster.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-navy-950">{s.admission_no}</td>
                      <td className="p-3 font-semibold">{s.roll_no}</td>
                      <td className="p-3 font-bold text-slate-900">{s.full_name}</td>
                      <td className="p-3">{s.stream_name} ({s.combination_name})</td>
                      <td className="p-3">{s.section}</td>
                      <td className="p-3 text-gold-700 font-semibold">{s.target_exams}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Take Attendance */}
      {activeTab === 'attendance' && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-4 animate-in fade-in">
          <h3 className="text-lg font-bold text-navy-950 font-serif">Record Session Attendance</h3>

          {attSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Attendance successfully recorded in database!</span>
            </div>
          )}

          <form onSubmit={handleMarkAttendance} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Student</label>
              <select
                value={attStudentId}
                onChange={(e) => setAttStudentId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
              >
                {studentRoster.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} ({s.admission_no}) - Section {s.section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Attendance Status</label>
              <select
                value={attStatus}
                onChange={(e) => setAttStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late (Permitted)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Save Attendance Record
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Enter Marks */}
      {activeTab === 'marks' && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-4 animate-in fade-in">
          <h3 className="text-lg font-bold text-navy-950 font-serif">Enter Student Internal Examination Marks</h3>

          {markSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Marks recorded and grade recalculated successfully!</span>
            </div>
          )}

          <form onSubmit={handleEnterMarks} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student</label>
              <select
                value={markStudentId}
                onChange={(e) => setMarkStudentId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
              >
                {studentRoster.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} ({s.roll_no})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
              >
                <option value="Unit Test 1">Unit Test 1 (Max 50)</option>
                <option value="Mid-Term Examination">Mid-Term Examination (Max 100)</option>
                <option value="Unit Test 2">Unit Test 2 (Max 50)</option>
                <option value="Preparatory Board Exam">Preparatory Board Exam (Max 100)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Marks Obtained</label>
              <input
                type="number"
                step="0.5"
                required
                value={markScore}
                onChange={(e) => setMarkScore(e.target.value)}
                placeholder="e.g. 48.5"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Faculty Remarks</label>
              <input
                type="text"
                value={markRemarks}
                onChange={(e) => setMarkRemarks(e.target.value)}
                placeholder="e.g. Excellent conceptual grasp"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Submit & Publish Marks
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Upload Material */}
      {activeTab === 'upload' && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-4 animate-in fade-in">
          <h3 className="text-lg font-bold text-navy-950 font-serif">Upload Study Notes / Formula Sheets</h3>

          {matSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Material published to Student Portal successfully!</span>
            </div>
          )}

          <form onSubmit={handleUploadMaterial} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Title *</label>
              <input
                type="text"
                required
                value={matTitle}
                onChange={(e) => setMatTitle(e.target.value)}
                placeholder="e.g. Ray Optics & Optical Instruments High Yield Summary"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Type</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                >
                  <option value="Formula Sheet">Formula Sheet</option>
                  <option value="Lecture Notes">Lecture Notes</option>
                  <option value="Question Bank">Question Bank</option>
                  <option value="Lab Manual">Lab Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={matSubject}
                  onChange={(e) => setMatSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Publish to Student Portal
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

