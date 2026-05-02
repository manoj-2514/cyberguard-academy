import React, { useState, useEffect, useRef } from 'react';
import { Shield, X, Clock, Trophy, AlertTriangle, Zap } from 'lucide-react';
import type { ViewType } from './Header';
import Footer from './Footer';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export type SimulationCategory =
  | 'User Awareness'
  | 'Network & Device'
  | 'Data & Compliance'
  | 'Scenario Simulations';

export type SimulationDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SimulationShellProps {
  moduleName: string;
  moduleIcon: React.ReactNode;
  category: SimulationCategory;
  difficulty: SimulationDifficulty;
  currentQuestion: number;        // 1–7
  totalQuestions?: number;         // default 7
  totalScore: number;
  maxScore?: number;              // default 70
  timeElapsed: number;            // seconds elapsed overall
  maxTime?: number;               // seconds, default 720 (12 min)
  questionTimeLeft?: number;      // seconds remaining for current question
  onExit: () => void;
  onNavigate: (view: ViewType) => void;
  /** Whether the feedback panel is showing (pauses transition) */
  showingFeedback?: boolean;
  /** Optional content for the simulation sidebar (e.g. email, log) */
  simulationContent?: React.ReactNode;
  /** Content to render inside the question area */
  children: React.ReactNode;
}

// ─────────────────────────────────────────────────────────
// Category Theme Config
// ─────────────────────────────────────────────────────────
const CATEGORY_THEMES: Record<SimulationCategory, {
  gradient: string;
  badge: string;
  accent: string;
  progressBar: string;
  glow: string;
}> = {
  'User Awareness': {
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    badge: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
    accent: 'text-blue-400',
    progressBar: 'bg-gradient-to-r from-blue-400 to-blue-600',
    glow: 'shadow-blue-500/20',
  },
  'Network & Device': {
    gradient: 'from-emerald-600 via-emerald-700 to-teal-800',
    badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
    accent: 'text-emerald-400',
    progressBar: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    glow: 'shadow-emerald-500/20',
  },
  'Data & Compliance': {
    gradient: 'from-amber-600 via-amber-700 to-orange-800',
    badge: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
    accent: 'text-amber-400',
    progressBar: 'bg-gradient-to-r from-amber-400 to-amber-600',
    glow: 'shadow-amber-500/20',
  },
  'Scenario Simulations': {
    gradient: 'from-rose-600 via-rose-700 to-pink-800',
    badge: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
    accent: 'text-rose-400',
    progressBar: 'bg-gradient-to-r from-rose-400 to-rose-600',
    glow: 'shadow-rose-500/20',
  },
};

