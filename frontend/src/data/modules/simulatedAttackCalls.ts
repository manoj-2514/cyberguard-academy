import type { SimulationModuleDef } from './types';

export const simulatedAttackCallsModule: SimulationModuleDef = {
  id: 'simulated-attack-calls',
  title: 'Simulated Attack Calls',
  category: 'Emerging Threats',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'sac-q1',
      type: 'JUDGE',
      topic: 'Vishing Voice Mail',
      questionText: 'Is this voicemail from a bank legitimate or a vishing attempt?',
      scenario: {
        senderName: 'Voicemail',
        senderEmail: '+1 (800) 555-0100',
        subject: 'Urgent: Fraud Alert',
        body: '"This is the Chase Bank Fraud Department. We have detected suspicious activity on your debit card. Please call us back immediately at our direct secure line, 888-555-9999, to verify your recent transactions. Failure to do so will result in an immediate account freeze."',
        url: ''
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'This is a classic vishing (voice phishing) voicemail. It uses extreme urgency ("immediate account freeze") and directs you to call a specific, unverified "direct secure line" rather than the number on the back of your card.',
      proTip: 'Never call back a number provided in a voicemail. Always look up the official customer service number on the company\'s website or the back of your bank card.',
      readMoreLink: 'modules/simulated-attack-calls#voicemail-vishing',
      scoreValue: 10
    },
    {
      id: 'sac-q2',
      type: 'CLASSIFY',
      topic: 'Call Scenarios',
      questionText: 'Classify these 8 call scenarios.',

      items: [
        { id: 'i1', label: 'A live caller claiming to be IT asking for your password' },
        { id: 'i2', label: 'A text message claiming a FedEx package is delayed with a link' },
        { id: 'i3', label: 'An automated robocall saying your car warranty has expired' },
        { id: 'i4', label: 'Your manager calling from their known extension asking about a project' },
        { id: 'i5', label: 'A text message from "Bank" asking you to reply with your PIN' },
        { id: 'i6', label: 'A live caller claiming you owe the IRS money and must pay in gift cards' },
        { id: 'i7', label: 'A call from your credit card company asking if you made a recent purchase (requiring only a Yes/No)' },
        { id: 'i8', label: 'A caller pretending to be the CEO demanding a wire transfer' }
      ],
      correctMapping: {
        'i1': 'c-vishing',
        'i2': 'c-smishing',
        'i3': 'c-scam', // Mass blast, not targeted social engineering
        'i4': 'c-legit',
        'i5': 'c-smishing',
        'i6': 'c-scam',
        'i7': 'c-legit', // Fraud detection usually only asks Yes/No
        'i8': 'c-vishing' // CEO fraud
      },
      feedbackExplanation: 'Vishing uses voice to steal credentials or money. Smishing uses text. General scams are mass-dialed annoyances. Legitimate calls (like fraud alerts) will rarely ask you to provide sensitive data over the phone.',
      proTip: 'If a caller demands payment via gift cards or Bitcoin, it is 100% a scam.',
      readMoreLink: 'modules/simulated-attack-calls#classifications',
      scoreValue: 10
    },
    {
      id: 'sac-q3',
      type: 'ORDER',
      topic: 'Vishing Anatomy',
      questionText: 'Arrange the sequence of how a vishing attack uses pretexting to gain system access.',
      steps: [
        { id: 's1', label: 'Attacker researches the company directory to find a new employee' },
        { id: 's2', label: 'Attacker spoofs the caller ID to look like the internal IT Helpdesk' },
        { id: 's3', label: 'Attacker calls the employee, claiming there is an issue with their email account' },
        { id: 's4', label: 'Attacker builds rapport and guides the employee to a fake login portal' },
        { id: 's5', label: 'Employee types their credentials, which the attacker captures' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Vishing relies heavily on pretexting (creating a fictional scenario). By targeting new employees and spoofing caller IDs, the attacker creates a believable illusion of authority.',
      proTip: 'Caller ID is easily spoofed using VoIP software. Never trust caller ID as proof of identity.',
      readMoreLink: 'modules/simulated-attack-calls#vishing-anatomy',
      scoreValue: 10
    },
    {
      id: 'sac-q4',
      type: 'OPEN_TEXT',
      topic: 'Handling Tech Support Scams',
      questionText: 'You receive a call from someone claiming to be "Microsoft Support" saying your PC is sending out virus alerts. Walk through exactly what you do.',
      minWords: 15,
      expectedKeywords: ['hang up', 'microsoft', 'never', 'call', 'report', 'it', 'disconnect'],
      feedbackExplanation: 'Hang up immediately. Microsoft will never call you unsolicited to fix your computer. Do not engage, do not argue, and do not follow any of their instructions. Report the call to your internal IT team.',
      proTip: 'Engaging with the scammer, even to mess with them, confirms your number is active and will result in more scam calls.',
      readMoreLink: 'modules/simulated-attack-calls#tech-support',
      scoreValue: 10
    },
    {
      id: 'sac-q5',
      type: 'MCQ',
      topic: 'Immediate Response',
      questionText: 'What is the best immediate response to an unexpected call asking for your credentials or MFA code?',
      options: [
        { key: 'A', text: 'Ask the caller for their employee ID number to verify them.' },
        { key: 'B', text: 'Give a fake password to see if they are a scammer.' },
        { key: 'C', text: 'Hang up immediately and contact the official helpdesk or the person via a known internal directory.' },
        { key: 'D', text: 'Keep them on the line while you trace their IP address.' }
      ],
      correctOptionId: 'C',
      feedbackExplanation: 'Hanging up and calling back via an official, verified channel completely destroys the vishing attack. Asking for an ID number is useless because an attacker will just give you a fake one.',
      proTip: 'The "Hang Up and Call Back" protocol is your absolute best defense against voice-based attacks.',
      readMoreLink: 'modules/simulated-attack-calls#immediate-response',
      scoreValue: 10
    },
    {
      id: 'sac-q6',
      type: 'SPOT',
      topic: 'Call Transcript Analysis',
      questionText: 'Spot the 4 vishing indicators in this call transcript.',
      scenario: {
        senderName: 'Call Recording Transcript',
        senderEmail: '',
        subject: 'Call ID: 99482',
        body: 'Caller: "Hi, this is Dave from Corporate IT. I see you just logged in."\nEmployee: "Yes, hi Dave."\nCaller: "Great. We are doing a silent security migration. I need you to confirm your current password so I don\'t lock you out of your account over the weekend. What is it?"\nEmployee: "Um, I don\'t think I should give that out."\nCaller: "If you don\'t, your account will be deleted by the automated system in 5 minutes and you\'ll have to explain to your boss why you can\'t work."\nEmployee: "Okay, it\'s Spring2024!"',
        url: ''
      },
      hotspots: [
        { id: 'hs-password', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Asking for password directly' },
        { id: 'hs-weekend', position: { top: '45%', left: '20%', width: '10%', height: '10%' }, label: 'Artificial urgency (Weekend lockout)' },
        { id: 'hs-threat', position: { top: '65%', left: '20%', width: '10%', height: '10%' }, label: 'Threatening the employee / Authority' },
        { id: 'hs-gave', position: { top: '75%', left: '20%', width: '10%', height: '10%' }, label: 'Employee actually gave the password' },
        { id: 'hs-greet', position: { top: '25%', left: '20%', width: '10%', height: '10%' }, label: 'Normal greeting' }
      ],
      correctSpotIds: ['hs-password', 'hs-weekend', 'hs-threat', 'hs-gave'],
      feedbackExplanation: 'IT will never ask for your password. The caller uses artificial urgency (weekend migration) and intimidation (explaining to your boss) to override the employee\'s hesitation.',
      proTip: 'Attackers frequently use anger or threats of professional consequences to force employees into compliance.',
      readMoreLink: 'modules/simulated-attack-calls#transcripts',
      scoreValue: 10
    },
    {
      id: 'sac-q7',
      type: 'ORDER',
      topic: 'Reporting Protocol',
      questionText: 'Sequence the steps to report and document a suspected vishing attempt.',
      steps: [
        { id: 'a1', label: 'Hang up the phone immediately when suspicious' },
        { id: 'a2', label: 'Document the caller\'s phone number, name given, and what they asked for' },
        { id: 'a3', label: 'Report the details to your IT Security or Helpdesk team out-of-band' },
        { id: 'a4', label: 'Security sends a company-wide alert about the specific pretext being used' },
        { id: 'a5', label: 'Security blocks the caller\'s number at the corporate PBX/phone system' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Terminate the threat, document the intel, report it, and then security can take action to protect the rest of the company from the same attacker.',
      proTip: 'Reporting is critical. If an attacker fails to phish you, they will simply call the next person on the directory until someone falls for it.',
      readMoreLink: 'modules/simulated-attack-calls#reporting',
      scoreValue: 10
    }
  ]
};
