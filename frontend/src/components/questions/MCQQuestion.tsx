import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface MCQOption {
  id?: string;
  key?: string;    // A, B, C, D
  text: string;
}

export interface MCQQuestionProps {
  questionNumber: number;
  questionText: string;
  options: MCQOption[];
  onSubmit: (selected: { key: string; text: string }) => void;
  correctKey?: string | null;
  isIncorrect?: boolean;
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────
// 5-State Model
// ─────────────────────────────────────────────────────────
type OptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'other';

const getOptionState = (
  optKey: string,
  selectedKey: string | null,
  correctKey: string | null | undefined,
  hasSubmitted: boolean
): OptionState => {
  if (!hasSubmitted) {
    return selectedKey === optKey ? 'selected' : 'idle';
  }
  const normalize = (val: string | null | undefined) => String(val ?? '').toLowerCase().trim();
  const optNorm = normalize(optKey);
  const selNorm = normalize(selectedKey);
  const corNorm = normalize(correctKey);

  if (optNorm === corNorm) return 'correct';       // always green
  if (optNorm === selNorm) return 'wrong';         // red if wrong pick
  return 'other';                                     // dimmed
};

const OPTION_STYLES: Record<OptionState, string> = {
  idle: 'bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md active:scale-[0.98] cursor-pointer',
  selected: 'bg-blue-50 border-2 border-blue-500 shadow-lg shadow-blue-100 cursor-pointer',
  correct: 'bg-emerald-50 border-2 border-emerald-500 shadow-lg shadow-emerald-100 cursor-not-allowed',
  wrong: 'bg-rose-50 border-2 border-rose-500 shadow-lg shadow-rose-100 cursor-not-allowed',
  other: 'bg-white border border-slate-200 opacity-50 cursor-not-allowed',
};

const BADGE_STYLES: Record<OptionState, string> = {
  idle: 'bg-slate-100 text-slate-600',
  selected: 'bg-blue-500 text-white shadow-lg shadow-blue-500/20',
  correct: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20',
  wrong: 'bg-rose-500 text-white shadow-lg shadow-rose-500/20',
  other: 'bg-slate-100 text-slate-300',
};

const TEXT_STYLES: Record<OptionState, string> = {
  idle: 'text-slate-700',
  selected: 'text-blue-900',
  correct: 'text-emerald-900',
  wrong: 'text-rose-900',
  other: 'text-slate-300',
};

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
const MCQQuestion: React.FC<MCQQuestionProps> = ({
  questionNumber,
  questionText,
  options,
  onSubmit,
  correctKey,
  isIncorrect,
  disabled = false,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const hasSubmitted = disabled || !!correctKey;

  const handleSelect = (key: string, text: string) => {
    if (hasSubmitted) return;
    setSelected(key);
    onSubmit({ key, text });
  };

  return (
    <div className="space-y-8">
      {/* Question header */}
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
          Question {questionNumber} · Multiple Choice
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {questionText}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {options.map((opt, idx) => {
          const optKey = opt.key || opt.id || String.fromCharCode(65 + idx);
          const state = getOptionState(optKey, selected, correctKey, hasSubmitted);

          return (
            <button
              key={optKey}
              onClick={() => handleSelect(optKey, opt.text)}
              disabled={hasSubmitted}
              role="radio"
              aria-checked={selected === optKey}
              aria-label={`Option ${optKey}: ${opt.text}`}
              className={`w-full flex items-center gap-4 p-5 md:p-6 rounded-xl text-left transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${OPTION_STYLES[state]}`}
            >
              {/* Letter badge */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 transition-all ${BADGE_STYLES[state]}`}>
                {optKey}
              </div>

              {/* Option text */}
              <span className={`flex-1 font-bold text-base leading-relaxed ${TEXT_STYLES[state]}`}>
                {opt.text}
              </span>

              {/* Result icon */}
              {hasSubmitted && state === 'correct' && (
                <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
              )}
              {hasSubmitted && state === 'wrong' && (
                <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {hasSubmitted && (
        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest" role="status">
          Answer locked — awaiting feedback
        </p>
      )}
    </div>
  );
};

export default MCQQuestion;
