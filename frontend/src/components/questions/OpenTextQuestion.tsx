import React, { useState, useMemo } from 'react';
import { Lock, FileText, AlertCircle, CheckCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface OpenTextQuestionProps {
  questionNumber: number;
  questionText: string;
  scenarioText: string;
  minWords?: number;  // default 50
  maxWords?: number;  // default 150
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
const OpenTextQuestion: React.FC<OpenTextQuestionProps> = ({
  questionNumber,
  questionText,
  scenarioText,
  minWords = 50,
  maxWords = 150,
  onSubmit,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const [internalLocked, setInternalLocked] = useState(false);
  const locked = disabled || internalLocked;

  const wordCount = useMemo(() => countWords(text), [text]);
  const inRange = wordCount >= minWords && wordCount <= maxWords;
  const tooShort = wordCount > 0 && wordCount < minWords;
  const tooLong = wordCount > maxWords;

  const handleSubmit = () => {
    if (locked || !inRange) return;
    setInternalLocked(true);
    onSubmit(text.trim());
  };

  return (
    <div className="space-y-8">
      {/* Question header */}
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
          Question {questionNumber} · Open Response
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {questionText}
        </h2>
      </div>

      {/* Scenario */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">Scenario</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Read carefully before responding
            </p>
          </div>
        </div>
        <p className="text-slate-700 text-lg leading-relaxed">{scenarioText}</p>
      </div>

      {/* Textarea */}
      <div className="space-y-3">
        <label htmlFor={`open-text-${questionNumber}`} className="sr-only">
          Your response
        </label>
        <textarea
          id={`open-text-${questionNumber}`}
          value={text}
          onChange={(e) => !locked && setText(e.target.value)}
          disabled={locked}
          placeholder="Type your response here... Be specific and reference details from the scenario above."
          rows={8}
          aria-describedby={`word-count-${questionNumber}`}
          className={`w-full p-6 rounded-2xl border-2 text-base leading-relaxed resize-y transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            locked
              ? 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed'
              : tooLong
              ? 'bg-white border-rose-300 text-slate-900'
              : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
          }`}
        />

        {/* Word count bar */}
        <div
          id={`word-count-${questionNumber}`}
          className="flex items-center justify-between"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            {wordCount === 0 ? (
              <span className="text-slate-400 text-sm font-bold">
                Target: {minWords}–{maxWords} words
              </span>
            ) : inRange ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 text-sm font-bold">
                  {wordCount} words — within range
                </span>
              </>
            ) : tooShort ? (
              <>
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-amber-600 text-sm font-bold">
                  {wordCount} words — need {minWords - wordCount} more
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span className="text-rose-600 text-sm font-bold">
                  {wordCount} words — {wordCount - maxWords} over limit
                </span>
              </>
            )}
          </div>

          {/* Visual progress bar */}
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                tooLong
                  ? 'bg-rose-500'
                  : inRange
                  ? 'bg-emerald-500'
                  : 'bg-amber-400'
              }`}
              style={{ width: `${Math.min(100, (wordCount / maxWords) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={locked || !inRange}
        aria-label="Submit your response"
        className={`w-full py-5 rounded-2xl text-lg font-black transition-all active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          locked
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : !inRange
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl active:shadow-md'
        }`}
      >
        {locked ? (
          <span className="flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" /> Answer Locked
          </span>
        ) : (
          'Submit Answer'
        )}
      </button>
    </div>
  );
};

export default OpenTextQuestion;
