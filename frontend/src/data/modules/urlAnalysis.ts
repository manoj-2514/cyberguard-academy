import type { SimulationModuleDef } from './types';

export const urlAnalysisModule: SimulationModuleDef = {
  id: 'url-analysis',
  title: 'URL Analysis',
  category: 'Threat Awareness',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'ua-q1',
      type: 'JUDGE',
      topic: 'Legitimate vs Malicious Domains',
      questionText: 'Is this URL legitimate or potentially malicious?',
      scenario: {
        senderName: 'System',
        senderEmail: '',
        subject: 'amazon.com vs amaz0n-secure.net',
        body: 'You received a link for an order tracking update:\n\nhttps://amaz0n-secure.net/track/1Z99999999',
        url: 'https://amaz0n-secure.net/track/1Z99999999'
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'This is a malicious lookalike domain. Legitimate companies almost never use numbers in place of letters (amaz0n) or hyphenate their primary domain with words like "secure".',
      proTip: 'Always check the domain name exactly before the ".com" or ".net". Anything added with a hyphen is a massive red flag.',
      readMoreLink: 'modules/url-analysis#lookalike-domains',
      scoreValue: 10
    },
    {
      id: 'ua-q2',
      type: 'FILL_BLANK',
      topic: 'URL Anatomy',
      questionText: 'Identify the different components of this URL.',
      segments: [
        { type: 'blank', blankId: 'protocol' },
        { type: 'text', content: '://' },
        { type: 'blank', blankId: 'subdomain' },
        { type: 'text', content: '.' },
        { type: 'blank', blankId: 'domain' },
        { type: 'blank', blankId: 'path' },
        { type: 'blank', blankId: 'params' }
      ],
      blanks: [
        { id: 'protocol', placeholder: 'Protocol (e.g. https)' },
        { id: 'subdomain', placeholder: 'Subdomain (e.g. mail)' },
        { id: 'domain', placeholder: 'Domain (e.g. google.com)' },
        { id: 'path', placeholder: 'Path (e.g. /login)' },
        { id: 'params', placeholder: 'Parameters (e.g. ?user=admin)' }
      ],
      correctAnswers: {
        'protocol': 'https',
        'subdomain': 'mail',
        'domain': 'google.com',
        'path': '/login',
        'params': '?user=admin'
      },
      feedbackExplanation: 'A URL is composed of a protocol, subdomain, root domain, path, and parameters. The most critical part to verify for security is the root domain.',
      proTip: 'Attackers often spoof the subdomain to trick you (e.g., login.google.attacker.com). The actual domain here is attacker.com.',
      readMoreLink: 'modules/url-analysis#url-anatomy',
      scoreValue: 10
    },
    {
      id: 'ua-q3',
      type: 'ORDER',
      topic: 'URL Redirects',
      questionText: 'Arrange the sequence of how attackers use URL shorteners and redirects to hide phishing sites.',
      steps: [
        { id: 's1', label: 'Attacker creates a malicious phishing landing page' },
        { id: 's2', label: 'Attacker uses a service like bit.ly to shorten the malicious URL' },
        { id: 's3', label: 'Attacker sends the shortened link via SMS or email' },
        { id: 's4', label: 'Victim clicks the benign-looking shortened link' },
        { id: 's5', label: 'The shortening service automatically redirects the victim to the malicious page' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Attackers obscure malicious domains behind trusted shorteners. Once clicked, the browser resolves the short link and immediately forwards the user to the hidden phishing site.',
      proTip: 'You can use URL expansion tools (like expandurl.net) to safely reveal the destination of a shortened link before clicking it.',
      readMoreLink: 'modules/url-analysis#url-shorteners',
      scoreValue: 10
    },
    {
      id: 'ua-q4',
      type: 'OPEN_TEXT',
      topic: 'Analysis Process',
      questionText: 'Walk through your analysis process when you receive a suspicious shortened URL via text message.',
      minWords: 15,
      expectedKeywords: ['click', 'expand', 'tool', 'verify', 'sender', 'domain', 'report'],
      feedbackExplanation: 'The core process is: DO NOT click, use a URL expander tool to reveal the true destination, analyze the true domain for red flags, and report the message.',
      proTip: 'SMS phishing (Smishing) relies heavily on shortened links because phone screens are small. Always expand them.',
      readMoreLink: 'modules/url-analysis#analysis-process',
      scoreValue: 10
    },
    {
      id: 'ua-q5',
      type: 'MCQ',
      topic: 'HTTPS Security',
      questionText: 'What does HTTPS (the padlock icon) actually guarantee about a website?',
      options: [
        { id: 'opt1', text: 'The website is legitimate and safe to use.' },
        { id: 'opt2', text: 'The website does not contain malware.' },
        { id: 'opt3', text: 'Data sent between your browser and the server is encrypted.' },
        { id: 'opt4', text: 'The organization running the site has been thoroughly vetted.' }
      ],
      correctOptionId: 'opt3',
      feedbackExplanation: 'HTTPS only guarantees encryption in transit. It does NOT mean the site is safe. Attackers easily obtain free SSL certificates to put the "padlock" on their phishing sites.',
      proTip: 'A padlock means your connection is private, but you might be privately communicating with a hacker.',
      readMoreLink: 'modules/url-analysis#https-myth',
      scoreValue: 10
    },
    {
      id: 'ua-q6',
      type: 'JUDGE',
      topic: 'Spot the Difference',
      questionText: 'Is this second URL legitimate?',
      scenario: {
        senderName: 'System',
        senderEmail: '',
        subject: 'Compare URLs',
        body: 'URL 1 (Known Good): https://login.microsoftonline.com\n\nURL 2 (To Evaluate): https://login.microsoftonline.com.secure-auth-gateway.net/',
        url: 'https://login.microsoftonline.com.secure-auth-gateway.net/'
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'The second URL places the trusted domain as a subdomain. The actual root domain you are visiting is "secure-auth-gateway.net", which is completely controlled by the attacker.',
      proTip: 'To find the true domain, look immediately to the left of the very first single forward slash (/) after the .com/.net part.',
      readMoreLink: 'modules/url-analysis#subdomain-tricks',
      scoreValue: 10
    },
    {
      id: 'ua-q7',
      type: 'ORDER',
      topic: 'Safe Investigation',
      questionText: 'Arrange the steps to safely investigate a highly suspicious link without clicking it.',
      steps: [
        { id: 'a1', label: 'Copy the link by right-clicking (do not left-click)' },
        { id: 'a2', label: 'Paste the link into a safe text editor (like Notepad) to inspect it' },
        { id: 'a3', label: 'Use a free URL analysis tool (like VirusTotal) to scan the link' },
        { id: 'a4', label: 'Review the scan results for malicious flags' },
        { id: 'a5', label: 'Report the link to IT Security based on your findings' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Always inspect links safely by extracting them without executing them, analyzing them in a sandbox or external scanner, and reporting the intelligence.',
      proTip: 'Never paste a suspicious link directly into your browser\'s address bar, as some browsers will automatically pre-load the page.',
      readMoreLink: 'modules/url-analysis#safe-investigation',
      scoreValue: 10
    }
  ]
};
