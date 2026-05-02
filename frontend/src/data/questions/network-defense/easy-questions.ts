import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "net_easy_j1",
    type: "JUDGE",
    topic: "Wi-Fi Encryption",
    questionText: "Is a Wi-Fi network with NO password (Open) safe for checking your bank account?",
    scenario: {},
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Open Wi-Fi has no encryption, meaning anyone nearby can potentially capture your login data.",
      proTip: "Use your mobile data (hotspot) if you need to do something sensitive and no secure Wi-Fi is available.",
      redFlags: ["Unencrypted communication"]
    }
  },
  {
    id: "net_easy_m1",
    type: "MCQ",
    topic: "Firewall Purpose",
    questionText: "What is the main job of a network Firewall?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "To make the internet faster" },
      { id: "b", key: "B", text: "To block unauthorized traffic from entering or leaving your network" },
      { id: "c", key: "C", text: "To scan files for viruses" },
      { id: "d", key: "D", text: "To store your browser history" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "A firewall acts like a security guard for your network, checking 'IDs' (IP addresses and ports) of everything coming in.",
      proTip: "Never turn off your firewall unless you are an expert troubleshooting a specific issue.",
      redFlags: ["Unauthorized network access"]
    }
  },
  {
    id: "net_easy_s1",
    type: "SPOT",
    topic: "Router Security",
    questionText: "Identify the security risks in this router's settings.",
    scenario: {
      body: "ROUTER SETTINGS:\n- Admin Password: admin\n- Wi-Fi Encryption: NONE\n- Remote Management: ENABLED"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 15, label: "Default Credentials", explanation: "Using 'admin' as a password is the easiest way for a hacker to take over your network." },
      { id: "rf2", x: 50, y: 35, label: "No Encryption", explanation: "An open Wi-Fi network allows anyone to join and sniff your traffic." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Default settings are the first thing attackers try. Always change the admin password and enable WPA2/WPA3 encryption.",
      proTip: "A secure router is the foundation of a secure home network.",
      redFlags: ["Default settings", "Lack of encryption"]
    }
  },
  {
    id: "net_easy_c1",
    type: "CLASSIFY",
    topic: "Network Terms",
    questionText: "Match the term to its role in network security.",
    scenario: {},
    items: [
      { id: "i1", text: "VPN", category: "Encryption" },
      { id: "i2", text: "Firewall", category: "Access Control" },
      { id: "i3", text: "WPA3", category: "Encryption" },
      { id: "i4", text: "IP Whitelist", category: "Access Control" }
    ],
    categories: ["Encryption", "Access Control"],
    scoreValue: 10,
    feedback: {
      explanation: "VPNs and WPA3 hide your data; firewalls and whitelists decide who gets to enter.",
      proTip: "Defense-in-depth means using both encryption and access control together.",
      redFlags: ["Protocol confusion"]
    }
  }
];
