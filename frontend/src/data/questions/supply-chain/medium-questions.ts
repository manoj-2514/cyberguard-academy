import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "sc_med_m1",
    type: "MCQ",
    topic: "Open Source Risk",
    questionText: "What is a 'Dependency Confusion' attack in software development?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "When a developer forgets how to code" },
      { id: "b", key: "B", text: "Trickery where a public malicious package is used instead of a private internal one" },
      { id: "c", key: "C", text: "A bug that makes the app crash" },
      { id: "d", key: "D", text: "When a library is too old to use" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Attackers name their malicious code the same as a company's internal 'secret' tool. If the build system isn't configured correctly, it might download the malicious public one instead.",
      proTip: "Use 'Package Scoping' and verify the source of all your software libraries.",
      redFlags: ["Third-party package hijacking"]
    }
  },
  {
    id: "sc_med_f1",
    type: "FILL_BLANK",
    topic: "Software Bill of Materials (SBOM)",
    questionText: "Complete the definition of modern supply chain visibility.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "An ", correctAnswer: "SBOM", textAfter: " is like an 'ingredients list' for a software product." },
      { id: "f2", textBefore: "It helps companies quickly identify if they are using a vulnerable library, like the famous ", correctAnswer: "Log4j", textAfter: " vulnerability." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "You can't protect what you don't know you have. An SBOM lists every library and sub-library in your app.",
      proTip: "Ask your software vendors for an SBOM to understand your risk exposure.",
      redFlags: ["Hidden dependencies"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "sc_hard_o1",
    type: "OPEN_TEXT",
    topic: "SolarWinds Incident Analysis",
    questionText: "In the famous SolarWinds attack, how did the hackers manage to infect thousands of customers without ever breaking into the customers' own networks directly?",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "The attackers hacked the 'Build Server' of SolarWinds. They inserted a backdoor into a legitimate software update. Customers downloaded and 'trusted' the official update, which then gave the hackers access to their internal networks. This is the definition of a Supply Chain attack.",
      proTip: "Trust but verify. Even 'official' updates should be monitored for unusual behavior.",
      redFlags: ["Upstream compromise"]
    }
  },
  {
    id: "sc_hard_c1",
    type: "CLASSIFY",
    topic: "Supply Chain Layers",
    questionText: "Classify these supply chain risks.",
    scenario: {},
    items: [
      { id: "i1", text: "Malicious code in a hardware chip", category: "HARDWARE" },
      { id: "i2", text: "Hacked cloud hosting provider", category: "SERVICE" },
      { id: "i3", text: "Backdoor in an open-source library", category: "SOFTWARE" },
      { id: "i4", text: "Stolen firmware signing keys", category: "SOFTWARE" }
    ],
    categories: ["HARDWARE", "SERVICE", "SOFTWARE"],
    scoreValue: 10,
    feedback: {
      explanation: "Supply chain risks exist at every layer, from the physical chips to the cloud services you rent.",
      proTip: "Security is a chain; it is only as strong as the weakest link (vendor).",
      redFlags: ["Multi-layer supply chain threats"]
    }
  }
];
