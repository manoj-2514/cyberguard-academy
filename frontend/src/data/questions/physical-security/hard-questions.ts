import type { Question } from '../types';

export const hardQuestions: Question[] = [
  {
    id: "phys-hard-1",
    type: "JUDGE",
    topic: "Biometric Bypass",
    questionText: "An attacker places a high-resolution photo or a 3D-printed 'gummy' fingerprint over a scanner to bypass a biometric lock. Is this a common real-world vulnerability for older or low-cost biometric systems?",
    scenario: {
      body: "SCENARIO: A facility uses simple capacitive fingerprint readers without 'liveness detection' (checking for pulse or blood flow)."
    },
    isFake: false,
    feedback: {
      explanation: "Many early biometric scanners lack 'Liveness Detection', making them susceptible to high-quality replicas. This is a significant physical security weakness.",
      proTip: "Combine biometrics with another factor, like a PIN or a badge, to prevent single-point failures.",
      redFlags: ["Lack of liveness detection", "Standard capacitive sensors only"]
    },
    scoreValue: 10
  },
  {
    id: "phys-hard-2",
    type: "MCQ",
    topic: "Signal Intelligence",
    questionText: "Which standard defines the security requirements to prevent the 'spillage' of electromagnetic signals that could be captured and reconstructed by an attacker (known as van Eck Phreaking)?",
    scenario: {
      body: "A high-security government office needs to ensure that monitor signals and keyboard keystrokes cannot be intercepted from outside the building."
    },
    options: [
      { id: "a", key: "A", text: "ISO 27001" },
      { id: "b", key: "B", text: "NIST SP 800-53" },
      { id: "c", key: "C", text: "TEMPEST" },
      { id: "d", key: "D", text: "PCI-DSS" }
    ],
    correctOptionId: "c",
    feedback: {
      explanation: "TEMPEST is a U.S. National Security Agency (NSA) specification referring to investigations and studies of compromising emanations (spurious signals).",
      proTip: "Use shielded cables and 'Faraday Cages' for equipment processing Top Secret data.",
      redFlags: ["Unshielded monitors", "Signal spillage near perimeter"]
    },
    scoreValue: 10
  },
  {
    id: "phys-hard-3",
    type: "SPOT",
    topic: "Data Center Risks",
    questionText: "Identify the three critical physical security vulnerabilities in this Data Center floor plan.",
    scenario: {
      body: "DESCRIPTION: 1. A shared HVAC duct that connects the public hallway to the server room. 2. A glass window in the server room overlooking the parking lot. 3. A master key kept in a glass 'break-in-case-of-emergency' box in the reception area."
    },
    redFlags: [
      { id: "rf1", x: 30, y: 10, label: "Shared HVAC Duct", explanation: "Large ducts can be used as a physical bypass of walls and doors. They must be fitted with security grilles/bars." },
      { id: "rf2", x: 90, y: 40, label: "Exterior Glass Window", explanation: "Server rooms should never have exterior windows. They allow visual reconnaissance and provide a weak point for forced entry." },
      { id: "rf3", x: 10, y: 80, label: "Master Key Exposure", explanation: "Keys for critical areas should be in a secure, audited key management system, not accessible to the public." }
    ],
    feedback: {
      explanation: "Advanced physical security requires thinking about unconventional entry paths like vents, ceilings, and visual lines of sight.",
      proTip: "Perform a 'Red Team' physical assessment to find these hidden paths.",
      redFlags: ["HVAC vulnerability", "Visual spillage", "Poor key management"]
    },
    scoreValue: 10
  },
  {
    id: "phys-hard-4",
    type: "OPEN_TEXT",
    topic: "Shoulder Surfing",
    questionText: "Explain the risks of 'Shoulder Surfing' in public spaces like airports and describe two technical or procedural ways to mitigate this risk.",
    scenario: {
      body: "You are working on a confidential project proposal while waiting for your flight at a busy gate."
    },
    feedback: {
      explanation: "Shoulder surfing allows attackers to capture passwords, sensitive data, or personal info simply by watching over your shoulder or using high-res cameras.",
      proTip: "Procedural: Be aware of your surroundings and sit with your back to a wall. Technical: Use a privacy screen filter.",
      redFlags: ["High-traffic environment", "Visible sensitive data", "Surveillance cameras"]
    },
    scoreValue: 10
  },
  {
    id: "phys-hard-5",
    type: "MCQ",
    topic: "Environmental Controls",
    questionText: "Which type of fire suppression system is most appropriate for a high-value Server Room to prevent accidental water damage while ensuring effectiveness?",
    scenario: {
      body: "A sensor detects smoke. We need to suppress the fire without destroying the electrical components of the servers."
    },
    options: [
      { id: "a", key: "A", text: "Wet-pipe sprinkler system" },
      { id: "b", key: "B", text: "Deluge system" },
      { id: "c", key: "C", text: "Clean Agent (Gas-based) system like FM-200 or Novec 1230" },
      { id: "d", key: "D", text: "Foam-based extinguisher" }
    ],
    correctOptionId: "c",
    feedback: {
      explanation: "Clean agents suppress fire by removing heat or oxygen without leaving residue or causing electrical shorts like water or foam.",
      proTip: "Use 'Pre-action' water systems as a fallback, which require two separate triggers to prevent accidental discharge.",
      redFlags: ["Water damage risk", "Residue on hardware"]
    },
    scoreValue: 10
  },
  {
    id: "phys-hard-6",
    type: "CLASSIFY",
    topic: "Asset Criticality",
    questionText: "Classify these assets based on the level of physical hardening required (High, Medium, Low).",
    scenario: {
      body: "Prioritize resources for physical protection."
    },
    items: [
      { id: "i1", text: "HSM (Hardware Security Module) for Root Keys", category: "High" },
      { id: "i2", text: "Backup Tapes (Encrypted)", category: "Medium" },
      { id: "i3", text: "Public Marketing Brochures", category: "Low" },
      { id: "i4", text: "Core Database Servers", category: "High" },
      { id: "i5", text: "Employee Breakroom Supplies", category: "Low" }
    ],
    categories: ["High", "Medium", "Low"],
    feedback: {
      explanation: "Assets that hold the 'Keys to the Kingdom' (HSMs, Root Servers) require the highest level of physical isolation and monitoring.",
      proTip: "Use the 'Rule of Two' for high-criticality assets—no one person should have access alone.",
      redFlags: ["Undifferentiated security levels"]
    },
    scoreValue: 10
  },
  {
    id: "phys-hard-7",
    type: "OPEN_TEXT",
    topic: "Design Exercise",
    questionText: "Design a 3-layer physical entry process for a Tier 4 Data Center. Describe the specific controls you would use at the Perimeter, the Building Entry, and the Server Room door.",
    scenario: {
      body: "Goal: Zero unauthorized entries and full audit trail."
    },
    feedback: {
      explanation: "A robust design uses layered security. Perimeter: Fencing and bollards. Building: Mantrap with badge + biometric. Server Room: Biometric + PIN + Logged escort.",
      proTip: "Always include 'Anti-Passback' logic in your electronic locks to prevent a badge from being used twice to enter without an exit record.",
      redFlags: ["Single point of failure", "Lack of audit trail"]
    },
    scoreValue: 10
  }
];
