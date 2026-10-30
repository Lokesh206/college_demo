import React, { useState } from 'react';
import { 
  Award, FileText, CheckCircle2, Clock, Search, 
  HelpCircle, ChevronDown, Download, AlertCircle, ArrowRight 
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState('apply'); // apply, track, eligibility, fees, faq

  // Form state
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    previous_school: '',
    previous_marks_pct: '',
    preferred_stream: 'Science',
    preferred_combination: 'PCMB',
    address: '',
    message: ''
  });
  const [enquirySuccess, setEnquirySuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Tracking state
  const [trackNumber, setTrackNumber] = useState('');
  const [trackedApp, setTrackedApp] = useState(null);
  const [trackError, setTrackError] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.submitEnquiry(formData);
      setEnquirySuccess(res.application_no);
      setFormData({
        student_name: '',
        parent_name: '',
        email: '',
        phone: '',
        previous_school: '',
        previous_marks_pct: '',
        preferred_stream: 'Science',
        preferred_combination: 'PCMB',
        address: '',
        message: ''
      });
    } catch (err) {
      alert('Error submitting application: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackNumber.trim()) return;
    setSearching(true);
    setTrackError(null);
    setTrackedApp(null);
    try {
      const data = await api.trackApplication(trackNumber.trim());
      setTrackedApp(data);
    } catch (err) {
      setTrackError(err.message);
    } finally {
      setSearching(false);
    }
  };

  const statuses = [
    'New Enquiry',
    'Contacted',
    'Application Submitted',
    'Documents Pending',
    'Documents Verified',
    'Approved',
    'Enrolled'
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Year 2026–2027</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Admissions & Enrollment Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Apply online, track your application pipeline, review merit scholarships, and access the college prospectus.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex gap-2 -mb-px overflow-x-auto no-scrollbar">
            {[
              { id: 'apply', label: 'Online Application' },
              { id: 'track', label: 'Track Application Status' },
              { id: 'eligibility', label: 'Eligibility & Documents' },
              { id: 'fees', label: 'Fee Structure & Scholarships' },
              { id: 'faq', label: 'Admissions FAQ' }
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
        </div>

        {/* Tab 1: Apply Online */}
        {activeTab === 'apply' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6 animate-in fade-in">
            {enquirySuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-navy-950">Application Successfully Submitted!</h3>
                <p className="text-sm text-slate-600">
                  Your official application tracking number has been generated:
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block font-mono text-xl font-bold text-navy-950">
                  {enquirySuccess}
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Our admissions counseling office will contact you within 24 hours to schedule a campus tour and document review.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => { setTrackNumber(enquirySuccess); setActiveTab('track'); }}
                    className="px-5 py-2.5 rounded-xl bg-navy-950 text-gold-400 text-xs font-bold"
                  >
                    Track Status Now
                  </button>
                  <button
                    onClick={() => setEnquirySuccess(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-navy-950 font-serif">1st Pre-University Admission Application</h3>
                  <p className="text-xs text-slate-500">Academic Batch 2026–2027 • Please fill all mandatory fields.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      placeholder="Candidate's full legal name"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.parent_name}
                      onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                      placeholder="Father's / Mother's name"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admissions.contact@domain.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450 XXXXX"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Previous School / Board *</label>
                    <input
                      type="text"
                      required
                      value={formData.previous_school}
                      onChange={(e) => setFormData({ ...formData, previous_school: e.target.value })}
                      placeholder="e.g. CBSE / ICSE / State Board School"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">10th Std Expected / Actual (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.previous_marks_pct}
                      onChange={(e) => setFormData({ ...formData, previous_marks_pct: e.target.value })}
                      placeholder="e.g. 91.5"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Stream *</label>
                    <select
                      value={formData.preferred_stream}
                      onChange={(e) => setFormData({ ...formData, preferred_stream: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                    >
                      <option value="Science">Science (PCMB / PCMC)</option>
                      <option value="Commerce">Commerce (CEBA / SEBA)</option>
                      <option value="Arts">Arts (HEPS)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Combination *</label>
                    <select
                      value={formData.preferred_combination}
                      onChange={(e) => setFormData({ ...formData, preferred_combination: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                    >
                      <option value="PCMB">PCMB (Physics, Chem, Math, Bio)</option>
                      <option value="PCMC">PCMC (Physics, Chem, Math, Comp Sci)</option>
                      <option value="CEBA">CEBA (Comp Sci, Econ, Bus, Accounts)</option>
                      <option value="SEBA">SEBA (Stats, Econ, Bus, Accounts)</option>
                      <option value="HEPS">HEPS (History, Econ, Pol Sci, Sociology)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Locality, Bengaluru, PIN code"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Notes / Coaching Requirements</label>
                  <textarea
                    rows="2"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Require integrated NEET/JEE coaching, hostel room, or college transit bus..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition"
                  >
                    {submitting ? 'Submitting Application...' : 'Register Application & Receive Tracking ID'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Application */}
        {activeTab === 'track' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-navy-950 font-serif">Track Application Status</h3>
              <p className="text-xs text-slate-500">
                Enter your application tracking number (e.g. <code className="font-mono font-bold text-navy-950">APP-2026-00101</code>) to view the live verification stage.
              </p>

              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={trackNumber}
                  onChange={(e) => setTrackNumber(e.target.value)}
                  placeholder="APP-2026-XXXXX"
                  className="flex-1 px-4 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-300 focus:outline-none focus:border-navy-900"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="px-6 py-2.5 bg-navy-950 text-gold-400 rounded-xl text-xs font-bold uppercase transition"
                >
                  {searching ? 'Checking...' : 'Check Status'}
                </button>
              </form>

              {trackError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}
            </div>

            {/* Tracked Results View */}
            {trackedApp && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Tracking Number</span>
                    <h4 className="text-base font-bold font-mono text-navy-950">{trackedApp.application_no}</h4>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy-900 text-gold-400">
                    {trackedApp.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl">
                  <div>
                    <span className="text-slate-400 block">Candidate:</span>
                    <strong className="text-slate-900">{trackedApp.student_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Parent / Guardian:</span>
                    <strong className="text-slate-900">{trackedApp.parent_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Stream & Combination:</span>
                    <strong className="text-navy-950">{trackedApp.preferred_stream} ({trackedApp.preferred_combination})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Submitted On:</span>
                    <span>{trackedApp.created_at}</span>
                  </div>
                </div>

                {/* Pipeline visual steps */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-navy-950 uppercase">Application Progress Pipeline</span>
                  <div className="space-y-1.5 pt-1">
                    {statuses.map((st, idx) => {
                      const currentIdx = statuses.indexOf(trackedApp.status);
                      const isPast = idx <= currentIdx;
                      return (
                        <div key={st} className="flex items-center gap-2 text-xs">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isPast ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isPast ? '✓' : idx + 1}
                          </span>
                          <span className={isPast ? 'font-bold text-slate-900' : 'text-slate-400'}>
                            {st}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {trackedApp.notes && (
                  <div className="p-3 bg-gold-50 border border-gold-200 rounded-xl text-xs text-gold-900">
                    <strong className="block mb-0.5">Admissions Office Remarks:</strong>
                    {trackedApp.notes}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Eligibility & Documents */}
        {activeTab === 'eligibility' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-navy-950 font-serif">Eligibility Criteria</h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                <li>• Candidate must have passed 10th standard SSLC (Karnataka State Board), CBSE, ICSE, or equivalent recognized national board.</li>
                <li>• <strong>Science Stream (PCMB / PCMC):</strong> Minimum 60% aggregate marks in 10th standard with Science and Mathematics.</li>
                <li>• <strong>Commerce Stream (CEBA / SEBA):</strong> Minimum 50% aggregate marks in 10th standard.</li>
                <li>• <strong>Arts Stream (HEPS):</strong> Pass in 10th standard.</li>
              </ul>

              <h4 className="text-base font-bold text-navy-950 font-serif pt-4 border-t border-slate-100">Mandatory Documents Required at Admission</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="p-2.5 bg-slate-50 rounded-lg">1. Original 10th Marks Card + 3 attested copies</div>
                <div className="p-2.5 bg-slate-50 rounded-lg">2. Transfer Certificate (TC) from previous school</div>
                <div className="p-2.5 bg-slate-50 rounded-lg">3. Conduct / Character Certificate</div>
                <div className="p-2.5 bg-slate-50 rounded-lg">4. 5 recent passport-size photographs</div>
                <div className="p-2.5 bg-slate-50 rounded-lg">5. Aadhaar Card copy (Student & Parent)</div>
                <div className="p-2.5 bg-slate-50 rounded-lg">6. Caste & Income certificate (if claiming reservation)</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Fee Structure & Scholarships */}
        {activeTab === 'fees' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-navy-950 font-serif">Annual Fee Structure (2026–2027)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-navy-950 text-white uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Stream & Combination</th>
                      <th className="p-3">Tuition Fee</th>
                      <th className="p-3">Lab Fee</th>
                      <th className="p-3">Total Annual Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Science - PCMB</td>
                      <td className="p-3">₹ 60,000</td>
                      <td className="p-3">₹ 18,000</td>
                      <td className="p-3 font-bold text-navy-950">₹ 95,000 / Year</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Science - PCMC</td>
                      <td className="p-3">₹ 58,000</td>
                      <td className="p-3">₹ 15,000</td>
                      <td className="p-3 font-bold text-navy-950">₹ 90,000 / Year</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Commerce - CEBA</td>
                      <td className="p-3">₹ 48,000</td>
                      <td className="p-3">₹ 8,000</td>
                      <td className="p-3 font-bold text-navy-950">₹ 72,000 / Year</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Arts - HEPS</td>
                      <td className="p-3">₹ 35,000</td>
                      <td className="p-3">₹ 0</td>
                      <td className="p-3 font-bold text-navy-950">₹ 50,000 / Year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-gold-50 border border-gold-200 rounded-xl space-y-1 text-xs text-gold-900 mt-4">
                <strong className="block text-sm">Merit Scholarships:</strong>
                <div>• <strong>95% and above in 10th:</strong> 25% Tuition Fee Concession</div>
                <div>• <strong>90% to 94.9% in 10th:</strong> 15% Tuition Fee Concession</div>
                <div>• <strong>State / National Sports Medalists:</strong> 20% Sports Excellence Scholarship</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Admissions FAQ */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in text-xs sm:text-sm">
            {[
              { q: 'Is hostel accommodation available for outstation students?', a: 'Yes. Sri Vidya operates separate Kaveri (Boys) and Sharavathi (Girls) hostels with 24/7 security, warden care, study rooms, and hygienic south/north Indian dining.' },
              { q: 'How is competitive entrance coaching scheduled?', a: 'KCET, NEET, and JEE coaching sessions are embedded directly into the daily morning-afternoon routine and Saturday test sprint sessions.' },
              { q: 'Can I pay the college fees in installments?', a: 'Yes. Fee payments can be made in two equal installments: 50% at the time of admission and the remaining 50% before the midterm examinations.' },
              { q: 'Are college buses available across Bengaluru?', a: 'Yes. Our fleet of 24 GPS-monitored college buses covers all major routes across Whitefield, Marathahalli, Sarjapur, Indiranagar, HSR Layout, and Electronic City.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
                <h4 className="font-bold text-navy-950">{faq.q}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

