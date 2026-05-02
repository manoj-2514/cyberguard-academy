import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ShieldAlert, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SimulationShell from './SimulationShell';
import SimulationResults from './SimulationResults';
import ResumeBanner from './ResumeBanner';
import {
  JudgeQuestion,
  SpotQuestion,
  FillBlankQuestion,
  ClassifyQuestion,
  OrderQuestion,
  OpenTextQuestion,
  MCQQuestion
} from './questions';
import FeedbackPanel from './FeedbackPanel';
import { cyberguardDB } from '../utils/cyberguardDB';
import { useSimulationTimer, calculateSpeedBonus } from '../hooks/useSimulationTimer';
import type { ViewType } from './Header';
import type { Question } from '../data/questions/types';

// ─────────────────────────────────────────────────────────
// Question Validation (Defensive Standard 1)
// ─────────────────────────────────────────────────────────
const validateQuestion = (q: Question | null | undefined): boolean => {
  if (!q || !q.type || !q.id) {
    console.error('[Validation] Invalid question: missing required fields', q);
    return false;
  }
  const validators: Record<string, (q: Question) => boolean> = {
    JUDGE: (q) => typeof q.isFake === 'boolean',
    MCQ: (q) => (q.options?.length || 0) >= 2 && !!q.correctOptionId,
    SPOT: (q) => (q.redFlags?.length || 0) >= 1,
    FILL_BLANK: (q) => (q.blanks?.length || 0) >= 1,
    CLASSIFY: (q) => (q.items?.length || 0) >= 2,
    ORDER: (q) => (q.orderItems?.length || 0) >= 2,
    OPEN_TEXT: (q) => (q.questionText?.length || 0) > 5,
  };
  const valid = validators[q.type]?.(q) ?? false;
  if (!valid) {
    console.error(`[Validation] Question ${q.id} of type ${q.type} failed validation`, q);
  }
  return valid;
};

// ─────────────────────────────────────────────────────────
// Correct Answer Display Generator (Defensive Standard 4)
// ─────────────────────────────────────────────────────────
const getCorrectAnswerDisplay = (q: Question): string | null => {
  if (!q) return null;
  switch (q.type) {
    case 'MCQ': {
      const correctKey = q.correctOptionId;
      const correctOption = q.options?.find(opt =>
        String(opt.key ?? "").toLowerCase() === String(correctKey ?? "").toLowerCase() ||
        String(opt.text ?? "").toLowerCase() === String(correctKey ?? "").toLowerCase() ||
        String(opt.id ?? "").toLowerCase() === String(correctKey ?? "").toLowerCase()
      );
      if (correctOption) {
        const letter = String(correctOption.key || correctOption.id || correctKey).toUpperCase();
        const text = correctOption.text || "";
        return `${letter} — ${text}`;
      }
      return String(correctKey).toUpperCase();
    }
    case 'JUDGE':
      return q.isFake
        ? "FAKE — This is a phishing/malicious attempt"
        : "REAL — This is a legitimate communication";
    case 'SPOT': {
      const suspicious = (q.redFlags || [])
        .filter(h => h.isSuspicious !== false)
        .map(h => `• ${h.displayText || h.label}`)
        .join("\n");
      return suspicious || "See highlighted elements above";
    }
    case 'ORDER': {
      const sorted = [...(q.orderItems || [])]
        .sort((a, b) => {
          const aIdx = q.correctOrderIds?.indexOf(a.id) ?? 0;
          const bIdx = q.correctOrderIds?.indexOf(b.id) ?? 0;
          return aIdx - bIdx;
        });
      return sorted.map((s, i) => `${i + 1}. ${s.text}`).join(" → ");
    }
    case 'FILL_BLANK': {
      return (q.blanks || [])
        .map((b, i) => `Blank ${i + 1}: "${b.correctAnswer}"`)
        .join("  |  ");
    }
    case 'CLASSIFY': {
      return (q.items || [])
        .map(item => `${item.text} → ${item.category}`)
        .join("\n");
    }
    default:
      return null;
  }
};

