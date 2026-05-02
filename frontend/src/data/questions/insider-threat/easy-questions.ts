import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "insider-easy-1",
    type: "JUDGE",
    topic: "Credential Sharing",
    questionText: "A trusted colleague is having trouble with their login and asks to 'borrow' your username and password just for 10 minutes so they can finish an urgent report. Is it safe to help them this way?",
    scenario: {
      body: "SCENARIO: Your teammate is a hard worker and you have known them for 5 years. They are under a lot of pressure from the manager."
    },
    isFake: true,
    feedback: {
      explanation: "Sharing credentials is a major security violation. It destroys the 'Audit Trail' (if they do something wrong, it looks like you did it) and bypasses access controls.",
      proTip: "Never share passwords. Instead, offer to help them contact the IT Helpdesk to reset their own account.",
      redFlags: ["Request for password", "Urgency/Pressure", "Audit trail destruction"]
    },
    scoreValue: 10
  },
  {
    id: "insider-easy-2",
    type: "MCQ",
    topic: "Definitions",
    questionText: "What is the best definition of an 'Insider Threat'?",
    scenario: {
      body: "Security teams are discussing internal risks during a meeting."
    },
    options: [
      { id: "a", key: "A", text: "A hacker from another country trying to break into the network." },
      { id: "b", key: "B", text: "A person with legitimate access (employee/contractor) who causes harm to the organization." },
      { id: "c", key: "C", text: "A computer virus that comes from a malicious website." },
      { id: "d", key: "D", text: "An error in the software code that causes it to crash." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Insider threats are unique because they involve people who have already been 'Trusted' with access and knowledge of the company's systems.",
      proTip: "Insider threats can be malicious (intentional) or accidental (unintentional).",
      redFlags: ["Misuse of legitimate access", "Knowledge of internal systems"]
    },
    scoreValue: 10
  },
  {
    id: "insider-easy-3",
    type: "JUDGE",
    topic: "Data Exfiltration",
    questionText: "A coworker who recently handed in their resignation is seen downloading large amounts of company data to a personal USB drive 'so I have examples of my work for my portfolio'. Is this acceptable behavior?",
    scenario: {
      body: "The employee is downloading client lists and project pricing spreadsheets."
    },
    isFake: true,
    feedback: {
      explanation: "Company data belongs to the organization, not the individual. Downloading data to personal devices without approval is considered data theft.",
      proTip: "Most data theft occurs in the 30 days before an employee leaves. Security teams should monitor file activity closely during this time.",
      redFlags: ["Bulk downloads before resignation", "Personal storage device usage", "Taking intellectual property"]
    },
    scoreValue: 10
  },
  {
    id: "insider-easy-4",
    type: "SPOT",
    topic: "Behavioral Indicators",
    questionText: "Identify the three 'Red Flag' behaviors that might indicate a potential insider threat in this office log.",
    scenario: {
      body: "LOG: 1. Employee 'Manoj' accessing HR files at 2:00 AM (not his job). 2. Employee 'Sara' complaining about the company on LinkedIn. 3. Employee 'Kevin' suddenly buying a luxury car despite a low salary. 4. Employee 'Priya' using a personal Dropbox to sync work files."
    },
    redFlags: [
      { id: "rf1", x: 20, y: 30, label: "Unauthorized Off-hours Access", explanation: "Accessing sensitive data unrelated to your role at unusual times is a major indicator." },
      { id: "rf2", x: 50, y: 60, label: "Unexplained Wealth", explanation: "Sudden, unexplained changes in lifestyle can sometimes indicate financial pressure or outside payments." },
      { id: "rf3", x: 80, y: 90, label: "Shadow IT / Personal Cloud", explanation: "Using unauthorized cloud storage for work files bypasses security controls and leads to data leakage." }
    ],
    feedback: {
      explanation: "Insider threats often show behavioral and technical warning signs before a major breach occurs.",
      proTip: "Don't ignore patterns. One event might be an accident, but multiple flags require investigation.",
      redFlags: ["Out-of-hours access", "Unexplained wealth", "Shadow IT usage"]
    },
    scoreValue: 10
  },
  {
    id: "insider-easy-5",
    type: "MCQ",
    topic: "Reporting",
    questionText: "You see a coworker intentionally bypassing a security lock on a door because they 'lost their badge'. What should you do?",
    scenario: {
      body: "They are a senior employee and might get angry if you stop them."
    },
    options: [
      { id: "a", key: "A", text: "Ignore it; they are senior and probably have a good reason." },
      { id: "b", key: "B", text: "Help them hold the door so they don't have to struggle." },
      { id: "c", key: "C", text: "Report the incident to the Security department or via the anonymous tip line." },
      { id: "d", key: "D", text: "Post about it on the internal Slack channel to embarrass them." }
    ],
    correctOptionId: "c",
    feedback: {
      explanation: "Bypassing controls is a behavioral red flag. Reporting it allows the company to address the root cause (like a lost badge) and ensure security protocols are followed.",
      proTip: "Security is everyone's responsibility. Reporting a 'policy violation' is not the same as 'snitching'—it's protecting the company.",
      redFlags: ["Bypassing physical locks", "Failure to use ID badge"]
    },
    scoreValue: 10
  },
  {
    id: "insider-easy-6",
    type: "CLASSIFY",
    topic: "Types of Insiders",
    questionText: "Classify these actions as 'Intentional' (Malicious) or 'Unintentional' (Accidental).",
    scenario: {
      body: "Not all insider threats are trying to do harm."
    },
    items: [
      { id: "i1", text: "Selling customer data to a competitor", category: "Intentional" },
      { id: "i2", text: "Accidentally CCing the wrong person on a sensitive email", category: "Unintentional" },
      { id: "i3", text: "Leaving a laptop in an unlocked car", category: "Unintentional" },
      { id: "i4", text: "Planting a 'Logic Bomb' to delete files after quitting", category: "Intentional" },
      { id: "i5", text: "Using a weak password that is easily guessed", category: "Unintentional" }
    ],
    categories: ["Intentional", "Unintentional"],
    feedback: {
      explanation: "Most insider threats are actually 'Unintentional' (neglect or mistakes), but the damage can be just as high as a 'Malicious' attack.",
      proTip: "Training reduces Unintentional threats; Monitoring reduces Intentional ones.",
      redFlags: ["Negligence", "Malicious intent"]
    },
    scoreValue: 10
  },
  {
    id: "insider-easy-7",
    type: "MCQ",
    topic: "Remote Work",
    questionText: "While working from a cafe, your roommate asks if they can use your work laptop to 'just check their personal email' because their phone died. What is the correct response?",
    scenario: {
      body: "Your roommate is a close friend and you trust them completely."
    },
    options: [
      { id: "a", key: "A", text: "Let them use it; they are just checking email, not accessing work files." },
      { id: "b", key: "B", text: "Politely refuse and explain that work devices are for authorized users only." },
      { id: "c", key: "C", text: "Let them use it but watch over their shoulder the whole time." },
      { id: "d", key: "D", text: "Let them use it but only in a 'Guest' browser window." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Allowing unauthorized people to use a work device is a breach of trust and security. They could accidentally download malware or see sensitive notifications.",
      proTip: "A work laptop is a 'Managed' asset. Any use by a third party violates the security agreement.",
      redFlags: ["Unauthorized user access", "Mixing personal/work device usage"]
    },
    scoreValue: 10
  }
];
