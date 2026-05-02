import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "url_easy_j1",
    type: "JUDGE",
    topic: "Typosquatting",
    questionText: "Is this URL legitimate for the official Google homepage?",
    scenario: {
      url: "https://www.g00gle.com/search?q=security"
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "The domain 'g00gle.com' uses zeros instead of 'o's. This is a common typosquatting tactic.",
      proTip: "Check every character in the domain name before entering credentials.",
      redFlags: ["Typosquatting (zeros instead of letters)"]
    }
  },
  {
    id: "url_easy_m1",
    type: "MCQ",
    topic: "HTTPS Basics",
    questionText: "What does the 'S' in HTTPS stand for?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Simple" },
      { id: "b", key: "B", text: "Secure" },
      { id: "c", key: "C", text: "Standard" },
      { id: "d", key: "D", text: "Speed" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "HTTPS (Hypertext Transfer Protocol Secure) ensures that the communication between your browser and the website is encrypted.",
      proTip: "Never enter passwords or credit card info on a site that only uses HTTP (without the 'S').",
      redFlags: ["Insecure connection"]
    }
  },
  {
    id: "url_easy_s1",
    type: "SPOT",
    topic: "TLD Recognition",
    questionText: "Identify the suspicious parts of this banking URL.",
    scenario: {
      url: "https://hdfcbank.security-verification.top/login"
    },
    redFlags: [
      { id: "rf1", x: 60, y: 10, label: "Untrusted TLD", explanation: "'.top' is a generic TLD often used by attackers. Banks use '.com' or '.in'." },
      { id: "rf2", x: 30, y: 15, label: "Subdomain Trick", explanation: "'hdfcbank' is used as a subdomain here; the real domain is 'security-verification.top'." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers put trusted brand names in the 'subdomain' (the leftmost part) to trick you into ignoring the real domain on the right.",
      proTip: "The real domain is the word immediately to the left of the TLD (.com, .top, etc.).",
      redFlags: ["Subdomain spoofing", "Suspicious TLD"]
    }
  },
  {
    id: "url_easy_c1",
    type: "CLASSIFY",
    topic: "URL Components",
    questionText: "Classify these URL parts.",
    scenario: {},
    items: [
      { id: "i1", text: "https://", category: "Protocol" },
      { id: "i2", text: "amazon.com", category: "Domain" },
      { id: "i3", text: "aws.", category: "Subdomain" },
      { id: "i4", text: "/orders", category: "Path" }
    ],
    categories: ["Protocol", "Domain", "Subdomain", "Path"],
    scoreValue: 10,
    feedback: {
      explanation: "Understanding URL structure helps you identify where the 'real' destination is.",
      proTip: "The domain is the most important part to verify for safety.",
      redFlags: ["Component confusion"]
    }
  },
  {
    id: "url_easy_j2",
    type: "JUDGE",
    topic: "Homograph Attack",
    questionText: "Is this URL legitimate for Apple.com?",
    scenario: {
      url: "https://аpple.com"
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "This uses a Cyrillic 'a' (а) instead of the Latin 'a'. They look identical but lead to different servers.",
      proTip: "Be wary of links from untrusted sources, even if they look perfect.",
      redFlags: ["Homograph character swap"]
    }
  },
  {
    id: "url_easy_m2",
    type: "MCQ",
    topic: "URL Shorteners",
    questionText: "Why do phishers use URL shorteners like bit.ly or t.co?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "To make the link look more professional" },
      { id: "b", key: "B", text: "To hide the real, malicious destination" },
      { id: "c", key: "C", text: "To make the website load faster" },
      { id: "d", key: "D", text: "Because long URLs are illegal" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Shorteners mask the final URL, making it impossible to see the red flags until you've already clicked.",
      proTip: "Use a 'URL Unshortener' tool if you're suspicious of a shortened link.",
      redFlags: ["Masked destination"]
    }
  }
];
