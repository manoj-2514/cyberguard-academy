import type { Question } from '../types';

export const easyQuestions: Question[] = [
  // ─────────────────────────────────────────────────────────
  // JUDGE QUESTIONS (6 total) - Simple Binary Real/Fake
  // ─────────────────────────────────────────────────────────
  {
    id: "email_easy_j1",
    type: "JUDGE",
    topic: "Sender Spoofing",
    questionText: "Is this email legitimate or a phishing attempt?",
    scenario: {
      subject: "Security Alert: Unauthorized Login",
      senderName: "Google Security",
      senderEmail: "security-noreply@g00gle.com",
      body: "We detected a login to your account from a new device in Moscow, Russia. If this was not you, please click the link below to secure your account immediately."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "The sender's domain 'g00gle.com' uses zeros instead of the letter 'o', a classic lookalike domain tactic.",
      proTip: "Always inspect the sender's actual email address, not just the display name.",
      redFlags: ["Lookalike domain (g00gle.com)", "Unusual location alert", "Urgent language"]
    }
  },
  {
    id: "email_easy_j2",
    type: "JUDGE",
    topic: "Brand Impersonation",
    questionText: "Is this Netflix subscription email real?",
    scenario: {
      subject: "Your subscription is about to expire",
      senderName: "Netflix",
      senderEmail: "info@mailer.netflix-online.com",
      body: "Update your payment details to avoid interruption of service. Your account will be closed if not updated in 24 hours."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "The domain 'netflix-online.com' is not the official 'netflix.com' domain.",
      proTip: "Official emails from major brands always come from their primary domain.",
      redFlags: ["Non-official domain", "Threat of service interruption"]
    }
  },
  {
    id: "email_easy_j3",
    type: "JUDGE",
    topic: "Internal Spoofing",
    questionText: "Is this internal HR email legitimate?",
    scenario: {
      subject: "New Policy Document",
      senderName: "HR Department",
      senderEmail: "hr-portal@company-intranet.co",
      body: "Please review the updated employee handbook attached below for the new calendar year."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "The domain ends in '.co' instead of the official company '.com' TLD. Attackers hope you won't notice the missing 'm'.",
      proTip: "Check every character of the domain—don't just skim.",
      redFlags: ["TLD Swap (.co vs .com)"]
    }
  },
  {
    id: "email_easy_j4",
    type: "JUDGE",
    topic: "Official Communication",
    questionText: "Is this bank notification real?",
    scenario: {
      subject: "Action Required: Account Verification",
      senderName: "HDFC Bank",
      senderEmail: "alerts@hdfcbk-india.net",
      body: "Dear Customer, your net banking access is temporarily suspended. Click here to verify your identity and restore access."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Banks never use '.net' or complex hyphenated domains for security alerts. Official communication comes from their registered domain.",
      proTip: "Never click links in bank emails; type the bank's URL directly in your browser.",
      redFlags: ["Deceptive domain", "Generic greeting", "Fear tactic"]
    }
  },
  {
    id: "email_easy_j5",
    type: "JUDGE",
    topic: "Urgent Lures",
    questionText: "Is this shipping notification legitimate?",
    scenario: {
      subject: "Delivery Failed - Action Required",
      senderName: "FedEx Delivery",
      senderEmail: "no-reply@fedex-tracking-id882.org",
      body: "We attempted to deliver your package today but were unsuccessful. Please pay the $1.50 rescheduling fee to avoid the package being returned."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "FedEx uses 'fedex.com'. Domains like 'fedex-tracking-id882.org' are traps used to steal credit card info.",
      proTip: "Unexpected shipping fees via email are almost always scams.",
      redFlags: ["Non-matching domain", "Financial demand"]
    }
  },
  {
    id: "email_easy_j6",
    type: "JUDGE",
    topic: "Social Media Alerts",
    questionText: "Is this Facebook password reset real?",
    scenario: {
      subject: "Password Reset Request",
      senderName: "Facebook Security",
      senderEmail: "security@facebook-mail-support.com",
      body: "Did you just request a password reset? If not, please click the button below to secure your account."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Official Facebook security emails come from @facebookmail.com. The extra hyphens and 'support' are signs of a fake domain.",
      proTip: "Verify security alerts through the official app settings, not email links.",
      redFlags: ["Complex lookalike domain"]
    }
  },

  // ─────────────────────────────────────────────────────────
  // MCQ QUESTIONS (5 total) - Obvious, Non-Tricky Options
  // ─────────────────────────────────────────────────────────
  {
    id: "email_easy_m1",
    type: "MCQ",
    topic: "Urgency Tactic",
    questionText: "Why do attackers use '4 hours left' or 'Immediate action' in their emails?",
    scenario: {
      subject: "URGENT: Your account will be DELETED in 4 hours",
      body: "Verify your identity within 4 hours to prevent permanent data loss."
    },
    options: [
      { id: "a", key: "A", text: "To make you panic and click without thinking" },
      { id: "b", key: "B", text: "To help you secure your account quickly" },
      { id: "c", key: "C", text: "To show they care about your security" },
      { id: "d", key: "D", text: "Because servers delete data every 4 hours" }
    ],
    correctOptionId: "a",
    scoreValue: 10,
    feedback: {
      explanation: "Extreme urgency is designed to bypass your logical thinking and force a fast mistake.",
      proTip: "If an email makes you panic, it's probably a scam.",
      redFlags: ["Artificial urgency"]
    }
  },
  {
    id: "email_easy_m2",
    type: "MCQ",
    topic: "Hyperlink Safety",
    questionText: "What is the safest way to check where a button link really goes?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Click the button to see the website" },
      { id: "b", key: "B", text: "Hover your mouse over the button without clicking" },
      { id: "c", key: "C", text: "Double-click the button rapidly" },
      { id: "d", key: "D", text: "Trust the text written on the button" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "Hovering over a link or button reveals the actual destination URL in the corner of your browser.",
      proTip: "The text on a button can be anything; the 'hover' reveals the truth.",
      redFlags: ["Hidden link destinations"]
    }
  },
  {
    id: "email_easy_m3",
    type: "MCQ",
    topic: "Official Verification",
    questionText: "You receive an urgent email from your 'CEO' asking for a wire transfer. What should you do?",
    scenario: {
      senderName: "CEO",
      body: "I'm in a meeting and need this vendor paid immediately. Do not call me, just do it."
    },
    options: [
      { id: "a", key: "A", text: "Process the payment immediately as requested" },
      { id: "b", key: "B", text: "Reply to the email and ask for confirmation" },
      { id: "c", key: "C", text: "Call the CEO on a known number to verify the request" },
      { id: "d", key: "D", text: "Forward it to a colleague to get their opinion" }
    ],
    correctOptionId: "c",
    scoreValue: 10,
    feedback: {
      explanation: "Attackers impersonate executives (CEO fraud) to use authority to bypass rules. Always verify via a different channel.",
      proTip: "Official financial requests should always follow a secondary verification process.",
      redFlags: ["Authority impersonation", "Urgency", "Request for secrecy"]
    }
  },
  {
    id: "email_easy_m4",
    type: "MCQ",
    topic: "Attachment Safety",
    questionText: "An unexpected email has a file named 'invoice_882.zip'. What is the risk?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "It's a compressed file, so it's safer than a PDF" },
      { id: "b", key: "B", text: "It's just a bunch of documents zipped together" },
      { id: "c", key: "C", text: "It may contain malware (viruses) that infects your PC" },
      { id: "d", key: "D", text: "ZIP files are always deleted by email filters automatically" }
    ],
    correctOptionId: "c",
    scoreValue: 10,
    feedback: {
      explanation: "Compressed files (.zip, .rar) are commonly used to hide malicious software from basic scanners.",
      proTip: "Never open unexpected attachments, especially ZIP or EXE files.",
      redFlags: ["High-risk file type", "Unexpected source"]
    }
  },
  {
    id: "email_easy_m5",
    type: "MCQ",
    topic: "Grammar Red Flags",
    questionText: "Why is poor grammar and spelling a sign of phishing?",
    scenario: {
      body: "Dear Valued Custommer, we have detect abnormaly activity on your account. Please kindly update."
    },
    options: [
      { id: "a", key: "A", text: "Major companies have editors and professional systems" },
      { id: "b", key: "B", text: "Attackers are just bad at typing" },
      { id: "c", key: "C", text: "The email server corrupts the text" },
      { id: "d", key: "D", text: "It's a secret code for the recipient" }
    ],
    correctOptionId: "a",
    scoreValue: 10,
    feedback: {
      explanation: "Official brand communication is polished. Basic errors are often a sign of an automated or overseas phishing template.",
      proTip: "Read suspicious emails out loud; unnatural phrasing becomes obvious.",
      redFlags: ["Poor grammar", "Generic greeting"]
    }
  },

  // ─────────────────────────────────────────────────────────
  // SPOT QUESTIONS (4 total) - Clickable indicators
  // ─────────────────────────────────────────────────────────
  {
    id: "email_easy_s1",
    type: "SPOT",
    topic: "Gift Card Lure",
    questionText: "Identify the obvious red flags in this prize notification.",
    scenario: {
      subject: "You have won a $1,000 Amazon Gift Card!",
      senderName: "Amazon Rewards",
      senderEmail: "rewards@win-prizes-now.net",
      body: "Congratulations! You were selected as the winner. Click here to claim your $1,000 Amazon Gift Card before it expires!"
    },
    redFlags: [
      { id: "rf1", x: 40, y: 15, label: "Fake Sender", explanation: "'win-prizes-now.net' is not Amazon." },
      { id: "rf2", x: 50, y: 60, label: "Too Good To Be True", explanation: "Winning a large prize for a contest you didn't enter is a classic lure." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "This email uses a 'Greed' lure combined with a deceptive sender domain.",
      proTip: "If you didn't enter a contest, you didn't win it.",
      redFlags: ["Suspicious domain", "Unrealistic prize"]
    }
  },
  {
    id: "email_easy_s2",
    type: "SPOT",
    topic: "Domain Visuals",
    questionText: "Where is the deceptive part of this sender address?",
    scenario: {
      senderName: "Microsoft Support",
      senderEmail: "support-microsoft-security@gmail.com",
      body: "Your Windows license is expiring. Please renew now."
    },
    redFlags: [
      { id: "rf1", x: 60, y: 10, label: "Free Email Provider", explanation: "Microsoft will never use @gmail.com for official support." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Major brands use their own domains. Using a free service like Gmail is an immediate red flag.",
      proTip: "Verify the sender domain, not just the display name.",
      redFlags: ["Public email provider used by brand"]
    }
  },
  {
    id: "email_easy_s3",
    type: "SPOT",
    topic: "Tone and Urgency",
    questionText: "Find the elements designed to make you panic.",
    scenario: {
      subject: "CRITICAL: Account Termination in 2 Hours",
      body: "We have detected illegal activity. To avoid police reporting and termination, verify now."
    },
    redFlags: [
      { id: "rf1", x: 10, y: 10, label: "Extreme Urgency", explanation: "'2 Hours' is a very short window used to force a rush." },
      { id: "rf2", x: 20, y: 60, label: "Threat of Action", explanation: "Threatening 'police reporting' is a classic fear tactic." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers use fear and strict deadlines to override your critical thinking skills.",
      proTip: "Legitimate security alerts don't threaten you with the police.",
      redFlags: ["Fear-based lure", "Extreme urgency"]
    }
  },
  {
    id: "email_easy_s4",
    type: "SPOT",
    topic: "Suspicious Links",
    questionText: "Spot the suspicious parts of this login request.",
    scenario: {
      subject: "Login attempt from new device",
      senderEmail: "security@account-lock-notice.top",
      body: "Was this you? If not, click the button below to secure your account."
    },
    redFlags: [
      { id: "rf1", x: 60, y: 10, label: "Untrusted TLD", explanation: "The '.top' TLD is frequently used for malicious sites." },
      { id: "rf2", x: 30, y: 15, label: "Vague Domain", explanation: "'account-lock-notice' is a generic domain that doesn't name a company." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Legitimate companies use their actual brand name in the domain, not generic phrases like 'account-lock'.",
      proTip: "Look for the specific brand name in the sender email.",
      redFlags: ["Generic suspicious domain"]
    }
  },

  // ─────────────────────────────────────────────────────────
  // CLASSIFY QUESTIONS (4 total) - Categorization
  // ─────────────────────────────────────────────────────────
  {
    id: "email_easy_c1",
    type: "CLASSIFY",
    topic: "Risk Levels",
    questionText: "Categorize these email elements by their risk level.",
    scenario: {},
    items: [
      { id: "i1", text: "Email from your actual colleague's address", category: "SAFE" },
      { id: "i2", text: "Link pointing to 'g00gle.com' (with zeros)", category: "HIGH" },
      { id: "i3", text: "PDF attachment from a known client", category: "LOW" },
      { id: "i4", text: "Request for your password via email", category: "HIGH" }
    ],
    categories: ["HIGH", "MEDIUM", "LOW", "SAFE"],
    scoreValue: 10,
    feedback: {
      explanation: "Lookalike domains and requests for credentials are always high risk.",
      proTip: "Never share your password via email, even if asked by 'IT'.",
      redFlags: ["Credential harvesting", "Lookalike domains"]
    }
  },
  {
    id: "email_easy_c2",
    type: "CLASSIFY",
    topic: "Common Lures",
    questionText: "Match the phishing lure to its emotional trigger.",
    scenario: {},
    items: [
      { id: "i1", text: "Your account is LOCKED", category: "Fear" },
      { id: "i2", text: "You won a PRIZE", category: "Greed" },
      { id: "i3", text: "Do this in 5 MINUTES", category: "Urgency" },
      { id: "i4", text: "HR requests your update", category: "Authority" }
    ],
    categories: ["Fear", "Greed", "Urgency", "Authority"],
    scoreValue: 10,
    feedback: {
      explanation: "Understanding emotional triggers helps you pause and analyze the email logically.",
      proTip: "Recognize the emotional 'hook' before you click.",
      redFlags: ["Psychological manipulation"]
    }
  },
  {
    id: "email_easy_c3",
    type: "CLASSIFY",
    topic: "Domain Types",
    questionText: "Sort these domains into Real vs Fake categories.",
    scenario: {},
    items: [
      { id: "i1", text: "microsoft.com", category: "Real" },
      { id: "i2", text: "micros0ft-security.net", category: "Fake" },
      { id: "i3", text: "amazon.co.uk", category: "Real" },
      { id: "i4", text: "amzn-giftcards.win", category: "Fake" }
    ],
    categories: ["Real", "Fake"],
    scoreValue: 10,
    feedback: {
      explanation: "Real domains are short, branded, and use standard TLDs. Fake ones use typos, hyphens, and unusual TLDs.",
      proTip: "Compare suspicious domains to the company's known homepage.",
      redFlags: ["Typosquatting", "Domain variation"]
    }
  },
  {
    id: "email_easy_c4",
    type: "CLASSIFY",
    topic: "Action Steps",
    questionText: "Is this action Safe or Dangerous?",
    scenario: {},
    items: [
      { id: "i1", text: "Hovering over a link", category: "Safe" },
      { id: "i2", text: "Downloading a ZIP file", category: "Dangerous" },
      { id: "i3", text: "Replying with your phone number", category: "Dangerous" },
      { id: "i4", text: "Calling the sender's official office", category: "Safe" }
    ],
    categories: ["Safe", "Dangerous"],
    scoreValue: 10,
    feedback: {
      explanation: "Safe actions involve observation and out-of-band verification. Dangerous ones involve interacting with the email directly.",
      proTip: "When in doubt, verify through a different channel (phone, portal).",
      redFlags: ["Direct interaction risks"]
    }
  }
];
