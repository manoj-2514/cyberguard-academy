import React, { useState } from 'react';
import { Lock, ChevronDown, CheckCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface BlankField {
  id: string;
  /** If provided, render a dropdown with these options. Otherwise render a text input. */
  options?: string[];
  placeholder?: string;
  correctAnswer?: string;
  textBefore?: string;
  textAfter?: string;
}

export interface FillBlankQuestionProps {
  questionNumber: number;
  questionText: string;
  segments: Array<
    | { type: 'text'; content: string }
    | { type: 'blank'; blankId: string }
  >;
  blanks: BlankField[];
  onSubmit: (answers: Record<string, string>) => void;
  disabled?: boolean;
  /** Correct answers map for post-submission display */
  correctAnswers?: Record<string, string>;
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
const FillBlankQuestion: React.FC<FillBlankQuestionProps> = ({
  questionNumber,
  questionText,
  segments: propSegments,
  blanks,
  onSubmit,
  disabled = false,
  correctAnswers,
}) => {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    blanks.forEach(b => { init[b.id] = ''; });
    return init;
  });
  const [internalLocked, setInternalLocked] = useState(false);
  const locked = disabled || internalLocked;

  // Auto-generate segments from blanks data if segments are empty
  const segments = React.useMemo(() => {
    if (propSegments && propSegments.length > 0) return propSegments;

    // Build segments from blanks' textBefore/textAfter
    const result: Array<{ type: 'text'; content: string } | { type: 'blank'; blankId: string }> = [];
    blanks.forEach((blank) => {
      if (blank.textBefore) {
        result.push({ type: 'text', content: blank.textBefore });
      }
      result.push({ type: 'blank', blankId: blank.id });
      if (blank.textAfter) {
        result.push({ type: 'text', content: blank.textAfter });
      }
    });
    return result;
  }, [propSegments, blanks]);

  // Check if an answer is correct (case-insensitive)
  const isAnswerCorrect = (blankId: string): boolean | null => {
    if (!locked) return null;
    const blank = blanks.find(b => b.id === blankId);
    const userVal = values[blankId]?.trim().toLowerCase();
    const correctVal = blank?.correctAnswer?.trim().toLowerCase() || correctAnswers?.[blankId]?.trim().toLowerCase();
    if (!correctVal) return null;
    return userVal === correctVal;
  };

  const allFilled = blanks.every(b => values[b.id]?.trim() !== '');

  const handleChange = (id: string, value: string) => {
    if (locked) return;
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (locked || !allFilled) return;
    setInternalLocked(true);
    onSubmit(values);
  };

  const getBlank = (blankId: string) => blanks.find(b => b.id === blankId);

  const getInputClasses = (blankId: string): string => {
    if (!locked) {
      return values[blankId]
        ? 'bg-blue-50 border-blue-300 text-blue-800'
        : 'bg-amber-50 border-amber-300 text-slate-700 placeholder:text-amber-400';
    }
    const correct = isAnswerCorrect(blankId);
    if (correct === true) return 'bg-emerald-50 border-emerald-400 text-emerald-800';
    if (correct === false) return 'bg-rose-50 border-rose-400 text-rose-800';
    return 'bg-blue-50 border-blue-300 text-blue-800';
  };

  return (
    <div className="space-y-8">
      {/* Question header */}
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
          Question {questionNumber} · Fill in the Blank
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {questionText}
        </h2>
      </div>

      {/* Paragraph with inline blanks — DESKTOP */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        {/* Desktop: inline blanks */}
        <div className="hidden md:block">
          <div className="text-slate-700 text-lg leading-[2.8] flex flex-wrap items-baseline gap-y-2">
            {segments.map((seg, i) => {
              if (seg.type === 'text') {
                return (
                  <span key={i} className="whitespace-pre-wrap">
                    {seg.content}
                  </span>
                );
              }

              const blank = getBlank(seg.blankId);
              if (!blank) return null;

              if (blank.options) {
                return (
                  <span key={i} className="inline-flex items-center mx-1 relative">
                    <select
                      value={values[blank.id] || ''}
                      onChange={(e) => handleChange(blank.id, e.target.value)}
                      disabled={locked}
                      aria-label={`Blank ${blank.id}: ${blank.placeholder || 'select an option'}`}
                      className={`appearance-none pl-3 pr-8 py-2 min-h-[48px] rounded-xl border-2 font-bold text-base transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${getInputClasses(blank.id)} ${locked ? 'cursor-not-allowed' : ''}`}
                      style={{ fontSize: '16px' }}
                    >
                      <option value="" disabled>
                        {blank.placeholder || '— select —'}
                      </option>
                      {blank.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2 text-slate-400 pointer-events-none" />
                  </span>
                );
              }

              return (
                <span key={i} className="inline-flex mx-1 flex-col">
                  <input
                    type="text"
                    value={values[blank.id] || ''}
                    onChange={(e) => handleChange(blank.id, e.target.value)}
                    disabled={locked}
                    placeholder={blank.placeholder || '________'}
                    aria-label={`Blank ${blank.id}: ${blank.placeholder || 'type your answer'}`}
                    inputMode="text"
                    autoComplete="off"
                    className={`px-3 py-2 min-h-[48px] rounded-xl border-2 font-bold text-base min-w-[120px] w-40 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${getInputClasses(blank.id)} ${locked ? 'cursor-not-allowed' : ''}`}
                    style={{ fontSize: '16px' }}
                  />
                  {/* Show correct answer after submission */}
                  {locked && isAnswerCorrect(blank.id) === false && blank.correctAnswer && (
                    <span className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {blank.correctAnswer}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Mobile: numbered markers in paragraph + inputs below */}
        <div className="md:hidden">
          {/* Paragraph with [1] [2] markers */}
          <div className="text-slate-700 text-base leading-relaxed mb-6">
            {segments.map((seg, i) => {
              if (seg.type === 'text') {
                return <span key={i}>{seg.content}</span>;
              }
              const blankIndex = blanks.findIndex(b => b.id === seg.blankId);
              return (
                <span key={i} className="inline-flex items-center mx-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-black text-sm">
                  [{blankIndex + 1}]
                </span>
              );
            })}
          </div>

          {/* Numbered input fields below */}
          <div className="space-y-4">
            {blanks.map((blank, index) => (
              <div key={blank.id}>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Blank {index + 1}:
                </label>
                {blank.options ? (
                  <div className="relative">
                    <select
                      value={values[blank.id] || ''}
                      onChange={(e) => handleChange(blank.id, e.target.value)}
                      disabled={locked}
                      aria-label={`Blank ${index + 1}`}
                      className={`w-full appearance-none pl-4 pr-8 py-3 min-h-[48px] rounded-xl border-2 font-bold text-base transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${getInputClasses(blank.id)} ${locked ? 'cursor-not-allowed' : ''}`}
                      style={{ fontSize: '16px' }}
                    >
                      <option value="" disabled>{blank.placeholder || '— select —'}</option>
                      {blank.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={values[blank.id] || ''}
                    onChange={(e) => handleChange(blank.id, e.target.value)}
                    disabled={locked}
                    placeholder={blank.placeholder || 'Type your answer...'}
                    aria-label={`Blank ${index + 1}`}
                    inputMode="text"
                    autoComplete="off"
                    className={`w-full px-4 py-3 min-h-[48px] rounded-xl border-2 font-bold text-base transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${getInputClasses(blank.id)} ${locked ? 'cursor-not-allowed' : ''}`}
                    style={{ fontSize: '16px' }}
                  />
                )}
                {/* Correct answer on wrong submission */}
                {locked && isAnswerCorrect(blank.id) === false && blank.correctAnswer && (
                  <div className="flex items-center gap-1.5 mt-2 text-emerald-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-sm font-bold">Correct: {blank.correctAnswer}</span>
                  </div>
                )}
                {locked && isAnswerCorrect(blank.id) === true && (
                  <div className="flex items-center gap-1.5 mt-2 text-emerald-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-sm font-bold">Correct!</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center justify-between text-sm text-slate-400 font-bold" role="status" aria-live="polite">
        <span>
          {blanks.filter(b => values[b.id]?.trim()).length} of {blanks.length} blanks filled
        </span>
        {locked && (
          <span className="flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
            <Lock className="w-3.5 h-3.5" /> Locked
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={locked || !allFilled}
        aria-label="Submit filled answers"
        className={`w-full py-5 rounded-2xl text-lg font-black transition-all active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          locked
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : !allFilled
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

export default FillBlankQuestion;
