// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export interface SavedAnswer {
  questionNumber: number;
  answer: any;
  score: number;
  maxScore: number;
  timeTaken?: number;
}

export interface SimulationProgress {
  userId?: string;          // Backend-ready support
  moduleId: string;
  currentQuestion: number;
  answers: SavedAnswer[];
  totalScore: number;
  timeElapsed: number;
  startedAt: string;
  lastUpdatedAt: string;
}

export interface SimulationResult {
  userId?: string;          // Backend-ready support
  moduleId: string;
  status: 'completed';
  score: number;
  maxScore: number;
  passed: boolean;
  completedAt: string;
  certificateId?: string;
  answers: SavedAnswer[];
}

const STORAGE_KEY_PREFIX = 'cg_sim_progress_';
const RESULT_KEY_PREFIX = 'cg_sim_result_';

// ─────────────────────────────────────────────────────────
// Functions
// ─────────────────────────────────────────────────────────

/**
 * Save in-progress simulation state to localStorage.
 */
export function saveSimulationProgress(data: SimulationProgress): void {
  try {
    data.lastUpdatedAt = new Date().toISOString();
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${data.moduleId}`, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save simulation progress:', error);
  }
}

/**
 * Retrieve an in-progress simulation attempt for a specific module.
 */
export function getModuleProgress(moduleId: string): SimulationProgress | null {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${moduleId}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to read simulation progress:', error);
    return null;
  }
}

/**
 * Clear the saved progress when a user restarts or successfully completes the module.
 */
export function clearSimulationProgress(moduleId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${moduleId}`);
  } catch (error) {
    console.error('Failed to clear simulation progress:', error);
  }
}

/**
 * Save the final completed result.
 */
export function saveSimulationResult(data: SimulationResult): void {
  try {
    // Save to result key
    localStorage.setItem(`${RESULT_KEY_PREFIX}${data.moduleId}`, JSON.stringify(data));
    // Clear the active progress
    clearSimulationProgress(data.moduleId);
  } catch (error) {
    console.error('Failed to save simulation result:', error);
  }
}

/**
 * Get final result if it exists.
 */
export function getSimulationResult(moduleId: string): SimulationResult | null {
  try {
    const stored = localStorage.getItem(`${RESULT_KEY_PREFIX}${moduleId}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to read simulation result:', error);
    return null;
  }
}
