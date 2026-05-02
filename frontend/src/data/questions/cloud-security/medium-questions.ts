import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "cloud_med_m1",
    type: "MCQ",
    topic: "Identity & Access Management (IAM)",
    questionText: "What is the 'Principle of Least Privilege' (PoLP) in Cloud Security?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Giving everyone Admin access to save time" },
      { id: "b", key: "B", text: "Giving users only the minimum access they need to perform their specific job" },
      { id: "c", key: "C", text: "Charging users for every file they open" },
      { id: "d", key: "D", text: "Allowing users to share passwords with partners" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "If an account with 'Read-Only' access is hacked, the damage is limited. If an 'Admin' account is hacked, the whole company is at risk.",
      proTip: "In the cloud, every permission should be 'Just-In-Time' and 'Just-Enough'.",
      redFlags: ["Privilege creep", "Over-permissioned accounts"]
    }
  },
  {
    id: "cloud_med_s1",
    type: "SPOT",
    topic: "Cloud Misconfiguration",
    questionText: "Identify the critical risk in this Cloud Instance configuration.",
    scenario: {
      body: "INSTANCE DETAILS:\n- Security Group: web-tier\n- Inbound Rule: Port 22 (SSH) | Source: 0.0.0.0/0 (ANYWHERE)\n- Outbound Rule: ALL TRAFFIC"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 35, label: "Open SSH Port", explanation: "Allowing SSH access from '0.0.0.0/0' means anyone on the internet can try to brute-force your server's management port." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Management ports (SSH/RDP) should only be accessible from your company's IP address or through a VPN.",
      proTip: "Restrict inbound traffic to only the specific IPs that need it.",
      redFlags: ["Exposed management ports"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "cloud_hard_o1",
    type: "OPEN_TEXT",
    topic: "Serverless Security",
    questionText: "Explain the 'Cold Start' vulnerability in serverless functions (like AWS Lambda) and how an attacker might use it to steal sensitive data from a function's memory.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Serverless functions are supposed to be stateless, but containers are often reused for 'Warm Starts'. If a function stores a secret in a global variable (memory) during a 'Cold Start', a subsequent user might be able to read that secret if the container is reused for their request.",
      proTip: "Never store secrets in global memory in serverless; fetch them from a secure manager (like AWS Secrets Manager) for every execution.",
      redFlags: ["Statelessness violation"]
    }
  },
  {
    id: "cloud_hard_f1",
    type: "FILL_BLANK",
    topic: "Cloud Governance",
    questionText: "Complete the technical description of cloud compliance.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "To ensure consistent security, companies use ", correctAnswer: "Infrastructure as Code", textAfter: " (IaC) to deploy and audit cloud resources." },
      { id: "f2", textBefore: "A ", correctAnswer: "CASB", textAfter: " (Cloud Access Security Broker) sits between users and cloud apps to enforce security policies." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Automation is the only way to manage security at the scale of the cloud.",
      proTip: "Use 'Guardrails' to automatically block any non-compliant resources (like public S3 buckets) from being created.",
      redFlags: ["Manual cloud management"]
    }
  }
];
