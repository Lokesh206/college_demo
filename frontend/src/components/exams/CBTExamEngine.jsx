import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Bookmark, ArrowRight, ArrowLeft, RefreshCw, Trophy, BookOpen, BarChart3, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

export default function CBTExamEngine({ testId, onExit }) {
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewed, setReviewed] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    async function loadTest() {
      try {
        setLoading(true);
        const data = await api.startMockTest(testId);
        setTest(data.test);
        setQuestions(data.questions);
        setTimeLeft((data.test.duration_minutes || 30) * 60);
      } catch (err) {
        console.error('Failed to start mock test:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTest();
  }, [testId]);

  // Countdown timer
  useEffect(() => {
    if (!test || result || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [test, result, isSubmitting]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (option) => {
    const currentQ = questions[currentIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleClearResponse = () => {
    const currentQ = questions[currentIndex];
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    const currentQ = questions[currentIndex];
    setReviewed(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSubmitTest = async (auto = false) => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    const timeTaken = (test.duration_minutes * 60) - timeLeft;

    try {
      const evalResult = await api.submitMockTest(testId, {
        answers,
        time_taken_seconds: Math.max(0, timeTaken)
      });
      setResult(evalResult);
      if (evalResult.percentage >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Error submitting exam:', err);
      alert('Failed to evaluate exam: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <RefreshCw className="w-10 h-10 text-gold-500 animate-spin mb-4" />
        <h3 className="text-lg font-bold text-navy-950 font-serif">Initializing CBT Examination Console...</h3>
        <p className="text-sm text-slate-500 mt-1">Loading authentic KCET/NEET/JEE question bank and timed session.</p>
      </div>
    );
  }

  // RESULT VIEW
  if (result) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-10 space-y-8 animate-in fade-in">
        {/* Result Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex p-3 rounded-full bg-gold-50 border border-gold-200 text-gold-600 mb-1">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 font-serif">
            Examination Scorecard
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            {result.test_title} • {result.exam_name} Pattern Assessment
          </p>
        </div>

        {/* Score & Key Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Score Obtained</div>
            <div className="text-2xl md:text-3xl font-black text-navy-950 mt-1">
              {result.score} <span className="text-sm font-medium text-slate-500">/ {result.total_marks}</span>
            </div>
            <div className="text-xs font-bold text-gold-600 mt-1">{result.percentage}% Marks</div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Accuracy</div>
            <div className="text-2xl md:text-3xl font-black text-emerald-700 mt-1">
              {result.accuracy_percentage}%
            </div>
            <div className="text-xs text-emerald-600 mt-1">{result.correct_count} of {result.total_attempted} Attempted</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Questions</div>
            <div className="text-2xl md:text-3xl font-black text-slate-800 mt-1">
              {result.total_questions}
            </div>
            <div className="text-xs text-slate-500 mt-1">{result.unattempted_count} Unattempted</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Time Taken</div>
            <div className="text-2xl md:text-3xl font-black text-slate-800 mt-1">
              {Math.floor(result.time_taken_seconds / 60)}m {result.time_taken_seconds % 60}s
            </div>
            <div className="text-xs text-slate-500 mt-1">Auto Verified</div>
          </div>
        </div>

        {/* Topic-Wise Breakdown */}
        {result.topic_breakdown && Object.keys(result.topic_breakdown).length > 0 && (
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
            <h4 className="font-bold text-navy-950 text-sm mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gold-600" />
              <span>Chapter & Topic Performance Diagnostic</span>
            </h4>
            <div className="space-y-3">
              {Object.entries(result.topic_breakdown).map(([topic, data], idx) => {
                const topicPct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>{topic}</span>
                      <span className="font-bold">{data.correct} / {data.total} Correct ({topicPct}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          topicPct >= 75 ? 'bg-emerald-500' : topicPct >= 50 ? 'bg-gold-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${topicPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Solutions Section */}
        <div className="space-y-4">
          <h4 className="font-bold text-navy-950 text-base font-serif flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen className="w-5 h-5 text-gold-600" />
            <span>Question-by-Question Detailed Solutions</span>
          </h4>

          <div className="space-y-4">
            {result.detailed_evaluation.map((q, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border ${
                  q.status === 'Correct'
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : q.status === 'Incorrect'
                    ? 'border-rose-200 bg-rose-50/30'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-navy-900 text-white">
                      Q{q.question_number}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">[{q.chapter}]</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                      q.status === 'Correct'
                        ? 'bg-emerald-100 text-emerald-800'
                        : q.status === 'Incorrect'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {q.status === 'Correct' && <Check className="w-3.5 h-3.5" />}
                    {q.status === 'Incorrect' && <X className="w-3.5 h-3.5" />}
                    {q.status} ({q.marks_awarded > 0 ? `+${q.marks_awarded}` : q.marks_awarded} marks)
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed">
                  {q.question_text}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                  {Object.entries(q.options).map(([optKey, optVal]) => {
                    const isUserChoice = q.user_choice === optKey;
                    const isCorrectAnswer = q.correct_option === optKey;
                    return (
                      <div
                        key={optKey}
                        className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                          isCorrectAnswer
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-semibold'
                            : isUserChoice
                            ? 'bg-rose-100 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-bold w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 text-[10px]">
                          {optKey}
                        </span>
                        <span>{optVal}</span>
                        {isCorrectAnswer && <span className="ml-auto text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">Correct</span>}
                        {isUserChoice && !isCorrectAnswer && <span className="ml-auto text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold">Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-navy-900 block mb-0.5">Explanation & Concept:</span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exit & Retake Controls */}
        <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onExit}
            className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-white rounded-xl text-sm font-semibold transition"
          >
            Back to Competitive Exams Hub
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE CBT EXAMINATION INTERFACE
  const currentQ = questions[currentIndex];
  const isReviewed = reviewed[currentQ?.id];
  const selectedOption = answers[currentQ?.id];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
      {/* Top Test Header */}
      <div className="bg-navy-950 text-white px-6 py-4 flex flex-wrap justify-between items-center border-b border-navy-800 gap-4">
        <div>
          <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">{test?.exam_name} MOCK TEST</span>
          <h2 className="text-lg font-bold font-serif leading-tight">{test?.title}</h2>
        </div>

        {/* Timer Bar */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border font-mono text-base font-bold shadow-inner ${
          timeLeft <= 300 
            ? 'bg-rose-900/60 border-rose-500 text-rose-300 animate-pulse'
            : 'bg-navy-900 border-navy-700 text-gold-400'
        }`}>
          <Clock className="w-5 h-5 text-gold-500" />
          <span>{formatTime(timeLeft)}</span>
          <span className="text-[11px] font-sans font-normal text-slate-300">Remaining</span>
        </div>
      </div>

      {/* Main Testing Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0">
        
        {/* Left 2 Cols: Question Area */}
        <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
          <div>
            {/* Question Meta */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-navy-900 text-white font-bold px-3 py-1 rounded-md text-sm">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
                  {currentQ?.chapter || currentQ?.subject}
                </span>
              </div>
              <div className="text-slate-500 font-semibold">
                Marks: +{currentQ?.marks} | Neg: -{currentQ?.negative_marks}
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base md:text-lg font-medium text-slate-900 leading-relaxed mb-6">
              {currentQ?.question_text}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {[
                { key: 'A', text: currentQ?.option_a },
                { key: 'B', text: currentQ?.option_b },
                { key: 'C', text: currentQ?.option_c },
                { key: 'D', text: currentQ?.option_d },
              ].map(({ key, text }) => {
                const isSelected = selectedOption === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectOption(key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-gold-500/40'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-gold-500 text-navy-950 font-black'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">{text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-8 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleToggleReview}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition flex items-center gap-1.5 ${
                  isReviewed
                    ? 'bg-purple-100 text-purple-900 border-purple-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isReviewed ? 'Unmark Review' : 'Mark for Review'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearResponse}
                disabled={!selectedOption}
                className="px-3 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-40 transition"
              >
                Clear Response
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition flex items-center gap-1"
                >
                  <span>Save & Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-gold-600 hover:bg-gold-500 text-white shadow-sm transition"
                >
                  Submit Examination
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Question Navigation Palette */}
        <div className="p-6 bg-slate-50 flex flex-col justify-between">
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Question Palette
            </h4>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-500 inline-block" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 inline-block" />
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-400 inline-block" />
                <span>Unanswered</span>
              </div>
            </div>

            {/* Question Buttons Matrix */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {questions.map((q, idx) => {
                const isAns = answers[q.id];
                const isRev = reviewed[q.id];
                const isCur = currentIndex === idx;

                let btnClass = 'bg-slate-200 text-slate-700 hover:bg-slate-300';
                if (isAns && isRev) btnClass = 'bg-purple-600 text-white font-bold ring-2 ring-emerald-400';
                else if (isRev) btnClass = 'bg-purple-500 text-white font-bold';
                else if (isAns) btnClass = 'bg-emerald-500 text-white font-bold';
                else if (isCur) btnClass = 'bg-rose-400 text-white font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${btnClass} ${
                      isCur ? 'ring-2 ring-navy-950 scale-105 shadow-sm' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complete Submission Button */}
          <div className="pt-6 mt-6 border-t border-slate-200">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-3 px-4 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-gold-400" />
              <span>Finish & Submit Test</span>
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-navy-950 font-serif">Confirm Test Submission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to end this examination? Once submitted, your answers will be automatically evaluated, your KCET/NEET accuracy calculated, and your score finalized.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-bold">{questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Answered:</span>
                <span className="font-bold">{Object.keys(answers).length}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Unattempted:</span>
                <span className="font-bold">{questions.length - Object.keys(answers).length}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Resume Examination
              </button>
              <button
                onClick={() => handleSubmitTest(false)}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-bold text-white bg-gold-600 hover:bg-gold-500 rounded-lg shadow"
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

