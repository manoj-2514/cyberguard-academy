import type { Question } from '../types';

export const hardQuestions: Question[] = [
  {
    id: "pass_hard_s1",
    type: "SPOT",
    topic: "Session Hijacking",
    questionText: "Analyze this browser network log and identify the sign of a Session Hijacking attack.",
    scenario: {
      logData: "GET /dashboard HTTP/1.1\nHost: bank.com\nCookie: session_id=abc123xyz; user=manoj\n...\n[5 minutes later from different IP]\nGET /transfer HTTP/1.1\nHost: bank.com\nCookie: session_id=abc123xyz; user=manoj"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 80, label: "Session Reuse", explanation: "The exact same session cookie is being used from a completely different IP address, suggesting it was stolen." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "If an attacker steals your session cookie, they can impersonate you without ever needing your password.",
      proTip: "Use 'Secure' and 'HttpOnly' flags on cookies to prevent them from being stolen by malicious scripts.",
      redFlags: ["Cookie theft", "IP mismatch"]
    }
  },
  {
    id: "pass_hard_f1",
    type: "FILL_BLANK",
    topic: "Brute Force Protection",
    questionText: "Complete the technical description of password throttling.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "To slow down brute-force attacks, systems implement ", correctAnswer: "rate limiting", textAfter: " which limits login attempts per minute." },
      { id: "f2", textBefore: "Another technique called ", correctAnswer: "key stretching", textAfter: " (like Argon2 or bcrypt) makes it computationally expensive to check each password." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Good security makes attacks too slow or too expensive to be worthwhile.",
      proTip: "A hash that takes 1 second to calculate is much safer than one that takes 1 microsecond.",
      redFlags: ["Fast hashing algorithms"]
    }
  },
  {
    id: "pass_hard_o1",
    type: "OPEN_TEXT",
    topic: "Enterprise Policy",
    questionText: "Your company is moving from '12-character passwords changed every 90 days' to '16-character passphrases never changed unless compromised'. Explain the security benefit of this shift.",
    scenario: {
      body: "Drafting a memo to the board about the new authentication policy."
    },
    scoreValue: 10,
    feedback: {
      explanation: "Frequent changes lead to predictable patterns (Spring2024!). Longer passphrases are significantly harder to crack, and avoiding forced changes prevents user fatigue and weak variations.",
      proTip: "Length is the most critical factor in modern password strength.",
      redFlags: ["Predictable password rotation"]
    }
  },
  {
    id: "pass_hard_c1",
    type: "CLASSIFY",
    topic: "Credential Attacks",
    questionText: "Classify these advanced credential attacks.",
    scenario: {},
    items: [
      { id: "i1", text: "Credential Stuffing", category: "Using leaked lists from other sites" },
      { id: "i2", text: "Password Spraying", category: "Trying one common password on many accounts" },
      { id: "i3", text: "Dictionary Attack", category: "Trying words from a pre-made list" },
      { id: "i4", text: "Brute Force", category: "Trying every possible combination" }
    ],
    categories: ["Using leaked lists from other sites", "Trying one common password on many accounts", "Trying words from a pre-made list", "Trying every possible combination"],
    scoreValue: 10,
    feedback: {
      explanation: "Credential stuffing is dangerous because people reuse passwords across different websites.",
      proTip: "Never reuse passwords. Use a password manager to ensure every account has a unique secret.",
      redFlags: ["Leaked credential reuse"]
    }
  }
];
