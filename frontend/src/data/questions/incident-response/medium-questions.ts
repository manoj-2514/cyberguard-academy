import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "ir_med_m1",
    type: "MCQ",
    topic: "Root Cause Analysis",
    questionText: "What is the primary purpose of 'Root Cause Analysis' (RCA) after an incident?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "To find out who to fire" },
      { id: "b", key: "B", text: "To identify the core weakness that allowed the attack and fix it forever" },
      { id: "c", key: "C", text: "To calculate the total cost of the hack" },
      { id: "d", key: "D", text: "To tell the media what happened" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "If you only fix the 'symptom' (e.g., delete one virus) without fixing the 'root cause' (e.g., an unpatched server), you will be hacked again the same way next week.",
      proTip: "Ask 'Why?' five times to dig through the layers of an incident to the real cause.",
      redFlags: ["Superficial remediation"]
    }
  },
  {
    id: "ir_med_o1",
    type: "ORDER",
    topic: "Evidence Handling",
    questionText: "Order these steps for secure 'Chain of Custody' when handling a compromised laptop.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Document the current state (Photos, Serial Number)" },
      { id: "o2", text: "Place in an anti-static/Faraday bag and seal it" },
      { id: "o3", text: "Label with Date, Time, and Handler Name" },
      { id: "o4", text: "Log the transfer to the IT Forensics safe" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "Chain of custody ensures that evidence hasn't been tampered with, which is vital if the case goes to court.",
      proTip: "If there is no record of who touched the laptop and when, the evidence is useless in a legal case.",
      redFlags: ["Broken chain of custody"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "ir_hard_o1",
    type: "OPEN_TEXT",
    topic: "Post-Incident Lessons Learned",
    questionText: "A company recovers from a breach but skips the 'Lessons Learned' meeting to 'focus on backlog work'. Critique this decision from a long-term risk management perspective.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "This is a failure of leadership. The 'Lessons Learned' phase is where the most valuable security improvements are made. Skipping it ensures that systemic failures remain hidden, leading to 'Technical Debt' that will eventually cause a more expensive breach.",
      proTip: "The IR lifecycle is a circle, not a line. You must learn to improve.",
      redFlags: ["Short-termism in security"]
    }
  },
  {
    id: "ir_hard_f1",
    type: "FILL_BLANK",
    topic: "Digital Forensics",
    questionText: "Complete the technical description of 'Live' forensics.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "To capture highly volatile data like running processes and passwords, an analyst performs a ", correctAnswer: "RAM dump", textAfter: " before shutting down the machine." },
      { id: "f2", textBefore: "The gold standard for disk imaging is a ", correctAnswer: "bit-by-bit", textAfter: " copy to ensure even deleted files are captured." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Memory (RAM) contains evidence that is lost forever once the power is cut. Professionals capture this first.",
      proTip: "Use a hardware 'Write Blocker' to ensure you don't accidentally change the data on the drive while copying it.",
      redFlags: ["Loss of volatile data"]
    }
  }
];
