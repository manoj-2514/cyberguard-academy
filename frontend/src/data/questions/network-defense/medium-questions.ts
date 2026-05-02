import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "net_med_m1",
    type: "MCQ",
    topic: "Intrusion Detection (IDS)",
    questionText: "What is the difference between an IDS and an IPS?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "IDS stands for Internet Data System" },
      { id: "b", key: "B", text: "IDS only detects and alerts; IPS (Prevention) can also block the traffic automatically" },
      { id: "c", key: "C", text: "IPS is only for home networks" },
      { id: "d", key: "D", text: "There is no difference" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "An IDS is like a security camera; an IPS is like a security guard who can actually stop a thief.",
      proTip: "IPS is more powerful but can sometimes accidentally block 'good' traffic if not configured correctly.",
      redFlags: ["Lack of automated response"]
    }
  },
  {
    id: "net_med_f1",
    type: "FILL_BLANK",
    topic: "Network Protocols",
    questionText: "Complete the technical description of a secure network.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "The protocol used to securely log into a remote server is ", correctAnswer: "SSH", textAfter: " (Secure Shell)." },
      { id: "f2", textBefore: "To prevent someone from pretending to be a legitimate website, we use ", correctAnswer: "SSL/TLS", textAfter: " certificates." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Protocols are the 'languages' computers speak. Secure protocols ensure that the language is encrypted and verified.",
      proTip: "Never use old, unencrypted protocols like 'Telnet' or 'FTP' for sensitive work.",
      redFlags: ["Insecure protocols"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "net_hard_s1",
    type: "SPOT",
    topic: "Network Reconnaissance",
    questionText: "Analyze this Nmap scan result and identify the critical vulnerability.",
    scenario: {
      logData: "Nmap scan report for 192.168.1.100\nPORT     STATE SERVICE\n80/tcp   open  http\n443/tcp  open  https\n3389/tcp open  ms-wbt-server (RDP)\n445/tcp  open  microsoft-ds (SMB)"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 65, label: "Exposed RDP/SMB", explanation: "Ports 3389 (RDP) and 445 (SMB) are highly targeted by ransomware and should NEVER be exposed directly to the internet." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Exposing internal management services (RDP) or file sharing (SMB) to the public internet is like leaving your front door wide open in a bad neighborhood.",
      proTip: "Close all unnecessary ports. Only open what is absolutely required for your web application to function.",
      redFlags: ["Excessive port exposure"]
    }
  },
  {
    id: "net_hard_o1",
    type: "OPEN_TEXT",
    topic: "Zero Trust Architecture",
    questionText: "Explain the core philosophy of 'Zero Trust' and how it differs from the traditional 'Perimeter-Based' (Castle and Moat) security model.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Traditional security assumes everything 'inside' the network is safe. Zero Trust assumes 'Never Trust, Always Verify'—even if a user is inside the office, every request for every resource must be authenticated and authorized.",
      proTip: "Zero Trust protects against 'Lateral Movement' where an attacker hacks one PC and then uses it to hack the rest of the company.",
      redFlags: ["Over-trusting internal networks"]
    }
  }
];
