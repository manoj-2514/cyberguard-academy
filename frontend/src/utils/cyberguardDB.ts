
export interface QuestionData {
  questionNumber: number;
  type: string;
  userAnswer: any;
  correctAnswer: any;
  score: number;
  maxScore: number;
  timeTakenSeconds: number;
}

export interface Attempt {
  attemptId: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  questions: QuestionData[];
  totalScore?: number;
  maxScore?: number;
  bonusPoints?: number;
  finalScore?: number;
  passed?: boolean;
  certificateId?: string;
  certificateIssuedAt?: string;
}

export interface LevelData {
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'failed';
  attempts: Attempt[];
  bestScore: number | null;
  passed: boolean;
  unlockedAt: string | null;
}

export interface ModuleData {
  levels: {
    easy: LevelData;
    medium: LevelData;
    hard: LevelData;
  };
  certificateId: string | null;
  overallProgress: number; // 0 | 33 | 66 | 100
  lastAttemptAt: string | null;
  currentAttempt: (Attempt & { level: 'easy' | 'medium' | 'hard' }) | null;
}

export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  avatar: string | null;
}

export interface UserSettings {
  dailyReminders: boolean;
  showScoreBreakdown: boolean;
  darkMode: boolean;
  publicProfile: boolean;
  linkedinShare: boolean;
  analytics: boolean;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  activeDates: string[];
}

export interface CyberGuardUserData {
  profile: UserProfile;
  modules: Record<string, ModuleData>;
  streakData: StreakData;
  settings: UserSettings;
  shownQuestions: Record<string, {
    easy: string[];
    medium: string[];
    hard: string[];
  }>;
}

const STORAGE_KEY = 'cyberguard_user_data';

const DEFAULT_DATA: CyberGuardUserData = {
  profile: {
    name: 'Manoj',
    email: 'manxj555@gmail.com',
    memberSince: new Date().toISOString(),
    avatar: null,
  },
  modules: {},
  streakData: {
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    activeDates: [],
  },
  settings: {
    dailyReminders: true,
    showScoreBreakdown: true,
    darkMode: false,
    publicProfile: false,
    linkedinShare: false,
    analytics: true,
  },
  shownQuestions: {},
};

const createEmptyModule = (): ModuleData => ({
  levels: {
    easy: { status: 'available', attempts: [], bestScore: null, passed: false, unlockedAt: new Date().toISOString() },
    medium: { status: 'locked', attempts: [], bestScore: null, passed: false, unlockedAt: null },
    hard: { status: 'locked', attempts: [], bestScore: null, passed: false, unlockedAt: null },
  },
  certificateId: null,
  overallProgress: 0,
  lastAttemptAt: null,
  currentAttempt: null,
});

