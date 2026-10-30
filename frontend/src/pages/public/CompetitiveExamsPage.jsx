import React, { useState, useEffect } from 'react';
import { 
  Trophy, BookOpen, Clock, Play, Award, CheckCircle2, 
  HelpCircle, ChevronRight, BarChart2, ShieldCheck 
} from 'lucide-react';
import { api } from '../../services/api';
import CBTExamEngine from '../../components/exams/CBTExamEngine';

export default function CompetitiveExamsPage() {
  const [activeExam, setActiveExam] = useState('KCET'); // KCET, NEET, JEE
  const [mockTests, setMockTests] = useState([]);
  const [activeTestId, setActiveTestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTests() {
      try {
        setLoading(true);
        const data = await api.getMockTests(activeExam);
        setMockTests(data);
      } catch (err) {
        console.error('Failed to load mock tests:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTests();
  }, [activeExam]);

  const examDetails = {
    KCET: {
      title: 'Karnataka Common Entrance Test (KCET 2026)',
      tagline: 'State Gateway to Premier Engineering & Agriculture Colleges',
      subjects: 'Physics (60 Marks), Chemistry (60 Marks), Mathematics / Biology (60 Marks)',
      duration: '80 minutes per subject paper',
      marking: '+1 Mark per correct question, NO Negative Marking',
      strategy: 'Focus on NCERT text clarity, speed calculation techniques, and memorizing standard chemical reactions and calculus integrals.',
      highlights: [
        'Over 40 students placed in top 100 KCET ranks over past 5 years.',
        'Direct admissions into RVCE, BMSCE, MSRIT, PES University, and UVCE.',
        'Weekly 180-minute timed mock tests replicating exact KEA examination patterns.'
      ]
    },
    NEET: {
      title: 'National Eligibility cum Entrance Test (NEET UG 2026)',
      tagline: 'Single National Gateway for MBBS & BDS Admissions',
      subjects: 'Physics (45 Qs), Chemistry (45 Qs), Biology: Botany & Zoology (90 Qs)',
      duration: '200 minutes (3 hours 20 mins)',
      marking: '+4 Marks for correct, -1 Negative Mark for incorrect answer',
      strategy: 'Line-by-line NCERT Biology mastery, organic reaction mechanism shortcuts, and rigorous physical chemistry numerical practice.',
      highlights: [
        'Highest score of 705 / 720 (99.98 Percentile) in NEET 2024–2025.',
        'Admissions secured in AIIMS New Delhi, BMCRI Bangalore, MMC Mysore.',
        'Bi-weekly OMR practice sessions with computerized negative marking analysis.'
      ]
    },
    JEE: {
      title: 'Joint Entrance Examination (JEE Main & Advanced 2026)',
      tagline: 'Gateway to NITs, IIITs, and Qualifying Arena for IITs',
      subjects: 'Physics (25 Qs), Chemistry (25 Qs), Mathematics (25 Qs)',
      duration: '180 minutes (3 Hours)',
      marking: '+4 Marks for correct, -1 Negative Mark (MCQs & Numericals)',
      strategy: 'Conceptual synthesis across multiple topics, advanced calculus, coordinate geometry, and electromagnetism problem solving.',
      highlights: [
        'Top ranker AIR 318 in JEE Advanced 2024 (IIT Madras B.Tech).',
        'Senior national faculty mentors with 14+ years of premier Kota coaching experience.',
        'Dedicated Advanced Problem Solving (APS) workshops on alternate Saturdays.'
      ]
    }
  };

  const currentExam = examDetails[activeExam];

  // If a test is active, show the CBT Exam Console
  if (activeTestId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CBTExamEngine testId={activeTestId} onExit={() => setActiveTestId(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Integrated Competitive Training Wing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            KCET • NEET • JEE Preparation Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Experience our online Computer-Based Test (CBT) engine, study strategies, and distinguished faculty coaching.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Exam Navigation Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-2 border border-slate-200">
            {['KCET', 'NEET', 'JEE'].map((exam) => (
              <button
                key={exam}
                onClick={() => setActiveExam(exam)}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition ${
                  activeExam === exam
                    ? 'bg-navy-950 text-gold-400 shadow-md'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {exam} Coaching
              </button>
            ))}
          </div>
        </div>

        {/* Selected Exam Strategy & Overview */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 md:p-10 space-y-8 animate-in fade-in">
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600">{currentExam.tagline}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-serif">{currentExam.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-navy-950 block">Subject Pattern:</strong>
              <span className="text-slate-600">{currentExam.subjects}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-navy-950 block">Exam Duration:</strong>
              <span className="text-slate-600">{currentExam.duration}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-navy-950 block">Marking Scheme:</strong>
              <span className="text-slate-600">{currentExam.marking}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-navy-950 uppercase tracking-wide">Preparation Strategy & Coaching Highlights:</h4>
            <div className="space-y-2">
              {currentExam.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive CBT Mock Tests Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-navy-950 font-serif">
                  Available Online CBT Mock Tests ({activeExam})
                </h3>
                <p className="text-xs text-slate-500">
                  Attempt timed diagnostic tests with question palette, review marking, and instant accuracy evaluation.
                </p>
              </div>
            </div>

            {mockTests.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                No active mock tests currently scheduled for {activeExam}. Check back soon or select another exam.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-gold-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-navy-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {test.subject}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{test.duration_minutes} Minutes</span>
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-navy-950 font-serif">{test.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{test.instructions}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        {test.total_questions} Questions • {test.total_marks} Marks
                      </span>
                      <button
                        onClick={() => setActiveTestId(test.id)}
                        className="px-4 py-2 bg-navy-950 hover:bg-navy-900 text-gold-400 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start CBT Test</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