const DIFFICULTY_COLORS: Record<SimulationDifficulty, string> = {
  Beginner: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  Intermediate: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  Advanced: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
};

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const QuestionTimerDisplay: React.FC<{ timeLeft: number }> = ({ timeLeft }) => {
  const isWarning = timeLeft <= 60 && timeLeft > 30;
  const isDanger = timeLeft <= 30;
  
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-black transition-colors shadow-sm ${
      isDanger ? 'bg-rose-100 text-rose-600 animate-pulse border border-rose-200' :
      isWarning ? 'bg-amber-100 text-amber-600 border border-amber-200' :
      'bg-emerald-100 text-emerald-600 border border-emerald-200'
    }`}>
      <Clock className="w-5 h-5 shrink-0" />
      {formatTime(timeLeft)}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Exit Confirmation Modal
// ─────────────────────────────────────────────────────────
const ExitModal: React.FC<{ isOpen: boolean; onConfirm: () => void; onCancel: () => void }> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-[2.5rem] p-10 md:p-14 max-w-lg w-full shadow-3xl border border-slate-100 animate-slide-down">
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-rose-500" />
          </div>
        </div>
        <h3 className="text-3xl font-black text-slate-900 text-center mb-4 tracking-tight">
          Exit Simulation?
        </h3>
        <p className="text-slate-500 text-center text-lg font-medium leading-relaxed mb-10">
          Your progress won't be saved. Are you sure you want to exit?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-100 text-slate-700 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-rose-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 active:scale-95"
          >
            Confirm Exit
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Simulation Nav Bar
// ─────────────────────────────────────────────────────────
const SimulationNav: React.FC<{
  moduleName: string;
  onNavigate: (view: ViewType) => void;
  onExitClick: () => void;
}> = ({ moduleName, onNavigate, onExitClick }) => {


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50">
      <div className="section-container">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-all active:scale-95 shrink-0"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-white hidden sm:inline">
              CyberGuard <span className="text-blue-400">Academy</span>
            </span>
          </button>

          {/* Center: Module Name (desktop) */}
          <div className="hidden md:flex items-center gap-3 pl-8 border-l border-slate-800 min-w-0 max-w-[300px]">
            <Zap className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] truncate">
              {moduleName.replace(/_/g, ' ')} Simulation
            </span>
          </div>



          {/* Exit Button */}
          <button
            onClick={onExitClick}
            className="flex items-center gap-2 bg-slate-800/60 hover:bg-rose-600 text-slate-300 hover:text-white px-4 md:px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 border border-slate-700/50 hover:border-rose-500"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* Module name for mobile/tablet */}
      <div className="lg:hidden bg-slate-900/50 border-t border-slate-800/30 py-2 px-4 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          {moduleName.replace(/_/g, ' ')} Simulation
        </span>
      </div>
    </nav>
  );
};

// ─────────────────────────────────────────────────────────
// Module Header
// ─────────────────────────────────────────────────────────
const ModuleHeader: React.FC<{
  moduleName: string;
  moduleIcon: React.ReactNode;
  category: SimulationCategory;
  difficulty: SimulationDifficulty;
  currentQuestion: number;
  totalQuestions: number;
}> = ({ moduleName, moduleIcon, category, difficulty, currentQuestion, totalQuestions }) => {
  const theme = CATEGORY_THEMES[category];
  const progressPercent = ((currentQuestion - 1) / totalQuestions) * 100;

  return (
    <div className={`bg-gradient-to-r ${theme.gradient} rounded-b-[2rem] md:rounded-b-[3rem] relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="section-container relative z-10 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* Left: Icon */}
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl shrink-0">
            {moduleIcon}
          </div>

          {/* Center: Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3 truncate">
              {moduleName}
            </h1>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${theme.badge}`}>
                {category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${DIFFICULTY_COLORS[difficulty]}`}>
                {difficulty}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-white/70 border border-white/10">
                <Clock className="w-3 h-3" /> 8–12 minutes
              </span>
            </div>
          </div>

          {/* Right: Progress */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="text-white/70 text-xs font-black uppercase tracking-widest">
              Question <span className="text-white text-lg">{currentQuestion}</span> of {totalQuestions}
            </div>
            <div className="w-48 md:w-56 h-2.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <div
                className="h-full bg-white/90 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Sticky Progress Tracker
// ─────────────────────────────────────────────────────────
const ProgressTracker: React.FC<{
  currentQuestion: number;
  totalQuestions: number;
  totalScore: number;
  maxScore: number;
  timeElapsed: number;
  maxTime: number;
  category: SimulationCategory;
}> = ({ currentQuestion, totalQuestions, totalScore, maxScore, timeElapsed, maxTime, category }) => {
  const theme = CATEGORY_THEMES[category];
  const progressPercent = ((currentQuestion - 1) / totalQuestions) * 100;
  const timeWarning = timeElapsed > maxTime * 0.8;

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="section-container py-3 md:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
          {/* Question Progress & Timer */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
                Q{currentQuestion}/{totalQuestions}
              </span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${theme.progressBar} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className={`text-[10px] font-bold uppercase tracking-widest ${timeWarning ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>
              {Math.floor(Math.max(0, maxTime - timeElapsed) / 60)} min {Math.max(0, maxTime - timeElapsed) % 60} sec remaining out of {Math.floor(maxTime / 60)}:00
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto mt-2 sm:mt-0">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-black text-slate-700">
              Score: <span className="text-slate-900">{totalScore}</span>
              <span className="text-slate-400">/{maxScore}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Main SimulationShell Component
// ─────────────────────────────────────────────────────────
const SimulationShell: React.FC<SimulationShellProps> = ({
  moduleName,
  moduleIcon,
  category,
  difficulty,
  currentQuestion,
  totalQuestions = 7,
  totalScore,
  maxScore = 70,
  timeElapsed,
  maxTime = 720,
  questionTimeLeft,
  onExit,
  onNavigate,
  showingFeedback = false,
  simulationContent,
  children,
}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevQuestion = useRef(currentQuestion);

  // Trigger fade transition when question changes
  useEffect(() => {
    if (prevQuestion.current !== currentQuestion && !showingFeedback) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      prevQuestion.current = currentQuestion;
      return () => clearTimeout(timer);
    }
    prevQuestion.current = currentQuestion;
  }, [currentQuestion, showingFeedback]);

  const handleExitClick = () => setShowExitModal(true);
  const handleExitConfirm = () => {
    setShowExitModal(false);
    onExit();
  };
  const handleExitCancel = () => setShowExitModal(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <SimulationNav
        moduleName={moduleName}
        onNavigate={onNavigate}
        onExitClick={handleExitClick}
      />

      {/* Spacer for fixed nav */}
      <div className="h-16 md:h-20 shrink-0" />
      {/* Extra spacer for mobile bar */}
      <div className="lg:hidden h-10 shrink-0" />

      {/* Module Header */}
      <ModuleHeader
        moduleName={moduleName}
        moduleIcon={moduleIcon}
        category={category}
        difficulty={difficulty}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />

      {/* Sticky Progress Tracker */}
      <ProgressTracker
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        totalScore={totalScore}
        maxScore={maxScore}
        timeElapsed={timeElapsed}
        maxTime={maxTime}
        category={category}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="section-container py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Simulation Column (Left) */}
            {simulationContent && (
              <div className="w-full lg:w-[60%] lg:sticky lg:top-40">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Simulation Evidence</span>
                  </div>
                  <div className="p-0">
                    {simulationContent}
                  </div>
                </div>
              </div>
            )}

            {/* Question Column (Right) */}
            <div
              className={`flex-1 w-full transition-all duration-300 ease-in-out relative ${
                isTransitioning
                  ? 'opacity-0 translate-y-4'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              {questionTimeLeft !== undefined && (
                <div className="flex justify-end mb-6">
                  <QuestionTimerDisplay timeLeft={questionTimeLeft} />
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Exit Confirmation Modal */}
      <ExitModal
        isOpen={showExitModal}
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />
    </div>
  );
};

export default SimulationShell;
