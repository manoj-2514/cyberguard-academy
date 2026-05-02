import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "insider-med-1",
    type: "JUDGE",
    topic: "Privileged Access",
    questionText: "An IT Administrator is asked by a friendly manager to 'quickly reset a user's MFA' without going through the official ticket system because the user is in a hurry. If the Admin does this, is it considered an insider risk behavior?",
    scenario: {
      body: "SCENARIO: The manager claims the user is a VIP who needs access for an immediate board meeting."
    },
    isFake: false,
    feedback: {
      explanation: "Bypassing official security procedures, even for 'VIPs', is a classic insider risk. It bypasses audit logs and can be exploited by social engineers who have already compromised the manager's account.",
      proTip: "Standard Operating Procedures (SOPs) are there for a reason. No 'favor' is worth a potential security breach.",
      redFlags: ["Bypassing ticket system", "Urgency/Pressure", "MFA manipulation"]
    },
    scoreValue: 10
  },
  {
    id: "insider-med-2",
    type: "MCQ",
    topic: "Privileged Users",
    questionText: "Why are 'Privileged Users' (Admins, Executives, Developers) considered the highest risk category for insider threats?",
    scenario: {
      body: "A security analyst is mapping out the organization's risk profile."
    },
    options: [
      { id: "a", key: "A", text: "Because they are more likely to be unhappy with their jobs." },
      { id: "b", key: "B", text: "Because they have the keys to the most sensitive data and can often delete logs of their own actions." },
      { id: "c", key: "C", text: "Because they are targeted by more external phishing emails." },
      { id: "d", key: "D", text: "Because they usually work longer hours than other employees." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "The more 'Privilege' (access) a person has, the more damage they can cause. Malicious insiders with admin rights can 'Cover their tracks' by deleting system logs.",
      proTip: "Implement 'Dual Custody' or 'Four-Eyes' principle for the most sensitive admin tasks.",
      redFlags: ["High-level access", "Ability to modify logs"]
    },
    scoreValue: 10
  },
  {
    id: "insider-med-3",
    type: "FILL_BLANK",
    topic: "Insider Categories",
    questionText: "Complete the descriptions of the three main types of insider threats.",
    scenario: {
      body: "Understanding the 'Who' helps in designing better defenses."
    },
    blanks: [
      { id: "b1", textBefore: "1. The ", textAfter: " Insider intentionally seeks to harm the organization for gain or revenge.", correctAnswer: "Malicious" },
      { id: "b2", textBefore: "2. The ", textAfter: " Insider causes harm through carelessness or bypassing policies for convenience.", correctAnswer: "Negligent" },
      { id: "b3", textBefore: "3. The ", textAfter: " Insider is a legitimate user whose credentials have been stolen by an external attacker.", correctAnswer: "Compromised" }
    ],
    feedback: {
      explanation: "Identifying the category helps tailor the response. Negligent insiders need training; Malicious ones need monitoring; Compromised ones need technical remediation.",
      proTip: "A 'Compromised' insider is an external threat that *looks* like an internal one.",
      redFlags: ["Credential theft", "Policy avoidance", "Disgruntled behavior"]
    },
    scoreValue: 10
  },
  {
    id: "insider-med-4",
    type: "ORDER",
    topic: "Response Strategy",
    questionText: "Order the steps an organization should take when a 'Disgruntled' employee with high-level access is fired.",
    scenario: {
      body: "Goal: Prevent retaliation or data theft."
    },
    orderItems: [
      { id: "step1", text: "Immediately revoke all digital access (Email, VPN, Cloud, Admin)." },
      { id: "step2", text: "Conduct a final exit interview with a witness present." },
      { id: "step3", text: "Monitor all system logs for any unusual activity in the hours before and after firing." },
      { id: "step4", text: "Physically escort the person from the building and collect badges/devices." }
    ],
    correctOrderIds: ["step1", "step3", "step4", "step2"],
    feedback: {
      explanation: "Revoking access must happen FIRST to prevent 'Logic Bombs' or data wipes. Monitoring logs helps identify if they did anything malicious before the revocation.",
      proTip: "Coordinated termination between HR and IT is essential for high-risk departures.",
      redFlags: ["Disgruntled attitude", "High-privilege access"]
    },
    scoreValue: 10
  },
  {
    id: "insider-med-5",
    type: "MCQ",
    topic: "DLP",
    questionText: "Which technical control is specifically designed to detect and block the unauthorized movement of sensitive data outside the organization?",
    scenario: {
      body: "An employee tries to upload a ZIP file containing the 'Product Roadmap' to a personal Mega.nz account."
    },
    options: [
      { id: "a", key: "A", text: "Antivirus (AV)" },
      { id: "b", key: "B", text: "Data Loss Prevention (DLP)" },
      { id: "c", key: "C", text: "Intrusion Detection System (IDS)" },
      { id: "d", key: "D", text: "Web Application Firewall (WAF)" }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "DLP tools scan data 'In Motion' (network), 'At Rest' (storage), and 'In Use' (endpoint) to identify and block sensitive patterns like Credit Card numbers or keywords.",
      proTip: "DLP works best when data is correctly 'Labeled' (Classified) beforehand.",
      redFlags: ["Bulk uploads to personal storage", "Encrypted ZIP files sent via email"]
    },
    scoreValue: 10
  },
  {
    id: "insider-med-6",
    type: "CLASSIFY",
    topic: "Risk Indicators",
    questionText: "Classify these indicators as 'Technical' (found in logs) or 'Behavioral' (found in person).",
    scenario: {
      body: "Effective insider threat programs combine HR and IT data."
    },
    items: [
      { id: "i1", text: "Downloading 10GB of data at 3 AM", category: "Technical" },
      { id: "i2", text: "Expressing extreme anger toward management", category: "Behavioral" },
      { id: "i3", text: "Accessing systems they haven't used in 12 months", category: "Technical" },
      { id: "i4", text: "Suddenly working late every night without a project", category: "Behavioral" },
      { id: "i5", text: "Attempting to disable security agents on their laptop", category: "Technical" }
    ],
    categories: ["Technical", "Behavioral"],
    feedback: {
      explanation: "The most dangerous insiders show both: a 'Disgruntled' personality (Behavioral) combined with 'Atypical' access patterns (Technical).",
      proTip: "A sudden interest in learning 'how to clear system logs' is a critical technical red flag.",
      redFlags: ["Atypical technical behavior", "Personal stress/disgruntlement"]
    },
    scoreValue: 10
  },
  {
    id: "insider-med-7",
    type: "MCQ",
    topic: "Internal Controls",
    questionText: "What is the security benefit of 'Mandatory Vacations' in the context of insider threats?",
    scenario: {
      body: "A bank requires all financial traders to take at least two consecutive weeks of leave every year."
    },
    options: [
      { id: "a", key: "A", text: "To save money on employee healthcare and burnout costs." },
      { id: "b", key: "B", text: "To ensure that someone else has to perform their duties, potentially discovering any ongoing fraud or hidden errors." },
      { id: "c", key: "C", text: "To give the IT team time to update the user's laptop without them noticing." },
      { id: "d", key: "D", text: "To comply with international labor laws." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Fraud often requires constant 'maintenance' by the insider. When they are away, the lack of their specific intervention causes the fraud to become visible to their replacement.",
      proTip: "This is a key 'Detective' administrative control in financial and highly regulated sectors.",
      redFlags: ["Employee refusing to take vacation", "Extreme protectiveness over specific tasks"]
    },
    scoreValue: 10
  }
];
