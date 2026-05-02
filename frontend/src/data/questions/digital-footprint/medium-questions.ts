import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "df_med_m1",
    type: "MCQ",
    topic: "Data Brokers",
    questionText: "What is a 'Data Broker'?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "A person who fixes computers" },
      { id: "b", key: "B", text: "A company that collects information about you from many sources and sells it to others" },
      { id: "c", key: "C", text: "A hacker who steals bank accounts" },
      { id: "d", key: "D", text: "A government official" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Data brokers create a 'shadow profile' of you based on your purchases, social media, and public records.",
      proTip: "Use 'Data Removal Services' to request that these companies delete your information.",
      redFlags: ["Third-party data collection"]
    }
  },
  {
    id: "df_med_s1",
    type: "SPOT",
    topic: "Technical Footprint",
    questionText: "Identify the fingerprinting risk in this browser info.",
    scenario: {
      body: "BROWSER INFO:\nUser Agent: Chrome 124.0.0.0 (Windows 11)\nInstalled Fonts: Comic Sans, Roboto, Inter, Helvetica-Bold-Custom-IT\nScreen Resolution: 1920x1080\nTimezone: UTC+5:30"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 35, label: "Unique Font List", explanation: "Unusual or custom fonts (like 'Helvetica-Bold-Custom-IT') can be used to 'fingerprint' your browser and track you even if you delete your cookies." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Browser fingerprinting uses small, unique details about your computer setup to identify you across the web.",
      proTip: "Use 'Standard' browser settings and avoid installing too many unique fonts or plugins.",
      redFlags: ["Browser fingerprinting"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "df_hard_o1",
    type: "OPEN_TEXT",
    topic: "Social Engineering Recon",
    questionText: "An attacker wants to hack a specific company. Describe how they might use a 'Digital Footprint' analysis of the employees on social media to identify who is the most vulnerable target.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "They look for 'New Hires' (who don't know the policies yet), employees who post about 'Work Frustrations' (who might be bribed), or people who list specific 'Technical Tools' (which tells the hacker what exploits to use).",
      proTip: "Your LinkedIn profile is a roadmap for attackers. Limit details about your internal tech stack.",
      redFlags: ["Target profiling via social data"]
    }
  },
  {
    id: "df_hard_f1",
    type: "FILL_BLANK",
    topic: "Account Breaches",
    questionText: "Complete the description of a data leak.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "The website ", correctAnswer: "Have I Been Pwned", textAfter: " allows you to check if your email has been part of a major data breach." },
      { id: "f2", textBefore: "Breach data often ends up on the ", correctAnswer: "Dark Web", textAfter: ", where it is sold to other criminals." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Data breaches happen to companies, but the 'Digital Footprint' they leave behind belongs to you.",
      proTip: "If you are in a breach, change your password and enable MFA immediately.",
      redFlags: ["Credential exposure"]
    }
  }
];
