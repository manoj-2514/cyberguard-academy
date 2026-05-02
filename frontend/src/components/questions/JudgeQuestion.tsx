import React, { useState } from 'react';
import { Shield, ShieldAlert, Mail, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface EmailScenario {
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  url?: string;
  timestamp?: string;
}

export interface JudgeQuestionProps {
  questionNumber: number;
  questionText: string;
  scenario: EmailScenario;
  onSubmit: (answer: 'REAL' | 'FAKE') => void;
  correctAnswer?: 'REAL' | 'FAKE' | null;
  isIncorrect?: boolean;
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────
// 4-State Model
// ─────────────────────────────────────────────────────────
type ButtonState = 'idle' | 'correct' | 'wrong' | 'other';

const getButtonState = (
  buttonValue: 'REAL' | 'FAKE',
  userAnswer: 'REAL' | 'FAKE' | null,
  correctAnswer: 'REAL' | 'FAKE' | null | undefined,
  hasSubmitted: boolean
): ButtonState => {
  if (!hasSubmitted) {
    return userAnswer === buttonValue ? 'idle' : 'idle'; // both idle before submit
  }
  const normalize = (val: string | null | undefined) => String(val ?? '').toLowerCase().trim();
  const btnNorm = normalize(buttonValue);
  const userNorm = normalize(userAnswer);
  const corNorm = normalize(correctAnswer);

  if (btnNorm === corNorm) return 'correct';
  if (btnNorm === userNorm) return 'wrong';
  return 'other';
};

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
const JudgeQuestion: React.FC<JudgeQuestionProps> = ({
  questionNumber,
  questionText,
  scenario,
  onSubmit,
  correctAnswer,
  isIncorrect,
  disabled = false,
}) => {
  const [selected, setSelected] = useState<'REAL' | 'FAKE' | null>(null);
  const hasSubmitted = disabled || !!correctAnswer;

  const handleSelect = (verdict: 'REAL' | 'FAKE') => {
    if (hasSubmitted) return;
    setSelected(verdict);
    onSubmit(verdict);
  };

  const realState = getButtonState('REAL', selected, correctAnswer, hasSubmitted);
  const fakeState = getButtonState('FAKE', selected, correctAnswer, hasSubmitted);

  const getButtonClasses = (state: ButtonState, isReal: boolean) => {
    const base = 'relative flex items-center justify-center gap-4 py-7 px-8 rounded-2xl text-xl font-black transition-all active:scale-[0.97] border-2 focus:outline-none focus:ring-4';
    const focusRing = isReal ? 'focus:ring-blue-300' : 'focus:ring-rose-300';

    switch (state) {
      case 'correct':
        return `${base} ${focusRing} bg-emerald-50 text-emerald-700 border-emerald-500 shadow-xl shadow-emerald-200 cursor-not-allowed`;
      case 'wrong':
        return `${base} ${focusRing} bg-rose-50 text-rose-700 border-rose-500 shadow-xl shadow-rose-200 cursor-not-allowed`;
      case 'other':
        return `${base} ${focusRing} bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50`;
      case 'idle':
      default:
        return isReal
          ? `${base} ${focusRing} bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-700 hover:shadow-xl hover:shadow-blue-200`
          : `${base} ${focusRing} bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-700 hover:shadow-xl hover:shadow-rose-200`;
    }
  };

  const getStateIcon = (state: ButtonState) => {
    if (state === 'correct') return <CheckCircle className="w-6 h-6 text-emerald-500 absolute top-3 right-3" />;
    if (state === 'wrong') return <XCircle className="w-6 h-6 text-rose-500 absolute top-3 right-3" />;
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Question header */}
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
          Question {questionNumber} · Judge
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {questionText}
        </h2>
      </div>

      {/* Simulated email */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Email chrome */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs text-slate-500 font-bold ml-3 uppercase tracking-widest">
            Email Preview
          </span>
        </div>

        {/* Email header */}
        <div className="p-5 md:p-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-slate-900">{scenario.senderName}</span>
                <span className="text-sm text-slate-400 font-mono">&lt;{scenario.senderEmail}&gt;</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{scenario.subject}</h3>
              {scenario.timestamp && (
                <p className="text-xs text-slate-400 mt-1">{scenario.timestamp}</p>
              )}
            </div>
          </div>
        </div>

        {/* Email body */}
        <div className="p-5 md:p-6">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-[15px]">
            {scenario.body}
          </div>
          {scenario.url && (
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200 text-sm font-mono break-all">
              <ExternalLink className="w-4 h-4 shrink-0" />
              {scenario.url}
            </div>
          )}
        </div>
      </div>

      {/* Verdict buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect('REAL')}
          disabled={hasSubmitted}
          aria-pressed={selected === 'REAL'}
          aria-label="Judge as Real / Legitimate"
          className={getButtonClasses(realState, true)}
        >
          <Shield className="w-7 h-7" />
          ✅ REAL
          {getStateIcon(realState)}
        </button>

        <button
          onClick={() => handleSelect('FAKE')}
          disabled={hasSubmitted}
          aria-pressed={selected === 'FAKE'}
          aria-label="Judge as Fake / Phishing"
          className={getButtonClasses(fakeState, false)}
        >
          <ShieldAlert className="w-7 h-7" />
          ❌ FAKE
          {getStateIcon(fakeState)}
        </button>
      </div>

      {hasSubmitted && (
        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest" role="status">
          Answer locked — awaiting feedback
        </p>
      )}
    </div>
  );
};

export default JudgeQuestion;
