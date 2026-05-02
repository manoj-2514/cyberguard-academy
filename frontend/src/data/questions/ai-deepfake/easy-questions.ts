import type { Question } from '../types';

export const easyQuestions: Question[] = [
  {
    id: "ai-easy-1",
    type: "JUDGE",
    topic: "Video Fraud",
    questionText: "You receive a video call from your CEO on a Friday afternoon. The video is a bit grainy and the CEO's mouth doesn't perfectly match the words. They ask you to 'urgently transfer $50,000 to a new supplier' because of a contract emergency. Is this a suspicious call?",
    scenario: {
      body: "SCENARIO: The CEO is usually very formal, but in this call, they seem unusually friendly and are using a slightly different tone."
    },
    isFake: true,
    feedback: {
      explanation: "This is a 'Deepfake' video attack. Attackers use AI to impersonate executives to authorize fraudulent transfers. The 'grainy' quality and lip-sync issues are common 'artifacts' of real-time deepfakes.",
      proTip: "If a video call involves money, ask a 'Check Question' that only the real person would know, or call them back on their known phone number.",
      redFlags: ["Lip-sync mismatch", "Grainy/Blurry video quality", "Urgent financial request"]
    },
    scoreValue: 10
  },
  {
    id: "ai-easy-2",
    type: "MCQ",
    topic: "Definitions",
    questionText: "What does the term 'Deepfake' refer to?",
    scenario: {
      body: "A news report is discussing the rise of synthetic media in cybercrime."
    },
    options: [
      { id: "a", key: "A", text: "A very long and complicated password." },
      { id: "b", key: "B", text: "A video or audio recording that has been convincingly altered or generated using Artificial Intelligence (AI)." },
      { id: "c", key: "C", text: "A fake website that looks like a real bank login page." },
      { id: "d", key: "D", text: "A type of virus that hides deep inside a computer's hard drive." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Deepfakes use 'Deep Learning' (a type of AI) to swap faces, clone voices, or generate entirely fake events that never happened.",
      proTip: "Deepfakes are becoming so realistic that human eyes alone can no longer reliably detect them.",
      redFlags: ["Synthetic media", "Face-swapping technology"]
    },
    scoreValue: 10
  },
  {
    id: "ai-easy-3",
    type: "JUDGE",
    topic: "Voice Cloning",
    questionText: "A call comes in from your manager's phone number. The voice sounds exactly like them, but the way they speak is monotone, they don't respond to your jokes, and there is a slight 'robotic' echo. They ask you to read out a 2FA code you just received. Should you trust this caller?",
    scenario: {
      body: "SCENARIO: You were not expecting a call, and your manager is usually very talkative and energetic."
    },
    isFake: true,
    feedback: {
      explanation: "This is 'Voice Cloning' (Vishing using AI). Attackers only need a few seconds of a person's voice (from LinkedIn or YouTube) to clone it perfectly. The monotone rhythm and lack of social interaction are signs of an AI script.",
      proTip: "Never share 2FA codes over the phone, even if the person sounds exactly like someone you know.",
      redFlags: ["Monotone/Robotic voice", "Lack of social context", "Request for security codes"]
    },
    scoreValue: 10
  },
  {
    id: "ai-easy-4",
    type: "SPOT",
    topic: "Visual Artifacts",
    questionText: "Identify the three visual 'glitches' in this AI-generated photo of a person that prove it is a deepfake.",
    scenario: {
      body: "PHOTO ANALYSIS: 1. The person has three rows of teeth when they smile. 2. Their earrings are different shapes on each side. 3. The background is unnaturally blurred and 'melts' into their hair."
    },
    redFlags: [
      { id: "rf1", x: 50, y: 40, label: "Unnatural Anatomy", explanation: "AI often struggles with complex anatomy like teeth, fingers, and eyes, creating 'extra' parts." },
      { id: "rf2", x: 20, y: 50, label: "Asymmetry", explanation: "Look for mismatched jewelry, ears, or glasses frames. AI often generates each side of a face independently." },
      { id: "rf3", x: 80, y: 60, label: "Edge Blending", explanation: "AI has trouble defining where a person's hair ends and the background begins, leading to 'halo' or 'melting' effects." }
    ],
    feedback: {
      explanation: "While AI is improving, it still leaves subtle clues known as 'Artifacts'. Training your eyes to find these can save you from fraud.",
      proTip: "Check the eyes—AI often has trouble making both eyes reflect light in the same way (catchlights).",
      redFlags: ["Anatomical errors", "Mismatched accessories", "Blurry hair edges"]
    },
    scoreValue: 10
  },
  {
    id: "ai-easy-5",
    type: "MCQ",
    topic: "Gen-AI Privacy",
    questionText: "You are using a public AI tool (like ChatGPT) to help summarize a meeting. Which of the following is the most secure way to handle sensitive company data?",
    scenario: {
      body: "The meeting notes contain client names, project budgets, and a secret product launch date."
    },
    options: [
      { id: "a", key: "A", text: "Paste the entire transcript; the AI needs full context to be accurate." },
      { id: "b", key: "B", text: "Remove all names, specific dates, and financial figures (anonymize) before pasting." },
      { id: "c", key: "C", text: "Paste it but tell the AI 'Please keep this secret and don't tell anyone'." },
      { id: "d", key: "D", text: "Use the AI only for personal tasks, never for work." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Data pasted into public AI tools is often used to train future models. This means your 'secret' could be revealed to other users later.",
      proTip: "Assume anything you type into an AI is 'Public'. Only use approved, 'Enterprise' versions of AI for sensitive work.",
      redFlags: ["Data leakage via training", "Lack of privacy in public models"]
    },
    scoreValue: 10
  },
  {
    id: "ai-easy-6",
    type: "CLASSIFY",
    topic: "Content Verification",
    questionText: "Classify these features into 'Likely Real' or 'Potential Deepfake Indicator'.",
    scenario: {
      body: "How to tell if a video message is authentic."
    },
    items: [
      { id: "i1", text: "Natural, frequent eye blinking", category: "Likely Real" },
      { id: "i2", text: "Shadows that don't match the light source", category: "Potential Deepfake Indicator" },
      { id: "i3", text: "Perfectly consistent skin texture without pores", category: "Potential Deepfake Indicator" },
      { id: "i4", text: "Background noises like traffic or wind", category: "Likely Real" },
      { id: "i5", text: "Voice has a 'metallic' or 'flat' quality", category: "Potential Deepfake Indicator" }
    ],
    categories: ["Likely Real", "Potential Deepfake Indicator"],
    feedback: {
      explanation: "Deepfakes often look 'too perfect' (uncanny valley) or have physical inconsistencies like mismatched shadows.",
      proTip: "Ask the person to turn their head to the side. Deepfakes often struggle with 'Profile' views compared to front-facing ones.",
      redFlags: ["Uncanny skin texture", "Inconsistent shadows", "Robotic voice"]
    },
    scoreValue: 10
  },
  {
    id: "ai-easy-7",
    type: "MCQ",
    topic: "Safety Protocols",
    questionText: "What is a 'Safe Word' or 'Challenge Phrase' protocol and why is it useful against AI deepfakes?",
    scenario: {
      body: "You want to protect your family or team from urgent 'emergency' calls from imposters."
    },
    options: [
      { id: "a", key: "A", text: "A secret password used to login to the AI software." },
      { id: "b", key: "B", text: "A pre-arranged word or question that only real family/team members know, used to verify identity during a suspicious call." },
      { id: "c", key: "C", text: "A word that turns off the computer automatically." },
      { id: "d", key: "D", text: "The name of the antivirus program you use." }
    ],
    correctOptionId: "b",
    feedback: {
      explanation: "Because AI can mimic looks and voices, 'Secret Knowledge' is the only reliable way to verify identity. If the caller doesn't know the safe word, they are an imposter.",
      proTip: "Choose a safe word that is easy to remember but not something you've ever posted on social media.",
      redFlags: ["Failure to answer a challenge question", "Urgent request for money/help"]
    },
    scoreValue: 10
  }
];
