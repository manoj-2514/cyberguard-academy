import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "phys-easy-1",
    type: "JUDGE",
    topic: "Tailgating",
    questionText: "A person carrying heavy boxes is following you into the secure office area. They don't scan their badge but smile and ask you to 'hold the door'. Is this a secure situation?",
    scenario: {
      body: "SCENARIO: You are entering the main lobby. A man in a delivery uniform is right behind you with large boxes, preventing him from reaching his badge. He says 'Could you grab that for me, thanks!'"
    },
    isFake: true,
    feedback: {
      explanation: "This is a classic 'Tailgating' or 'Piggybacking' attack. Attackers use social pressure and politeness to bypass physical access controls.",
      proTip: "Politely ask the person to set the boxes down and scan their badge, or wait for security to assist them. 'One badge, one entry' is a non-negotiable rule.",
      redFlags: ["Lack of badge scan", "Using heavy objects as a distraction", "Emotional pressure (politeness)"]
    },
    scoreValue: 10
  },
  {
    id: "phys-easy-2",
    type: "MCQ",
    topic: "Badge Security",
    questionText: "What is the correct way to handle your employee ID badge when leaving the office building for lunch?",
    scenario: {
      body: "You are heading out to a crowded local cafe for lunch with colleagues."
    },
    options: [
      { id: "a", key: "A", text: "Keep it hanging on your lanyard so everyone knows you work for a prestigious firm." },
      { id: "b", key: "B", text: "Tuck it into your pocket or bag so it is not visible to the public." },
      { id: "c", key: "C", text: "Leave it on the table at the cafe while you go to get napkins." },
      { id: "d", key: "D", text: "Give it to the waiter to hold so you don't lose it." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Wearing your badge in public makes you a target for 'Badge Cloning' (using long-range RFID readers) and identifies your employer to social engineers.",
      proTip: "Your badge is a security key. Treat it like a credit card—keep it hidden when not in use.",
      redFlags: ["Visible company logo in public", "RFID exposure", "Target profiling"]
    },
    scoreValue: 10
  },
  {
    id: "phys-easy-3",
    type: "JUDGE",
    topic: "Clean Desk Policy",
    questionText: "You see a colleague's desk with their laptop open, logged in, and a sticky note with 'Admin@123' attached to the monitor while they are away at a 30-minute meeting. Is this a violation of security policy?",
    scenario: {
      body: "The desk is in an open-plan office where guests and contractors occasionally walk by."
    },
    isFake: true,
    feedback: {
      explanation: "This violates the 'Clean Desk Policy'. An unattended, unlocked computer is a massive risk, and writing passwords on sticky notes is a critical failure.",
      proTip: "Always lock your screen (Win+L or Cmd+Ctrl+Q) even if you are leaving for just a minute.",
      redFlags: ["Unlocked workstation", "Visible password on paper", "Unattended sensitive area"]
    },
    scoreValue: 10
  },
  {
    id: "phys-easy-4",
    type: "SPOT",
    topic: "Office Hazards",
    questionText: "Identify the three physical security risks in this office workspace scenario.",
    scenario: {
      body: "Look closely at the workstation description: 1. A USB drive labeled 'Q4 Bonuses' left on the desk. 2. A printer tray full of uncollected 'Confidential' HR reports. 3. An open window on the ground floor next to a server rack."
    },
    redFlags: [
      { id: "rf1", x: 20, y: 30, label: "Unattended USB", explanation: "A labeled USB drive is a bait for 'USB Drop' attacks or simple data theft." },
      { id: "rf2", x: 50, y: 70, label: "Printed PII", explanation: "Sensitive documents left in public printer trays can be easily stolen or photographed." },
      { id: "rf3", x: 80, y: 20, label: "Open Ground Window", explanation: "Physical entry points near critical infrastructure must be locked and monitored." }
    ],
    feedback: {
      explanation: "Physical security requires constant vigilance over hardware, paper, and entry points.",
      proTip: "If you find a USB drive, never plug it in. Hand it over to the Security team.",
      redFlags: ["USB Baiting", "Document leakage", "Entry point vulnerability"]
    },
    scoreValue: 10
  },
  {
    id: "phys-easy-5",
    type: "MCQ",
    topic: "Disposal",
    questionText: "How should you dispose of a printed document that contains a customer's phone number and address?",
    scenario: {
      body: "You no longer need the printed delivery slip for an order you just processed."
    },
    options: [
      { id: "a", key: "A", text: "Crumple it up and throw it in the regular blue recycling bin." },
      { id: "b", key: "B", text: "Tear it into four pieces and put it in the kitchen trash can." },
      { id: "c", key: "C", text: "Place it in the designated 'Secure Shredding' bin." },
      { id: "d", key: "D", text: "Leave it on the desk for the cleaning crew to handle." }
    ],
    correctOptionId: "c",
    feedback: {
      explanation: "Documents containing PII (Personally Identifiable Information) must be cross-cut shredded to prevent 'Dumpster Diving' attacks.",
      proTip: "If in doubt, shred it. Never put anything with names, numbers, or company data in a public bin.",
      redFlags: ["Dumpster diving risk", "PII exposure", "Improper disposal"]
    },
    scoreValue: 10
  },
  {
    id: "phys-easy-6",
    type: "CLASSIFY",
    topic: "Zoning",
    questionText: "Categorize these areas into 'Public' (anyone can enter) or 'Secure' (requires badge/escort).",
    scenario: {
      body: "Drag the locations to their correct security zone."
    },
    items: [
      { id: "i1", text: "Main Lobby / Reception", category: "Public" },
      { id: "i2", text: "Server Room", category: "Secure" },
      { id: "i3", text: "HR Filing Room", category: "Secure" },
      { id: "i4", text: "Visitor Parking Lot", category: "Public" },
      { id: "i5", text: "CEO's Private Office", category: "Secure" }
    ],
    categories: ["Public", "Secure"],
    feedback: {
      explanation: "Security Zoning prevents unauthorized people from reaching sensitive assets even if they manage to enter the building.",
      proTip: "The more sensitive the data, the more 'Zones' an attacker should have to pass through.",
      redFlags: ["Lack of internal boundaries", "Unrestricted access to servers"]
    },
    scoreValue: 10
  },
  {
    id: "phys-easy-7",
    type: "MCQ",
    topic: "Social Engineering",
    questionText: "A person in a 'Tech Support' t-shirt arrives at your desk saying they need to 'update the firmware' on your workstation immediately. What do you do?",
    scenario: {
      body: "You didn't receive any email about maintenance, and the person has a visitor badge, not an employee badge."
    },
    options: [
      { id: "a", key: "A", text: "Let them work; firmware updates are important for security." },
      { id: "b", key: "B", text: "Ask them to wait, then call the official IT Helpdesk to verify their identity and the task." },
      { id: "c", key: "C", text: "Ask them for their business card and then let them start." },
      { id: "d", key: "D", text: "Tell them to hurry up because you have a meeting." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Physical social engineering often involves impersonating maintenance or support staff to gain direct access to hardware.",
      proTip: "Trust but Verify. Real IT staff will never mind you calling the helpdesk to confirm their identity.",
      redFlags: ["Unscheduled maintenance", "Visitor badge for internal work", "Pressure to act 'immediately'"]
    },
    scoreValue: 10
  }
];
