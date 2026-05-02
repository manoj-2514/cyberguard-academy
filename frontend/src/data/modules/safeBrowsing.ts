import type { SimulationModuleDef } from './types';

export const safeBrowsingModule: SimulationModuleDef = {
  id: 'safe-browsing',
  title: 'Safe Browsing',
  category: 'Threat Awareness',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'sb-q1',
      type: 'JUDGE',
      topic: 'Browser Warnings',
      questionText: 'Is this browser warning a legitimate security alert or a fake scareware pop-up?',
      scenario: {
        senderName: 'Browser Display',
        senderEmail: '',
        subject: 'Pop-up Window',
        body: '[Flashing Red Background]\nWARNING: YOUR PC IS INFECTED WITH 5 VIRUSES!\nWindows has detected a critical error. Do not close this window or your hard drive will be wiped.\nClick here to download Anti-Virus Pro to clean your PC immediately.',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "It is a fake scareware pop-up"
      feedbackExplanation: 'This is a classic scareware attack. Legitimate browsers (Chrome, Edge) and Operating Systems (Windows) do not show flashing red web pages demanding you download software to fix viruses.',
      proTip: 'If a webpage locks up your browser with full-screen warnings, press ALT+F4 (Windows) or CMD+Q (Mac) to force close the browser entirely.',
      readMoreLink: 'modules/safe-browsing#scareware',
      scoreValue: 10
    },
    {
      id: 'sb-q2',
      type: 'CLASSIFY',
      topic: 'Browser Behaviors',
      questionText: 'Classify these 8 browser behaviors and extensions.',

      items: [
        { id: 'i1', label: 'Installing an ad-blocker like uBlock Origin' },
        { id: 'i2', label: 'A free PDF converter extension that requires "Read and change all data on all websites" permissions' },
        { id: 'i3', label: 'Your default search engine changes suddenly from Google to Yahoo' },
        { id: 'i4', label: 'Clicking "Allow Notifications" on a random news site' },
        { id: 'i5', label: 'Updating Google Chrome when the "Update" button turns red' },
        { id: 'i6', label: 'Saving your bank password directly in the browser\'s built-in password manager' },
        { id: 'i7', label: 'A website prompts you to download a font pack to view the page correctly' },
        { id: 'i8', label: 'Using a dedicated Password Manager extension (like Bitwarden or 1Password)' }
      ],
      correctMapping: {
        'i1': 'c-safe', // Good for blocking malvertising
        'i2': 'c-remove', // Over-privileged extension (spyware)
        'i3': 'c-suspicious', // Browser hijacker malware
        'i4': 'c-dangerous', // Leads to spam/scareware pop-ups
        'i5': 'c-safe', // Always update
        'i6': 'c-dangerous', // Browser password managers are easily stolen by infostealer malware
        'i7': 'c-remove', // Classic malware delivery tactic
        'i8': 'c-safe' // Proper security practice
      },
      feedbackExplanation: 'Ad-blockers and proper password managers are safe. Over-privileged extensions, unexpected search engine changes, and downloading "font packs" are strong indicators of malware or spyware.',
      proTip: 'Never click "Allow Notifications" unless you absolutely trust the website. Malicious sites use notifications to spam your desktop with fake virus alerts.',
      readMoreLink: 'modules/safe-browsing#behaviors',
      scoreValue: 10
    },
    {
      id: 'sb-q3',
      type: 'ORDER',
      topic: 'Drive-By Downloads',
      questionText: 'Arrange how a "drive-by download" attack compromises a machine through a legitimate website.',
      steps: [
        { id: 's1', label: 'Attacker compromises an advertising network used by a legitimate news website' },
        { id: 's2', label: 'Victim visits the legitimate news website without clicking any ads' },
        { id: 's3', label: 'The malicious ad loads silently in the background' },
        { id: 's4', label: 'The ad scans the victim\'s browser for outdated plugins (like old Chrome versions)' },
        { id: 's5', label: 'The ad exploits the vulnerability and silently installs malware on the PC' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'In a drive-by download, you don\'t have to click anything to get infected. Just loading the page executes the malicious code if your browser or OS is unpatched.',
      proTip: 'This is why keeping your browser updated and using a reputable ad-blocker are two of the most effective defenses against web-based malware.',
      readMoreLink: 'modules/safe-browsing#drive-by',
      scoreValue: 10
    },
    {
      id: 'sb-q4',
      type: 'OPEN_TEXT',
      topic: 'Accidental Infection',
      questionText: 'You accidentally visited a typo-squatted site (like gogle.com) and it immediately downloaded an `.exe` file to your computer. What do you do?',
      minWords: 15,
      expectedKeywords: ['do not run', 'do not click', 'delete', 'report', 'antivirus', 'scan', 'it'],
      feedbackExplanation: 'Do NOT double-click or open the downloaded file. Simply downloading a file rarely infects the PC; executing it does. Delete the file immediately, empty the recycle bin, and run a full antivirus scan.',
      proTip: 'If your browser asks "Do you want to run this file?", always click No. If you didn\'t explicitly request the download, it is malicious.',
      readMoreLink: 'modules/safe-browsing#accidental-download',
      scoreValue: 10
    },
    {
      id: 'sb-q5',
      type: 'MCQ',
      topic: 'Browser Sandboxing',
      questionText: 'What does a modern browser\'s "sandboxing" feature protect against?',
      options: [
        { key: 'A', text: 'It prevents websites from tracking your cookies.' },
        { key: 'B', text: 'It isolates website code so it cannot access your computer\'s operating system or files.' },
        { key: 'C', text: 'It automatically encrypts all HTTP traffic into HTTPS.' },
        { key: 'D', text: 'It blocks pop-up windows from opening.' }
      ],
      correctOptionId: 'B',
      feedbackExplanation: 'Sandboxing forces web code (like JavaScript) to run inside a restricted "sandbox." Even if a site contains malicious code, the sandbox prevents it from escaping the browser to infect your actual hard drive.',
      proTip: 'Zero-day browser exploits specifically target vulnerabilities that allow code to "escape the sandbox." Updating your browser patches these holes.',
      readMoreLink: 'modules/safe-browsing#sandboxing',
      scoreValue: 10
    },
    {
      id: 'sb-q6',
      type: 'SPOT',
      topic: 'Malicious Websites',
      questionText: 'Spot the 4 signs of a malicious/phishing website in this browser screenshot.',
      scenario: {
        senderName: 'Browser Window',
        senderEmail: '',
        subject: 'PayPal Login',
        body: 'URL Bar: http://secure-update-paypal.com/login\nPadlock Icon: Missing (Not Secure)\nPage Content: Low-resolution PayPal logo, text reads "Update your account or it will be suspended in 24 hours.", Login form asks for Password, SSN, and ATM PIN.',
        url: ''
      },
      hotspots: [
        { id: 'hs-url', position: { top: '15%', left: '20%', width: '10%', height: '10%' }, label: 'Incorrect Domain Name' },
        { id: 'hs-http', position: { top: '15%', left: '10%', width: '10%', height: '10%' }, label: 'HTTP instead of HTTPS' },
        { id: 'hs-urgency', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Threatening Urgency' },
        { id: 'hs-ssn', position: { top: '55%', left: '20%', width: '10%', height: '10%' }, label: 'Asking for SSN and ATM PIN' },
        { id: 'hs-logo', position: { top: '25%', left: '20%', width: '10%', height: '10%' }, label: 'Low-res logo (often a sign, but not definitive alone)' }
      ],
      correctSpotIds: ['hs-url', 'hs-http', 'hs-urgency', 'hs-ssn'],
      feedbackExplanation: 'The wrong domain, lack of encryption (HTTP), artificial urgency, and asking for data that a service would never need (ATM PIN for a PayPal login) are definitive proof of a phishing site.',
      proTip: 'Attackers can easily steal logos and make a site look visually identical to the real one. The URL bar is your only source of truth.',
      readMoreLink: 'modules/safe-browsing#spotting-fakes',
      scoreValue: 10
    },
    {
      id: 'sb-q7',
      type: 'ORDER',
      topic: 'Browser Hardening',
      questionText: 'Sequence the steps to configure a web browser for maximum security.',
      steps: [
        { id: 'a1', label: 'Ensure automatic updates are enabled' },
        { id: 'a2', label: 'Turn on "Enhanced Safe Browsing" or equivalent phishing protection' },
        { id: 'a3', label: 'Install a reputable ad-blocker (e.g., uBlock Origin)' },
        { id: 'a4', label: 'Review and remove any unrecognized or unused extensions' },
        { id: 'a5', label: 'Configure settings to "Block Third-Party Cookies"' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Updating patches holes, safe browsing blocks known bad sites, ad-blockers stop malvertising, removing extensions reduces attack surface, and blocking cookies enhances privacy.',
      proTip: 'Browser extensions have incredible power to read everything you type. Only install extensions from highly trusted developers.',
      readMoreLink: 'modules/safe-browsing#hardening',
      scoreValue: 10
    }
  ]
};
