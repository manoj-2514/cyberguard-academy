import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "soc_easy_j1",
    type: "JUDGE",
    topic: "Vishing (Voice Phishing)",
    questionText: "Is it safe to give your bank account details to a caller who claims to be from the 'IRS'?",
    scenario: {
      body: "CALLER: This is Agent Smith from the IRS. Your taxes are overdue. Give me your account number now to avoid arrest."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Government agencies like the IRS will never call you out of the blue to demand immediate payment or bank info over the phone.",
      proTip: "Hang up and call the official agency number found on their real website.",
      redFlags: ["Threat of arrest", "Unexpected call", "Request for sensitive data"]
    }
  },
  {
    id: "soc_easy_m1",
    type: "MCQ",
    topic: "Tailgating",
    questionText: "What is 'Tailgating' in physical security?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Following someone too closely in a car" },
      { id: "b", key: "B", text: "Following an authorized person into a secure area without scanning your own badge" },
      { id: "c", key: "C", text: "Eating at a football game" },
      { id: "d", key: "D", text: "Sharing your password with a friend" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Tailgating relies on politeness or social pressure to bypass badge-protected doors.",
      proTip: "Always scan your own badge, and don't feel bad about asking others to do the same.",
      redFlags: ["Unauthorized access"]
    }
  },
  {
    id: "soc_easy_s1",
    type: "SPOT",
    topic: "Authority Lures",
    questionText: "Identify the signs of a social engineering 'CEO Fraud' request.",
    scenario: {
      body: "FROM: CEO (ceo-urgent@gmail.com)\nSUBJECT: Secret Project - Action Required\nI'm in a top-secret meeting. Wire $5,000 to this vendor immediately. Do not tell anyone."
    },
    redFlags: [
      { id: "rf1", x: 40, y: 15, label: "Unusual Email", explanation: "The CEO is using a Gmail address instead of a company email." },
      { id: "rf2", x: 50, y: 60, label: "Request for Secrecy", explanation: "'Do not tell anyone' is a red flag used to prevent you from asking for help." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers use authority and secrecy to bypass standard financial controls.",
      proTip: "High-value requests should always be verified through a second channel (like a phone call).",
      redFlags: ["Impersonation", "Artificial urgency", "Enforced secrecy"]
    }
  },
  {
    id: "soc_easy_c1",
    type: "CLASSIFY",
    topic: "Social Triggers",
    questionText: "Match the social engineering tactic to its definition.",
    scenario: {},
    items: [
      { id: "i1", text: "Pretexting", category: "Creating a fake scenario" },
      { id: "i2", text: "Baiting", category: "Offering a free gift/download" },
      { id: "i3", text: "Quid Pro Quo", category: "Requesting info in exchange for a service" },
      { id: "i4", text: "Phishing", category: "Sending fake emails" }
    ],
    categories: ["Creating a fake scenario", "Offering a free gift/download", "Requesting info in exchange for a service", "Sending fake emails"],
    scoreValue: 10,
    feedback: {
      explanation: "Social engineers use different hooks to gain your trust or interest.",
      proTip: "If a stranger offers you something for free in exchange for 'a little information', be suspicious.",
      redFlags: ["Manipulative hooks"]
    }
  }
];
