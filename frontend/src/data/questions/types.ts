export type QuestionType = 'JUDGE' | 'SPOT' | 'FILL_BLANK' | 'CLASSIFY' | 'ORDER' | 'OPEN_TEXT' | 'MCQ';

export interface Scenario {
  subject?: string;
  senderName?: string;
  senderEmail?: string;
  body?: string;
  url?: string;
  headers?: Record<string, string>;
  attachment?: {
    name: string;
    type: string;
    size: string;
  };
  logData?: string;
  terminalOutput?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  topic: string;
  questionText: string;
  scenario: Scenario;
  
  // MCQ
  options?: { id: string; key: string; text: string }[];
  correctOptionId?: string;
  
  // JUDGE
  isFake?: boolean;
  
  // SPOT
  redFlags?: { id: string; x: number; y: number; label: string; explanation: string; displayText?: string; isSuspicious?: boolean; element?: string }[];
  
  // FILL_BLANK
  blanks?: { id: string; textBefore: string; textAfter: string; correctAnswer: string; options?: string[]; placeholder?: string }[];
  
  // CLASSIFY
  items?: { id: string; text: string; category: string }[];
  categories?: string[];
  
  // ORDER
  orderItems?: { id: string; text: string }[];
  correctOrderIds?: string[];
  
  // Generic feedback (fallback for AI)
  feedback: {
    explanation: string;
    proTip: string;
    redFlags: string[];
  };
  
  scoreValue: number;
}
