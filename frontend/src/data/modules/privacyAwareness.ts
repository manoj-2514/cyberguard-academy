import type { SimulationModuleDef } from './types';

export const privacyAwarenessModule: SimulationModuleDef = {
  id: 'privacy-awareness',
  title: 'Privacy Awareness',
  category: 'Data & Compliance',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'pa-q1',
      type: 'JUDGE',
      topic: 'GDPR Principles',
      questionText: 'Does this data collection practice comply with GDPR?',
      scenario: {
        senderName: 'Marketing Team',
        senderEmail: '',
        subject: 'New Newsletter Form',
        body: 'We updated the website sign-up form. When users enter their email for the monthly newsletter, we now also require them to provide their home address, date of birth, and gender, just in case we want to send them birthday mailers later.',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "No, not compliant"
      feedbackExplanation: 'This violates the GDPR principle of "Data Minimization". You should only collect the absolute minimum data required for the stated purpose. A newsletter only requires an email address.',
      proTip: 'Never collect data "just in case." It increases your compliance burden and risk without immediate business value.',
      readMoreLink: 'modules/privacy-awareness#data-minimization',
      scoreValue: 10
    },
    {
      id: 'pa-q2',
      type: 'CLASSIFY',
      topic: 'Data Types',
      questionText: 'Classify these 8 data types under privacy frameworks (like GDPR/CCPA).',

      items: [
        { id: 'i1', label: 'Racial or ethnic origin' },
        { id: 'i2', label: 'An employee\'s name and direct email address' },
        { id: 'i3', label: 'Aggregated website bounce rates (no IP addresses)' },
        { id: 'i4', label: 'A company\'s publicly listed support phone number' },
        { id: 'i5', label: 'Biometric data (fingerprints, facial recognition)' },
        { id: 'i6', label: 'A customer\'s home address' },
        { id: 'i7', label: 'Health or medical records' },
        { id: 'i8', label: 'A B2B contract outlining software licensing terms' }
      ],
      correctMapping: {
        'i1': 'c-sensitive', // Special category data
        'i2': 'c-personal',
        'i3': 'c-anonymous',
        'i4': 'c-business',
        'i5': 'c-sensitive',
        'i6': 'c-personal',
        'i7': 'c-sensitive',
        'i8': 'c-business'
      },
      feedbackExplanation: 'Personal Data identifies an individual. Sensitive Personal Data (SPI/Special Category) includes race, health, biometrics, and religion, and requires extreme protection and explicit consent to process.',
      proTip: 'If data is truly anonymized (irreversibly stripped of identifiers), GDPR no longer applies to it.',
      readMoreLink: 'modules/privacy-awareness#data-types',
      scoreValue: 10
    },
    {
      id: 'pa-q3',
      type: 'ORDER',
      topic: 'Breach Handling',
      questionText: 'Arrange the steps for handling a personal data breach under GDPR.',
      steps: [
        { id: 's1', label: 'Identify and contain the data breach immediately' },
        { id: 's2', label: 'Assess the risk to the rights and freedoms of the affected individuals' },
        { id: 's3', label: 'Notify the supervisory authority (Regulator) within 72 hours if there is risk' },
        { id: 's4', label: 'Communicate the breach to the affected individuals (if the risk is high)' },
        { id: 's5', label: 'Document the facts of the breach, effects, and remedial actions taken' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Under GDPR, you have exactly 72 hours from becoming aware of a reportable breach to notify the regulator. You must assess the risk first to determine if notification is required.',
      proTip: 'The 72-hour clock does not pause for weekends or holidays. Incident response teams must be ready 24/7.',
      readMoreLink: 'modules/privacy-awareness#breach-handling',
      scoreValue: 10
    },
    {
      id: 'pa-q4',
      type: 'OPEN_TEXT',
      topic: 'Right to Erasure',
      questionText: 'A user emails requesting deletion of all their personal data under the "Right to be Forgotten" (Erasure). Walk through your high-level process.',
      minWords: 15,
      expectedKeywords: ['verify', 'identity', 'systems', 'backups', 'third-party', 'legal', 'retention', 'delete'],
      feedbackExplanation: 'First, securely verify their identity. Then, check if legal retention requirements (like tax laws) override the request. If not, delete their data from all systems, backups, and notify third-party vendors to do the same.',
      proTip: 'The Right to Erasure is not absolute. For example, you cannot delete transaction data if the IRS requires you to keep it for 7 years.',
      readMoreLink: 'modules/privacy-awareness#right-to-erasure',
      scoreValue: 10
    },
    {
      id: 'pa-q5',
      type: 'MCQ',
      topic: 'Purpose Limitation',
      questionText: 'What does "Purpose Limitation" mean under modern privacy laws?',
      options: [
        { key: 'A', text: 'You can only store data for a limited amount of time.' },
        { key: 'B', text: 'You can only collect data for a specific, explicitly stated purpose and cannot use it for unrelated reasons later.' },
        { key: 'C', text: 'You must limit who inside the company can access the data.' },
        { key: 'D', text: 'You can only process data within the European Union.' }
      ],
      correctOptionId: 'B',
      feedbackExplanation: 'If you collect a phone number for "Two-Factor Authentication," you cannot legally use that phone number later to send marketing text messages. That is a violation of Purpose Limitation.',
      proTip: 'If the business wants to use existing data for a new purpose, you must usually go back and obtain new, explicit consent from the users.',
      readMoreLink: 'modules/privacy-awareness#purpose-limitation',
      scoreValue: 10
    },
    {
      id: 'pa-q6',
      type: 'SPOT',
      topic: 'Consent Violations',
      questionText: 'Spot the 4 privacy violations in this company data collection form.',
      scenario: {
        senderName: 'Web Form',
        senderEmail: '',
        subject: 'Checkout Page',
        body: 'Name: [______]\nEmail: [______]\n[X] By checking this box, I agree to the Terms, Privacy Policy, and signing up for marketing emails from 50 partner companies.\n[ ] Opt-out of allowing us to sell your data to brokers.\nSubmit Button.',
        url: ''
      },
      hotspots: [
        { id: 'hs-bundled', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Bundled consent (Terms + Marketing)' },
        { id: 'hs-precheck', position: { top: '35%', left: '10%', width: '5%', height: '10%' }, label: 'Pre-checked consent box' },
        { id: 'hs-partners', position: { top: '45%', left: '20%', width: '10%', height: '10%' }, label: 'Vague 3rd-party sharing (50 partners)' },
        { id: 'hs-optout', position: { top: '55%', left: '20%', width: '10%', height: '10%' }, label: 'Opt-out instead of Opt-in' },
        { id: 'hs-name', position: { top: '25%', left: '20%', width: '10%', height: '10%' }, label: 'Collecting Name (Normal)' }
      ],
      correctSpotIds: ['hs-bundled', 'hs-precheck', 'hs-partners', 'hs-optout'],
      feedbackExplanation: 'Under GDPR, consent must be freely given, specific, informed, and unambiguous. Pre-checked boxes, bundled requests (T&Cs + Marketing), forced opt-outs, and vague third-party sharing violate these rules.',
      proTip: 'Users must take a positive action (checking an empty box) to give consent. Silence or inactivity does not constitute consent.',
      readMoreLink: 'modules/privacy-awareness#consent',
      scoreValue: 10
    },
    {
      id: 'pa-q7',
      type: 'ORDER',
      topic: 'Privacy Impact Assessment',
      questionText: 'Sequence the steps to conduct a Privacy Impact Assessment (PIA/DPIA) for a new software project.',
      steps: [
        { id: 'a1', label: 'Identify the need for a PIA (e.g., handling sensitive data or new tech)' },
        { id: 'a2', label: 'Map the data flows: What is collected, where it goes, and who sees it' },
        { id: 'a3', label: 'Identify privacy and security risks associated with those data flows' },
        { id: 'a4', label: 'Identify controls to mitigate the risks (e.g., encryption, anonymization)' },
        { id: 'a5', label: 'Document the assessment and integrate the controls into the project build' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'A PIA is designed to bake "Privacy by Design" into a project before it launches. You map the data, find the risks, design the mitigations, and then build the software securely.',
      proTip: 'Doing a PIA after the software is already built is highly expensive and often requires rewriting large portions of the codebase.',
      readMoreLink: 'modules/privacy-awareness#pia',
      scoreValue: 10
    }
  ]
};
