import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "pass_med_m1",
    type: "MCQ",
    topic: "MFA Methods",
    questionText: "Which MFA method is generally considered MORE secure than SMS-based codes?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Email verification links" },
      { id: "b", key: "B", text: "Authenticator Apps (TOTP)" },
      { id: "c", key: "C", text: "Security questions (e.g., Mother's maiden name)" },
      { id: "d", key: "D", text: "No MFA is best" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Authenticator apps generate codes locally on your device, making them immune to 'SIM Swapping' attacks that affect SMS.",
      proTip: "Always prefer app-based MFA or hardware keys (Yubikey) over SMS.",
      redFlags: ["SMS vulnerability"]
    }
  },
  {
    id: "pass_med_s1",
    type: "SPOT",
    topic: "Password Managers",
    questionText: "Identify the security risks in this shared password manager entry.",
    scenario: {
      body: "SHARED ENTRY:\nTitle: Office Admin\nUsername: admin\nPassword: Password123\nNotes: Shared with the whole marketing team. Please don't change!"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 35, label: "Weak Shared Password", explanation: "'Password123' is easily guessable, even if stored in a manager." },
      { id: "rf2", x: 50, y: 55, label: "Broad Sharing", explanation: "Sharing a single admin credential with a large team violates the principle of 'Least Privilege'." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "A password manager is only as secure as the passwords you put in it. Shared accounts should be avoided in favor of individual access.",
      proTip: "Use 'Vault Sharing' features that allow individual users to access a site without ever seeing the actual password.",
      redFlags: ["Credential sharing", "Weak complexity"]
    }
  },
  {
    id: "pass_med_o1",
    type: "ORDER",
    topic: "Credential Recovery",
    questionText: "Order the steps for a secure password recovery process.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Request password reset via official site" },
      { id: "o2", text: "Receive and click one-time link in email" },
      { id: "o3", text: "Complete MFA challenge (e.g., App code)" },
      { id: "o4", text: "Set a new, unique passphrase" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "A secure recovery flow must verify your identity through multiple factors before allowing a reset.",
      proTip: "If you receive a reset link you didn't request, ignore it and change your password immediately.",
      redFlags: ["Insecure recovery"]
    }
  },
  {
    id: "pass_med_f1",
    type: "FILL_BLANK",
    topic: "Hashing Basics",
    questionText: "Complete the description of how passwords are stored securely.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "Servers should never store passwords in plain text. Instead, they use a one-way function called ", correctAnswer: "hashing", textAfter: "." },
      { id: "f2", textBefore: "To prevent attackers from using pre-calculated tables, a random string called a ", correctAnswer: "salt", textAfter: " is added to each password before it is processed." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Hashing turns your password into a fixed-length string that cannot be reversed. Salting ensures that identical passwords have different hashes.",
      proTip: "If a website can email you your 'old password' in plain text, they are not storing it securely.",
      redFlags: ["Plain text storage"]
    }
  }
];
