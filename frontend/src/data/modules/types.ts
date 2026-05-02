import type { JudgeQuestionProps } from '../../components/questions/JudgeQuestion';
import type { SpotQuestionProps } from '../../components/questions/SpotQuestion';
import type { FillBlankQuestionProps } from '../../components/questions/FillBlankQuestion';
import type { ClassifyQuestionProps } from '../../components/questions/ClassifyQuestion';
import type { OrderQuestionProps } from '../../components/questions/OrderQuestion';
import type { MCQQuestionProps } from '../../components/questions/MCQQuestion';

export interface BaseQuestionDef {
  id: string;
  type: 'JUDGE' | 'SPOT' | 'FILL_BLANK' | 'CLASSIFY' | 'ORDER' | 'OPEN_TEXT' | 'MCQ';
  topic: string;
  questionText: string;
  feedbackExplanation: string;
  proTip: string;
  readMoreLink: string;
  scoreValue: number; // typically 10
}

export interface JudgeDef extends BaseQuestionDef {
  type: 'JUDGE';
  scenario: JudgeQuestionProps['scenario'];
  correctAnswer: 'REAL' | 'FAKE';
}

export interface SpotDef extends BaseQuestionDef {
  type: 'SPOT';
  scenario: SpotQuestionProps['scenario'];
  hotspots: SpotQuestionProps['hotspots'];
  correctSpotIds: string[]; // required spots to pass
}

export interface FillBlankDef extends BaseQuestionDef {
  type: 'FILL_BLANK';
  segments: FillBlankQuestionProps['segments'];
  blanks: FillBlankQuestionProps['blanks'];
  correctAnswers: Record<string, string>;
}

export interface ClassifyDef extends BaseQuestionDef {
  type: 'CLASSIFY';
  items: ClassifyQuestionProps['items'];
  // categories are fixed in the component for now
  correctMapping: Record<string, string>; // item.id -> category.id
}

export interface OrderDef extends BaseQuestionDef {
  type: 'ORDER';
  steps: OrderQuestionProps['steps'];
  correctOrderIds: string[];
}

export interface OpenTextDef extends BaseQuestionDef {
  type: 'OPEN_TEXT';
  minWords: number;
  expectedKeywords: string[]; // simple matching for score validation
}

export interface MCQDef extends BaseQuestionDef {
  type: 'MCQ';
  options: MCQQuestionProps['options'];
  correctOptionId: string;
}

export type QuestionDef =
  | JudgeDef
  | SpotDef
  | FillBlankDef
  | ClassifyDef
  | OrderDef
  | OpenTextDef
  | MCQDef;

export interface SimulationModuleDef {
  id: string; // e.g. "email-analysis"
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuestionDef[];
}
