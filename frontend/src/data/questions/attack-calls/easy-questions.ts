import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "call_easy_j1",
    type: "JUDGE",
    topic: "Vishing (Voice Phishing)",
    questionText: "If a caller claims to be from 'Microsoft Technical Support' and says your computer is sending error messages, is this a scam?",
    scenario: {
      body: "CALLER: Hello, I am calling from Microsoft. We have detected a virus on your computer. You must give me remote access to fix it."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Microsoft (and other major tech companies) will never call you to report errors on your computer. These are 'Tech Support' scams.",
      proTip: "If you didn't call them, they shouldn't be calling you. Hang up.",
      redFlags: ["Unsolicited call", "Tech support impersonation"]
    }
  },
  {
    id: "call_easy_m1",
    type: "MCQ",
    topic: "Caller ID Spoofing",
    questionText: "Can you trust the name and number displayed on your phone's Caller ID?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Yes, it's verified by the phone company" },
      { id: "b", key: "B", text: "No, attackers can easily 'spoof' (fake) any number they want" },
      { id: "c", key: "C", text: "Only if it's from a local area code" },
      { id: "d", key: "D", text: "Yes, if they have a professional-sounding voice" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Caller ID is very easy to fake. Attackers make it look like they are calling from your bank, the police, or your own area code.",
      proTip: "Don't trust the display. If a caller asks for info, hang up and call the number on your official card or app.",
      redFlags: ["Caller ID spoofing"]
    }
  },
  {
    id: "call_easy_s1",
    type: "SPOT",
    topic: "Social Pressure",
    questionText: "Identify the psychological tactics in this scam call.",
    scenario: {
      body: "CALLER: Listen carefully, your grandson is in jail and needs $2,000 for bail right now. Don't call his parents, it will only make it worse. Go to the store and buy gift cards for the payment."
    },
    redFlags: [
      { id: "rf1", x: 50, y: 10, label: "Extreme Urgency", explanation: "Scammers use 'Immediate' needs to stop you from thinking clearly." },
      { id: "rf2", x: 50, y: 60, label: "Unusual Payment", explanation: "Legitimate agencies (police, courts) will NEVER accept gift cards as payment." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "The 'Grandparent Scam' uses fear and urgency to trick people into sending money via untraceable methods (gift cards, wire transfers).",
      proTip: "Always stop and verify by calling the family member directly on their known number.",
      redFlags: ["Fear tactic", "Gift card payment request"]
    }
  },
  {
    id: "call_easy_c1",
    type: "CLASSIFY",
    topic: "Call Types",
    questionText: "Is this call Safe or a Potential Attack?",
    scenario: {},
    items: [
      { id: "i1", text: "Automated 'Robocall' about a prize", category: "ATTACK" },
      { id: "i2", text: "Call from a known friend's number", category: "SAFE" },
      { id: "i3", text: "Silent call where no one speaks", category: "ATTACK (Bot)" },
      { id: "i4", text: "Call from a 'Bank' asking for your PIN", category: "ATTACK" }
    ],
    categories: ["SAFE", "ATTACK", "ATTACK (Bot)"],
    scoreValue: 10,
    feedback: {
      explanation: "Silent calls are often bots 'verifying' that your number is active so they can sell it to other scammers.",
      proTip: "If you don't recognize a number, let it go to voicemail. Real people will leave a message.",
      redFlags: ["Robocalls", "Vishing indicators"]
    }
  }
];
