import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Trophy,
  Zap,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface PartialCreditRow {
  element: string;
  userAnswer: string;
  correct: boolean;
  points: number;
  maxPoints: number;
}

export interface FeedbackPanelProps {
  isCorrect: boolean;
  pointsEarned: number;
  maxPoints: number;
  explanationText: string;
  proTip: string;
  /** Always-visible correct answer display */
  correctAnswerDisplay?: string | null;
  /** For SPOT/CLASSIFY: row-by-row partial credit breakdown */
  partialCredit?: PartialCreditRow[];
  /** Called when user clicks "Continue to Next Question" */
  onContinue: () => void;
  isLastQuestion?: boolean;

  /** AI Deep Dive fields */
  aiLoading?: boolean;
  openingLine?: string;
  redFlags?: { label: string; detail: string; legitimate_version: string }[];
  attackAnatomy?: { step: number; description: string }[];
  correctProcess?: string[];
  staySharp?: string;
  closing?: string;
}

// ─────────────────────────────────────────────────────────
// Animated Counter Hook
// ─────────────────────────────────────────────────────────
function useAnimatedCounter(target: number, duration = 800): number {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration]);

  return value;
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  isCorrect,
  pointsEarned,
  maxPoints,
  explanationText,
  proTip,
  correctAnswerDisplay,
  partialCredit,
  onContinue,
  isLastQuestion = false,
  aiLoading = false,
  openingLine,
  redFlags,
  attackAnatomy,
  correctProcess,
  staySharp,
  closing,
}) => {
  const [showContinue, setShowContinue] = useState(false);
  const [visible, setVisible] = useState(false);
  const animatedPoints = useAnimatedCounter(pointsEarned, 1000);

  // Slide-in animation
  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  // Show continue button after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowContinue(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-[400ms] ease-out ${visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
        }`}
      role="region"
      aria-label="Answer feedback"
      aria-live="polite"
    >
      <div className={`rounded-2xl border-2 overflow-hidden ${isCorrect
          ? 'border-emerald-200 bg-gradient-to-b from-emerald-50 to-white'
          : 'border-rose-200 bg-gradient-to-b from-rose-50 to-white'
        }`}>
        {/* ── Correctness Banner ── */}
        <div className={`px-6 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center gap-4 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
          }`}>
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <XCircle className="w-8 h-8 text-white" />
            )}
            <h3 className="text-2xl font-black text-white tracking-tight">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h3>
          </div>

          {/* Score */}
          <div className="sm:ml-auto flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl">
            <Trophy className="w-5 h-5 text-white" />
            <span className="text-white font-black text-lg tabular-nums">
              Points: {animatedPoints}/{maxPoints}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Explanation / Opening */}
          <div>
            {aiLoading ? (
              <div className="animate-pulse space-y-3 mb-6">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ) : (
              <>
                {openingLine && (
                  <p className="text-lg font-black text-slate-800 mb-3">{openingLine}</p>
                )}
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> Explanation
                </h4>
                <p className="text-slate-700 text-base leading-relaxed font-medium">
                  {explanationText}
                </p>
              </>
            )}

            {/* Always show correct answer */}
            {correctAnswerDisplay && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Correct Answer
                </div>
                <div className="text-sm text-emerald-800 font-bold leading-relaxed whitespace-pre-line">
                  {correctAnswerDisplay}
                </div>
              </div>
            )}
          </div>

          {/* Partial credit breakdown (SPOT / CLASSIFY) */}
          {partialCredit && partialCredit.length > 0 && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                Detailed Breakdown
              </h4>
              <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2.5 pr-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Element</th>
                      <th className="text-left py-2.5 pr-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Your Answer</th>
                      <th className="text-center py-2.5 pr-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Correct?</th>
                      <th className="text-right py-2.5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partialCredit.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 pr-4 font-bold text-slate-800">{row.element}</td>
                        <td className="py-3 pr-4 text-slate-600 font-mono text-xs">{row.userAnswer}</td>
                        <td className="py-3 pr-4 text-center">
                          {row.correct ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500 inline-block" aria-label="Correct" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500 inline-block" aria-label="Incorrect" />
                          )}
                        </td>
                        <td className="py-3 text-right font-black tabular-nums">
                          <span className={row.correct ? 'text-emerald-600' : 'text-rose-600'}>
                            {row.points}
                          </span>
                          <span className="text-slate-300">/{row.maxPoints}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AI Deep Dive Content */}
          {!aiLoading && (redFlags || attackAnatomy || correctProcess || staySharp) && (
            <div className="mt-10 pt-10 border-t border-slate-100">
              <h4 className="text-xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Professional Training Dossier
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stay Sharp Warning */}
                {staySharp && (
                  <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 md:col-span-2">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-3">Stay Sharp</h5>
                    <p className="text-sm text-slate-800 leading-relaxed font-bold">
                      {staySharp}
                    </p>
                  </div>
                )}

                {/* Red Flags Analysis */}
                {redFlags && redFlags.length > 0 && (
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50 md:col-span-2">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-4">Threat Indicators (Red Flags)</h5>
                    <div className="space-y-4">
                      {redFlags.map((flag, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                          <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-black">!</div>
                          <div className="flex-1">
                            <h6 className="font-bold text-slate-900">{flag.label}</h6>
                            <p className="text-sm text-slate-600 mt-1">{flag.detail}</p>
                            <p className="text-xs text-emerald-600 font-medium mt-2 bg-emerald-50 inline-block px-2 py-1 rounded">Legitimate: {flag.legitimate_version}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attack Anatomy */}
                {attackAnatomy && attackAnatomy.length > 0 && (
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">Attack Anatomy</h5>
                    <div className="space-y-3">
                      {attackAnatomy.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-blue-100 text-blue-600 text-[10px] font-black shrink-0 mt-0.5">{step.step}</span>
                          <span className="text-sm font-medium text-slate-700 leading-tight">{step.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Correct Process (Only shown if provided / incorrect) */}
                {correctProcess && correctProcess.length > 0 && (
                  <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100/30">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Correct Decision Process</h5>
                    <div className="space-y-3">
                      {correctProcess.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-bold text-slate-700 leading-tight">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pro Tip */}
          {aiLoading ? (
            <div className="animate-pulse h-20 bg-slate-100 rounded-xl"></div>
          ) : proTip && (
            <div className={`p-5 rounded-xl border ${isCorrect
                ? 'bg-emerald-50/50 border-emerald-100'
                : 'bg-amber-50/50 border-amber-100'
              }`}>
              <div className="flex items-start gap-3">
                <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-500' : 'text-amber-500'
                  }`} />
                <div>
                  <h4 className={`text-xs font-black uppercase tracking-widest mb-2 ${isCorrect ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                    Pro Tip
                  </h4>
                  <p className={`text-sm font-medium leading-relaxed ${isCorrect ? 'text-emerald-800' : 'text-amber-800'
                    }`}>
                    {proTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {closing && !aiLoading && (
            <p className="text-center font-bold text-slate-500 italic mt-6">{closing}</p>
          )}


        </div>

        {/* ── Continue Button ── */}
        <div className={`px-6 md:px-8 pb-6 md:pb-8 transition-all duration-500 ease-out ${showContinue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
          <button
            onClick={onContinue}
            disabled={!showContinue}
            aria-label={isLastQuestion ? 'View simulation results' : 'Continue to next question'}
            className="w-full py-5 rounded-2xl text-lg font-black bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-xl active:scale-[0.97] active:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-3"
          >
            {isLastQuestion ? 'View Results' : 'Continue to Next Question'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPanel;
