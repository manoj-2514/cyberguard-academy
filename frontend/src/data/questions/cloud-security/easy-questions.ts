import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "cloud_easy_j1",
    type: "JUDGE",
    topic: "Shared Responsibility",
    questionText: "If you store a file in Google Drive, is it YOUR responsibility to set the correct sharing permissions so strangers can't see it?",
    scenario: {},
    isFake: false,
    scoreValue: 10,
    feedback: {
      explanation: "Cloud providers secure the 'infrastructure', but you are responsible for securing the 'data' you put in it (permissions, passwords).",
      proTip: "The cloud provider protects the building; you protect your locker.",
      redFlags: ["Misconfigured permissions"]
    }
  },
  {
    id: "cloud_easy_m1",
    type: "MCQ",
    topic: "Public Buckets",
    questionText: "What is a major risk of a 'Publicly Accessible' storage bucket (like AWS S3)?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "The files will load slower" },
      { id: "b", key: "B", text: "Anyone on the internet can see and download your files" },
      { id: "c", key: "C", text: "It costs more money" },
      { id: "d", key: "D", text: "It's actually the standard way to store private data" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Misconfigured cloud storage is a leading cause of data breaches. 'Public' means everyone.",
      proTip: "Always use the 'Block all public access' setting for private storage.",
      redFlags: ["Data exposure"]
    }
  },
  {
    id: "cloud_easy_s1",
    type: "SPOT",
    topic: "Phishing for Cloud",
    questionText: "Identify the red flags in this cloud login page.",
    scenario: {
      body: "URL: https://accounts-google-verify.xyz/login\n[ Google Logo ]\n[ Sign in to continue to Drive ]"
    },
    redFlags: [
      { id: "rf1", x: 60, y: 10, label: "Fake URL", explanation: "Google's official login is 'accounts.google.com', not a '.xyz' domain." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers often build fake cloud login pages to steal your 'Master Password' that controls all your files.",
      proTip: "Verify the URL before entering your cloud credentials.",
      redFlags: ["Credential harvesting"]
    }
  },
  {
    id: "cloud_easy_c1",
    type: "CLASSIFY",
    topic: "Cloud Models",
    questionText: "Match the cloud service to its type.",
    scenario: {},
    items: [
      { id: "i1", text: "Gmail / Microsoft 365", category: "SaaS (Software)" },
      { id: "i2", text: "Virtual Machine", category: "IaaS (Infrastructure)" },
      { id: "i3", text: "Dropbox", category: "SaaS (Software)" },
      { id: "i4", text: "Cloud Database", category: "PaaS (Platform)" }
    ],
    categories: ["SaaS (Software)", "IaaS (Infrastructure)", "PaaS (Platform)"],
    scoreValue: 10,
    feedback: {
      explanation: "SaaS is software you use; IaaS is infrastructure (like servers) you manage; PaaS is for developers to build on.",
      proTip: "Most office workers primarily interact with SaaS (Software as a Service).",
      redFlags: ["Model confusion"]
    }
  }
];
