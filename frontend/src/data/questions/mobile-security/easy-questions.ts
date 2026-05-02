import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "mob_easy_j1",
    type: "JUDGE",
    topic: "App Stores",
    questionText: "Is it safer to download apps from the official Apple App Store or Google Play Store instead of random websites?",
    scenario: {},
    isFake: false,
    scoreValue: 10,
    feedback: {
      explanation: "Official stores scan apps for malware before allowing them to be listed. Random websites have no such security checks.",
      proTip: "Only 'Side-load' apps if you are an expert and understand the risks.",
      redFlags: ["Untrusted app sources"]
    }
  },
  {
    id: "mob_easy_m1",
    type: "MCQ",
    topic: "Public Wi-Fi",
    questionText: "What is a 'Man-in-the-Middle' attack on public Wi-Fi?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Someone standing between you and the router" },
      { id: "b", key: "B", text: "An attacker intercepting your data as it travels over the Wi-Fi" },
      { id: "c", key: "C", text: "A slow internet connection" },
      { id: "d", key: "D", text: "Your battery dying faster than usual" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Hackers can 'listen' to the traffic on open, unencrypted Wi-Fi networks in cafes or airports.",
      proTip: "Use a VPN when connecting to any public Wi-Fi.",
      redFlags: ["Unsecured network traffic"]
    }
  },
  {
    id: "mob_easy_s1",
    type: "SPOT",
    topic: "App Permissions",
    questionText: "Identify the suspicious permission request in this 'Calculator' app.",
    scenario: {
      body: "CALCULATOR APP requests access to:\n- Microphone\n- GPS Location\n- Contact List\n- Camera"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 10, label: "Excessive Permission", explanation: "A simple calculator has no reason to listen to your microphone or track your location." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Malicious apps ask for permissions they don't need so they can spy on you or steal your data.",
      proTip: "If an app asks for something it doesn't need to function, deny it or uninstall the app.",
      redFlags: ["Privacy-invasive permissions"]
    }
  },
  {
    id: "mob_easy_c1",
    type: "CLASSIFY",
    topic: "Device Protection",
    questionText: "Classify these mobile security actions.",
    scenario: {},
    items: [
      { id: "i1", text: "Setting a 6-digit PIN", category: "SAFE" },
      { id: "i2", text: "Installing every 'Free' utility app", category: "DANGEROUS" },
      { id: "i3", text: "Enabling 'Find My Device'", category: "SAFE" },
      { id: "i4", text: "Using '0000' as your passcode", category: "DANGEROUS" }
    ],
    categories: ["SAFE", "DANGEROUS"],
    scoreValue: 10,
    feedback: {
      explanation: "Physical security (PINs) and remote management (Find My) are essential. Low-quality apps are common malware vectors.",
      proTip: "Your phone is a computer in your pocket—treat its security with the same care.",
      redFlags: ["Weak physical security"]
    }
  }
];
