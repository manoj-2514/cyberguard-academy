import type { SimulationModuleDef } from './types';

export const physicalSecurityModule: SimulationModuleDef = {
  id: 'physical-security',
  title: 'Physical Security',
  category: 'Physical & Operations',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'ps-q1',
      type: 'JUDGE',
      topic: 'Tailgating',
      questionText: 'You badge into the secure server room. A person carrying two large boxes of server equipment asks you to hold the door for them. Is holding the door a security violation?',
      scenario: {
        senderName: 'Scenario',
        senderEmail: '',
        subject: 'Server Room Entry',
        body: 'Location: 3rd Floor Datacenter\nSituation: You swipe your badge. The light turns green. A delivery person with boxes asks you to hold the door because their hands are full.',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "Yes, it's a violation" in this context
      feedbackExplanation: 'Holding the door (tailgating) is a critical security violation. Attackers intentionally carry large boxes to exploit human politeness. Everyone must swipe their own badge.',
      proTip: 'If someone\'s hands are full, offer to hold their boxes so they can swipe their own badge. If they belong there, they will appreciate the help.',
      readMoreLink: 'modules/physical-security#tailgating',
      scoreValue: 10
    },
    {
      id: 'ps-q2',
      type: 'CLASSIFY',
      topic: 'Physical Behaviors',
      questionText: 'Classify these 8 physical security behaviors.',

      items: [
        { id: 'i1', label: 'Plugging a random USB drive found in the lobby into your laptop' },
        { id: 'i2', label: 'Leaving sensitive printouts on the communal printer overnight' },
        { id: 'i3', label: 'Locking your computer screen (Win+L) every time you stand up' },
        { id: 'i4', label: 'Writing your password on a sticky note under your keyboard' },
        { id: 'i5', label: 'Letting someone follow you through a secure turnstile without badging' },
        { id: 'i6', label: 'Challenging an unbadged stranger wandering the secure floor' },
        { id: 'i7', label: 'Propping open the secure fire exit door to get some fresh air' },
        { id: 'i8', label: 'Taking a selfie at your desk where your monitor shows client data' }
      ],
      correctMapping: {
        'i1': 'c-critical', // USB Drop attack
        'i2': 'c-medium',   // Information leakage
        'i3': 'c-best',
        'i4': 'c-violation',
        'i5': 'c-critical', // Tailgating into secure area
        'i6': 'c-best',
        'i7': 'c-critical', // Bypassing physical perimeter
        'i8': 'c-medium'    // Information leakage via social media
      },
      feedbackExplanation: 'Physical security is just as important as digital security. Bypassing physical controls (tailgating, propping doors, plugging unknown USBs) can lead to total network compromise.',
      proTip: 'A $10 million firewall cannot stop an attacker who simply walks through an open door and plugs a device directly into your server.',
      readMoreLink: 'modules/physical-security#behaviors',
      scoreValue: 10
    },
    {
      id: 'ps-q3',
      type: 'ORDER',
      topic: 'Physical Breach Anatomy',
      questionText: 'Arrange the sequence of how a physical breach combined with a USB attack occurs.',
      steps: [
        { id: 's1', label: 'Attacker tailgates behind an employee during the morning rush' },
        { id: 's2', label: 'Attacker finds an empty desk or conference room' },
        { id: 's3', label: 'Attacker plugs a malicious "Rubber Ducky" USB into an unlocked PC' },
        { id: 's4', label: 'The USB rapidly executes keystrokes to install a backdoor' },
        { id: 's5', label: 'Attacker leaves the building unchallenged' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Attackers exploit tailgating to bypass the perimeter, find an unsecured endpoint (like an unlocked PC), deploy rapid attack hardware (USB), and leave before being noticed.',
      proTip: 'This entire attack sequence can take less than 60 seconds. This is why locking your screen when you walk away is critical.',
      readMoreLink: 'modules/physical-security#usb-attacks',
      scoreValue: 10
    },
    {
      id: 'ps-q4',
      type: 'OPEN_TEXT',
      topic: 'Challenging Strangers',
      questionText: 'You see a stranger in business attire wandering your secure floor without a visitor badge. They look lost. What do you do?',
      minWords: 15,
      expectedKeywords: ['challenge', 'ask', 'help', 'escort', 'badge', 'security', 'reception', 'report'],
      feedbackExplanation: 'You should politely challenge them by asking, "Can I help you find someone?" If they don\'t have a badge, you must escort them back to reception or security immediately.',
      proTip: 'Attackers wear business attire or carry clipboards specifically to blend in and discourage people from questioning them. Always challenge the lack of a badge, regardless of attire.',
      readMoreLink: 'modules/physical-security#challenging',
      scoreValue: 10
    },
    {
      id: 'ps-q5',
      type: 'MCQ',
      topic: 'Physical Controls',
      questionText: 'What is the primary purpose of a "mantrap" (or security vestibule) in physical security?',
      options: [
        { id: 'opt1', text: 'To capture and detain active shooters.' },
        { id: 'opt2', text: 'To prevent tailgating by ensuring only one person can pass through two interlocking doors at a time.' },
        { id: 'opt3', text: 'To scan employees for stolen USB drives.' },
        { id: 'opt4', text: 'To protect the building from environmental hazards like fire or gas.' }
      ],
      correctOptionId: 'opt2',
      feedbackExplanation: 'A mantrap requires the first door to close and lock before the second door will open, making it physically impossible for a second person to tailgate behind an authorized user.',
      proTip: 'Mantraps are typically used for high-security areas like datacenters. Never attempt to force two people through a mantrap cycle.',
      readMoreLink: 'modules/physical-security#controls',
      scoreValue: 10
    },
    {
      id: 'ps-q6',
      type: 'SPOT',
      topic: 'Office Vulnerabilities',
      questionText: 'Spot the 4 physical security violations in this office scenario.',
      scenario: {
        senderName: 'Security Audit',
        senderEmail: '',
        subject: 'Floor Plan Review',
        body: '[Visual representation: An office desk area. A computer screen is unlocked with no one sitting there. A whiteboard has a list of passwords. A sensitive document is in the recycling bin. A back door is propped open with a chair.]',
        url: ''
      },
      hotspots: [
        { id: 'hs-screen', x: 20, y: 35, label: 'Unlocked, unattended computer screen' },
        { id: 'hs-whiteboard', x: 20, y: 45, label: 'Passwords written on the whiteboard' },
        { id: 'hs-trash', x: 20, y: 55, label: 'Sensitive documents in regular recycling (Not shredded)' },
        { id: 'hs-door', x: 20, y: 65, label: 'Secure door propped open with a chair' },
        { id: 'hs-plant', x: 20, y: 25, label: 'Office Plant (Normal)' }
      ],
      correctSpotIds: ['hs-screen', 'hs-whiteboard', 'hs-trash', 'hs-door'],
      feedbackExplanation: 'Unlocked screens, exposed passwords (whiteboarding), improper document disposal (dumpster diving), and propped doors are all critical physical vulnerabilities.',
      proTip: 'Implement a "Clean Desk Policy" where all sensitive documents and media must be locked away when you leave for the day.',
      readMoreLink: 'modules/physical-security#clean-desk',
      scoreValue: 10
    },
    {
      id: 'ps-q7',
      type: 'ORDER',
      topic: 'Incident Response',
      questionText: 'Sequence the steps to respond to and report a tailgating incident.',
      steps: [
        { id: 'a1', label: 'Observe someone following another employee through a secure door without badging' },
        { id: 'a2', label: 'Politely challenge the individual ("Excuse me, you need to swipe your badge")' },
        { id: 'a3', label: 'If they refuse or become hostile, do not engage physically' },
        { id: 'a4', label: 'Note their physical description and direction of travel' },
        { id: 'a5', label: 'Immediately call physical security to report the unauthorized entry' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Always challenge politely first (it might be a mistake). If they refuse, prioritize your safety: do not fight them. Note their description and call security instantly.',
      proTip: 'Never put yourself in physical danger to protect company property. Let trained security personnel handle hostile individuals.',
      readMoreLink: 'modules/physical-security#tailgate-response',
      scoreValue: 10
    }
  ]
};
