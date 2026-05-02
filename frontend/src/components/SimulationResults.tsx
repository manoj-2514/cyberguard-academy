import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy, Award, XCircle, CheckCircle, AlertTriangle,
  ChevronDown, ChevronRight, Download, Share2, UserPlus,
  RotateCcw, Eye, ArrowLeft, Grid3X3, BookOpen, Shield, Zap
} from 'lucide-react';
import { generateCertificatePDF } from '../utils/pdf';
import type { ViewType } from './Header';
import { useAuth } from '../contexts/AuthContext';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface QuestionResult {
  questionNumber: number;
  topic: string;
  questionType: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  pointsEarned: number;
  maxPoints: number;
}

export interface SimulationResultsProps {
  moduleName: string;
  moduleId: string;
  totalScore: number;
  maxScore: number;
  questions: QuestionResult[];
  speedBonus?: { points: number; timeUsedMinutes: number };
  passed: boolean;
  onRetake: () => void;
  onNavigate: (view: ViewType, resourceId?: string) => void;
}

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function getPerformance(pct: number, passed: boolean) {
  if (pct >= 90) return { label: 'EXCELLENT', color: 'text-emerald-600', bg: 'bg-emerald-500', barColor: 'bg-emerald-500', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700' };
  if (pct >= 80) return { label: 'GOOD', color: 'text-blue-600', bg: 'bg-blue-500', barColor: 'bg-blue-500', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700' };
  if (passed) return { label: 'PASS', color: 'text-amber-600', bg: 'bg-amber-500', barColor: 'bg-amber-500', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700' };
  return { label: 'FAIL', color: 'text-rose-600', bg: 'bg-rose-500', barColor: 'bg-rose-500', badgeBg: 'bg-rose-50 border-rose-200 text-rose-700' };
}

function useCounter(target: number, duration = 1200): number {
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return val;
}

function getCertId(moduleId: string): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `CG-${date}-${moduleId.toUpperCase().replace(/[^A-Z0-9]/g, '')}-001`;
}

function getExpiryDate(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ─────────────────────────────────────────────────────────
// Review Accordion
// ─────────────────────────────────────────────────────────
const ReviewAccordion: React.FC<{ questions: QuestionResult[] }> = ({ questions }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {questions.map((q) => {
        const isOpen = open === q.questionNumber;
        const correct = q.pointsEarned === q.maxPoints;
        return (
          <div key={q.questionNumber} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : q.questionNumber)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${correct ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {correct ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-slate-900 block truncate">Q{q.questionNumber}. {q.topic}</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{q.questionType}</span>
              </div>
              <span className="font-black tabular-nums text-sm shrink-0">
                <span className={correct ? 'text-emerald-600' : 'text-rose-600'}>{q.pointsEarned}</span>
                <span className="text-slate-300">/{q.maxPoints}</span>
              </span>
              {isOpen ? <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />}
            </button>
            {isOpen && (
              <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4 animate-slide-down">
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Question</h5>
                  <p className="text-slate-700 font-medium">{q.questionText}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Your Answer</h5>
                    <p className="text-slate-800 font-bold text-sm">{q.userAnswer}</p>
                  </div>
                  <div className={`p-3 rounded-lg border ${correct ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Correct Answer</h5>
                    <p className="text-slate-800 font-bold text-sm">{q.correctAnswer}</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Feedback</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────
const SimulationResults: React.FC<SimulationResultsProps> = ({
  moduleName, moduleId, totalScore, maxScore, questions, speedBonus, passed, onRetake, onNavigate,
}) => {
  const { user } = useAuth();
  const [showReview, setShowReview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const pct = Math.round((totalScore / maxScore) * 100);
  const perf = getPerformance(pct, passed);
  const animatedScore = useCounter(totalScore);
  const animatedPct = useCounter(pct);
  const certId = getCertId(moduleId);
  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // Weakest questions for fail state
  const weakest = questions
    .filter(q => q.pointsEarned < q.maxPoints)
    .sort((a, b) => (a.pointsEarned / a.maxPoints) - (b.pointsEarned / b.maxPoints))
    .slice(0, 2);

  const handleDownloadCert = () => {
    generateCertificatePDF(
      user?.name || 'Certificant',
      moduleName,
      certId,
      pct,
      today,
      getExpiryDate()
    );
  };

  const handleShareCert = () => {
    const url = `${window.location.origin}/verify/${certId}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
    <div className="space-y-10 animate-fade-in relative">
      {/* Toast Notification */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl transition-all duration-300 z-50 ${
        showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          Link copied to clipboard!
        </div>
      </div>
      {/* ── Score Header ── */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className={`${perf.bg} px-6 py-8 md:px-10 md:py-10 text-white text-center`}>
          <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-2">{moduleName}</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Simulation Complete!</h1>
          <div className="text-7xl md:text-8xl font-black tabular-nums leading-none mb-4">
            {animatedScore}<span className="text-white/40 text-4xl md:text-5xl">/{maxScore}</span>
          </div>
          {/* Badge & Speed Bonus */}
          <div className="flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest">
              <Award className="w-4 h-4" /> {perf.label}
            </span>
            {speedBonus && speedBonus.points > 0 && (
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-white">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Speed Bonus: +{speedBonus.points} pts (in {speedBonus.timeUsedMinutes}m)
              </span>
            )}
          </div>
        </div>
        {/* Gauge bar */}
        <div className="px-6 md:px-10 py-6">
          <div className="flex items-center justify-between text-sm font-bold text-slate-500 mb-2">
            <span>Score</span>
            <span className={`font-black ${perf.color}`}>{animatedPct}%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${perf.barColor} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* ── Topic Breakdown ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
          <Grid3X3 className="w-5 h-5 text-slate-400" /> Question Breakdown
        </h2>
        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 pr-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">#</th>
                <th className="text-left py-2.5 pr-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Topic</th>
                <th className="text-center py-2.5 pr-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Score</th>
                <th className="text-center py-2.5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => {
                const full = q.pointsEarned === q.maxPoints;
                const zero = q.pointsEarned === 0;
                return (
                  <tr key={q.questionNumber} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 pr-4 font-bold text-slate-400">{q.questionNumber}</td>
                    <td className="py-3 pr-4 font-bold text-slate-800">{q.topic}</td>
                    <td className="py-3 pr-4 text-center font-black tabular-nums">
                      <span className={full ? 'text-emerald-600' : zero ? 'text-rose-600' : 'text-amber-600'}>{q.pointsEarned}</span>
                      <span className="text-slate-300">/{q.maxPoints}</span>
                    </td>
                    <td className="py-3 text-center">
                      {full ? <CheckCircle className="w-5 h-5 text-emerald-500 inline-block" />
                        : zero ? <XCircle className="w-5 h-5 text-rose-500 inline-block" />
                        : <AlertTriangle className="w-5 h-5 text-amber-500 inline-block" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Certificate / Fail Card ── */}
      {passed ? (
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8" />
              <h2 className="text-2xl font-black tracking-tight">PASS — Certificate Eligible</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-3 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-white/60 font-bold block text-[10px] uppercase tracking-widest">Module</span><span className="font-black">{moduleName}</span></div>
                <div><span className="text-white/60 font-bold block text-[10px] uppercase tracking-widest">Score</span><span className="font-black">{totalScore}/{maxScore} ({pct}%)</span></div>
                <div><span className="text-white/60 font-bold block text-[10px] uppercase tracking-widest">Date Issued</span><span className="font-black">{today}</span></div>
                <div><span className="text-white/60 font-bold block text-[10px] uppercase tracking-widest">Certificate ID</span><span className="font-black font-mono text-xs">{certId}</span></div>
                <div className="sm:col-span-2"><span className="text-white/60 font-bold block text-[10px] uppercase tracking-widest">Valid Until</span><span className="font-black">{getExpiryDate()}</span></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleDownloadCert} className="flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-black text-sm hover:bg-emerald-50 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/50">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button onClick={handleShareCert} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-white/20 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30">
                <Share2 className="w-4 h-4" /> Share Link
              </button>
              <button className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-white/20 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30">
                <UserPlus className="w-4 h-4" /> Add to Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border-2 border-rose-200 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Try Again</h2>
              <p className="text-slate-500 text-sm font-bold">Score {pct}% — need 70% to pass</p>
            </div>
          </div>
          <div className="space-y-3 mb-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Weakest Areas</h4>
            {weakest.map((q) => (
              <div key={q.questionNumber} className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-sm font-bold text-slate-700 flex-1">Q{q.questionNumber}. {q.topic}</span>
                <span className="text-sm font-black text-rose-600 tabular-nums">{q.pointsEarned}/{q.maxPoints}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate('resource', moduleId)} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-black text-sm hover:bg-slate-200 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <BookOpen className="w-4 h-4" /> Return to Resource Page
            </button>
            <button onClick={onRetake} className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300">
              <RotateCcw className="w-4 h-4" /> Retake Simulation
            </button>
          </div>
        </div>
      )}

      {/* ── Action Buttons ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {passed && (
          <button onClick={handleDownloadCert} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <Download className="w-5 h-5 text-slate-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Certificate</span>
          </button>
        )}
        <button onClick={onRetake} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <RotateCcw className="w-5 h-5 text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Retake</span>
        </button>
        <button onClick={() => setShowReview(!showReview)} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <Eye className="w-5 h-5 text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Review</span>
        </button>
        <button onClick={() => onNavigate('resource', moduleId)} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <BookOpen className="w-5 h-5 text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Module Info</span>
        </button>
        <button onClick={() => onNavigate('modules')} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <Shield className="w-5 h-5 text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Related</span>
        </button>
        <button onClick={() => onNavigate('modules')} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <ArrowLeft className="w-5 h-5 text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">All Modules</span>
        </button>
      </div>

      {/* ── Review Answers Section ── */}
      {showReview && (
        <div className="animate-slide-down">
          <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
            <Eye className="w-5 h-5 text-slate-400" /> Review All Answers
          </h2>
          <ReviewAccordion questions={questions} />
        </div>
      )}
    </div>
  );
};

export default SimulationResults;
