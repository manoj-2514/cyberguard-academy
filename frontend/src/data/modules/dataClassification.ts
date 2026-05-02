import type { SimulationModuleDef } from './types';

export const dataClassificationModule: SimulationModuleDef = {
  id: 'data-classification',
  title: 'Data Classification',
  category: 'Data & Compliance',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'dc-q1',
      type: 'JUDGE',
      topic: 'Data Handling',
      questionText: 'Is this data handling practice compliant?',
      scenario: {
        senderName: 'Sales Team',
        senderEmail: '',
        subject: 'Client List Upload',
        body: 'Action: A sales representative uploaded an unencrypted Excel file containing 500 client names, email addresses, and phone numbers to a public GitHub repository to "share it with a contractor easily."',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "No, not compliant"
      feedbackExplanation: 'This is a severe compliance violation and a data breach. PII (Personally Identifiable Information) must never be uploaded to public repositories or shared unencrypted over insecure channels.',
      proTip: 'Use official, secure file-sharing tools (like OneDrive or corporate Dropbox) with expiration links to share data externally.',
      readMoreLink: 'modules/data-classification#handling-pii',
      scoreValue: 10
    },
    {
      id: 'dc-q2',
      type: 'CLASSIFY',
      topic: 'Classification Levels',
      questionText: 'Classify these 8 data types into the standard corporate classification tiers.',

      items: [
        { id: 'i1', label: 'Marketing brochures and press releases' },
        { id: 'i2', label: 'Employee holiday schedule and org charts' },
        { id: 'i3', label: 'Unreleased Q4 financial earnings report' },
        { id: 'i4', label: 'Customer credit card numbers and Social Security Numbers' },
        { id: 'i5', label: 'Source code for the company\'s flagship software' },
        { id: 'i6', label: 'Job postings and career page info' },
        { id: 'i7', label: 'Internal meeting minutes discussing a new office location' },
        { id: 'i8', label: 'M&A (Merger and Acquisition) strategy documents' }
      ],
      correctMapping: {
        'i1': 'c-public',
        'i2': 'c-internal',
        'i3': 'c-confidential', // Often highly sensitive, but usually fits here
        'i4': 'c-restricted', // Regulated data (PCI/PII)
        'i5': 'c-restricted', // Intellectual Property
        'i6': 'c-public',
        'i7': 'c-internal',
        'i8': 'c-restricted' // Massive insider trading risk
      },
      feedbackExplanation: 'Public data is safe for everyone. Internal is safe for employees. Confidential is restricted to specific departments. Restricted is regulated data or critical IP requiring strict access controls.',
      proTip: 'If you are unsure how to classify a document, err on the side of "Confidential" until you confirm with the data owner.',
      readMoreLink: 'modules/data-classification#tiers',
      scoreValue: 10
    },
    {
      id: 'dc-q3',
      type: 'ORDER',
      topic: 'Violation Sequence',
      questionText: 'Arrange the sequence of how unclassified sensitive data leads to a compliance violation.',
      steps: [
        { id: 's1', label: 'User creates a spreadsheet containing regulated customer data' },
        { id: 's2', label: 'User fails to label the document as "Restricted" or "Confidential"' },
        { id: 's3', label: 'DLP (Data Loss Prevention) scanners ignore the file because it lacks classification tags' },
        { id: 's4', label: 'User emails the spreadsheet to a personal email address to work from home' },
        { id: 's5', label: 'The data is exposed, resulting in a GDPR/CCPA compliance fine' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Data classification tags are the foundation of automated security. Without tags, security tools (like DLP) do not know they should block the file from leaving the network.',
      proTip: 'Classification isn\'t just bureaucracy; it tells the security software how to protect your files.',
      readMoreLink: 'modules/data-classification#dlp',
      scoreValue: 10
    },
    {
      id: 'dc-q4',
      type: 'OPEN_TEXT',
      topic: 'Secure Sharing',
      questionText: 'Your team wants to share a spreadsheet containing customer PII (names, emails, addresses) with a marketing vendor via Google Sheets. What do you recommend?',
      minWords: 15,
      expectedKeywords: ['encrypt', 'secure', 'portal', 'password', 'nda', 'dpa', 'remove', 'anonymize'],
      feedbackExplanation: 'You should recommend either anonymizing the data first, or using a secure, IT-approved encrypted file transfer portal with password protection, ensuring the vendor has signed a DPA/NDA.',
      proTip: 'Never use personal cloud storage or public sharing links for PII. Once the link is created, anyone who finds it can access the data.',
      readMoreLink: 'modules/data-classification#secure-sharing',
      scoreValue: 10
    },
    {
      id: 'dc-q5',
      type: 'MCQ',
      topic: 'Purpose of Classification',
      questionText: 'What is the primary purpose of a Data Classification policy?',
      options: [
        { key: 'A', text: 'To encrypt all data equally across the organization.' },
        { key: 'B', text: 'To apply appropriate security controls based on the sensitivity and risk of the data.' },
        { key: 'C', text: 'To satisfy HR requirements for employee onboarding.' },
        { key: 'D', text: 'To ensure data is backed up to the cloud daily.' }
      ],
      correctOptionId: 'B',
      feedbackExplanation: 'Applying military-grade encryption to a cafeteria menu is a waste of money. Classification ensures we spend our security budget protecting the data that actually matters (like PII and IP).',
      proTip: 'Not all data is created equal. Protect the crown jewels heavily, and let the public data flow freely.',
      readMoreLink: 'modules/data-classification#purpose',
      scoreValue: 10
    },
    {
      id: 'dc-q6',
      type: 'SPOT',
      topic: 'Handling Violations',
      questionText: 'Spot the 4 data classification and handling violations in this scenario.',
      scenario: {
        senderName: 'Office Environment',
        senderEmail: '',
        subject: 'Document Handling',
        body: '1. A "Restricted" physical document left on a cafeteria table.\n2. Emailing passwords in plain text to a new hire.\n3. Saving a "Confidential" HR file to a personal unencrypted USB.\n4. Locking a laptop screen before going to the restroom.\n5. Discussing upcoming M&A financials loudly on a public train.',
        url: ''
      },
      hotspots: [
        { id: 'hs-paper', position: { top: '25%', left: '20%', width: '10%', height: '10%' }, label: 'Restricted doc on cafeteria table' },
        { id: 'hs-email', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Emailing passwords in plain text' },
        { id: 'hs-usb', position: { top: '45%', left: '20%', width: '10%', height: '10%' }, label: 'Confidential file on personal USB' },
        { id: 'hs-laptop', position: { top: '55%', left: '20%', width: '10%', height: '10%' }, label: 'Locking laptop (Good Practice)' },
        { id: 'hs-train', position: { top: '65%', left: '20%', width: '10%', height: '10%' }, label: 'Discussing financials on train' }
      ],
      correctSpotIds: ['hs-paper', 'hs-email', 'hs-usb', 'hs-train'],
      feedbackExplanation: 'Physical abandonment, insecure transmission, removable media exfiltration, and public verbal disclosures are all severe mishandling of classified data.',
      proTip: 'A breach doesn\'t have to be a hack; losing a piece of paper or talking too loudly on an airplane counts as a data breach.',
      readMoreLink: 'modules/data-classification#handling-violations',
      scoreValue: 10
    },
    {
      id: 'dc-q7',
      type: 'ORDER',
      topic: 'Policy Implementation',
      questionText: 'Sequence the steps to properly implement a data classification policy for a new dataset.',
      steps: [
        { id: 'a1', label: 'Inventory the data to understand exactly what information exists' },
        { id: 'a2', label: 'Assign an owner who is responsible for the data' },
        { id: 'a3', label: 'Determine the classification level (e.g., Restricted vs Internal)' },
        { id: 'a4', label: 'Apply the corresponding security controls (Encryption, Access Restrictions)' },
        { id: 'a5', label: 'Train the staff on how to handle that specific classification level' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'You cannot protect what you don\'t know you have. Inventory first, assign ownership, classify, protect, and train the humans.',
      proTip: 'Data discovery and inventory is always step one. "Dark data" (untracked sensitive files) is a massive risk.',
      readMoreLink: 'modules/data-classification#implementation',
      scoreValue: 10
    }
  ]
};
