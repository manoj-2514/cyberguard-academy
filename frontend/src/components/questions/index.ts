// Question Type Components — Barrel Export
// ─────────────────────────────────────────────────────────

export { default as JudgeQuestion } from './JudgeQuestion';
export type { JudgeQuestionProps, EmailScenario } from './JudgeQuestion';

export { default as SpotQuestion } from './SpotQuestion';
export type { SpotQuestionProps, SpotScenario, Hotspot } from './SpotQuestion';

export { default as FillBlankQuestion } from './FillBlankQuestion';
export type { FillBlankQuestionProps, BlankField } from './FillBlankQuestion';

export { default as ClassifyQuestion } from './ClassifyQuestion';
export type { ClassifyQuestionProps, ClassifyItem } from './ClassifyQuestion';

export { default as OrderQuestion } from './OrderQuestion';
export type { OrderQuestionProps, OrderStep } from './OrderQuestion';

export { default as OpenTextQuestion } from './OpenTextQuestion';
export type { OpenTextQuestionProps } from './OpenTextQuestion';

export { default as MCQQuestion } from './MCQQuestion';
export type { MCQQuestionProps, MCQOption } from './MCQQuestion';
