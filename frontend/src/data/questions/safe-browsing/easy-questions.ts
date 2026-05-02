import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "sb_easy_j1",
    type: "JUDGE",
    topic: "HTTPS Padlock",
    questionText: "If you see a padlock icon in your browser's address bar, does it mean the website is 100% safe and trustworthy?",
    scenario: {},
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "The padlock only means the connection is 'private' (encrypted). It does NOT mean the site owner is honest. Phishing sites often have padlocks.",
      proTip: "Check the domain name (URL) even if you see the padlock.",
      redFlags: ["Padlock misconception"]
    }
  },
  {
    id: "sb_easy_m1",
    type: "MCQ",
    topic: "Search Result Safety",
    questionText: "What is a 'Malvertising' (Malicious Advertising) link in search results?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "A very funny advertisement" },
      { id: "b", key: "B", text: "A fake 'Sponsored' link that leads to a malware-infected site" },
      { id: "c", key: "C", text: "A link to a competitor's website" },
      { id: "d", key: "D", text: "An ad that shows up in your email" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Attackers pay for ads to appear at the top of search results for popular software (like Chrome or Zoom) to trick you into downloading malware.",
      proTip: "Scroll past the 'Sponsored' results to find the official, organic link.",
      redFlags: ["Poisoned search results"]
    }
  },
  {
    id: "sb_easy_s1",
    type: "SPOT",
    topic: "Browser Warnings",
    questionText: "Identify the safest action when seeing this red browser warning.",
    scenario: {
      body: "⚠️ DECEPTIVE SITE AHEAD!\nAttackers on this site may trick you into doing something dangerous like installing software or revealing personal info.\n[ Go back to safety ]  [ Details ]"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 80, label: "Safest Path", explanation: "Always click 'Go back to safety' when your browser warns you about a dangerous site." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Google Safe Browsing and other tools block known malicious sites. Do not try to 'bypass' these warnings.",
      proTip: "Trust your browser's built-in security warnings; they are there to protect you.",
      redFlags: ["Ignoring security warnings"]
    }
  },
  {
    id: "sb_easy_c1",
    type: "CLASSIFY",
    topic: "Safe Tools",
    questionText: "Classify these browser tools and habits.",
    scenario: {},
    items: [
      { id: "i1", text: "Ad-Blocker", category: "GOOD HABIT" },
      { id: "i2", text: "Clicking 'Allow' on every notification", category: "BAD HABIT" },
      { id: "i3", text: "Saving passwords in a public browser", category: "BAD HABIT" },
      { id: "i4", text: "Incognito mode for privacy", category: "GOOD HABIT" }
    ],
    categories: ["GOOD HABIT", "BAD HABIT"],
    scoreValue: 10,
    feedback: {
      explanation: "Ad-blockers stop many malvertising attacks. Browser notifications are often used to spam you with fake virus alerts.",
      proTip: "Use 'Incognito' to prevent your history from being saved on shared computers, but remember it doesn't make you invisible to your ISP.",
      redFlags: ["Browser notification spam"]
    }
  }
];
