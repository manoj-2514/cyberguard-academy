import type { SimulationModuleDef } from './types';

export const mfaAuthenticationModule: SimulationModuleDef = {
  id: 'mfa-authentication',
  title: 'MFA Authentication',
  category: 'Account Security',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'ma-q1',
      type: 'JUDGE',
      topic: 'MFA Fatigue',
      questionText: 'You are lying in bed at 2:00 AM. Your phone vibrates with 15 consecutive "Approve Login" push notifications from your authenticator app. Is this an MFA fatigue attack?',
      scenario: {
        senderName: 'Authenticator',
        senderEmail: '',
        subject: 'Login Request',
        body: 'Approve sign-in?\n\nLocation: Russia (Unknown IP)\n\n[Approve] [Deny]',
        url: ''
      },
      correctAnswer: 'REAL', // "REAL" meaning Yes, it is an attack
      feedbackExplanation: 'Yes. Attackers who have stolen your password will spam you with push notifications in the middle of the night, hoping you will accidentally click "Approve" just to make the phone stop buzzing.',
      proTip: 'If you receive an unexpected push notification, DENY it immediately and change your password. Your password is already compromised.',
      readMoreLink: 'modules/mfa-authentication#fatigue-attacks',
      scoreValue: 10
    },
    {
      id: 'ma-q2',
      type: 'CLASSIFY',
      topic: 'MFA Strength',
      questionText: 'Classify these 8 authentication methods by their security strength.',

      items: [
        { id: 'i1', label: 'FIDO2 Hardware Security Key (YubiKey)' },
        { id: 'i2', label: 'SMS Text Message Codes' },
        { id: 'i3', label: 'Authenticator App Push Notification (Tap to Approve)' },
        { id: 'i4', label: 'Passkeys (WebAuthn via FaceID/TouchID)' },
        { id: 'i5', label: 'Authenticator App TOTP (Entering the 6-digit code)' },
        { id: 'i6', label: 'Email-based One Time Passwords' },
        { id: 'i7', label: 'Number Matching Push Notification (Enter the number shown on screen)' },
        { id: 'i8', label: 'Security Questions (What is your mother\'s maiden name?)' }
      ],
      correctMapping: {
        'i1': 'c-phish-proof',
        'i2': 'c-phishable', // Vulnerable to SIM swapping and phishing
        'i3': 'c-weak', // Vulnerable to fatigue
        'i4': 'c-phish-proof',
        'i5': 'c-secure',
        'i6': 'c-phishable',
        'i7': 'c-secure',
        'i8': 'c-phishable' // Can be guessed via OSINT
      },
      feedbackExplanation: 'SMS is easily intercepted. Basic push notifications are vulnerable to fatigue. Hardware keys and Passkeys are the only truly "phish-proof" methods because they mathematically verify the domain you are logging into.',
      proTip: 'Whenever possible, upgrade your accounts to use hardware keys or Passkeys instead of SMS or Authenticator apps.',
      readMoreLink: 'modules/mfa-authentication#mfa-types',
      scoreValue: 10
    },
    {
      id: 'ma-q3',
      type: 'ORDER',
      topic: 'AiTM Phishing',
      questionText: 'Arrange how an Adversary-in-the-Middle (AiTM) attack bypasses 6-digit MFA codes in a real-time phishing attack.',
      steps: [
        { id: 's1', label: 'Victim visits the attacker\'s phishing proxy site' },
        { id: 's2', label: 'Victim enters their username and password' },
        { id: 's3', label: 'Attacker\'s server passes the credentials to the real website' },
        { id: 's4', label: 'Real website prompts for the 6-digit MFA code, which the proxy relays to the victim' },
        { id: 's5', label: 'Victim enters the 6-digit code into the phishing proxy' },
        { id: 's6', label: 'Attacker captures the session cookie and gains full account access' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5', 's6'],
      feedbackExplanation: 'Because the victim types the 6-digit code into the fake website, the attacker acts as a middleman, instantly passing the code to the real site and stealing the resulting authentication cookie.',
      proTip: '6-digit codes do NOT protect you from AiTM proxy phishing. Only FIDO2 keys and Passkeys prevent this attack.',
      readMoreLink: 'modules/mfa-authentication#aitm-attacks',
      scoreValue: 10
    },
    {
      id: 'ma-q4',
      type: 'OPEN_TEXT',
      topic: 'SMS vs Hardware Keys',
      questionText: 'Explain the primary security difference between SMS-based MFA and FIDO2 hardware keys (like YubiKey).',
      minWords: 15,
      expectedKeywords: ['sim', 'swap', 'intercept', 'phish', 'domain', 'cryptographic', 'hardware'],
      feedbackExplanation: 'SMS can be intercepted via SIM swapping and typed into a phishing site. Hardware keys use cryptography to verify the actual domain name, making them impervious to phishing even if the user is fooled.',
      proTip: 'If a site forces you to use SMS MFA, treat it as a high-risk account and use a very strong password.',
      readMoreLink: 'modules/mfa-authentication#sms-vs-fido',
      scoreValue: 10
    },
    {
      id: 'ma-q5',
      type: 'MCQ',
      topic: 'Number Matching',
      questionText: 'Why do modern authenticator apps require you to type a number shown on your computer screen into your phone ("Number Matching")?',
      options: [
        { key: 'A', text: 'To ensure your phone has a working internet connection.' },
        { key: 'B', text: 'To prevent MFA Fatigue attacks by proving you are actively looking at the login screen.' },
        { key: 'C', text: 'To verify that your computer and phone are on the same WiFi network.' },
        { key: 'D', text: 'To encrypt the connection between the phone and the server.' }
      ],
      correctOptionId: 'B',
      feedbackExplanation: 'Number matching completely eliminates MFA fatigue attacks. If an attacker spams you, you cannot "Approve" it because you cannot see the number displayed on the attacker\'s screen in Russia.',
      proTip: 'Always enable Number Matching in your Microsoft or Duo tenant settings.',
      readMoreLink: 'modules/mfa-authentication#number-matching',
      scoreValue: 10
    },
    {
      id: 'ma-q6',
      type: 'JUDGE',
      topic: 'OTP Scams',
      questionText: 'Is this text message request legitimate?',
      scenario: {
        senderName: 'SMS',
        senderEmail: '+1 (555) 0199',
        subject: 'iMessage',
        body: '"Hey! I accidentally used your phone number to recover my Instagram account. Can you send me the 6-digit code you just received?"',
        url: ''
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'This is an account takeover scam. The attacker is trying to reset YOUR password and needs the MFA code sent to your phone to complete the hijack.',
      proTip: 'Never, ever share a 6-digit code with anyone, regardless of their excuse. Legitimate services will never ask you to forward a code.',
      readMoreLink: 'modules/mfa-authentication#otp-scams',
      scoreValue: 10
    },
    {
      id: 'ma-q7',
      type: 'ORDER',
      topic: 'Setup Best Practices',
      questionText: 'Sequence the steps to properly set up MFA across a critical account.',
      steps: [
        { id: 'a1', label: 'Log into the account settings and navigate to Security/MFA' },
        { id: 'a2', label: 'Select "Authenticator App" or "Security Key" instead of SMS' },
        { id: 'a3', label: 'Scan the QR code with your app or register the hardware key' },
        { id: 'a4', label: 'Generate and securely store the offline backup recovery codes' },
        { id: 'a5', label: 'Log out and log back in to test the MFA workflow' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Always choose the strongest method available, register the device, and critically, ALWAYS save the backup codes. Testing the flow ensures you won\'t be locked out.',
      proTip: 'Without backup recovery codes, losing your phone means permanently losing access to your account.',
      readMoreLink: 'modules/mfa-authentication#setup',
      scoreValue: 10
    }
  ]
};
