import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "pw_easy_j1",
    type: "JUDGE",
    topic: "Password Strength",
    questionText: "Is 'Password123' a strong password for a primary account?",
    scenario: {
      body: "Current Password: Password123\nSecurity Score: LOW"
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "'Password123' is one of the most common passwords globally and can be cracked in milliseconds.",
      proTip: "Avoid using sequential numbers or the word 'password' in your credentials.",
      redFlags: ["Common password", "Sequential numbers"]
    }
  },
  {
    id: "pw_easy_m1",
    type: "MCQ",
    topic: "Multi-Factor Authentication",
    questionText: "What is the main benefit of Multi-Factor Authentication (MFA)?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "It makes logging in faster" },
      { id: "b", key: "B", text: "It provides an extra layer of security if your password is stolen" },
      { id: "c", key: "C", text: "It replaces the need for a password entirely" },
      { id: "d", key: "D", text: "It automatically changes your password every week" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "MFA requires a second proof of identity (like a code on your phone), so even if a hacker has your password, they can't get in.",
      proTip: "Enable MFA on every account that supports it, especially email and banking.",
      redFlags: ["Single point of failure"]
    }
  },
  {
    id: "pw_easy_s1",
    type: "SPOT",
    topic: "Visual Cues",
    questionText: "Identify the signs of a secure password field.",
    scenario: {
      body: "Login Form:\n[ Username ]\n[ Password •••••••• ] [Eye Icon]\n[ Strength: EXCELLENT ]"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 30, label: "Masked Input", explanation: "Bullets hide your characters from 'shoulder surfers'." },
      { id: "rf2", x: 50, y: 60, label: "Strength Meter", explanation: "Real-time feedback helps you choose complex combinations." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Masking and strength meters are standard security features on legitimate sites.",
      proTip: "Use the 'eye' icon only when you are alone to verify what you typed.",
      redFlags: ["Visual security indicators"]
    }
  },
  {
    id: "pw_easy_c1",
    type: "CLASSIFY",
    topic: "Credential Storage",
    questionText: "Classify these password storage methods.",
    scenario: {},
    items: [
      { id: "i1", text: "Writing on a sticky note", category: "DANGEROUS" },
      { id: "i2", text: "Using a Password Manager", category: "SAFE" },
      { id: "i3", text: "Saving in a 'passwords.txt' file", category: "DANGEROUS" },
      { id: "i4", text: "Memorizing 3-4 complex passphrases", category: "SAFE" }
    ],
    categories: ["SAFE", "DANGEROUS"],
    scoreValue: 10,
    feedback: {
      explanation: "Password managers are the safest way to store unique, complex passwords for every site.",
      proTip: "If you can't remember it, manage it with a trusted tool.",
      redFlags: ["Plaintext storage"]
    }
  },
  {
    id: "pw_easy_j2",
    type: "JUDGE",
    topic: "Personal Info",
    questionText: "Is it safe to use your birth year (e.g. 'Manoj1995') in your password?",
    scenario: {},
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Personal information like birth years, pet names, or hometowns is easily found by attackers on social media.",
      proTip: "Choose random words or phrases that have no connection to your personal life.",
      redFlags: ["Personal data in credentials"]
    }
  },
  {
    id: "pw_easy_m2",
    type: "MCQ",
    topic: "Password Reuse",
    questionText: "Why is it dangerous to use the same password for your Email and your Netflix account?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Netflix will charge you more" },
      { id: "b", key: "B", text: "If one site is hacked, both accounts are compromised" },
      { id: "c", key: "C", text: "Your internet speed will decrease" },
      { id: "d", key: "D", text: "It's actually perfectly safe" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Attackers use 'Credential Stuffing' to try passwords from one breach on many other sites.",
      proTip: "Use unique passwords for every single service.",
      redFlags: ["Password reuse"]
    }
  },
  {
    id: "pw_easy_s2",
    type: "SPOT",
    topic: "MFA Prompts",
    questionText: "Identify the suspicious part of this MFA request.",
    scenario: {
      body: "SMS FROM: Unknown\nMESSAGE: Your Apple ID is locked. Text BACK the 6-digit code we just sent to your phone to unlock it."
    },
    redFlags: [
      { id: "rf1", x: 50, y: 30, label: "Untrusted Source", explanation: "Apple will never ask you to 'text back' a code to an unknown number." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "MFA codes should only be entered directly into official apps or websites, never shared via text or call.",
      proTip: "If someone asks for your code, they are trying to hack you.",
      redFlags: ["Code harvesting"]
    }
  },
  {
    id: "pw_easy_c2",
    type: "CLASSIFY",
    topic: "MFA Types",
    questionText: "Sort these MFA methods from Most Secure to Least Secure.",
    scenario: {},
    items: [
      { id: "i1", text: "Hardware Security Key (YubiKey)", category: "MOST" },
      { id: "i2", text: "Authenticator App (Google/Microsoft)", category: "MORE" },
      { id: "i3", text: "SMS / Text Message Code", category: "LESS" },
      { id: "i4", text: "Email Verification Link", category: "LEAST" }
    ],
    categories: ["MOST", "MORE", "LESS", "LEAST"],
    scoreValue: 10,
    feedback: {
      explanation: "SMS is vulnerable to 'SIM Swapping', while hardware keys are nearly impossible to intercept remotely.",
      proTip: "Use an App-based authenticator instead of SMS whenever possible.",
      redFlags: ["Vulnerable MFA channels"]
    }
  }
];
