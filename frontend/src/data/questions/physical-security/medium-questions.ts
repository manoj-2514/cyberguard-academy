import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "phys-med-1",
    type: "JUDGE",
    topic: "Unauthorized Access",
    questionText: "You notice a person you don't recognize inside the restricted Server Room. They are wearing a tool belt but have no visible ID badge. When they see you, they avoid eye contact and keep working. Is this a security breach?",
    scenario: {
      body: "SCENARIO: The server room door was slightly ajar. The person is unplugging a network cable from a core switch."
    },
    isFake: true,
    feedback: {
      explanation: "Restricted areas require visible authorization. Unbadged individuals working on critical infrastructure are a 'Red' level threat.",
      proTip: "In secure areas, 'Challenge Everyone'. If you aren't comfortable, alert security immediately from a safe distance.",
      redFlags: ["No visible ID", "Avoidant behavior", "Unauthorized hardware manipulation"]
    },
    scoreValue: 10
  },
  {
    id: "phys-med-2",
    type: "MCQ",
    topic: "Physical Controls",
    questionText: "What is the primary purpose of a 'Mantrap' (or security airlock) in a high-security facility?",
    scenario: {
      body: "A building has a double-door entry system where the first door must close before the second one opens."
    },
    options: [
      { id: "a", key: "A", text: "To make the entrance look more impressive and modern." },
      { id: "b", key: "B", text: "To prevent tailgating by ensuring only one person passes at a time." },
      { id: "c", key: "C", text: "To conserve air conditioning and energy." },
      { id: "d", key: "D", text: "To provide a space for visitors to wait for their escorts." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Mantraps are physical controls designed to neutralize tailgating and allow security to isolate an unauthorized person between two locked doors.",
      proTip: "Technical controls (badge readers) work best when paired with physical controls (mantraps/turnstiles).",
      redFlags: ["Tailgating attempts", "Forced entry"]
    },
    scoreValue: 10
  },
  {
    id: "phys-med-3",
    type: "FILL_BLANK",
    topic: "Security Terminology",
    questionText: "Fill in the blanks to complete the description of physical security categories.",
    scenario: {
      body: "Physical security is often divided into three main control categories."
    },
    blanks: [
      { id: "b1", textBefore: "1. ", textAfter: " controls include policies and guard training.", correctAnswer: "Administrative" },
      { id: "b2", textBefore: "2. ", textAfter: " controls include locks, fences, and mantraps.", correctAnswer: "Physical" },
      { id: "b3", textBefore: "3. ", textAfter: " controls include CCTV, biometrics, and alarm systems.", correctAnswer: "Technical" }
    ],
    feedback: {
      explanation: "A robust security posture requires a 'Defense in Depth' approach across Administrative, Physical, and Technical domains.",
      proTip: "Controls should follow the 'Deter, Detect, Delay' philosophy.",
      redFlags: ["Over-reliance on a single control type"]
    },
    scoreValue: 10
  },
  {
    id: "phys-med-4",
    type: "ORDER",
    topic: "Incident Response",
    questionText: "You find a suspicious device (looks like a small Wi-Fi router) plugged into a hidden wall jack in the conference room. Order the steps of the correct response.",
    scenario: {
      body: "The device is blinking and has a small antenna. It is clearly not company hardware."
    },
    orderItems: [
      { id: "step1", text: "Immediately notify the Security/IT department." },
      { id: "step2", text: "Take a photo of the device and its location." },
      { id: "step3", text: "Do NOT touch or unplug the device yourself (to preserve evidence/avoid tampering)." },
      { id: "step4", text: "Secure the room to prevent others from entering until help arrives." }
    ],
    correctOrderIds: ["step2", "step1", "step4", "step3"],
    feedback: {
      explanation: "Found devices should be treated as active 'Rogue Access Points'. Documentation and notification are key before any physical interaction.",
      proTip: "Metadata in your photo (time/location) can help investigators correlate logs with the device's installation.",
      redFlags: ["Unauthorized hardware", "Hidden placement", "Active data transmission"]
    },
    scoreValue: 10
  },
  {
    id: "phys-med-5",
    type: "MCQ",
    topic: "RFID Security",
    questionText: "An attacker uses a 'Long-Range RFID Reader' to copy your badge data while you are standing in a crowded elevator. Which technology would have best prevented this?",
    scenario: {
      body: "Your badge is a standard 125kHz proximity card."
    },
    options: [
      { id: "a", key: "A", text: "A plastic badge holder with a clip." },
      { id: "b", key: "B", text: "An RFID-blocking sleeve or 'Faraday' wallet." },
      { id: "c", key: "C", text: "Printing 'Do Not Copy' on the badge." },
      { id: "d", key: "D", text: "Laminating the badge with extra thick plastic." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "RFID signals can be intercepted through clothing and bags. Faraday cages (metal mesh) block the radio waves entirely.",
      proTip: "Modern badges (HID iClass/MIFARE) use encryption, but physical shielding is still a valid secondary defense.",
      redFlags: ["Unknown person standing very close", "Suspicious devices in hands or bags"]
    },
    scoreValue: 10
  },
  {
    id: "phys-med-6",
    type: "CLASSIFY",
    topic: "Control Types",
    questionText: "Classify these physical security measures into their primary function.",
    scenario: {
      body: "Controls can Deter, Detect, or Delay an attacker."
    },
    items: [
      { id: "i1", text: "Warning Signs ('CCTV in use')", category: "Deter" },
      { id: "i2", text: "Motion Sensors", category: "Detect" },
      { id: "i3", text: "Reinforced Steel Doors", category: "Delay" },
      { id: "i4", text: "Spiked Fencing", category: "Deter" },
      { id: "i5", text: "Silent Alarm to Police", category: "Detect" }
    ],
    categories: ["Deter", "Detect", "Delay"],
    feedback: {
      explanation: "Deterrence discourages the attempt; Detection notifies of an attempt; Delaying gives responders time to arrive.",
      proTip: "If your Delay time is longer than your Response time, you are secure.",
      redFlags: ["Missing detection layer"]
    },
    scoreValue: 10
  },
  {
    id: "phys-med-7",
    type: "MCQ",
    topic: "Audit Logs",
    questionText: "During a weekly audit of the badge access logs, you see your own ID badge was used to enter the building at 2:00 AM last Sunday, but you were at home sleeping. What is the most likely scenario?",
    scenario: {
      body: "You checked your wallet and your badge is still there."
    },
    options: [
      { id: "a", key: "A", text: "The system had a glitch and recorded the wrong time." },
      { id: "b", key: "B", text: "A cleaning person used your badge by mistake." },
      { id: "c", key: "C", text: "Your badge was cloned (copied) by an attacker previously." },
      { id: "d", key: "D", text: "You were sleepwalking and went to work." }
    ],
    correctOptionId: "c",
    feedback: {
      explanation: "If you still have the physical badge, but logs show usage elsewhere, the card data was likely 'skimmed' or 'cloned' using a hidden reader.",
      proTip: "Treat anomalies in access logs as a 'Lost Badge' event and revoke the ID immediately.",
      redFlags: ["Impossible travel/usage", "Off-hours activity", "Cloning signatures"]
    },
    scoreValue: 10
  }
];
