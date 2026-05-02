import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "call_med_m1",
    type: "MCQ",
    topic: "AI Voice Cloning",
    questionText: "How can attackers use AI in a 'Vishing' (Voice Phishing) attack?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "To make the phone ring louder" },
      { id: "b", key: "B", text: "To clone the voice of a loved one or a CEO using only a 30-second sample from social media" },
      { id: "c", key: "C", text: "To automatically hang up on the police" },
      { id: "d", key: "D", text: "To change their location to another country" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "AI voice cloning is the new frontier of social engineering. It makes the 'Emergency Scam' much more believable.",
      proTip: "Establish a 'Safe Word' or 'Challenge Question' with your family that only you would know.",
      redFlags: ["Deepfake audio", "Voice impersonation"]
    }
  },
  {
    id: "call_med_o1",
    type: "ORDER",
    topic: "Vishing Defense Flow",
    questionText: "Order the steps for handling a suspicious call from your 'Bank'.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Listen to the request but provide NO sensitive info" },
      { id: "o2", text: "Hang up the phone immediately" },
      { id: "o3", text: "Wait 30 seconds (to ensure the line is clear)" },
      { id: "o4", text: "Call the bank using the number on your official debit/credit card" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "Some attackers can stay on the line even after you 'hang up', so waiting 30 seconds or using a different phone is the safest path.",
      proTip: "Banks will never ask for your PIN or full password over the phone.",
      redFlags: ["Pressure to stay on the line"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "call_hard_o1",
    type: "OPEN_TEXT",
    topic: "Strategic Vishing",
    questionText: "Describe how an attacker might use 'Vishing' combined with a 'Smishing' text to bypass a company's Multi-Factor Authentication (MFA) system.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "The attacker calls and pretends to be 'IT Support'. They tell you they are sending a 'verification code' to fix your account. They then trigger a real MFA request from the bank/app. When you receive the real code (Smishing) and read it back to them, they use it to log in as you.",
      proTip: "Never share an MFA code with anyone. Real IT support will never ask for it.",
      redFlags: ["MFA code harvesting"]
    }
  },
  {
    id: "call_hard_f1",
    type: "FILL_BLANK",
    topic: "Technical Vishing",
    questionText: "Complete the description of telecom attacks.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "The act of making hundreds of automated calls to overwhelm a target is known as a ", correctAnswer: "TDoS", textAfter: " (Telephony Denial of Service) attack." },
      { id: "f2", textBefore: "Attackers can use ", correctAnswer: "VoIP", textAfter: " services to cheaply launch thousands of calls from any location in the world." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Internet-based calling (VoIP) has made it extremely cheap for scammers to operate at a massive scale.",
      proTip: "Use 'Call Screening' features on your smartphone to block known spam numbers.",
      redFlags: ["Mass automated calling"]
    }
  }
];