export const cyberguardDB = {
  getUserData(): CyberGuardUserData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_DATA;
      const data = JSON.parse(stored) as CyberGuardUserData;
      
      // Migration: Check if modules are using the old flat structure
      let migrated = false;
      Object.keys(data.modules).forEach(moduleId => {
        const mod = data.modules[moduleId] as any;
        if (!mod.levels) {
          migrated = true;
          const newMod = createEmptyModule();
          if (mod.status === 'completed' || mod.status === 'passed') {
            newMod.levels.easy = { status: 'completed', attempts: mod.attempts || [], bestScore: mod.bestScore || 100, passed: true, unlockedAt: data.profile.memberSince };
            newMod.levels.medium.status = 'available';
            newMod.levels.medium.unlockedAt = new Date().toISOString();
            newMod.overallProgress = 33;
          } else if (mod.status === 'in_progress') {
            newMod.levels.easy.status = 'in_progress';
            newMod.levels.easy.attempts = mod.attempts || [];
          }
          newMod.lastAttemptAt = mod.lastAttemptAt;
          data.modules[moduleId] = newMod;
        }
      });

      if (!data.shownQuestions) {
        data.shownQuestions = {};
        migrated = true;
      }

      if (migrated) this.saveUserData(data);
      return data;
    } catch (e) {
      console.warn('LocalStorage unavailable or corrupted, using in-memory defaults.');
      return DEFAULT_DATA;
    }
  },

  saveUserData(data: CyberGuardUserData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save user data to localStorage');
    }
  },

  getShownQuestions(moduleId: string, level: 'easy' | 'medium' | 'hard'): string[] {
    const data = this.getUserData();
    return data.shownQuestions[moduleId]?.[level] || [];
  },

  startLevelAttempt(moduleId: string, level: 'easy' | 'medium' | 'hard', attemptId: string) {
    const data = this.getUserData();
    if (!data.modules[moduleId]) {
      data.modules[moduleId] = createEmptyModule();
    }
    
    data.modules[moduleId].currentAttempt = {
      attemptId,
      startedAt: new Date().toISOString(),
      level,
      questions: [],
    };
    data.modules[moduleId].levels[level].status = 'in_progress';
    this.saveUserData(data);
  },

  saveLevelAnswer(moduleId: string, level: 'easy' | 'medium' | 'hard', questionData: QuestionData) {
    const data = this.getUserData();
    const module = data.modules[moduleId];
    if (!module || !module.currentAttempt || module.currentAttempt.level !== level) return;

    const existingIndex = module.currentAttempt.questions.findIndex(q => q.questionNumber === questionData.questionNumber);
    if (existingIndex > -1) {
      module.currentAttempt.questions[existingIndex] = questionData;
    } else {
      module.currentAttempt.questions.push(questionData);
    }

    this.saveUserData(data);
  },

  completeLevel(moduleId: string, level: 'easy' | 'medium' | 'hard', finalData: {
    completedAt: string;
    durationSeconds: number;
    totalScore: number;
    bonusPoints: number;
    finalScore: number;
    passed: boolean;
    selectedQuestionIds: string[];
  }) {
    const data = this.getUserData();
    const module = data.modules[moduleId];
    if (!module || !module.currentAttempt || module.currentAttempt.level !== level) return null;

    const attempt = module.currentAttempt;
    attempt.completedAt = finalData.completedAt;
    attempt.durationSeconds = finalData.durationSeconds;
    attempt.totalScore = finalData.totalScore;
    attempt.maxScore = attempt.questions.length * 10;
    attempt.bonusPoints = finalData.bonusPoints;
    attempt.finalScore = finalData.finalScore;
    attempt.passed = finalData.passed;

    const levelData = module.levels[level];
    levelData.attempts.push(attempt);
    levelData.passed = levelData.passed || finalData.passed;
    
    if (finalData.finalScore > (levelData.bestScore || 0)) {
      levelData.bestScore = finalData.finalScore;
    }

    // Unlock Logic
    if (level === 'easy' && finalData.passed) {
      module.levels.medium.status = 'available';
      module.levels.medium.unlockedAt = finalData.completedAt;
      module.levels.easy.status = 'completed';
    } else if (level === 'medium' && finalData.passed) {
      module.levels.hard.status = 'available';
      module.levels.hard.unlockedAt = finalData.completedAt;
      module.levels.medium.status = 'completed';
    } else if (level === 'hard' && finalData.passed) {
      module.levels.hard.status = 'completed';
      const datePart = finalData.completedAt.split('T')[0].replace(/-/g, '');
      module.certificateId = `CG-GOLD-${datePart}-${moduleId.toUpperCase().substring(0, 5)}`;
    }

    if (!finalData.passed) {
      levelData.status = 'failed';
    }

    // Progress Calculation
    let completedLevels = 0;
    if (module.levels.easy.passed) completedLevels++;
    if (module.levels.medium.passed) completedLevels++;
    if (module.levels.hard.passed) completedLevels++;
    module.overallProgress = Math.round((completedLevels / 3) * 100);
    module.lastAttemptAt = finalData.completedAt;
    module.currentAttempt = null;

    // Track Shown Questions
    if (!data.shownQuestions[moduleId]) {
      data.shownQuestions[moduleId] = { easy: [], medium: [], hard: [] };
    }
    data.shownQuestions[moduleId][level] = finalData.selectedQuestionIds;

    // Update Streak
    const today = new Date().toISOString().split('T')[0];
    if (data.streakData.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      if (data.streakData.lastActiveDate === yesterdayStr) {
        data.streakData.currentStreak += 1;
      } else {
        data.streakData.currentStreak = 1;
      }
      if (data.streakData.currentStreak > data.streakData.bestStreak) {
        data.streakData.bestStreak = data.streakData.currentStreak;
      }
      data.streakData.lastActiveDate = today;
      if (!data.streakData.activeDates.includes(today)) {
        data.streakData.activeDates.push(today);
      }
    }

    this.saveUserData(data);
    return attempt;
  },

  getModuleStats(moduleId: string) {
    const data = this.getUserData();
    const module = data.modules[moduleId];
    if (!module) return { levels: createEmptyModule().levels, overallProgress: 0, certificateId: null };

    return {
      levels: module.levels,
      overallProgress: module.overallProgress,
      certificateId: module.certificateId,
      lastAttemptAt: module.lastAttemptAt,
    };
  },

  getDashboardStats() {
    const data = this.getUserData();
    const modules = Object.values(data.modules) as ModuleData[];
    
    const hardCompleted = modules.filter(m => m.levels.hard.status === 'completed').length;
    const totalLevelsPassed = modules.reduce((acc, mod) => {
      let count = 0;
      if (mod.levels.easy.passed) count++;
      if (mod.levels.medium.passed) count++;
      if (mod.levels.hard.passed) count++;
      return acc + count;
    }, 0);

    const bestScores = modules.flatMap(m => [m.levels.easy.bestScore, m.levels.medium.bestScore, m.levels.hard.bestScore]).filter((s): s is number => s !== null);
    const averageScore = bestScores.length > 0 ? Math.round(bestScores.reduce((a, b) => a + b, 0) / bestScores.length) : 0;
    
    const totalLearningTimeSeconds = modules.reduce((acc, mod) => {
      const levelTime = (l: LevelData) => l.attempts.reduce((a, b) => a + (b.durationSeconds || 0), 0);
      return acc + levelTime(mod.levels.easy) + levelTime(mod.levels.medium) + levelTime(mod.levels.hard);
    }, 0);

    const allQuestions = modules.flatMap(m => [m.levels.easy, m.levels.medium, m.levels.hard].flatMap(l => l.attempts.flatMap(a => a.questions)));
    const accuracyByType: Record<string, { total: number; score: number }> = {};
    allQuestions.forEach(q => {
      if (!accuracyByType[q.type]) accuracyByType[q.type] = { total: 0, score: 0 };
      accuracyByType[q.type].total += q.maxScore;
      accuracyByType[q.type].score += q.score;
    });
    
    const questionTypeAccuracy = Object.entries(accuracyByType).map(([type, val]) => ({
      type,
      accuracy: Math.round((val.score / val.total) * 100)
    }));

    const scoreDistribution = { excellent: 0, good: 0, satisfactory: 0, fail: 0 };
    bestScores.forEach(s => {
      if (s >= 90) scoreDistribution.excellent++;
      else if (s >= 80) scoreDistribution.good++;
      else if (s >= 70) scoreDistribution.satisfactory++;
      else scoreDistribution.fail++;
    });

    const allAttempts = modules.flatMap(m => {
      const levels: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
      return levels.flatMap(lvl => m.levels[lvl].attempts.map(a => ({
        ...a,
        level: lvl,
        moduleId: Object.keys(data.modules).find(key => data.modules[key] === m)
      })));
    }).sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

    return {
      modulesCompleted: hardCompleted,
      levelsCompleted: totalLevelsPassed,
      totalPossibleLevels: 60,
      averageScore,
      certificatesEarned: modules.filter(m => m.certificateId).length,
      currentStreak: data.streakData.currentStreak,
      bestStreak: data.streakData.bestStreak,
      totalLearningTimeSeconds,
      questionTypeAccuracy,
      scoreDistribution,
      allAttempts,
      recentActivity: allAttempts.slice(0, 15),
    };
  },

  resetModule(moduleId: string) {
    const data = this.getUserData();
    data.modules[moduleId] = createEmptyModule();
    this.saveUserData(data);
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('storage'));
  }
};
