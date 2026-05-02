import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "sc_easy_j1",
    type: "JUDGE",
    topic: "Vendor Risk",
    questionText: "If a small company that provides your AC service gets hacked, can that put your company's computer network at risk?",
    scenario: {},
    isFake: false,
    scoreValue: 10,
    feedback: {
      explanation: "Hackers often attack smaller, less-secure partners to gain access to their larger clients' networks (this is how Target was hacked).",
      proTip: "Every partner with network access is a potential 'entry point' for attackers.",
      redFlags: ["Third-party vulnerability"]
    }
  },
  {
    id: "sc_easy_m1",
    type: "MCQ",
    topic: "Invoice Fraud",
    questionText: "You receive an email from a regular vendor saying their bank account has changed. What is the SAFEST first step?",
    scenario: {
      body: "VENDOR: We have updated our banking details. Please send all future payments to the new account listed in the attached PDF."
    },
    options: [
      { id: "a", key: "A", text: "Update the records immediately and pay the next invoice" },
      { id: "b", key: "B", text: "Call a known contact at the vendor on a verified phone number to confirm" },
      { id: "c", key: "C", text: "Reply to the email and ask if they are sure" },
      { id: "d", key: "D", text: "Ignore it and keep paying the old account" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Invoice fraud is a massive problem. Attackers hack vendor emails to send fake 'updated' bank info.",
      proTip: "Never trust an email for financial changes. Always verify via a second channel (phone call).",
      redFlags: ["Change in payment instructions", "Email-only request"]
    }
  },
  {
    id: "sc_easy_s1",
    type: "SPOT",
    topic: "Software Updates",
    questionText: "Identify the risk in this 'Urgent Update' for your office software.",
    scenario: {
      body: "OFFICE TOOL: A critical update is required. Download the patch from http://update-office-365.cc/patch.exe"
    },
    redFlags: [
      { id: "rf1", x: 60, y: 10, label: "Suspicious Domain", explanation: "'.cc' is not a standard domain for major software updates. Official updates come from the app itself." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Supply chain attacks can involve fake updates that contain malware.",
      proTip: "Always update software through the official 'Check for Updates' menu within the program.",
      redFlags: ["Non-official update source"]
    }
  },
  {
    id: "sc_easy_c1",
    type: "CLASSIFY",
    topic: "Vetting Vendors",
    questionText: "Is this vendor request Safe or Suspicious?",
    scenario: {},
    items: [
      { id: "i1", text: "Request for remote network access", category: "SUSPICIOUS" },
      { id: "i2", text: "Providing a signed NDA", category: "SAFE" },
      { id: "i3", text: "Sending an unrequested USB drive", category: "SUSPICIOUS" },
      { id: "i4", text: "Shared access to a secure project portal", category: "SAFE" }
    ],
    categories: ["SAFE", "SUSPICIOUS"],
    scoreValue: 10,
    feedback: {
      explanation: "Requests for deep access (Remote/USB) should always be treated with high skepticism.",
      proTip: "Vet every vendor's security practices before giving them access to your data.",
      redFlags: ["Unnecessary access requests"]
    }
  }
];
