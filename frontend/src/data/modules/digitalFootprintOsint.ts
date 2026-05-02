import type { SimulationModuleDef } from './types';

export const digitalFootprintOsintModule: SimulationModuleDef = {
  id: 'digital-footprint-osint',
  title: 'Digital Footprint & OSINT',
  category: 'Emerging Threats',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'df-q1',
      type: 'JUDGE',
      topic: 'Social Media Reconnaissance',
      questionText: 'Does this LinkedIn profile expose too much information for an attacker performing OSINT (Open Source Intelligence)?',
      scenario: {
        senderName: 'LinkedIn Profile',
        senderEmail: '',
        subject: 'Profile: Jane Doe',
        body: 'Current Role: Lead Systems Administrator at TechCorp\nExperience:\n- Upgraded entire backend infrastructure to AWS EC2 and RDS in 2023.\n- Managed fleet of 500 MacBooks using Jamf Pro MDM.\n- Implemented CrowdStrike Falcon for EDR.\nEducation: High School Class of 2005.',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "Yes, it exposes too much"
      feedbackExplanation: 'This profile is a goldmine for attackers. By listing the exact vendors and technologies (AWS, Jamf, CrowdStrike), an attacker knows exactly what phishing lures to use or what software vulnerabilities to research.',
      proTip: 'Describe your achievements and skills broadly (e.g., "Managed cloud infrastructure and endpoint security") rather than listing specific vendor products.',
      readMoreLink: 'modules/digital-footprint-osint#linkedin-recon',
      scoreValue: 10
    },
    {
      id: 'df-q2',
      type: 'CLASSIFY',
      topic: 'Information Sharing',
      questionText: 'Classify these 8 types of information regarding online sharing risk.',

      items: [
        { id: 'i1', label: 'Your general job title and industry' },
        { id: 'i2', label: 'Pictures of your office badge or security pass' },
        { id: 'i3', label: 'Your pet\'s names and mother\'s maiden name' },
        { id: 'i4', label: 'Your previous home addresses and phone numbers' },
        { id: 'i5', label: 'Photos showing your computer screen at work' },
        { id: 'i6', label: 'Your current city or general geographic location' },
        { id: 'i7', label: 'Real-time location tags while on vacation' },
        { id: 'i8', label: 'Specific internal project code names' }
      ],
      correctMapping: {
        'i1': 'c-safe',
        'i2': 'c-never', // Can be cloned physically
        'i3': 'c-never', // Used for security questions
        'i4': 'c-exposed', // Readily available via data brokers
        'i5': 'c-never', // Screen leakage
        'i6': 'c-safe',
        'i7': 'c-caution', // Burglary risk
        'i8': 'c-never' // Insider threat / IP leakage
      },
      feedbackExplanation: 'Public identifiers (job title, city) are generally safe. Security answers, badges, and internal data should never be shared. Past addresses are usually already exposed in public records.',
      proTip: 'Always assume anything you post online can and will be used to craft a targeted phishing attack against you.',
      readMoreLink: 'modules/digital-footprint-osint#sharing-risks',
      scoreValue: 10
    },
    {
      id: 'df-q3',
      type: 'ORDER',
      topic: 'OSINT to Spear-Phishing',
      questionText: 'Arrange how an attacker uses OSINT to build a spear-phishing profile on a target.',
      steps: [
        { id: 's1', label: 'Attacker identifies a high-value target (e.g., VP of Finance)' },
        { id: 's2', label: 'Attacker scrapes LinkedIn to find the VP\'s direct reports and vendors' },
        { id: 's3', label: 'Attacker checks Twitter/Facebook to find the VP\'s hobbies and recent travels' },
        { id: 's4', label: 'Attacker crafts an email pretending to be a known vendor referencing the recent trip' },
        { id: 's5', label: 'Target trusts the highly personalized email and clicks the malicious link' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Spear-phishing works because it uses trust. By mapping your professional network (LinkedIn) and combining it with personal context (Facebook/X), the attacker crafts a lure that looks 100% legitimate.',
      proTip: 'The more you share publicly, the easier it is for an attacker to bypass your natural skepticism.',
      readMoreLink: 'modules/digital-footprint-osint#spear-phishing',
      scoreValue: 10
    },
    {
      id: 'df-q4',
      type: 'OPEN_TEXT',
      topic: 'Google Dorking',
      questionText: 'Describe how an attacker might use "Google Dorking" (advanced search operators) to find exposed employee data about your organization.',
      minWords: 15,
      expectedKeywords: ['filetype', 'site', 'search', 'operator', 'xls', 'pdf', 'exposed', 'public'],
      feedbackExplanation: 'Attackers use operators like `site:company.com filetype:xls "password"` to force Google to return any publicly indexed Excel spreadsheets on the company\'s domain that contain the word password.',
      proTip: 'Google is effectively the world\'s largest vulnerability scanner. If you put a sensitive file on a public web server, Google will index it.',
      readMoreLink: 'modules/digital-footprint-osint#google-dorking',
      scoreValue: 10
    },
    {
      id: 'df-q5',
      type: 'MCQ',
      topic: 'Spear Phishing Definition',
      questionText: 'What is the fundamental difference between standard Phishing and Spear-Phishing?',
      options: [
        { key: 'A', text: 'Spear-phishing only happens over text message (SMS).' },
        { key: 'B', text: 'Spear-phishing uses malware, while standard phishing only steals passwords.' },
        { key: 'C', text: 'Spear-phishing is highly targeted and personalized using OSINT, whereas standard phishing is a mass-blast to millions.' },
        { key: 'D', text: 'Spear-phishing is always sent from an internal corporate email address.' }
      ],
      correctOptionId: 'C',
      feedbackExplanation: 'Standard phishing is a numbers game (e.g., "Your Netflix account is locked" sent to 100k people). Spear-phishing is a sniper attack, customized for one specific person using their digital footprint.',
      proTip: 'Because spear-phishing is so tailored, it often bypasses automated email security filters that look for mass-spam patterns.',
      readMoreLink: 'modules/digital-footprint-osint#definitions',
      scoreValue: 10
    },
    {
      id: 'df-q6',
      type: 'SPOT',
      topic: 'Social Media Leaks',
      questionText: 'Spot the 4 OSINT attack vectors in this "First Day at Work" social media post.',
      scenario: {
        senderName: 'Instagram',
        senderEmail: '',
        subject: 'Post by @newhire_john',
        body: '[Image: John smiling at his desk.]\nCaption: "So excited to start my new role at TechCorp! Check out my setup!"\n[Visuals in the photo: John is wearing his employee badge with a visible barcode. A sticky note on the monitor says "GuestWiFi: Welcome2024". A shipping label on a box shows his home address. His laptop screen shows an internal org chart.]',
        url: ''
      },
      hotspots: [
        { id: 'hs-badge', position: { top: '45%', left: '20%', width: '10%', height: '10%' }, label: 'Visible badge barcode (Clonable)' },
        { id: 'hs-password', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Sticky note with WiFi password' },
        { id: 'hs-address', position: { top: '65%', left: '20%', width: '10%', height: '10%' }, label: 'Shipping label with home address' },
        { id: 'hs-screen', position: { top: '25%', left: '20%', width: '10%', height: '10%' }, label: 'Screen leaking internal org chart' },
        { id: 'hs-smile', position: { top: '15%', left: '20%', width: '10%', height: '10%' }, label: 'John smiling (Normal)' }
      ],
      correctSpotIds: ['hs-badge', 'hs-password', 'hs-address', 'hs-screen'],
      feedbackExplanation: 'Badges can be cloned from high-res photos. Passwords and internal org charts give attackers immediate network and social engineering advantages. Home addresses open physical attack vectors.',
      proTip: 'Always blur your badge, screens, and any background documents before posting photos from the office.',
      readMoreLink: 'modules/digital-footprint-osint#visual-leaks',
      scoreValue: 10
    },
    {
      id: 'df-q7',
      type: 'ORDER',
      topic: 'Footprint Reduction',
      questionText: 'Sequence the steps to audit and reduce your personal digital footprint.',
      steps: [
        { id: 'a1', label: 'Search your own name in Google using private/incognito browsing' },
        { id: 'a2', label: 'Review the privacy settings on all your social media accounts' },
        { id: 'a3', label: 'Remove or heavily restrict public access to personal photos and posts' },
        { id: 'a4', label: 'Opt-out of major data broker sites (e.g., Whitepages, Spokeo)' },
        { id: 'a5', label: 'Set up Google Alerts for your name to monitor future leaks' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'You must first assess what is out there (Incognito search), then lock down your primary sources (Social Media), scrub your data from brokers, and finally monitor for future exposure.',
      proTip: 'Data brokers constantly re-acquire data. You may need to use automated services (like DeleteMe or Incogni) to keep your info off these sites permanently.',
      readMoreLink: 'modules/digital-footprint-osint#reduction',
      scoreValue: 10
    }
  ]
};
