import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "ran_med_m1",
    type: "MCQ",
    topic: "Double Extortion",
    questionText: "What is 'Double Extortion' in a modern ransomware attack?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Asking for two different cryptocurrencies" },
      { id: "b", key: "B", text: "Encrypting files AND threatening to leak sensitive data publicly" },
      { id: "c", key: "C", text: "Attacking both your phone and your computer" },
      { id: "d", key: "D", text: "Asking for twice the original ransom" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Double extortion is a nightmare because even if you have backups, the attacker can still blackmail you by threatening to release your private customer data.",
      proTip: "Preventing 'Data Exfiltration' (stealing the data) is now just as important as preventing encryption.",
      redFlags: ["Data leak threat"]
    }
  },
  {
    id: "ran_med_o1",
    type: "ORDER",
    topic: "Recovery Priority",
    questionText: "Order these systems for recovery after a ransomware attack (based on standard business continuity).",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Critical Infrastructure (AD, DNS, Network)" },
      { id: "o2", text: "Customer-Facing Financial Systems" },
      { id: "o3", text: "Internal Communication (Slack/Email)" },
      { id: "o4", text: "Non-Critical Department Files" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "You can't fix the other systems until the basic 'plumbing' (Network/DNS) of the company is working again.",
      proTip: "A clear 'Disaster Recovery Plan' defines this order before an attack happens.",
      redFlags: ["Disorganized recovery"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "ran_hard_o1",
    type: "OPEN_TEXT",
    topic: "Ransomware-as-a-Service (RaaS)",
    questionText: "Explain the 'Ransomware-as-a-Service' (RaaS) business model and how it has changed the threat landscape for medium-sized businesses.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "RaaS allows low-skill attackers (Affiliates) to rent professional-grade ransomware from expert developers in exchange for a cut of the profit. This has exploded the number of attacks because almost anyone can now launch a sophisticated campaign.",
      proTip: "The person attacking you might not even know how the code works; they are just 'users' of a malicious service.",
      redFlags: ["Affiliate attack patterns"]
    }
  },
  {
    id: "ran_hard_f1",
    type: "FILL_BLANK",
    topic: "Shadow Copies",
    questionText: "Complete the technical analysis of ransomware behavior.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "One of the first things ransomware does is delete ", correctAnswer: "Volume Shadow Copies", textAfter: " to prevent easy file recovery using built-in Windows tools." },
      { id: "f2", textBefore: "It then targets the ", correctAnswer: "Master Boot Record", textAfter: " (MBR) in some cases to prevent the entire OS from loading." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Ransomware systematically destroys your 'easy' ways back to safety before it begins the main encryption.",
      proTip: "Real-time monitoring for 'vssadmin.exe delete shadows' commands can detect an attack in progress.",
      redFlags: ["Shadow copy deletion"]
    }
  }
];
