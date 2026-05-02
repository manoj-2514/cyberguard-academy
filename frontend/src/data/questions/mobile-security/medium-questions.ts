import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "mob_med_m1",
    type: "MCQ",
    topic: "Mobile Device Management (MDM)",
    questionText: "What is the primary benefit of 'Mobile Device Management' (MDM) for a company?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "To read your private text messages" },
      { id: "b", key: "B", text: "To remotely wipe company data if a device is lost or stolen" },
      { id: "c", key: "C", text: "To make your phone charge faster" },
      { id: "d", key: "D", text: "To track your exact location 24/7" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "MDM allows IT teams to enforce passcodes, encrypt devices, and delete sensitive company info remotely if the device leaves the employee's possession.",
      proTip: "MDM is about protecting 'Company Data', not spying on your personal life.",
      redFlags: ["Unmanaged corporate devices"]
    }
  },
  {
    id: "mob_med_o1",
    type: "ORDER",
    topic: "Lost Device Protocol",
    questionText: "Order the steps you should take if you lose your work phone.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Try calling/locating it using 'Find My Device' from another machine" },
      { id: "o2", text: "Immediately report the loss to your IT Security department" },
      { id: "o3", text: "Remotely wipe the device (if possible)" },
      { id: "o4", text: "Change the passwords for all accounts logged into that device" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "Reporting it quickly is the most important step so IT can lock out your accounts.",
      proTip: "Every minute the device is 'out there' is a minute an attacker could be trying to bypass your lock screen.",
      redFlags: ["Delayed reporting of lost assets"]
    }
  }
];

export const hardQuestions: Question[] = [
  {
    id: "mob_hard_o1",
    type: "OPEN_TEXT",
    topic: "Jailbreaking & Rooting Risks",
    questionText: "Explain why 'Jailbreaking' (iOS) or 'Rooting' (Android) a mobile device makes it significantly more vulnerable to malware, even if the user is careful.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Jailbreaking removes the OS 'Sandbox'—the security layer that prevents one app from seeing or stealing data from another. It allows apps to run with 'Root' (Admin) privileges, meaning malware can record your screen, steal passwords, and bypass encryption without you ever knowing.",
      proTip: "A jailbroken device is an 'Open House' for hackers.",
      redFlags: ["Compromised device integrity"]
    }
  },
  {
    id: "mob_hard_f1",
    type: "FILL_BLANK",
    topic: "Mobile Exploits",
    questionText: "Complete the technical analysis of a mobile attack.",
    scenario: {},
    blanks: [
      { id: "f1", textBefore: "A 'Zero-Click' exploit like ", correctAnswer: "Pegasus", textAfter: " is dangerous because it infects a phone without the user ever clicking a link." },
      { id: "f2", textBefore: "Attackers can also use fake cell towers, known as ", correctAnswer: "Stingrays", textAfter: ", to intercept calls and location data." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Advanced mobile attacks bypass the need for 'Social Engineering' and target vulnerabilities in the device's hardware or OS.",
      proTip: "Rebooting your phone daily can sometimes clear out simple non-persistent mobile malware.",
      redFlags: ["Zero-click vulnerabilities"]
    }
  }
];
