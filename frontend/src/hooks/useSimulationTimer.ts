import { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface SimulationTimerState {
  /** Seconds remaining for the current question (counts down from perQuestionSeconds) */
  questionTimeLeft: number;
  /** Total seconds elapsed across the entire simulation */
  overallElapsed: number;
  /** Total seconds remaining in the overall budget */
  overallTimeLeft: number;
  /** Whether the per-question timer hit zero */
  questionExpired: boolean;
  /** Whether the overall budget hit zero */
  overallExpired: boolean;
  /** Whether the timer is currently running */
  isRunning: boolean;
}

export interface SimulationTimerActions {
  /** Start/resume the timer */
  start: () => void;
  /** Pause the timer */
  pause: () => void;
  /** Reset the per-question timer for the next question */
  resetQuestion: () => void;
  /** Fully reset everything (new simulation) */
  resetAll: () => void;
}

export interface UseSimulationTimerOptions {
  perQuestionSeconds?: number;  // default 120 (2 min)
  overallBudgetSeconds?: number; // default 720 (12 min)
  onQuestionExpired?: () => void;
  onOverallExpired?: () => void;
}

// ─────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────
export function useSimulationTimer(
  options: UseSimulationTimerOptions = {}
): [SimulationTimerState, SimulationTimerActions] {
  const {
    perQuestionSeconds = 120,
    overallBudgetSeconds = 720,
    onQuestionExpired,
    onOverallExpired,
  } = options;

  const [questionTimeLeft, setQuestionTimeLeft] = useState(perQuestionSeconds);
  const [overallElapsed, setOverallElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [questionExpired, setQuestionExpired] = useState(false);
  const [overallExpired, setOverallExpired] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionExpiredCb = useRef(onQuestionExpired);
  const overallExpiredCb = useRef(onOverallExpired);

  // Keep callback refs fresh
  useEffect(() => { questionExpiredCb.current = onQuestionExpired; }, [onQuestionExpired]);
  useEffect(() => { overallExpiredCb.current = onOverallExpired; }, [onOverallExpired]);

  const overallTimeLeft = Math.max(0, overallBudgetSeconds - overallElapsed);

  // Tick logic
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setOverallElapsed(prev => {
        const next = prev + 1;
        if (next >= overallBudgetSeconds) {
          setOverallExpired(true);
          setIsRunning(false);
          overallExpiredCb.current?.();
          return overallBudgetSeconds;
        }
        return next;
      });

      setQuestionTimeLeft(prev => {
        if (prev <= 1) {
          setQuestionExpired(true);
          setIsRunning(false);
          questionExpiredCb.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, overallBudgetSeconds]);

  const start = useCallback(() => {
    if (!overallExpired && !questionExpired) {
      setIsRunning(true);
    }
  }, [overallExpired, questionExpired]);

  const pause = useCallback(() => setIsRunning(false), []);

  const resetQuestion = useCallback(() => {
    setQuestionTimeLeft(perQuestionSeconds);
    setQuestionExpired(false);
    setIsRunning(true);
  }, [perQuestionSeconds]);

  const resetAll = useCallback(() => {
    setQuestionTimeLeft(perQuestionSeconds);
    setOverallElapsed(0);
    setQuestionExpired(false);
    setOverallExpired(false);
    setIsRunning(false);
  }, [perQuestionSeconds]);

  return [
    { questionTimeLeft, overallElapsed, overallTimeLeft, questionExpired, overallExpired, isRunning },
    { start, pause, resetQuestion, resetAll },
  ];
}

// ─────────────────────────────────────────────────────────
// Speed Bonus Calculator
// ─────────────────────────────────────────────────────────
const MAX_SPEED_BONUS = 30;

/**
 * Calculate speed bonus points based on remaining overall time.
 * Only awarded if all questions were completed (not expired early).
 */
export function calculateSpeedBonus(
  overallTimeLeft: number,
  overallBudget: number = 720,
  allQuestionsCompleted: boolean = true
): { bonus: number; timeUsedMinutes: number } {
  if (!allQuestionsCompleted || overallTimeLeft <= 0) {
    return { bonus: 0, timeUsedMinutes: Math.round(overallBudget / 60) };
  }
  const ratio = overallTimeLeft / overallBudget;
  const bonus = Math.round(ratio * MAX_SPEED_BONUS);
  const timeUsedMinutes = Math.round((overallBudget - overallTimeLeft) / 60 * 10) / 10;
  return { bonus, timeUsedMinutes };
}
