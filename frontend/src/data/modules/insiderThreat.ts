import type { SimulationModuleDef } from './types';

export const insiderThreatModule: SimulationModuleDef = {
  id: 'insider-threat',
  title: 'Insider Threat',
  category: 'Compliance & Risk',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'it-q1',
      type: 'JUDGE',
      topic: 'Behavioral Indicators',
      questionText: 'Is this employee behavior a potential insider threat indicator?',
      scenario: {
        senderName: 'Observation',
        senderEmail: '',
        subject: 'Behavioral Report',
        body: 'A software engineer who recently received a negative performance review has started logging into the VPN at 3:00 AM on weekends and accessing massive amounts of customer data that are not related to their current project.',
        url: ''
      },
      correctAnswer: 'REAL', // "REAL" meaning "Yes, it is a threat" in this context
      feedbackExplanation: 'Yes, this is a major red flag. The combination of a negative life event (bad review), unusual access times (3 AM weekends), and accessing data outside their role scope strongly suggests data exfiltration or sabotage preparation.',
      proTip: 'Insider threats often display behavioral precursors before the technical attack occurs. Pay attention to sudden changes in behavior and access patterns.',
      readMoreLink: 'modules/insider-threat#indicators',
      scoreValue: 10
    },
    {
      id: 'it-q2',
      type: 'CLASSIFY',
      topic: 'Threat Classification',
      questionText: 'Classify these 8 scenarios into the correct insider threat category.',

      items: [
        { id: 'i1', label: 'Selling customer lists to a competitor' },
        { id: 'i2', label: 'Emailing unencrypted sensitive data to a personal Gmail account to work from home' },
        { id: 'i3', label: 'Installing unapproved freeware to "help get the job done faster"' },
        { id: 'i4', label: 'Downloading approved project files to an encrypted company laptop' },
        { id: 'i5', label: 'Leaving a laptop unlocked at a coffee shop while using the restroom' },
        { id: 'i6', label: 'Planting a logic bomb in the codebase before resigning' },
        { id: 'i7', label: 'Sharing network passwords with a trusted coworker' },
        { id: 'i8', label: 'Requesting access to a database required for a new assigned task' }
      ],
      correctMapping: {
        'i1': 'c-malicious',
        'i2': 'c-negligent', // Often done without malicious intent, but highly risky
        'i3': 'c-policy',    // Shadow IT
        'i4': 'c-normal',
        'i5': 'c-negligent',
        'i6': 'c-malicious',
        'i7': 'c-policy',    // Password sharing is a strict violation, though often not explicitly malicious
        'i8': 'c-normal'
      },
      feedbackExplanation: 'Malicious insiders intentionally cause harm. Negligent insiders cause risk through carelessness. Policy violators break rules for convenience. Knowing the difference changes how HR and IT respond.',
      proTip: 'Most insider data breaches are actually caused by negligent insiders making mistakes, not malicious spies.',
      readMoreLink: 'modules/insider-threat#classification',
      scoreValue: 10
    },
    {
      id: 'it-q3',
      type: 'ORDER',
      topic: 'Data Theft Anatomy',
      questionText: 'Arrange the typical sequence of an insider data theft incident.',
      steps: [
        { id: 's1', label: 'A triggering event occurs (e.g., passed over for promotion, financial stress)' },
        { id: 's2', label: 'Employee begins testing boundaries (accessing files they shouldn\'t)' },
        { id: 's3', label: 'Employee hoards data in a staging area (e.g., hidden folder or local drive)' },
        { id: 's4', label: 'Employee exfiltrates the data (e.g., USB drive or personal cloud)' },
        { id: 's5', label: 'Employee resigns or is terminated' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Data theft is rarely spontaneous. It follows a pathway: a stressor triggers the idea, they test what they can access, gather the data, steal it, and then leave the organization.',
      proTip: 'Monitoring for "data hoarding" (large amounts of internal data being copied to local folders) is a key defense against departing employees stealing IP.',
      readMoreLink: 'modules/insider-threat#theft-anatomy',
      scoreValue: 10
    },
    {
      id: 'it-q4',
      type: 'OPEN_TEXT',
      topic: 'Reporting Observations',
      questionText: 'You notice a colleague, whose last day is tomorrow, downloading thousands of confidential design files to a personal USB drive. What do you do?',
      minWords: 15,
      expectedKeywords: ['report', 'manager', 'security', 'it', 'hr', 'confidential', 'immediate', 'do not confront'],
      feedbackExplanation: 'Do not confront the employee yourself, as this could cause them to panic, destroy evidence, or accelerate the theft. Immediately report the observation to your manager, IT Security, or HR.',
      proTip: 'Time is critical. Security can remotely lock the account or review logs, but only if they are alerted before the employee leaves the building.',
      readMoreLink: 'modules/insider-threat#reporting',
      scoreValue: 10
    },
    {
      id: 'it-q5',
      type: 'MCQ',
      topic: 'Preventative Controls',
      questionText: 'Which security principle is most effective at limiting the damage an insider threat can cause?',
      options: [
        { id: 'opt1', text: 'Mandatory password changes every 30 days' },
        { id: 'opt2', text: 'The Principle of Least Privilege (PoLP)' },
        { id: 'opt3', text: 'Installing antivirus on all endpoints' },
        { id: 'opt4', text: 'Running annual phishing simulations' }
      ],
      correctOptionId: 'opt2',
      feedbackExplanation: 'Least Privilege ensures employees only have access to the exact data they need to do their jobs. If an employee turns malicious, they can only steal or destroy what they have access to.',
      proTip: 'If you change roles within the company, your old access rights should be revoked. Accumulating access over time creates massive insider risk.',
      readMoreLink: 'modules/insider-threat#least-privilege',
      scoreValue: 10
    },
    {
      id: 'it-q6',
      type: 'SPOT',
      topic: 'Log Analysis',
      questionText: 'Spot the 4 indicators of a potential insider threat in this access log.',
      scenario: {
        senderName: 'SIEM System',
        senderEmail: '',
        subject: 'Access Logs: User J.Smith',
        body: '09:00 - Login successful (IP: Internal)\n14:30 - Accessed Project_X_Source_Code (Authorized)\n23:45 - Login successful (IP: Unknown VPN)\n23:50 - Attempted access to HR_Payroll_DB (Access Denied)\n23:55 - Downloaded 50GB from Project_X_Source_Code\n00:10 - Connected USB Mass Storage Device',
        url: ''
      },
      hotspots: [
        { id: 'hs-time', x: 20, y: 45, label: 'Login at 23:45 (Outside normal hours)' },
        { id: 'hs-denied', x: 20, y: 55, label: 'Attempting to access unauthorized Payroll DB' },
        { id: 'hs-download', x: 20, y: 65, label: 'Massive 50GB data download' },
        { id: 'hs-usb', x: 20, y: 75, label: 'Connecting USB storage immediately after download' },
        { id: 'hs-normal', x: 20, y: 35, label: 'Normal authorized access' }
      ],
      correctSpotIds: ['hs-time', 'hs-denied', 'hs-download', 'hs-usb'],
      feedbackExplanation: 'Late night access, snooping in unauthorized areas (HR DB), mass downloads, and connecting external storage form a textbook data exfiltration pattern.',
      proTip: 'Context is everything. Downloading 50GB during the day to a secure server might be normal; doing it at midnight to a USB is a critical alert.',
      readMoreLink: 'modules/insider-threat#log-analysis',
      scoreValue: 10
    },
    {
      id: 'it-q7',
      type: 'ORDER',
      topic: 'Reporting Protocol',
      questionText: 'Sequence the steps for reporting a suspected insider threat safely and securely.',
      steps: [
        { id: 'a1', label: 'Observe the suspicious behavior and document facts (times, dates, actions)' },
        { id: 'a2', label: 'Avoid confronting the individual or investigating on your own' },
        { id: 'a3', label: 'Contact the designated Insider Threat team, Security, or HR securely' },
        { id: 'a4', label: 'Provide your documented facts objectively without making accusations' },
        { id: 'a5', label: 'Maintain strict confidentiality and do not discuss it with coworkers' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Document objectively, do not play detective, report it to the right authorities, stick to the facts, and keep quiet to avoid tipping off the suspect or spreading rumors.',
      proTip: 'Use secure, out-of-band communication (like a phone call to the security officer) to report, as a technical insider might be monitoring your emails.',
      readMoreLink: 'modules/insider-threat#reporting-protocol',
      scoreValue: 10
    }
  ]
};
