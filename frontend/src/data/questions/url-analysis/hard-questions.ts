import type { Question } from '../types';

export const hardQuestions: Question[] = [
  {
    id: "url_hard_s1",
    type: "SPOT",
    topic: "Encoded URLs",
    questionText: "Identify the hidden destination in this URL-encoded link.",
    scenario: {
      url: "https://trusted-portal.com/login?dest=http%3A%2F%2F192.168.1.50%2Fmalware.sh"
    },
    redFlags: [
      { id: "rf1", x: 70, y: 15, label: "Encoded Malicious Path", explanation: "The destination parameter is URL-encoded. Decoded, it points to 'http://192.168.1.50/malware.sh', a direct download from an IP address." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers use hex encoding (like %3A for colon) to hide suspicious strings from security scanners and users.",
      proTip: "Use a URL decoder if you're analyzing a suspicious link with many percent signs.",
      redFlags: ["Obfuscated destination", "Direct IP usage"]
    }
  },
  {
    id: "url_hard_o1",
    type: "OPEN_TEXT",
    topic: "URL Defense Strategy",
    questionText: "Explain how 'URL Sandboxing' (like Microsoft Safelinks or Proofpoint) helps protect users, and identify one way an attacker might try to bypass it.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Sandboxing rewrites links to check the destination at the moment of the click. Attackers bypass this by using 'Time-of-Click' changes, where a link remains safe for 24 hours before switching to malicious content.",
      proTip: "Sandboxing is good, but user vigilance is the final layer of defense.",
      redFlags: ["Time-of-click evasion"]
    }
  },
  {
    id: "url_hard_f1",
    type: "FILL_BLANK",
    topic: "TLD Risks",
    questionText: "Complete the technical risk analysis of TLDs.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "New gTLDs like ", correctAnswer: ".zip", textAfter: " are dangerous because they can be confused with file names in a browser." },
      { id: "f2", textBefore: "Attackers also use ccTLDs from countries with weak oversight, such as ", correctAnswer: ".tk", textAfter: " or .ml, for hosting phishing sites." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "The choice of TLD can be a strong indicator of a site's legitimacy. Banks rarely use '.zip' or '.cc'.",
      proTip: "Always be skeptical of unusual TLDs in professional communications.",
      redFlags: ["High-risk TLD usage"]
    }
  }
];
