import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "ai-med-1",
    type: "JUDGE",
    topic: "Detection Techniques",
    questionText: "If you suspect a video caller is a deepfake, you should ask them to turn their head slowly to a 90-degree side profile. Is this an effective real-time test?",
    scenario: {
      body: "SCENARIO: Most current real-time deepfake models are trained on front-facing data and often 'break' or glitch when the face profile is shown."
    },
    isFake: false,
    feedback: {
      explanation: "This is a highly effective 'Stress Test'. Deepfake overlays often struggle to maintain a perfect fit on a 3D head when it moves to extreme angles.",
      proTip: "Other tests: Ask them to wave their hand in front of their face. The hand 'occlusion' often causes the AI mask to flicker.",
      redFlags: ["Glitching during head rotation", "Face mask disappearing when occluded"]
    },
    scoreValue: 10
  },
  {
    id: "ai-med-2",
    type: "MCQ",
    topic: "LLM Phishing",
    questionText: "How has Large Language Model (LLM) technology changed the 'traditional' red flags of phishing emails?",
    scenario: {
      body: "An attacker uses an AI to write 10,000 unique phishing emails in 50 different languages."
    },
    options: [
      { id: "a", key: "A", text: "Emails now have more spelling mistakes because AI is still learning." },
      { id: "b", key: "B", text: "AI can generate perfectly written, professional emails without any grammar errors, removing a key detection sign." },
      { id: "c", key: "C", text: "AI emails are always very short and easy to spot." },
      { id: "d", key: "D", text: "AI cannot write emails; it only generates images." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "LLMs like GPT-4 can write with perfect grammar and professional tone. The classic 'Look for typos' advice is no longer reliable in the age of AI.",
      proTip: "Focus on the 'Intent' and 'Urgency' rather than the 'Grammar'. Check the sender's address and the link destination.",
      redFlags: ["Perfect grammar in unexpected requests", "Highly personalized content"]
    },
    scoreValue: 10
  },
  {
    id: "ai-med-3",
    type: "FILL_BLANK",
    topic: "AI Terminology",
    questionText: "Fill in the blanks with the correct AI security terms.",
    scenario: {
      body: "Understanding the tech helps in defending against it."
    },
    blanks: [
      { id: "b1", textBefore: "1. ", textAfter: " are the primary AI architecture used to create deepfakes by pitting two networks against each other.", correctAnswer: "GANs" },
      { id: "b2", textBefore: "2. ", textAfter: " refers to an AI 'mistake' where it confidently generates false information.", correctAnswer: "Hallucination" },
      { id: "b3", textBefore: "3. ", textAfter: " is the process of trying to bypass an AI's safety filters by using specific text triggers.", correctAnswer: "Jailbreaking" }
    ],
    feedback: {
      explanation: "GAN (Generative Adversarial Network) is the engine of deepfakes. Hallucinations are a risk when using AI for research. Jailbreaking is a common attack against AI assistants.",
      proTip: "Always verify AI-generated 'Facts'—hallucinations can look very convincing.",
      redFlags: ["Confidently stated false facts", "Bypassed AI safety filters"]
    },
    scoreValue: 10
  },
  {
    id: "ai-med-4",
    type: "ORDER",
    topic: "Incident Response",
    questionText: "Order the steps of the correct response to an 'Emergency' call from a family member (who sounds exactly like them) claiming they are in trouble and need money immediately.",
    scenario: {
      body: "You suspect it might be an AI voice clone."
    },
    orderItems: [
      { id: "step1", text: "Stay calm and do not send money immediately." },
      { id: "step2", text: "Ask a 'Secret Question' or for the 'Safe Word' you previously agreed on." },
      { id: "step3", text: "If they can't answer, hang up and call the family member back on their known number." },
      { id: "step4", text: "If they answer correctly but it's still suspicious, ask for details only they would know (e.g., 'What did we eat for dinner last Tuesday?')." }
    ],
    correctOrderIds: ["step1", "step2", "step4", "step3"],
    feedback: {
      explanation: "Validation is the priority. AI can clone a voice but it cannot (yet) read a person's private memories in real-time.",
      proTip: "If you don't have a safe word, ask about a fake event: 'Is this about the car accident you had yesterday?' (when you know they didn't have one). An AI script might say 'Yes, help me!'.",
      redFlags: ["Urgency/Panic", "Request for crypto/gift cards", "Failure to verify shared memories"]
    },
    scoreValue: 10
  },
  {
    id: "ai-med-5",
    type: "MCQ",
    topic: "Shadow AI",
    questionText: "What is the primary risk of 'Shadow AI' (employees using unauthorized AI tools for work)?",
    scenario: {
      body: "A developer uses a random 'Code Fixer' AI website they found to debug a sensitive proprietary algorithm."
    },
    options: [
      { id: "a", key: "A", text: "The AI might make the code too efficient." },
      { id: "b", key: "B", text: "Proprietary source code is uploaded to a third-party server, potentially leaking intellectual property (IP)." },
      { id: "c", key: "C", text: "The AI might ask for a higher salary." },
      { id: "d", key: "D", text: "The AI tool might not be compatible with Windows." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Using 'Free' AI tools often means you are the product. Your sensitive code or data becomes part of their database and could be used to train future models.",
      proTip: "Only use company-approved AI platforms that have 'Enterprise Privacy' agreements in place.",
      redFlags: ["Uploading IP to unknown websites", "Lack of clear AI usage policy"]
    },
    scoreValue: 10
  },
  {
    id: "ai-med-6",
    type: "CLASSIFY",
    topic: "Text Analysis",
    questionText: "Classify these text features as 'Potential AI-Generated' or 'Likely Human-Written'.",
    scenario: {
      body: "Detecting AI-written reports or emails."
    },
    items: [
      { id: "i1", text: "Overly repetitive use of 'transitional' words (Furthermore, Additionally)", category: "Potential AI-Generated" },
      { id: "i2", text: "Personal anecdotes or specific, niche cultural references", category: "Likely Human-Written" },
      { id: "i3", text: "Perfectly neutral, 'Bland' professional tone throughout", category: "Potential AI-Generated" },
      { id: "i4", text: "Occasional typos or inconsistent capitalization", category: "Likely Human-Written" },
      { id: "i5", text: "Summarizing complex ideas with zero emotional weight", category: "Potential AI-Generated" }
    ],
    categories: ["Potential AI-Generated", "Likely Human-Written"],
    feedback: {
      explanation: "AI text often lacks the 'Personality' and 'Inconsistency' of human writing. It tends to be overly structured and generic.",
      proTip: "AI detection tools use 'Perplexity' and 'Burstiness' to determine if text is synthetic.",
      redFlags: ["Repetitive structure", "Generic professional tone", "Lack of human nuance"]
    },
    scoreValue: 10
  },
  {
    id: "ai-med-7",
    type: "MCQ",
    topic: "Verification Tech",
    questionText: "What is the purpose of the 'Content Authenticity Initiative' (CAI) and 'C2PA' standards?",
    scenario: {
      body: "Tech companies are trying to combat deepfakes at the source."
    },
    options: [
      { id: "a", key: "A", text: "To make AI faster and more powerful." },
      { id: "b", key: "B", text: "To create a 'Digital Signature' or 'Nutritional Label' for media that proves where a photo or video came from and if it was edited by AI." },
      { id: "c", key: "C", text: "To ban all AI-generated content from the internet." },
      { id: "d", key: "D", text: "To charge users for every AI image they create." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "C2PA (Coalition for Content Provenance and Authenticity) allows cameras and software to embed 'Cryptographic Metadata' into files to verify their origin.",
      proTip: "In the future, your browser might show a 'Verified Human' badge on authentic videos.",
      redFlags: ["Media without provenance metadata"]
    },
    scoreValue: 10
  }
];
