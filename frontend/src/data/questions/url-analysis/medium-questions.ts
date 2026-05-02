import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "url_med_m1",
    type: "MCQ",
    topic: "Redirection Tactics",
    questionText: "What is the purpose of an 'Open Redirect' vulnerability in a legitimate website?",
    scenario: {
      url: "https://trusted-site.com/redirect?url=http://malicious-site.cc"
    },
    options: [
      { id: "a", key: "A", text: "To help users find helpful links" },
      { id: "b", key: "B", text: "To use the trust of the first domain to hide the final malicious destination" },
      { id: "c", key: "C", text: "To make the page load faster" },
      { id: "d", key: "D", text: "To track how many people click the link" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Phishers use 'trusted-site.com' to bypass email filters, knowing the user will only see the first part of the URL.",
      proTip: "Always look at the end of the URL string in a redirect parameter.",
      redFlags: ["Open redirect", "Domain trust abuse"]
    }
  },
  {
    id: "url_med_s1",
    type: "SPOT",
    topic: "Punycode Attacks",
    questionText: "Identify the technical red flag in this 'Punycode' URL.",
    scenario: {
      url: "https://xn--e1aybc.com"
    },
    redFlags: [
      { id: "rf1", x: 40, y: 15, label: "Punycode Prefix", explanation: "'xn--' indicates that the domain uses special characters from other languages that may look like Latin letters (e.g., а instead of a)." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers use Punycode to create 'Homograph' attacks that look identical to real domains (like apple.com) in the browser bar.",
      proTip: "If you see 'xn--' in a URL, treat it with extreme suspicion.",
      redFlags: ["Homograph attack", "Punycode encoding"]
    }
  },
  {
    id: "url_med_f1",
    type: "FILL_BLANK",
    topic: "URL Structure",
    questionText: "Complete the description of a complex URL.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "In the URL 'https://support.google.com/mail', 'support' is the ", correctAnswer: "subdomain", textAfter: "." },
      { id: "f2", textBefore: "The part after the slash, '/mail', is the ", correctAnswer: "path", textAfter: " which points to a specific folder or file." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Understanding URL segments is crucial for spotting where an attacker might be hiding a malicious domain.",
      proTip: "The domain is always the part immediately to the left of the TLD (.com, .org).",
      redFlags: ["Subdomain spoofing"]
    }
  }
];
