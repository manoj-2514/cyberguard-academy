import type { SimulationModuleDef } from './types';

export const wifiSecurityModule: SimulationModuleDef = {
  id: 'wifi-security',
  title: 'WiFi Security',
  category: 'Network & Device',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'ws-q1',
      type: 'JUDGE',
      topic: 'Public Networks',
      questionText: 'Is connecting to this public WiFi network safe without a VPN?',
      scenario: {
        senderName: 'Network List',
        senderEmail: '',
        subject: 'Available Networks',
        body: 'Network Name: Starbucks_Guest_Free\nSecurity Type: Open (No Password Required)\nCaptive Portal: Yes',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "No, it's not safe"
      feedbackExplanation: 'Open WiFi networks do not encrypt traffic over the air. Anyone sitting nearby with a simple packet sniffer can read unencrypted data you transmit. A VPN is strictly required.',
      proTip: 'Never do banking, access corporate data, or enter passwords on an open WiFi network without an active VPN connection.',
      readMoreLink: 'modules/wifi-security#public-wifi',
      scoreValue: 10
    },
    {
      id: 'ws-q2',
      type: 'CLASSIFY',
      topic: 'WiFi Scenarios',
      questionText: 'Classify these 8 WiFi scenarios into the correct safety category.',

      items: [
        { id: 'i1', label: 'Corporate Office WiFi using WPA3-Enterprise (802.1X)' },
        { id: 'i2', label: 'Hotel Lobby WiFi (Open, Captive Portal)' },
        { id: 'i3', label: 'Airport WiFi (WPA2 Personal, Password on display)' },
        { id: 'i4', label: 'A network named "Free_Internet_Here" in a park' },
        { id: 'i5', label: 'Your Home WiFi with WPA3 and a strong passphrase' },
        { id: 'i6', label: 'A network named identical to your company, but no password required' },
        { id: 'i7', label: 'Coffee shop WiFi using WEP encryption' },
        { id: 'i8', label: 'Tethering to your own cellular phone hotspot' }
      ],
      correctMapping: {
        'i1': 'c-safe',
        'i2': 'c-vpn',
        'i3': 'c-vpn', // Shared password means traffic can still be decrypted by others on the network
        'i4': 'c-avoid', // Highly suspicious
        'i5': 'c-safe',
        'i6': 'c-never', // Classic Evil Twin attack
        'i7': 'c-never', // WEP is instantly crackable
        'i8': 'c-safe'
      },
      feedbackExplanation: 'Corporate networks (WPA3-Enterprise) and your own cell hotspot are safe. Public networks (even with shared passwords) require a VPN. Unsecured networks mimicking corporate ones are Evil Twins and should never be used.',
      proTip: 'If your device warns you that a network uses "Weak Security" (like WEP or WPA-TKIP), do not connect to it.',
      readMoreLink: 'modules/wifi-security#scenarios',
      scoreValue: 10
    },
    {
      id: 'ws-q3',
      type: 'ORDER',
      topic: 'Evil Twin Attack',
      questionText: 'Arrange the sequence of how an Evil Twin WiFi attack captures credentials.',
      steps: [
        { id: 's1', label: 'Attacker sets up a rogue access point named identically to a legitimate network (e.g., "Airport_Free_WiFi")' },
        { id: 's2', label: 'Attacker broadcasts a stronger signal than the legitimate access point' },
        { id: 's3', label: 'Victim\'s device automatically connects to the stronger rogue signal' },
        { id: 's4', label: 'Attacker intercepts all traffic and presents a fake login portal' },
        { id: 's5', label: 'Victim enters credentials, which the attacker captures' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Devices automatically prefer stronger signals. The attacker overpowers the real network, forces you to connect to theirs, and intercepts your traffic (Man-in-the-Middle).',
      proTip: 'Disable "Auto-Join" for public networks on your phone and laptop so your device doesn\'t silently connect to an Evil Twin in your pocket.',
      readMoreLink: 'modules/wifi-security#evil-twin',
      scoreValue: 10
    },
    {
      id: 'ws-q4',
      type: 'OPEN_TEXT',
      topic: 'Secure Access',
      questionText: 'You are at a café and urgently need to access sensitive company data. What is your most secure approach?',
      minWords: 15,
      expectedKeywords: ['hotspot', 'cellular', 'tether', 'phone', 'vpn', 'avoid', 'public'],
      feedbackExplanation: 'The absolute most secure approach is to avoid the public WiFi entirely and tether your laptop to your smartphone\'s cellular hotspot. If you must use the café WiFi, you MUST connect to the corporate VPN before accessing any data.',
      proTip: 'Cellular networks use strong encryption by default and are incredibly difficult for a local attacker in a café to intercept.',
      readMoreLink: 'modules/wifi-security#secure-access',
      scoreValue: 10
    },
    {
      id: 'ws-q5',
      type: 'MCQ',
      topic: 'Encryption Standards',
      questionText: 'What critical security enhancement does WPA3 provide over WPA2 for home networks?',
      options: [
        { id: 'opt1', text: 'It completely hides the network name (SSID) from being broadcast.' },
        { id: 'opt2', text: 'It prevents offline dictionary attacks (password guessing) even if the password is weak.' },
        { id: 'opt3', text: 'It automatically turns on a VPN for all connected devices.' },
        { id: 'opt4', text: 'It doubles the speed of the wireless connection.' }
      ],
      correctOptionId: 'opt2',
      feedbackExplanation: 'WPA3 uses Simultaneous Authentication of Equals (SAE), which makes offline brute-force password guessing practically impossible, unlike WPA2 which is highly vulnerable to it.',
      proTip: 'Always choose WPA3 (or WPA2/WPA3 Transitional) when configuring your home router.',
      readMoreLink: 'modules/wifi-security#wpa3',
      scoreValue: 10
    },
    {
      id: 'ws-q6',
      type: 'JUDGE',
      topic: 'Suspicious SSIDs',
      questionText: 'Is this WiFi network scenario highly suspicious?',
      scenario: {
        senderName: 'WiFi Scanner',
        senderEmail: '',
        subject: 'Network Discovery',
        body: 'You are sitting inside the corporate office. You see the normal secured network "CorpNet_Secure".\n\nDirectly below it, you see an unsecured network with strong signal named "CorpNet_Secure_Guest". IT has never announced a guest network.',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "Yes, it's highly suspicious/malicious"
      feedbackExplanation: 'This is a classic honeypot or Evil Twin. Attackers set up unsecured networks with names very similar to the corporate network hoping employees or guests will connect to it for convenience.',
      proTip: 'Never connect to an unannounced corporate network. Always verify new networks with the IT department first.',
      readMoreLink: 'modules/wifi-security#rogue-ap',
      scoreValue: 10
    },
    {
      id: 'ws-q7',
      type: 'ORDER',
      topic: 'Home Network Security',
      questionText: 'Arrange the steps for properly securing a new home WiFi router.',
      steps: [
        { id: 'a1', label: 'Change the default administrator password for the router portal' },
        { id: 'a2', label: 'Change the default network name (SSID) so it doesn\'t broadcast the router brand' },
        { id: 'a3', label: 'Enable WPA3 (or WPA2-AES) encryption' },
        { id: 'a4', label: 'Set a strong, unique 15+ character passphrase for the WiFi network' },
        { id: 'a5', label: 'Disable Remote Management and WPS (WiFi Protected Setup)' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Securing the admin portal is paramount. Then obscure the brand, set the strongest encryption standard, use a long passphrase, and disable vulnerable legacy features like WPS.',
      proTip: 'WPS (where you push a button or enter an 8-digit PIN to connect) is notoriously vulnerable to brute-force attacks and should always be disabled.',
      readMoreLink: 'modules/wifi-security#home-router',
      scoreValue: 10
    }
  ]
};