// Dynamic Question Bank Loading
const loadQuestionBank = async (moduleId: string, level: 'easy' | 'medium' | 'hard'): Promise<Question[]> => {
  try {
    // Standardize moduleId for path
    let path = moduleId.toLowerCase().replace(/_/g, '-');

    // Specific Mappings
    if (path === 'phishing') path = 'email-analysis';
    if (path === 'mfa-authentication') path = 'network-defense';
    if (path === 'wifi-security') path = 'network-defense';
    if (path === 'data-classification') path = 'data-privacy';
    if (path === 'privacy-awareness') path = 'data-privacy';
    if (path === 'ransomware') path = 'ransomware-defense';

    const module = await import(`../data/questions/${path}/${level}-questions.ts`);
    return module[`${level}Questions`];
  } catch (e) {
    console.error(`Failed to load question bank for ${moduleId} ${level}:`, e);
    return [];
  }
};

export interface ActiveSimulationProps {
  moduleId: string;
  moduleName: string;
  level: 'easy' | 'medium' | 'hard';
  onExit: () => void;
  onNavigate: (view: ViewType, resourceId?: string) => void;
  sessionId?: string;
}

export const ActiveSimulation: React.FC<ActiveSimulationProps> = ({
  moduleId,
  moduleName,
  level,
  onExit,
  onNavigate,
  sessionId: initialSessionId
}) => {
  const { token } = useAuth();
  const [sessionId] = useState<string | undefined>(initialSessionId);

  // ─────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [hasStoredProgress, setHasStoredProgress] = useState<any>(null);
  const [resumed, setResumed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [passed, setPassed] = useState(false);

  // Question Bank State
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Simulation State
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);

  // AI Feedback State
  const [aiRedFlags, setAiRedFlags] = useState<{
    result: string;
    opening_line: string;
    explanation: string;
    red_flags: { label: string; detail: string; legitimate_version: string }[];
    attack_anatomy: { step: number; description: string }[];
    correct_process?: string[];
    pro_tip: string;
    stay_sharp: string;
    closing: string;
  } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);


  // Feedback UI State
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to feedback when it appears
  useEffect(() => {
    if (showingFeedback && feedbackRef.current) {
      // Small delay to ensure render is complete
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showingFeedback]);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Thresholds
  const threshold = level === 'easy' ? 0.6 : level === 'medium' ? 0.7 : 0.8;
  const maxScore = 70; // 7 questions * 10 points

  // ─────────────────────────────────────────────────────────
  // Question Selection (Anti-Repeat)
  // ─────────────────────────────────────────────────────────
  const selectQuestions = useCallback((bank: Question[]) => {
    const userData = cyberguardDB.getUserData();
    const shown = userData.shownQuestions?.[moduleId]?.[level] || [];

    const levelTypeMap = {
      easy: {
        Q1: ["JUDGE"],
        Q2: ["MCQ"],
        Q3: ["JUDGE"],
        Q4: ["SPOT"],
        Q5: ["MCQ"],
        Q6: ["CLASSIFY"],
        Q7: ["MCQ"]
      },
      medium: {
        Q1: ["JUDGE", "SPOT"],
        Q2: ["CLASSIFY", "FILL_BLANK"],
        Q3: ["ORDER"],
        Q4: ["MCQ"],
        Q5: ["SPOT"],
        Q6: ["FILL_BLANK"],
        Q7: ["ORDER"]
      },
      hard: {
        Q1: ["JUDGE", "SPOT"],
        Q2: ["CLASSIFY", "FILL_BLANK"],
        Q3: ["ORDER"],
        Q4: ["OPEN_TEXT"],
        Q5: ["MCQ"],
        Q6: ["SPOT", "JUDGE"],
        Q7: ["ORDER", "OPEN_TEXT"]
      }
    };

    const selected: Question[] = [];
    const usedIds = new Set<string>();

    for (let i = 1; i <= 7; i++) {
      const allowedTypes = (levelTypeMap[level] as any)[`Q${i}`];

      // Filter bank for this slot: correct type AND not already used in THIS session
      let possible = bank.filter(q => allowedTypes.includes(q.type) && !usedIds.has(q.id));

      // Secondary filter: prefer questions not shown in LAST attempt
      const fresh = possible.filter(q => !shown.includes(q.id));
      if (fresh.length > 0) possible = fresh;

      if (possible.length > 0) {
        const picked = possible[Math.floor(Math.random() * possible.length)];
        selected.push(picked);
        usedIds.add(picked.id);
      } else {
        // Fallback: pick any question of the FIRST allowed type, even if shown before
        const fallback = bank.find(q => allowedTypes[0] === q.type);
        if (fallback) {
          selected.push(fallback);
          usedIds.add(fallback.id);
        } else {
          // Absolute fallback if bank is empty or malformed
          selected.push(bank[0]);
        }
      }
    }

    return selected;
  }, [moduleId, level]);

  // Initial Load
  useEffect(() => {
    const init = async () => {
      setLoading(true);

      // Load Bank
      const bank = await loadQuestionBank(moduleId, level);
      if (bank.length === 0) {
        setSubmissionError(`Question bank for ${moduleName} (${level}) is under construction.`);
        setLoading(false);
        return;
      }
      const selected = selectQuestions(bank);
      setActiveQuestions(selected);

      // Local Flow Initialization
      const userData = cyberguardDB.getUserData();
      const module = userData.modules[moduleId];

      if (module?.currentAttempt && module.currentAttempt.level === level) {
        setHasStoredProgress(module.currentAttempt);
      } else {
        setResumed(true);
        timerActions.start();
        // Start fresh attempt in DB
        const attemptId = `attempt_${level}_${Date.now()}`;
        cyberguardDB.startLevelAttempt(moduleId, level, attemptId);
      }

      setLoading(false);
    };

    if (!sessionId) {
      init();
    } else {
      fetchBackendScenario(sessionId);
    }
  }, [moduleId, level, sessionId, moduleName, selectQuestions]);

  // Timer
  const [timerState, timerActions] = useSimulationTimer({
    perQuestionSeconds: 120,
    overallBudgetSeconds: 720,
    onQuestionExpired: () => handleTimeExpired(),
    onOverallExpired: () => handleOverallExpired()
  });

  const currentQuestionDef = activeQuestions[currentQuestionIndex];

  // ─────────────────────────────────────────────────────────
  // AI Red Flag Logic
  // ─────────────────────────────────────────────────────────
  const fetchAiFeedback = async (question: Question, userAnswer: any, isCorrect: boolean) => {
    setAiLoading(true);
    setAiRedFlags(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/analyze-error`, {
        questionId: question.id,
        question: question.questionText,
        scenario: question.scenario,
        userAnswer: userAnswer,
        type: question.type,
        isCorrect: isCorrect
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data) {
        setAiRedFlags(response.data);
      }
    } catch (e) {
      // Graceful fallback if Groq fails
      setAiRedFlags({
        result: isCorrect ? "correct" : "incorrect",
        opening_line: isCorrect ? "Good catch!" : "This one was tricky.",
        explanation: "The system is currently unable to generate detailed feedback.",
        red_flags: question.feedback.redFlags?.map(flag => ({ label: "Indicator", detail: flag, legitimate_version: "Legitimate source" })) || [],
        attack_anatomy: [{ step: 1, description: "Review the scenario carefully." }],
        correct_process: ["Check indicators", "Verify source"],
        pro_tip: question.feedback.proTip || "Always stay vigilant.",
        stay_sharp: "Attackers are always evolving.",
        closing: "Let's move on to the next one."
      });
    } finally {
      setAiLoading(false);
    }
  };

  const fetchBackendScenario = async (sid: string) => {
    setLoading(true);
    try {
      await axios.get(`${API_BASE_URL}/scenario/${sid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      timerActions.resetQuestion();
      timerActions.start();
    } catch (error: any) {
      setSubmissionError('Failed to load next scenario.');
    }
    setLoading(false);
  };

  // ─────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────
  const handleAnswerSubmit = async (userAnswer: any) => {
    timerActions.pause();
    if (!currentQuestionDef) return;

    let isCorrect = false;
    let earned = 0;
    const max = currentQuestionDef.scoreValue;
    const q = currentQuestionDef;

    switch (q.type) {
      case 'JUDGE': {
        const normalize = (val: any) => String(val ?? "").toLowerCase().trim();
        const judgeCorrectAnswer = q.isFake ? 'FAKE' : 'REAL';
        isCorrect = normalize(userAnswer) === normalize(judgeCorrectAnswer);
        earned = isCorrect ? max : 0;
        break;
      }
      case 'MCQ': {
        const normalize = (val: any) => String(val ?? "").toLowerCase().trim();
        const correct = q.correctOptionId;

        // Direct match
        if (normalize(userAnswer) === normalize(correct)) {
          isCorrect = true;
        } else if (userAnswer?.key !== undefined) {
          // User stored object {key, text} — compare key
          isCorrect = normalize(userAnswer.key) === normalize(correct);
        } else {
          // User stored option text — find matching option and compare key
          const matched = q.options?.find(opt =>
            normalize(opt.text) === normalize(userAnswer) ||
            normalize(opt.key) === normalize(userAnswer) ||
            normalize(opt.id) === normalize(userAnswer)
          );
          isCorrect = matched ? normalize(matched.key ?? matched.id) === normalize(correct) : false;
        }
        earned = isCorrect ? max : 0;
        break;
      }
      case 'SPOT':
        const selected = userAnswer as string[];
        const correctSpots = q.redFlags?.map(rf => rf.id) || [];
        isCorrect = selected.length === correctSpots.length && selected.every(id => correctSpots.includes(id));
        earned = isCorrect ? max : (selected.length > 0 ? Math.floor(max / 2) : 0);
        break;
      case 'FILL_BLANK':
        const blanks = userAnswer as Record<string, string>;
        const correctCount = Object.entries(blanks).filter(([id, val]) => {
          const b = q.blanks?.find(b => b.id === id);
          return b?.correctAnswer.toLowerCase() === val.toLowerCase();
        }).length;
        isCorrect = correctCount === (q.blanks?.length || 1);
        earned = Math.floor((correctCount / (q.blanks?.length || 1)) * max);
        break;
      case 'CLASSIFY':
        const mapping = userAnswer as Record<string, string>;
        const totalItems = q.items?.length || 1;
        const correctMapCount = Object.entries(mapping).filter(([id, cat]) => {
          const item = q.items?.find(i => i.id === id);
          return item?.category === cat;
        }).length;
        isCorrect = correctMapCount === totalItems;
        earned = Math.floor((correctMapCount / totalItems) * max);
        break;
      case 'ORDER':
        const order = userAnswer as string[];
        isCorrect = JSON.stringify(order) === JSON.stringify(q.correctOrderIds);
        earned = isCorrect ? max : 0;
        break;
      case 'OPEN_TEXT':
        await fetchAiFeedback(q, userAnswer, false);
        isCorrect = false; // Scoring removed from AI prompt, default to false or handle manually
        earned = 5;
        break;
    }

    if (q.type !== 'OPEN_TEXT') {
      fetchAiFeedback(q, userAnswer, isCorrect);
    }

    setFeedbackCorrect(isCorrect);
    setEarnedPoints(earned);
    setScore(prev => prev + earned);

    const newAnswer = {
      questionId: q.id,
      questionNumber: currentQuestionIndex + 1,
      type: q.type,
      userAnswer,
      correctAnswer: q.type === 'MCQ' ? q.correctOptionId :
        q.type === 'JUDGE' ? (q.isFake ? 'FAKE' : 'REAL') :
          q.type === 'ORDER' ? q.correctOrderIds :
            q.type === 'FILL_BLANK' ? q.blanks?.map(b => b.correctAnswer) :
              q.type === 'CLASSIFY' ? q.items?.map(i => i.category) :
                'See Feedback',
      score: earned,
      maxScore: max,
      timeTakenSeconds: 120 - timerState.questionTimeLeft,
    };

    setAnswers(prev => [...prev, newAnswer]);
    cyberguardDB.saveLevelAnswer(moduleId, level, newAnswer);
    setShowingFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowingFeedback(false);
    setAiRedFlags(null);

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      timerActions.resetQuestion();
      timerActions.start();
    } else {
      finishSimulation(score);
    }
  };

  const finishSimulation = (finalScore: number) => {
    const speedBonus = calculateSpeedBonus(timerState.overallTimeLeft, 720, true);
    const actualFinalScore = finalScore + (speedBonus.bonus || 0);
    const isPassed = (actualFinalScore / maxScore) >= threshold;

    cyberguardDB.completeLevel(moduleId, level, {
      completedAt: new Date().toISOString(),
      durationSeconds: timerState.overallElapsed,
      totalScore: finalScore,
      bonusPoints: speedBonus.bonus,
      finalScore: actualFinalScore,
      passed: isPassed,
      selectedQuestionIds: activeQuestions.map(q => q.id)
    });

    setPassed(isPassed);
    setCompleted(true);
  };

  const handleTimeExpired = () => {
    // Defensive Standard 6: null-safe timer expiry
    if (!currentQuestionDef || showingFeedback) return;
    const emptyAnswers: Record<string, any> = {
      JUDGE: null, MCQ: null, SPOT: [],
      FILL_BLANK: {}, CLASSIFY: {}, ORDER: [], OPEN_TEXT: ''
    };
    const emptyAnswer = emptyAnswers[currentQuestionDef.type] ?? null;
    handleAnswerSubmit(emptyAnswer);
  };

  const handleOverallExpired = () => {
    finishSimulation(score);
  };

  const handleStartOver = () => {
    window.location.reload();
  };

  const handleResume = () => {
    if (hasStoredProgress) {
      const lastQ = hasStoredProgress.answers?.length || 0;
      setCurrentQuestionIndex(lastQ);
      const totalScore = hasStoredProgress.answers?.reduce((acc: number, a: any) => acc + a.score, 0) || 0;
      setScore(totalScore);
      setAnswers(hasStoredProgress.answers || []);
    }
    setHasStoredProgress(null);
    setResumed(true);
    timerActions.start();
  };

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  if (loading && !completed) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">Initializing Level {level.toUpperCase()}...</p>
      </div>
    </div>
  );

  if (completed) {
    const results = answers.map((a, i) => {
      const q = activeQuestions[i];
      return {
        questionNumber: i + 1,
        topic: q?.topic || 'Security',
        questionType: q?.type || 'MCQ',
        questionText: q?.questionText || 'Assessment Question',
        userAnswer: typeof a.userAnswer === 'string' ? a.userAnswer : '[Complex Answer]',
        correctAnswer: 'Review in assessment',
        explanation: q?.feedback.explanation || '',
        pointsEarned: a.score,
        maxPoints: a.maxScore
      };
    });

    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SimulationResults
            moduleName={moduleName}
            moduleId={moduleId}
            totalScore={score}
            maxScore={maxScore}
            questions={results}
            speedBonus={{ points: calculateSpeedBonus(timerState.overallTimeLeft, 720, true).bonus, timeUsedMinutes: Math.floor(timerState.overallElapsed / 60) }}
            passed={passed}
            onRetake={handleStartOver}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    if (!currentQuestionDef || !currentQuestionDef.type) {
      return (
        <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Loading next question...</h3>
          <p className="text-slate-500 font-medium mb-8">Synchronizing simulation state...</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-blue-600 transition-all"
          >
            Retry Loading
          </button>
        </div>
      );
    }

    const q = currentQuestionDef;
    const commonProps = {
      key: `q-${currentQuestionIndex}-${q.id}`, // FORCING REMOUNT TO PREVENT FREEZE
      questionNumber: currentQuestionIndex + 1,
      questionText: q.questionText,
      scenario: q.scenario,
      onSubmit: handleAnswerSubmit,
      disabled: loading || showingFeedback,
      isIncorrect: showingFeedback && !feedbackCorrect
    };

    // Defensive Standard 1: validate before render
    if (!validateQuestion(q)) {
      return (
        <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center">
          <p className="text-amber-700 font-bold">This question could not be loaded. Skipping...</p>
          <button onClick={handleNextQuestion} className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all">
            Continue
          </button>
        </div>
      );
    }

    switch (q.type) {
      case 'JUDGE': return <JudgeQuestion {...commonProps} correctAnswer={showingFeedback ? (q.isFake ? 'FAKE' : 'REAL') : null} scenario={{ ...q.scenario, senderName: q.scenario.senderName || 'Unknown', senderEmail: q.scenario.senderEmail || 'unknown@domain.com', subject: q.scenario.subject || 'Security Alert', body: q.scenario.body || '' }} />;
      case 'MCQ': return <MCQQuestion {...commonProps} options={q.options || []} correctKey={showingFeedback ? (q.correctOptionId || '') : null} />;
      case 'SPOT': return <SpotQuestion {...commonProps} hotspots={q.redFlags || []} scenario={{ ...q.scenario, senderName: q.scenario.senderName || 'Unknown', senderEmail: q.scenario.senderEmail || 'unknown@domain.com', subject: q.scenario.subject || 'No Subject', body: q.scenario.body || '' }} />;
      case 'FILL_BLANK': return <FillBlankQuestion {...commonProps} segments={[]} blanks={q.blanks || []} />;
      case 'CLASSIFY': return <ClassifyQuestion {...commonProps} items={(q.items || []).map(i => ({ ...i, label: i.text }))} categories={q.categories} />;
      case 'ORDER': return <OrderQuestion {...commonProps} steps={(q.orderItems || []).map(i => ({ ...i, label: i.text }))} correctOrderIds={showingFeedback ? q.correctOrderIds : undefined} />;
      case 'OPEN_TEXT': return <OpenTextQuestion {...commonProps} scenarioText={q.scenario?.body || ''} />;
      default:
        console.error("Unknown question type:", q.type);
        // Safe fallback to MCQ if possible
        return <MCQQuestion {...commonProps} options={q.options || []} correctKey={q.correctOptionId || ''} />;
    }
  };

  const renderSimulationContent = () => {
    const q = currentQuestionDef;
    if (!q?.scenario) return null;
    const { scenario } = q;

    return (
      <div className="p-8 font-mono text-sm">
        {(scenario.senderEmail || scenario.senderName) && (
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">
              {(scenario.senderName || scenario.senderEmail)?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div>
              <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">From</div>
              <div className="text-slate-900 font-bold">{scenario.senderName || 'Unknown Sender'}</div>
              <div className="text-slate-400 text-xs">{scenario.senderEmail}</div>
            </div>
          </div>
        )}
        {scenario.subject && (
          <div className="mb-8">
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Subject</div>
            <div className="text-slate-900 font-black text-lg">{scenario.subject}</div>
          </div>
        )}
        {scenario.body && (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap">
            {scenario.body}
          </div>
        )}
        {scenario.logData && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
            <pre>{scenario.logData}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <SimulationShell
      moduleName={moduleName}
      moduleIcon={<Zap className="w-8 h-8 text-white" />}
      category="User Awareness"
      difficulty={level === 'easy' ? 'Beginner' : level === 'medium' ? 'Intermediate' : 'Advanced'}
      currentQuestion={currentQuestionIndex + 1}
      totalScore={score}
      timeElapsed={timerState.overallElapsed}
      questionTimeLeft={timerState.questionTimeLeft}
      showingFeedback={showingFeedback}
      onExit={onExit}
      onNavigate={onNavigate}
      simulationContent={renderSimulationContent()}
    >
      <div className="space-y-8">
        {hasStoredProgress && !resumed ? (
          <ResumeBanner
            currentQuestion={(hasStoredProgress.answers?.length || 0) + 1}
            lastUpdatedAt={hasStoredProgress.lastUpdatedAt}
            onResume={handleResume}
            onStartOver={handleStartOver}
          />
        ) : (
          <>
            {submissionError && (
              <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl text-rose-600 text-sm font-bold flex items-center gap-4 animate-shake">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{submissionError}</span>
              </div>
            )}

            {renderQuestion()}

            {showingFeedback && (currentQuestionDef) && (
              <div ref={feedbackRef} className="animate-slide-up">
                <FeedbackPanel
                  isCorrect={feedbackCorrect}
                  pointsEarned={earnedPoints}
                  maxPoints={currentQuestionDef.scoreValue}
                  explanationText={aiRedFlags?.explanation || currentQuestionDef.feedback.explanation}
                  proTip={aiRedFlags?.pro_tip || currentQuestionDef.feedback.proTip}
                  correctAnswerDisplay={getCorrectAnswerDisplay(currentQuestionDef)}
                  partialCredit={
                    currentQuestionDef.type === 'SPOT' && Array.isArray(currentQuestionDef.redFlags)
                      ? currentQuestionDef.redFlags.map(rf => ({
                        element: rf.label,
                        userAnswer: (answers.find(a => a.questionId === currentQuestionDef.id)?.userAnswer as string[] || []).includes(rf.id) ? 'Selected' : 'Missed',
                        correct: (answers.find(a => a.questionId === currentQuestionDef.id)?.userAnswer as string[] || []).includes(rf.id),
                        points: (answers.find(a => a.questionId === currentQuestionDef.id)?.userAnswer as string[] || []).includes(rf.id) ? Math.floor(currentQuestionDef.scoreValue / currentQuestionDef.redFlags.length) : 0,
                        maxPoints: Math.floor(currentQuestionDef.scoreValue / currentQuestionDef.redFlags.length)
                      }))
                      : undefined
                  }
                  onContinue={handleNextQuestion}
                  isLastQuestion={currentQuestionIndex === activeQuestions.length - 1}
                  aiLoading={aiLoading}
                  openingLine={aiRedFlags?.opening_line}
                  redFlags={aiRedFlags?.red_flags}
                  attackAnatomy={aiRedFlags?.attack_anatomy}
                  correctProcess={aiRedFlags?.correct_process}
                  staySharp={aiRedFlags?.stay_sharp}
                  closing={aiRedFlags?.closing}
                />
              </div>
            )}
          </>
        )}
      </div>
    </SimulationShell>
  );
};

export default ActiveSimulation;
