import type { SimulationModuleDef } from './types';

export const socialEngineeringModule: SimulationModuleDef = {
  id: 'social-engineering',
  title: 'Social Engineering',
  category: 'Threat Awareness',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'se-q1',
      type: 'JUDGE',
      topic: 'Vishing (Voice Phishing)',
      questionText: 'You receive a call from "Microsoft Support" claiming your PC is sending out a virus. They ask you to install "remote diagnostic software" to fix it. Is this legitimate?',
      scenario: {
        senderName: 'Incoming Call',
        senderEmail: '+1 (800) 555-0199',
        subject: 'Microsoft Tech Support',
        body: '"Hello, this is Microsoft Windows support. Your computer is infected and sending errors to our servers. I need you to go to www.help-desk-remote.com and download our diagnostic tool immediately."',
        url: ''
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'Microsoft (and Apple) will never proactively call you to fix your computer. This is a classic tech support scam designed to gain remote access to your machine.',
      proTip: 'If you receive an unexpected tech support call, hang up immediately. Do not engage or try to argue with them.',
      readMoreLink: 'modules/social-engineering#vishing',
      scoreValue: 10
    },
    {
      id: 'se-q2',
      type: 'CLASSIFY',
      topic: 'Social Engineering Tactics',
      questionText: 'Classify these 8 scenarios into the correct social engineering tactic.',

      items: [
        { id: 'i1', label: 'Leaving a marked USB drive in the parking lot' },
        { id: 'i2', label: 'An email claiming your Netflix account is suspended' },
        { id: 'i3', label: 'A phone call from the "IRS" demanding immediate payment' },
        { id: 'i4', label: 'Creating a fake persona as an IT auditor to request logs' },
        { id: 'i5', label: 'Offering a free gift card if you click a link' },
        { id: 'i6', label: 'A text message (Smishing) about a package delivery' },
        { id: 'i7', label: 'Calling the helpdesk crying about losing a thesis file' },
        { id: 'i8', label: 'A fake HR email about Q3 bonuses' }
      ],
      correctMapping: {
        'i1': 'c-baiting',
        'i2': 'c-phishing',
        'i3': 'c-vishing',
        'i4': 'c-pretexting',
        'i5': 'c-baiting',
        'i6': 'c-phishing', // Smishing is a subset of phishing
        'i7': 'c-pretexting', // Using emotion/story
        'i8': 'c-phishing'
      },
      feedbackExplanation: 'Attackers use different channels (email, voice, physical) and psychological triggers (curiosity via baiting, sympathy via pretexting) to manipulate targets.',
      proTip: 'Regardless of the tactic, the goal is always the same: get you to bypass security protocols or hand over sensitive data.',
      readMoreLink: 'modules/social-engineering#tactics',
      scoreValue: 10
    },
    {
      id: 'se-q3',
      type: 'ORDER',
      topic: 'Pretexting Anatomy',
      questionText: 'Arrange the sequence of how a pretexting attack typically unfolds.',
      steps: [
        { id: 's1', label: 'Attacker researches the target company and employees on LinkedIn' },
        { id: 's2', label: 'Attacker invents a credible persona (e.g., external auditor)' },
        { id: 's3', label: 'Attacker contacts the target and establishes rapport' },
        { id: 's4', label: 'Attacker introduces an urgent or critical problem' },
        { id: 's5', label: 'Target bypasses policy to "help" solve the problem' },
        { id: 's6', label: 'Attacker extracts sensitive data or access credentials' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5', 's6'],
      feedbackExplanation: 'Pretexting relies on deep research to build a convincing persona. The attacker builds trust, creates an artificial crisis, and exploits the human desire to help.',
      proTip: 'Always verify a person\'s identity through a secondary, trusted channel before bypassing any security policy, no matter how urgent the situation seems.',
      readMoreLink: 'modules/social-engineering#pretexting',
      scoreValue: 10
    },
    {
      id: 'se-q4',
      type: 'OPEN_TEXT',
      topic: 'Handling Urgent Requests',
      questionText: 'An unknown caller claims to be the CEO\'s executive assistant. They say the CEO is locked out of a critical presentation and needs you to provide a temporary password immediately. How do you respond?',
      minWords: 15,
      expectedKeywords: ['verify', 'identity', 'policy', 'helpdesk', 'ticket', 'call back', 'internal', 'directory'],
      feedbackExplanation: 'You must refuse the immediate request politely but firmly, state that you must follow security policy, and verify their identity by calling them back using the official internal directory.',
      proTip: 'Attackers use authority figures (CEO/VP) to intimidate lower-level employees into bypassing rules. A strong security culture supports employees who say "no" to verify.',
      readMoreLink: 'modules/social-engineering#authority-attacks',
      scoreValue: 10
    },
    {
      id: 'se-q5',
      type: 'MCQ',
      topic: 'Psychological Triggers',
      questionText: 'What psychological principle does artificial urgency exploit in social engineering?',
      options: [
        { id: 'opt1', text: 'It makes the victim feel important and valued.' },
        { id: 'opt2', text: 'It forces the victim into "System 1" thinking (fast, emotional, automatic) rather than critical analysis.' },
        { id: 'opt3', text: 'It confuses the victim with excessive technical jargon.' },
        { id: 'opt4', text: 'It guarantees the attacker won\'t be traced.' }
      ],
      correctOptionId: 'opt2',
      feedbackExplanation: 'Urgency bypasses our logical, critical thinking (System 2) and triggers our fight-or-flight, emotional response (System 1), leading to hasty, poor decisions.',
      proTip: 'When you feel rushed or panicked by a request, treat it as a massive red flag. Take a deep breath and pause for 10 seconds before acting.',
      readMoreLink: 'modules/social-engineering#psychology',
      scoreValue: 10
    },
    {
      id: 'se-q6',
      type: 'SPOT',
      topic: 'Chat Phishing',
      questionText: 'Spot the 4 red flags in this Teams/Slack conversation.',
      scenario: {
        senderName: 'IT Helpdesk (External)',
        senderEmail: 'Guest User',
        subject: 'Direct Message',
        body: '[External] IT Helpdesk: Hi there. We are pushing a critical update to your machine.\nCan you confirm your current login password so I can authenticate the patch?\nIf we don\'t do this in the next 5 mins, your account will be locked out for the weekend.',
        url: ''
      },
      hotspots: [
        { id: 'hs-external', x: 20, y: 15, label: 'External/Guest Tag' },
        { id: 'hs-password', x: 20, y: 35, label: 'Asking for Password directly in chat' },
        { id: 'hs-urgency', x: 20, y: 55, label: 'Artificial Urgency / Threat of lockout' },
        { id: 'hs-process', x: 20, y: 45, label: 'Bypassing normal IT patching process' },
        { id: 'hs-greeting', x: 20, y: 25, label: 'Greeting (Normal)' }
      ],
      correctSpotIds: ['hs-external', 'hs-password', 'hs-urgency', 'hs-process'],
      feedbackExplanation: 'Legitimate IT will NEVER ask for your password. An external tag on an "internal" IT account, combined with threats of lockout, confirms this is an attacker.',
      proTip: 'Chat apps like Teams or Slack are increasingly targeted by attackers. Treat unexpected DMs just like unexpected emails.',
      readMoreLink: 'modules/social-engineering#chat-vectors',
      scoreValue: 10
    },
    {
      id: 'se-q7',
      type: 'ORDER',
      topic: 'Identity Verification',
      questionText: 'Arrange the steps to properly verify the identity of someone requesting sensitive access or information.',
      steps: [
        { id: 'a1', label: 'Politely inform the requester that you must follow security verification policies' },
        { id: 'a2', label: 'End the current communication (hang up the phone, close the chat)' },
        { id: 'a3', label: 'Look up the person\'s official contact information in the company directory' },
        { id: 'a4', label: 'Contact them via the official channel (call their office extension or send an internal email)' },
        { id: 'a5', label: 'Provide the information only after identity is confirmed via the official channel' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'The "hang up and call back" protocol is the gold standard for defeating vishing and pretexting. By initiating the communication yourself via known-good channels, you verify the identity.',
      proTip: 'If the requester gets angry that you are verifying their identity, it is highly likely they are an attacker.',
      readMoreLink: 'modules/social-engineering#verification',
      scoreValue: 10
    }
  ]
};
