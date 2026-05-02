import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "dp_easy_j1",
    type: "JUDGE",
    topic: "PII (Personal Identifiable Information)",
    questionText: "Is a person's mother's maiden name considered sensitive PII?",
    scenario: {},
    isFake: false,
    scoreValue: 10,
    feedback: {
      explanation: "Mother's maiden name is frequently used as a security question for banks and should be protected.",
      proTip: "Treat any information that can uniquely identify someone as sensitive.",
      redFlags: ["Identity theft risk"]
    }
  },
  {
    id: "dp_easy_m1",
    type: "MCQ",
    topic: "Data Minimization",
    questionText: "What is the principle of 'Data Minimization'?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Collecting as much data as possible just in case" },
      { id: "b", key: "B", text: "Only collecting the data that is absolutely necessary for a specific task" },
      { id: "c", key: "C", text: "Deleting data every morning" },
      { id: "d", key: "D", text: "Selling data to the highest bidder" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "If you don't have the data, it can't be stolen from you. Only take what you need.",
      proTip: "The best way to protect data is not to collect it in the first place.",
      redFlags: ["Excessive data collection"]
    }
  },
  {
    id: "dp_easy_s1",
    type: "SPOT",
    topic: "Privacy Policies",
    questionText: "Identify the red flags in this 'Terms of Service' clause.",
    scenario: {
      body: "PRIVACY POLICY excerpt:\nWe reserve the right to share your contacts, browsing history, and real-time location with any 3rd party advertiser without further notice."
    },
    redFlags: [
      { id: "rf1", x: 50, y: 30, label: "Broad Data Access", explanation: "Requesting access to contacts and location for 'advertisers' is a privacy risk." },
      { id: "rf2", x: 50, y: 70, label: "Lack of Consent", explanation: "'Without further notice' means you lose control over your data once you click 'Accept'." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Vague and broad privacy policies often mean the app is selling your private information.",
      proTip: "If a free app asks for permission to 'everything', it's probably paying for itself with your data.",
      redFlags: ["Data harvesting clauses"]
    }
  },
  {
    id: "dp_easy_c1",
    type: "CLASSIFY",
    topic: "Data Sensitivity",
    questionText: "Classify this data by its sensitivity level.",
    scenario: {},
    items: [
      { id: "i1", text: "Medical records", category: "PRIVATE" },
      { id: "i2", text: "Company logo", category: "PUBLIC" },
      { id: "i3", text: "Home address", category: "PRIVATE" },
      { id: "i4", text: "Public holiday list", category: "PUBLIC" }
    ],
    categories: ["PRIVATE", "PUBLIC"],
    scoreValue: 10,
    feedback: {
      explanation: "Private data can harm individuals if leaked; public data is already intended for everyone to see.",
      proTip: "When in doubt, treat it as private.",
      redFlags: ["Data classification error"]
    }
  }
];
