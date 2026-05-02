import type { SimulationModuleDef } from './types';

export const deviceSecurityModule: SimulationModuleDef = {
  id: 'device-security',
  title: 'Device Security',
  category: 'Network & Device',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'ds-q1',
      type: 'SPOT',
      topic: 'Device Misconfigurations',
      questionText: 'Spot the 4 critical security misconfigurations in this laptop settings screenshot.',
      scenario: {
        senderName: 'System Settings',
        senderEmail: '',
        subject: 'Control Panel',
        body: 'Windows Firewall: OFF\nUser Account Control (UAC): Never Notify\nWindows Update: Paused for 30 days\nBitLocker Drive Encryption: OFF\nScreen Timeout: 30 minutes',
        url: ''
      },
      hotspots: [
        { id: 'hs-firewall', x: 20, y: 25, label: 'Firewall is turned off' },
        { id: 'hs-uac', x: 20, y: 35, label: 'UAC is disabled (Never Notify)' },
        { id: 'hs-update', x: 20, y: 45, label: 'Updates are paused' },
        { id: 'hs-bitlocker', x: 20, y: 55, label: 'Disk Encryption is disabled' },
        { id: 'hs-timeout', x: 20, y: 65, label: 'Screen Timeout set to 30 mins (Should be 5 mins)' }
      ],
      // Let's require 4 out of the 5
      correctSpotIds: ['hs-firewall', 'hs-uac', 'hs-update', 'hs-bitlocker'],
      feedbackExplanation: 'Running without a firewall, disabling UAC (which prevents silent malware installs), pausing updates, and leaving the hard drive unencrypted are all critical violations of basic device hygiene.',
      proTip: 'Never disable User Account Control (UAC). It is the primary barrier that stops malware from silently gaining Administrator privileges.',
      readMoreLink: 'modules/device-security#baseline-config',
      scoreValue: 10
    },
    {
      id: 'ds-q2',
      type: 'CLASSIFY',
      topic: 'Device Behaviors',
      questionText: 'Classify these 8 device management behaviors.',

      items: [
        { id: 'i1', label: 'Using a local Administrator account for daily web browsing' },
        { id: 'i2', label: 'Ignoring a "Reboot required to apply updates" prompt for a week' },
        { id: 'i3', label: 'Jailbreaking/Rooting a company-issued smartphone' },
        { id: 'i4', label: 'Installing an approved browser extension from the official store' },
        { id: 'i5', label: 'Plugging your phone into a public airport charging kiosk via USB' },
        { id: 'i6', label: 'Locking your screen every time you step away from your desk' },
        { id: 'i7', label: 'Disabling the corporate antivirus to run a video game faster' },
        { id: 'i8', label: 'Delaying an OS upgrade for 2 days to finish a project' }
      ],
      correctMapping: {
        'i1': 'c-critical', // Running as daily admin is a massive risk
        'i2': 'c-risky',
        'i3': 'c-critical', // Rooting destroys mobile security boundaries
        'i4': 'c-secure',
        'i5': 'c-risky',    // Juice jacking risk
        'i6': 'c-secure',
        'i7': 'c-critical', // Bypassing security controls
        'i8': 'c-attention' // Delaying is bad, but 2 days is moderate attention
      },
      feedbackExplanation: 'Daily driving an Admin account, jailbreaking devices, and disabling AV are critical violations that guarantee full compromise if you encounter malware.',
      proTip: 'Always use a standard user account for daily tasks. Only log into an Administrator account when specifically required to install software.',
      readMoreLink: 'modules/device-security#behaviors',
      scoreValue: 10
    },
    {
      id: 'ds-q3',
      type: 'ORDER',
      topic: 'Vulnerability Exploitation',
      questionText: 'Arrange the sequence of how an unpatched device leads to a full network compromise.',
      steps: [
        { id: 's1', label: 'Vendor releases a critical security patch and publicizes the vulnerability' },
        { id: 's2', label: 'Attackers reverse-engineer the patch to create an exploit' },
        { id: 's3', label: 'User ignores the prompt to install the patch on their laptop' },
        { id: 's4', label: 'Attacker compromises the laptop via the unpatched vulnerability' },
        { id: 's5', label: 'Attacker harvests VPN credentials from the laptop to access the corporate network' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'When a patch is released, attackers immediately reverse-engineer it to create exploits for devices that haven\'t applied it yet. Delaying patches leaves the window open.',
      proTip: 'The time between a patch release and active exploitation in the wild (the "Exploit Window") is shrinking drastically, often taking less than 48 hours.',
      readMoreLink: 'modules/device-security#patch-management',
      scoreValue: 10
    },
    {
      id: 'ds-q4',
      type: 'OPEN_TEXT',
      topic: 'Lost/Stolen Device',
      questionText: 'Your work laptop was stolen from your car while you were at a restaurant. What are your immediate steps?',
      minWords: 15,
      expectedKeywords: ['report', 'it', 'security', 'police', 'remote', 'wipe', 'passwords', 'immediately'],
      feedbackExplanation: 'You must report it to IT Security immediately so they can issue a remote wipe command and invalidate the device\'s certificates. Then, file a police report.',
      proTip: 'Never leave laptops in cars, even in the trunk. Bluetooth beacons from sleeping laptops can be detected by thieves walking through parking lots.',
      readMoreLink: 'modules/device-security#lost-device',
      scoreValue: 10
    },
    {
      id: 'ds-q5',
      type: 'MCQ',
      topic: 'Disk Encryption',
      questionText: 'Why is Full Disk Encryption (like BitLocker or FileVault) critical even if you have a strong Windows login password?',
      options: [
        { id: 'opt1', text: 'It prevents the device from connecting to malicious WiFi networks.' },
        { id: 'opt2', text: 'It automatically backs up your files to the cloud.' },
        { id: 'opt3', text: 'It prevents an attacker who steals the laptop from simply removing the hard drive to read the files.' },
        { id: 'opt4', text: 'It acts as a secondary antivirus scanner.' }
      ],
      correctOptionId: 'opt3',
      feedbackExplanation: 'A Windows login password only protects the running operating system. If the drive isn\'t encrypted, a thief can remove the hard drive, plug it into their own computer, and read every file instantly.',
      proTip: 'Modern laptops use TPM chips to make disk encryption seamless. You won\'t even notice it\'s on, but it makes stolen hardware useless to thieves.',
      readMoreLink: 'modules/device-security#disk-encryption',
      scoreValue: 10
    },
    {
      id: 'ds-q6',
      type: 'JUDGE',
      topic: 'MDM Enrollment',
      questionText: 'Is this mobile device management (MDM) enrollment request legitimate?',
      scenario: {
        senderName: 'IT Department',
        senderEmail: 'it-admin@company-portal.net',
        subject: 'Required: Install Security Profile',
        body: 'To comply with the new BYOD policy, you must install the attached iOS configuration profile on your personal iPhone to continue accessing company email.\n\nAttachment: secure_profile.mobileconfig',
        url: ''
      },
      correctAnswer: 'FAKE', // Treat as highly suspicious/fake since it's an email attachment
      feedbackExplanation: 'This is highly suspicious. Legitimate MDM enrollment usually happens via an official app (like Intune or Workspace ONE) downloaded from the App Store, not via an emailed .mobileconfig attachment which gives complete control over the device.',
      proTip: 'Never install a configuration profile sent via email or from a website popup. They can route all your traffic through an attacker\'s server.',
      readMoreLink: 'modules/device-security#mdm-risks',
      scoreValue: 10
    },
    {
      id: 'ds-q7',
      type: 'ORDER',
      topic: 'Device Hardening',
      questionText: 'Sequence the steps to harden a new work laptop from day one.',
      steps: [
        { id: 'a1', label: 'Verify Full Disk Encryption (BitLocker/FileVault) is activated' },
        { id: 'a2', label: 'Ensure the OS and all pre-installed software are fully updated' },
        { id: 'a3', label: 'Verify Antivirus/EDR software is running and updating' },
        { id: 'a4', label: 'Create a standard user account for daily work (not an Admin)' },
        { id: 'a5', label: 'Configure screen timeout to lock automatically after 5 minutes' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Encryption protects the data at rest, patching secures the OS, AV monitors behavior, Least Privilege (no admin) limits damage, and screen locks prevent physical access.',
      proTip: 'These 5 steps form the core baseline for endpoint security. Missing any one of them drastically increases risk.',
      readMoreLink: 'modules/device-security#hardening',
      scoreValue: 10
    }
  ]
};
