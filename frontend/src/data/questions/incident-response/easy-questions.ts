import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "ir_easy_j1",
    type: "JUDGE",
    topic: "Initial Action",
    questionText: "If you see a suspicious window opening and closing on your screen, should you immediately unplug your network cable (or turn off Wi-Fi)?",
    scenario: {},
    isFake: false,
    scoreValue: 10,
    feedback: {
      explanation: "Disconnecting from the network (Isolation) is the first step to prevent an attacker from stealing data or spreading to other PCs.",
      proTip: "Isolate first, then report. Don't let the 'infection' spread.",
      redFlags: ["System anomalies"]
    }
  },
  {
    id: "ir_easy_m1",
    type: "MCQ",
    topic: "Reporting",
    questionText: "Who should you contact first if you think your work computer is hacked?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Your manager" },
      { id: "b", key: "B", text: "IT Security / Help Desk" },
      { id: "c", key: "C", text: "The police" },
      { id: "d", key: "D", text: "Google support" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "IT Security teams have the tools and training to stop the attack and investigate.",
      proTip: "Quick reporting can save the company millions in potential damages.",
      redFlags: ["Delayed reporting"]
    }
  },
  {
    id: "ir_easy_s1",
    type: "SPOT",
    topic: "Evidence Preservation",
    questionText: "Identify what NOT to do during an active incident.",
    scenario: {
      body: "ACTION LIST:\n1. Delete all suspicious files\n2. Run a full disk cleanup\n3. Restart the computer 10 times\n4. Call IT Security"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 10, label: "Destructive Action", explanation: "Deleting files or running cleanup destroys evidence the security team needs." },
      { id: "rf2", x: 50, y: 40, label: "Rebooting", explanation: "Restarting can sometimes trigger malware to hide or delete itself." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Preserving the state of the machine is critical for 'Forensics' (investigating how the attack happened).",
      proTip: "Don't try to fix it yourself; leave the 'crime scene' as it is.",
      redFlags: ["Tampering with evidence"]
    }
  },
  {
    id: "ir_easy_c1",
    type: "CLASSIFY",
    topic: "Incident Stages",
    questionText: "Sort these steps into the correct order of an Incident Response flow.",
    scenario: {},
    items: [
      { id: "i1", text: "Detection", category: "EARLY" },
      { id: "i2", text: "Containment", category: "EARLY" },
      { id: "i3", text: "Eradication", category: "LATER" },
      { id: "i4", text: "Recovery", category: "LATER" }
    ],
    categories: ["EARLY", "LATER"],
    scoreValue: 10,
    feedback: {
      explanation: "First you find it and stop it from spreading (Containment), then you clean it up and get back to work (Recovery).",
      proTip: "You can't recover until you've contained the threat.",
      redFlags: ["Stage skipping"]
    }
  }
];
