import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "dp_med_m1",
    type: "MCQ",
    topic: "Privacy by Design",
    questionText: "Which of these is a core requirement of 'Privacy by Design'?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Adding privacy features as an afterthought" },
      { id: "b", key: "B", text: "Privacy as the default setting (Opt-in instead of Opt-out)" },
      { id: "c", key: "C", text: "Collecting all data and asking for permission later" },
      { id: "d", key: "D", text: "Making the privacy policy 50 pages long" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Privacy should be baked into the product from day one. Users shouldn't have to go deep into settings to be 'safe'.",
      proTip: "A 'Privacy by Default' system protects even the least tech-savvy users.",
      redFlags: ["Privacy as an afterthought"]
    }
  },
  {
    id: "dp_med_f1",
    type: "FILL_BLANK",
    topic: "GDPR Rights",
    questionText: "Complete the description of a user's right under modern privacy laws (like GDPR).",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "The 'Right to be Forgotten' is technically known as the ", correctAnswer: "Right to Erasure", textAfter: "." },
      { id: "f2", textBefore: "The right to move your data from one service to another is called ", correctAnswer: "Data Portability", textAfter: "." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Modern laws give users ownership over their data, including the right to have it deleted or moved.",
      proTip: "Know your rights—companies are legally obligated to fulfill these requests in many regions.",
      redFlags: ["Denied data access"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "dp_hard_o1",
    type: "OPEN_TEXT",
    topic: "Differential Privacy",
    questionText: "Explain the concept of 'Differential Privacy' and how it allows a company like Apple or Google to collect usage trends without identifying individual users.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Differential privacy adds 'mathematical noise' to the data. This allows for accurate overall statistics (e.g., 'What are the most popular emojis?') without any way to trace a specific data point back to a specific person.",
      proTip: "Noise provides 'Plausible Deniability' for the individual data source.",
      redFlags: ["Anonymization failures"]
    }
  },
  {
    id: "dp_hard_c1",
    type: "CLASSIFY",
    topic: "Data Anonymization",
    questionText: "Classify these techniques for protecting data identity.",
    scenario: {},
    items: [
      { id: "i1", text: "Pseudonymization", category: "Reversible (with a key)" },
      { id: "i2", text: "Masking (e.g., XXX-XX-1234)", category: "Partial removal" },
      { id: "i3", text: "Aggregation (e.g., Average age of group)", category: "Summarization" },
      { id: "i4", text: "Synthetic Data", category: "Fake data that mimics real patterns" }
    ],
    categories: ["Reversible (with a key)", "Partial removal", "Summarization", "Fake data that mimics real patterns"],
    scoreValue: 10,
    feedback: {
      explanation: "Pseudonymization replaces names with codes, but it can be reversed if the code list is stolen. Aggregation is much safer because individual data points are gone.",
      proTip: "Don't confuse 'Anonymized' (permanent) with 'Pseudonymized' (temporary).",
      redFlags: ["Pseudo-anonymization confusion"]
    }
  }
];
