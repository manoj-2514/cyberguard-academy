import type { SimulationModuleDef } from './types';

export const emailAnalysisModule: SimulationModuleDef = {
  id: 'email-analysis',
  title: 'Email Analysis',
  category: 'Threat Awareness',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'ea-q1',
      type: 'JUDGE',
      topic: 'Display Name Spoofing',
      questionText: 'Is this PayPal security alert legitimate or a phishing attempt?',
      scenario: {
        senderName: 'PayPal Security',
        senderEmail: 'support@paypaI-secure.com',
        subject: 'Action Required: Your account is temporarily restricted',
        body: 'Dear Customer,\n\nWe noticed unusual activity on your account. For your protection, we have temporarily restricted your access.\n\nPlease log in immediately to verify your identity and restore access.',
        url: 'https://paypal-secure.com/verify'
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'This is a phishing attempt. The sender email uses a lookalike domain ("paypaI-secure.com" instead of "paypal.com") with a capital "I" instead of an "l", and creates a false sense of urgency.',
      proTip: 'Always expand the sender details to check the actual email address, not just the display name.',
      readMoreLink: 'modules/email-analysis#display-name-spoofing',
      scoreValue: 10
    },
    {
      id: 'ea-q2',
      type: 'SPOT',
      topic: 'Identifying Red Flags',
      questionText: 'Select all 4 phishing indicators in this Gmail screenshot.',
      scenario: {
        senderName: 'Google Alerts',
        senderEmail: 'no-reply@googIe.alerts.net',
        subject: 'Critical Security Alert',
        body: 'Dear User,\n\nSomeone has your password. Click here to secure your account immediately.\n\nThanks,\nGoogle Team',
        url: 'http://my-secure-login.net/auth'
      },
      hotspots: [
        { id: 'hs-sender', x: 20, y: 10, label: 'Suspicious Sender Domain (googIe.alerts.net)' },
        { id: 'hs-greeting', x: 20, y: 35, label: 'Generic Greeting ("Dear User")' },
        { id: 'hs-urgency', x: 20, y: 45, label: 'Urgent/Threatening Language' },
        { id: 'hs-link', x: 20, y: 55, label: 'Suspicious HTTP Link' },
        { id: 'hs-subject', x: 20, y: 20, label: 'Subject Line (Decoy)' }
      ],
      correctSpotIds: ['hs-sender', 'hs-greeting', 'hs-urgency', 'hs-link'],
      feedbackExplanation: 'A classic phishing email contains a generic greeting, artificial urgency, a suspicious unencrypted link (HTTP), and a spoofed sender domain.',
      proTip: 'Hover over links to preview the URL before clicking, and be wary of emails that do not address you by name.',
      readMoreLink: 'modules/email-analysis#spotting-red-flags',
      scoreValue: 10
    },
    {
      id: 'ea-q3',
      type: 'ORDER',
      topic: 'Phishing Lifecycle',
      questionText: 'Arrange the steps of a typical phishing attack lifecycle in the correct chronological sequence.',
      steps: [
        { id: 's1', label: 'Attacker creates a deceptive landing page' },
        { id: 's2', label: 'Attacker harvests stolen credentials' },
        { id: 's3', label: 'Victim clicks the malicious link' },
        { id: 's4', label: 'Attacker sends the phishing email' },
        { id: 's5', label: 'Attacker researches the target (Reconnaissance)' },
        { id: 's6', label: 'Victim submits credentials to the fake site' }
      ],
      correctOrderIds: ['s5', 's1', 's4', 's3', 's6', 's2'],
      feedbackExplanation: 'An attack begins with reconnaissance and setup, followed by delivery, victim interaction, and finally credential harvesting.',
      proTip: 'Understanding the attack chain helps you identify where controls (like email filters or MFA) can break the sequence.',
      readMoreLink: 'modules/email-analysis#attack-lifecycle',
      scoreValue: 10
    },
    {
      id: 'ea-q4',
      type: 'OPEN_TEXT',
      topic: 'Incident Response',
      questionText: 'You clicked a phishing link on your work laptop. What do you do in the next 60 seconds?',
      minWords: 15,
      expectedKeywords: ['disconnect', 'network', 'wifi', 'report', 'it', 'security', 'incident', 'password'],
      feedbackExplanation: 'The immediate priority is to disconnect from the network to prevent malware spread or exfiltration, followed by reporting to the security team immediately.',
      proTip: 'Never try to investigate or fix it yourself. Time is critical—isolate the machine and alert the experts.',
      readMoreLink: 'modules/email-analysis#immediate-response',
      scoreValue: 10
    },
    {
      id: 'ea-q5',
      type: 'MCQ',
      topic: 'Email Headers',
      questionText: 'Why is the "Reply-To" field highly dangerous in phishing emails?',
      options: [
        { id: 'opt1', text: 'It bypasses the spam filter completely.' },
        { id: 'opt2', text: 'It automatically executes malicious scripts when replied to.' },
        { id: 'opt3', text: 'It forces the email client to encrypt the message.' },
        { id: 'opt4', text: 'It can silently direct your reply to the attacker instead of the perceived sender.' }
      ],
      correctOptionId: 'opt4',
      feedbackExplanation: 'The Reply-To header instructs the email client where to send responses. Attackers spoof the "From" address to look legitimate but set the "Reply-To" to their own address to intercept your reply.',
      proTip: 'Always verify the address populated in the "To" field when you click reply.',
      readMoreLink: 'modules/email-analysis#email-headers',
      scoreValue: 10
    },
    {
      id: 'ea-q6',
      type: 'JUDGE',
      topic: 'Lookalike Domains',
      questionText: 'Is this invoice email legitimate or fake?',
      scenario: {
        senderName: 'Microsoft Billing',
        senderEmail: 'billing@rnicrosoft.com',
        subject: 'Invoice #849202 - Payment Overdue',
        body: 'Please find your overdue invoice attached. Remit payment within 24 hours to avoid service interruption.',
        url: '' // no URL, it's an attachment scenario
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'The domain uses an "rn" (r and n) instead of an "m" (rnicrosoft.com). This is a classic homograph/lookalike domain attack.',
      proTip: 'In domains, "rn" looks like "m", and "vv" looks like "w". Look closely at the domain spelling.',
      readMoreLink: 'modules/email-analysis#lookalike-domains',
      scoreValue: 10
    },
    {
      id: 'ea-q7',
      type: 'ORDER',
      topic: 'Analysis Protocol',
      questionText: 'Arrange the steps you should take to analyze a suspicious email before acting.',
      steps: [
        { id: 'a1', label: 'Verify the actual sender email address' },
        { id: 'a2', label: 'Hover over links without clicking to inspect URLs' },
        { id: 'a3', label: 'Read the subject and tone for artificial urgency' },
        { id: 'a4', label: 'Contact the sender out-of-band to verify (e.g., via phone)' },
        { id: 'a5', label: 'Report the email using the official reporting button' }
      ],
      correctOrderIds: ['a3', 'a1', 'a2', 'a4', 'a5'],
      feedbackExplanation: 'First, notice the tone. Then verify technical indicators (sender and links). If suspicious, verify out-of-band, and finally report it.',
      proTip: 'Never use the contact information provided in the suspicious email itself to verify it.',
      readMoreLink: 'modules/email-analysis#analysis-protocol',
      scoreValue: 10
    }
  ]
};
