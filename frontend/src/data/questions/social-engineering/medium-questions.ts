import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "soc_med_m1",
    type: "MCQ",
    topic: "Spear Phishing",
    questionText: "What distinguishes 'Spear Phishing' from regular Phishing?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "It uses a larger email" },
      { id: "b", key: "B", text: "It is highly targeted at a specific person or role using personal information" },
      { id: "c", key: "C", text: "It only happens on social media" },
      { id: "d", key: "D", text: "It is sent by a government agency" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Spear phishing is much more dangerous because the attacker mentions your real name, your coworkers, or projects you are working on to gain trust.",
      proTip: "If an email knows 'too much' about you, it might be a spear phishing attempt.",
      redFlags: ["Highly personalized lures"]
    }
  },
  {
    id: "soc_med_s1",
    type: "SPOT",
    topic: "Smishing (SMS Phishing)",
    questionText: "Identify the red flags in this SMS message.",
    scenario: {
      body: "GOV-ALRT: You have an unclaimed tax refund of $452.10. Visit http://refund-status-gov.info to claim now. Failure to claim within 2 hours results in forfeiture."
    },
    redFlags: [
      { id: "rf1", x: 50, y: 35, label: "Fake URL", explanation: "Government sites end in .gov, not .info. This is a fake site designed to steal your info." },
      { id: "rf2", x: 50, y: 75, label: "Extreme Urgency", explanation: "The 2-hour deadline is an artificial 'High Pressure' tactic." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Smishing is effective because people tend to trust text messages more than emails.",
      proTip: "Never click links in text messages from unknown numbers.",
      redFlags: ["Urgency", "Suspicious link"]
    }
  },
  {
    id: "soc_med_o1",
    type: "ORDER",
    topic: "Social Engineering Attack Lifecycle",
    questionText: "Order the stages of a professional social engineering attack.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Reconnaissance (Finding info about the target)" },
      { id: "o2", text: "Establish Trust (Contacting and building a rapport)" },
      { id: "o3", text: "Exploitation (Asking for the info or action)" },
      { id: "o4", text: "Exit (Closing the interaction without suspicion)" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "A good social engineer spends most of their time on 'Reconnaissance' before they ever talk to you.",
      proTip: "Be careful what you post publicly; it is the fuel for the Reconnaissance stage.",
      redFlags: ["Pretexting", "Rapport building"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "soc_hard_o1",
    type: "OPEN_TEXT",
    topic: "Cialdini's Principles",
    questionText: "Social engineers often use 'Scarcity' and 'Authority' to manipulate people. Describe a scenario where an attacker uses the principle of 'Reciprocity' (doing something for you so you feel obligated to do something for them) to gain network access.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "An attacker might call a new employee, help them fix a 'fake' IT problem they created, and then ask for their password 'just to verify the fix' as a favor. The employee feels obligated to help because the 'IT guy' was so nice.",
      proTip: "Kindness is a tool for social engineers. Professional boundaries are your best defense.",
      redFlags: ["Manipulative reciprocity"]
    }
  },
  {
    id: "soc_hard_f1",
    type: "FILL_BLANK",
    topic: "Whaling",
    questionText: "Complete the definition of high-value phishing.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "A phishing attack targeted specifically at C-suite executives (CEOs, CFOs) is called ", correctAnswer: "whaling", textAfter: "." },
      { id: "f2", textBefore: "These attacks often use the pretext of a ", correctAnswer: "legal subpoena", textAfter: " or business crisis to force immediate action." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Whaling targets the people with the most power and access in an organization.",
      proTip: "Executives should have specialized, high-security training and protocols.",
      redFlags: ["Executive impersonation"]
    }
  }
];
