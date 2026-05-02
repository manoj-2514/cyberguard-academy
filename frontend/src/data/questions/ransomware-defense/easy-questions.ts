import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "ran_easy_j1",
    type: "JUDGE",
    topic: "Encryption Signs",
    questionText: "If your files suddenly have extensions like '.locked' or '.crypted' and you can't open them, is this likely a Ransomware attack?",
    scenario: {
      body: "File List:\nreport.pdf.locked\nphoto.jpg.locked\nvacation.mov.locked"
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Ransomware changes file extensions when it encrypts your data to prevent you from using it.",
      proTip: "Unexpected file extension changes are a major warning sign of active encryption.",
      redFlags: ["Mass file extension changes"]
    }
  },
  {
    id: "ran_easy_m1",
    type: "MCQ",
    topic: "Ransom Payment",
    questionText: "What is the official recommendation regarding paying a ransomware ransom?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Pay immediately to get your files back" },
      { id: "b", key: "B", text: "Do not pay; it funds criminals and doesn't guarantee file recovery" },
      { id: "c", key: "C", text: "Pay half and negotiate the rest" },
      { id: "d", key: "D", text: "Pay only if they offer a discount" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Paying doesn't guarantee you'll get the key, and it marks you as a 'willing payer' for future attacks.",
      proTip: "Contact law enforcement and use your backups instead of paying.",
      redFlags: ["Ransom demand"]
    }
  },
  {
    id: "ran_easy_s1",
    type: "SPOT",
    topic: "Ransom Notes",
    questionText: "Identify the signs of a ransomware 'Ransom Note'.",
    scenario: {
      body: "!!! ALL YOUR FILES ARE ENCRYPTED !!!\nTo decrypt your data, you must pay $500 in Bitcoin to the address below. You have 48 hours before the key is deleted."
    },
    redFlags: [
      { id: "rf1", x: 50, y: 10, label: "Panic Inducement", explanation: "Ransom notes use alarming language and symbols to scare you." },
      { id: "rf2", x: 50, y: 60, label: "Specific Payment Method", explanation: "Cryptocurrency (Bitcoin) is used because it's harder for police to track." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Ransom notes are designed to create immediate panic and force a fast payment.",
      proTip: "Take a photo of the screen and disconnect from the network immediately.",
      redFlags: ["Demand for crypto", "Threat of data deletion"]
    }
  },
  {
    id: "ran_easy_c1",
    type: "CLASSIFY",
    topic: "Defense Strategies",
    questionText: "Classify these actions as Effective or Ineffective against Ransomware.",
    scenario: {},
    items: [
      { id: "i1", text: "Daily offline backups", category: "Effective" },
      { id: "i2", text: "Installing an Antivirus", category: "Effective" },
      { id: "i3", text: "Hiding your files in a new folder", category: "Ineffective" },
      { id: "i4", text: "Changing your wallpaper regularly", category: "Ineffective" }
    ],
    categories: ["Effective", "Ineffective"],
    scoreValue: 10,
    feedback: {
      explanation: "Backups and security software are core defenses. Physical organization won't stop encryption scripts.",
      proTip: "An 'Offline' backup is best because ransomware can't reach it to encrypt it too.",
      redFlags: ["Poor defense logic"]
    }
  }
];
