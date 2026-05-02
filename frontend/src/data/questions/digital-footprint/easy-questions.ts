import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "df_easy_j1",
    type: "JUDGE",
    topic: "Public Posts",
    questionText: "If you post a photo of your new 'Company ID' badge on LinkedIn, is that a security risk?",
    scenario: {},
    isFake: false,
    scoreValue: 10,
    feedback: {
      explanation: "Badges contain names, employee IDs, and barcodes that attackers can use to clone your badge or impersonate you.",
      proTip: "Never post photos of IDs, keys, or internal office layouts online.",
      redFlags: ["Oversharing professional data"]
    }
  },
  {
    id: "df_easy_m1",
    type: "MCQ",
    topic: "OSINT (Open Source Intelligence)",
    questionText: "What information can an attacker find about you just from your public Instagram/Facebook?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Nothing, it's just photos" },
      { id: "b", key: "B", text: "Your location, pet names (passwords), and interests (phishing lures)" },
      { id: "c", key: "C", text: "Only your name" },
      { id: "d", key: "D", text: "Your credit card number" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Social media is a goldmine for 'Reconnaissance'. Attackers use your personal details to build convincing phishing attacks.",
      proTip: "Set your profiles to 'Private' and be careful who you accept as a friend.",
      redFlags: ["Reconnaissance data source"]
    }
  },
  {
    id: "df_easy_s1",
    type: "SPOT",
    topic: "Geo-tagging",
    questionText: "Identify the hidden data risk in this photo of a home office.",
    scenario: {
      body: "[ Photo of a desk with a laptop ]\nMetadata: Date: 2024-05-01 | GPS: 28.6139° N, 77.2090° E | Device: iPhone 15"
    },
    redFlags: [
      { id: "rf1", x: 50, y: 30, label: "GPS Metadata", explanation: "Photos often store the exact location (latitude/longitude) where they were taken." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Metadata (EXIF data) can reveal your home address or office location even if it's not visible in the photo.",
      proTip: "Disable 'Location' for your camera app or use a metadata scrubber before posting.",
      redFlags: ["Location data leakage"]
    }
  },
  {
    id: "df_easy_c1",
    type: "CLASSIFY",
    topic: "Digital Trails",
    questionText: "Is this part of your 'Permanent' Digital Footprint?",
    scenario: {},
    items: [
      { id: "i1", text: "A deleted Tweet (archived by bots)", category: "PERMANENT" },
      { id: "i2", text: "An old blog post from 2010", category: "PERMANENT" },
      { id: "i3", text: "A private thought you never wrote down", category: "NOT DIGITAL" },
      { id: "i4", text: "A comment on a public news article", category: "PERMANENT" }
    ],
    categories: ["PERMANENT", "NOT DIGITAL"],
    scoreValue: 10,
    feedback: {
      explanation: "Once something is online, it is almost impossible to truly delete. Someone or something (like the Wayback Machine) likely has a copy.",
      proTip: "Think twice, post once. Assume everything you write is forever.",
      redFlags: ["Persistence of digital data"]
    }
  }
];
