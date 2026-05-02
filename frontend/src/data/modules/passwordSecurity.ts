import type { SimulationModuleDef } from './types';

export const passwordSecurityModule: SimulationModuleDef = {
  id: 'password-security',
  title: 'Password Security',
  category: 'Account Security',
  difficulty: 'Beginner',
  questions: [
    {
      id: 'ps-q1',
      type: 'JUDGE',
      topic: 'Password Policies',
      questionText: 'Is this password policy strong or weak? "Minimum 8 characters, must contain at least one uppercase letter and one number. Must be changed every 30 days."',
      scenario: {
        senderName: 'IT Policy Board',
        senderEmail: 'it@company.com',
        subject: 'New Password Policy',
        body: 'Minimum 8 characters.\nMust contain at least one uppercase letter and one number.\nMust be changed every 30 days.',
        url: ''
      },
      correctAnswer: 'FAKE', // Using FAKE to mean "Weak" in the Judge context, or I should use TRUE/FALSE but JUDGE only has REAL/FAKE. Let's frame it as "Is this a secure policy?"
      feedbackExplanation: 'This is a weak, outdated policy. Modern NIST guidelines recommend longer passphrases (15+ chars), removing arbitrary complexity requirements, and eliminating mandatory 30-day expiration which leads to predictable password cycling (e.g., Summer2024!).',
      proTip: 'Length beats complexity. A 20-character phrase is much stronger than an 8-character complex password.',
      readMoreLink: 'modules/password-security#modern-policies',
      scoreValue: 10
    },
    {
      id: 'ps-q2',
      type: 'CLASSIFY',
      topic: 'Password Evaluation',
      questionText: 'Drag each password into the correct strength category.',

      items: [
        { id: 'i1', label: 'correct horse battery staple' },
        { id: 'i2', label: 'Tr0ub4dor&3' },
        { id: 'i3', label: 'password123' },
        { id: 'i4', label: 'P@ssw0rd2024!' },
        { id: 'i5', label: 'MyDogBuster12' },
        { id: 'i6', label: 'qwertyuiop' },
        { id: 'i7', label: '1v9#kP2$mLq8!zX' },
        { id: 'i8', label: 'admin' }
      ],
      correctMapping: {
        'i1': 'c-strong', // 28 chars, passphrase
        'i2': 'c-medium', // complex but short
        'i3': 'c-comp',   // well known
        'i4': 'c-weak',   // predictable complexity
        'i5': 'c-weak',   // predictable pattern
        'i6': 'c-comp',   // well known keyboard walk
        'i7': 'c-strong', // random generated
        'i8': 'c-comp'    // default
      },
      feedbackExplanation: 'Passphrases and generated random strings are strong. Predictable substitutions (P@ssw0rd) are weak. Common defaults are already compromised.',
      proTip: 'Use a password manager to generate random passwords for every site, and only memorize your master password.',
      readMoreLink: 'modules/password-security#evaluating-strength',
      scoreValue: 10
    },
    {
      id: 'ps-q3',
      type: 'ORDER',
      topic: 'Breach Response',
      questionText: 'Arrange the steps for responding to a data breach involving your password.',
      steps: [
        { id: 's1', label: 'Change the password on the breached site immediately' },
        { id: 's2', label: 'Enable Multi-Factor Authentication (MFA) on the account' },
        { id: 's3', label: 'Verify the breach notification is legitimate (not phishing)' },
        { id: 's4', label: 'Check if you reused that password on other accounts' },
        { id: 's5', label: 'Change the reused password on all affected accounts' }
      ],
      correctOrderIds: ['s3', 's1', 's4', 's5', 's2'],
      feedbackExplanation: 'Always verify the alert first. Then secure the breached account, identify where else you reused the password, secure those accounts, and finally enforce MFA.',
      proTip: 'Never click links in breach notification emails. Navigate to the service manually to change your password.',
      readMoreLink: 'modules/password-security#breach-response',
      scoreValue: 10
    },
    {
      id: 'ps-q4',
      type: 'OPEN_TEXT',
      topic: 'Attack Vectors',
      questionText: 'Explain how a credential stuffing attack works.',
      minWords: 15,
      expectedKeywords: ['breach', 'reuse', 'automated', 'bot', 'stolen', 'credentials', 'passwords', 'multiple', 'accounts'],
      feedbackExplanation: 'Credential stuffing is an automated attack where lists of compromised usernames and passwords from one breach are tested against other websites, exploiting users who reuse passwords.',
      proTip: 'Password reuse is the sole reason credential stuffing works. Using unique passwords entirely neutralizes this attack vector.',
      readMoreLink: 'modules/password-security#credential-stuffing',
      scoreValue: 10
    },
    {
      id: 'ps-q5',
      type: 'MCQ',
      topic: 'Password Managers',
      questionText: 'Which password manager feature is most critical for defending against phishing?',
      options: [
        { id: 'opt1', text: 'Secure password sharing with team members' },
        { id: 'opt2', text: 'Auto-fill functionality matching exact domain URLs' },
        { id: 'opt3', text: 'Cross-device synchronization' },
        { id: 'opt4', text: 'Dark web breach monitoring' }
      ],
      correctOptionId: 'opt2',
      feedbackExplanation: 'Password managers will refuse to auto-fill credentials on lookalike domains (like paypaI.com instead of paypal.com) because the URL does not exactly match the saved record, acting as a foolproof anti-phishing defense.',
      proTip: 'If your password manager doesn\'t automatically fill your password on a familiar site, stop and double-check the URL.',
      readMoreLink: 'modules/password-security#password-managers',
      scoreValue: 10
    },
    {
      id: 'ps-q6',
      type: 'JUDGE',
      topic: 'Reset Requests',
      questionText: 'Is this unexpected password reset email legitimate or a scam?',
      scenario: {
        senderName: 'Microsoft Account Team',
        senderEmail: 'account-security@microsoft-alerts.com',
        subject: 'Microsoft account password reset',
        body: 'We received a request to reset your password.\n\nIf you did not make this request, click the link below to cancel it and secure your account immediately.',
        url: 'https://microsoft-alerts.com/cancel-reset'
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'This is a scam. Legitimate password reset emails will tell you to ignore the email if you did not request it. Scammers urge you to click a link to "cancel" the request, which leads to a phishing page.',
      proTip: 'If you receive an unexpected reset link, ignore it. Do not click links to "cancel" requests.',
      readMoreLink: 'modules/password-security#reset-scams',
      scoreValue: 10
    },
    {
      id: 'ps-q7',
      type: 'ORDER',
      topic: 'Lifecycle Best Practices',
      questionText: 'Sequence the best practices for creating and managing a new account password.',
      steps: [
        { id: 'a1', label: 'Use a password manager to generate a 20+ character random password' },
        { id: 'a2', label: 'Save the generated password in your secure vault' },
        { id: 'a3', label: 'Submit the new password to the website' },
        { id: 'a4', label: 'Enable Multi-Factor Authentication (MFA) immediately' },
        { id: 'a5', label: 'Store the MFA backup codes in a safe place' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Generate the password, save it securely before submitting (to avoid losing it), create the account, and immediately lock it down with MFA and secure the backup codes.',
      proTip: 'Always save your generated password into your vault *before* clicking submit on the registration page.',
      readMoreLink: 'modules/password-security#best-practices',
      scoreValue: 10
    }
  ]
};
