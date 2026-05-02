import type { Question } from '../types';

export const hardQuestions: Question[] = [
  {
    id: "email_hard_01",
    type: "JUDGE",
    topic: "Spear Phishing",
    questionText: "Is this highly personalized email legitimate?",
    scenario: {
      subject: "Question regarding your Q3 Marketing Strategy presentation",
      senderName: "David Chen (SVP Operations)",
      senderEmail: "d.chen@company-corp.com",
      body: "Hi [User Name], I saw your presentation on the drive. Great work on the APAC segment. I had a quick question about the conversion data on slide 14. Could you please take a look at the attached notes and let me know your thoughts?",
      attachment: { name: "notes_on_presentation.docx", type: "document", size: "128KB" }
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "This is a spear phishing attack. The attacker has used public info (OSINT) to learn your role and current projects. The red flag is the domain 'company-corp.com'—your company's official domain is just 'company.com'.",
      proTip: "The more specific and accurate an email is, the more dangerous it can be. Never lower your guard just because the sender knows your name and projects.",
      redFlags: ["Subtle domain variation (extra -corp)", "Use of internal project names to build trust", "Unexpected attachment from a senior executive"]
    }
  },
  {
    id: "email_hard_02",
    type: "MCQ",
    topic: "Zero-Day Scenarios",
    questionText: "You receive an email from a legitimate vendor's actual account, but the content is unusual. They are asking you to click a link to 'View a secure message' which leads to a Microsoft login page. What is likely happening?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "The vendor's account has been compromised via session hijacking." },
      { id: "b", key: "B", text: "Microsoft has updated their security portal for vendors." },
      { id: "c", key: "C", text: "It's a legitimate encrypted message service (like O365 Message Encryption)." },
      { id: "d", key: "D", text: "The vendor is testing your security awareness." }
    ],
    correctOptionId: "a",
    scoreValue: 10,
    feedback: {
      explanation: "This is 'Living off the Land' phishing. Attackers compromise a real account and then use it to send phishing links that appear to be internal or system-generated, making them nearly impossible to detect via technical filters.",
      proTip: "If a known contact sends you something that requires a 'login' you've never used before, verify it via a phone call.",
      redFlags: ["Compromised legitimate source", "Unexpected request for credentials"]
    }
  },
  {
    id: "email_hard_03",
    type: "SPOT",
    topic: "Zero-Trust Application",
    questionText: "Identify the subtle indicators in this nearly-perfect fake.",
    scenario: {
      subject: "Policy Update: Remote Work Agreement",
      senderName: "HR Compliance",
      senderEmail: "compliance@company.com",
      body: "Please sign the updated Remote Work Agreement by EOD. Failure to comply may affect payroll processing.",
      url: "https://company.okta-sign.in/login"
    },
    redFlags: [
      { id: "rf1", x: 60, y: 30, label: "Pressure Tactic", explanation: "Linking compliance to payroll processing is a common high-pressure manipulation." },
      { id: "rf2", x: 60, y: 75, label: "Deceptive URL", explanation: "The domain is 'okta-sign.in', not your official 'okta.com' portal." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers often use official-sounding subdomains (like company.okta-...) on malicious primary domains (sign.in) to bypass visual inspection.",
      proTip: "Okta and other SSO providers will always be on their official domains, not '.in' or other TLDs unless specified by your IT.",
      redFlags: ["Payroll-based coercion", "Lookalike SSO portal"]
    }
  },
  {
    id: "email_hard_04",
    type: "FILL_BLANK",
    topic: "Advanced Mitigation",
    questionText: "What is the most secure type of MFA that is resistant to phishing and session hijacking?",
    scenario: {},
    blanks: [
      { id: "b1", textBefore: "Hardware security keys using the ", textAfter: " standard are currently the only phishing-proof MFA.", correctAnswer: "FIDO2" }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "FIDO2/WebAuthn uses origin-bound cryptography, meaning the key will only work on the real site and cannot be tricked by a phishing proxy.",
      proTip: "If your role handles highly sensitive data, request a physical security key (like a YubiKey).",
      redFlags: ["Insecure MFA methods (SMS/Push)"]
    }
  },
  {
    id: "email_hard_05",
    type: "CLASSIFY",
    topic: "Attacker Archetypes",
    questionText: "Match the attack characteristic to the likely threat actor.",
    scenario: {},
    items: [
      { id: "i1", text: "Custom malware and multi-stage infection", category: "APT / Nation State" },
      { id: "i2", text: "Mass-scale 'Account Locked' emails", category: "Cybercrime Syndicate" },
      { id: "i3", text: "Targeting one specific company for IP", category: "Corporate Espionage" },
      { id: "i4", text: "Defacing a site for political reasons", category: "Hacktivist" }
    ],
    categories: ["APT / Nation State", "Cybercrime Syndicate", "Corporate Espionage", "Hacktivist"],
    scoreValue: 10,
    feedback: {
      explanation: "Knowing your adversary helps in understanding the level of sophistication you should expect in their phishing attempts.",
      proTip: "Nation-state actors can spend months crafting a single perfect email for one person.",
      redFlags: ["Advanced persistent threats"]
    }
  },
  {
    id: "email_hard_06",
    type: "ORDER",
    topic: "Threat Hunting",
    questionText: "Order the steps of a threat hunt initiated by a reported phishing email.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Extract indicators (URLs, file hashes, IPs)" },
      { id: "o2", text: "Search mail logs for all recipients of the email" },
      { id: "o3", text: "Search web logs for any hits to the malicious URL" },
      { id: "o4", text: "Purge the email from all user mailboxes" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "A proactive defense involves assuming that if one person saw it, many others did too.",
      proTip: "One report from an alert user can save the entire company from a major breach.",
      redFlags: ["Organizational-wide risk"]
    }
  },
  {
    id: "email_hard_07",
    type: "OPEN_TEXT",
    topic: "Psychological Manipulation",
    questionText: "Why do attackers often use 'Positive' lures (like a bonus or promotion) instead of just 'Negative' ones (like a security alert)?",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Positive lures exploit 'Greed' and 'Excitement', which can be just as effective as 'Fear'. When people are excited, they tend to be less skeptical and more likely to click 'Enable Content' to see the details of their reward.",
      proTip: "Be just as suspicious of a 'Bonus' as you are of a 'Warning'.",
      redFlags: ["Excitement-based manipulation"]
    }
  },
  {
    id: "email_hard_08",
    type: "JUDGE",
    topic: "Trap Analysis",
    questionText: "Is this automated system alert a phishing trap or a legitimate message?",
    scenario: {
      subject: "Critical: Low Disk Space on Production Server srv-db-04",
      senderName: "System Monitor",
      senderEmail: "alerts@monitoring.company.com",
      body: "Server srv-db-04 is at 98% capacity. This will impact database writes within the next 30 minutes. Please acknowledge and view the log details here: https://monitoring.company.com/logs/srv-db-04/auth=99283",
      headers: { "X-Priority": "1 (Highest)", "X-Mailer": "Internal-Monitoring-Agent-v4" }
    },
    isFake: false,
    scoreValue: 10,
    feedback: {
      explanation: "This is a legitimate system alert. The domain is correct, the internal server name matches your environment, and it follows the established format for monitoring alerts.",
      proTip: "Zero Trust doesn't mean 'Never Trust'—it means 'Verify before trusting'. In this case, the verification passes.",
      redFlags: ["High urgency (but legitimate context)"]
    }
  },
  {
    id: "email_hard_09",
    type: "MCQ",
    topic: "Header Forgery",
    questionText: "Which header is most reliable for determining the *actual* originating IP of an email?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "The 'From' header" },
      { id: "b", key: "B", text: "The 'Received' header (specifically the bottom-most one)" },
      { id: "c", key: "C", text: "The 'Return-Path' header" },
      { id: "d", key: "D", text: "The 'Message-ID' header" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "The 'Received' headers are added by each mail server as the message travels. The bottom-most 'Received' header shows the first server that touched the email, revealing the sender's true IP.",
      proTip: "The 'From' and 'Reply-To' headers can be completely fabricated by the sender's client.",
      redFlags: ["Header forgery"]
    }
  },
  {
    id: "email_hard_10",
    type: "SPOT",
    topic: "Attacker Decision Points",
    questionText: "Identify the 'Attacker Traps'—elements designed to look suspicious but are actually meant to distract you from the real threat.",
    scenario: {
      body: "An email with a glaring typo in the first sentence ('Urgent Action Needed!!'), but the actual payload is a hidden tracking pixel that records your location and device info just by opening the email."
    },
    redFlags: [
      { id: "rf1", x: 20, y: 20, label: "Obvious Typo (The Trap)", explanation: "The typo draws your attention, making you think it's a 'clumsy' attacker while you miss the silent background activity." },
      { id: "rf2", x: 80, y: 10, label: "Tracking Pixel (The Real Threat)", explanation: "A hidden 1x1 image that notifies the attacker when and where the email was opened." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Sophisticated attackers use 'Noise' (obvious errors) to make you feel superior and overconfident, leading you to ignore subtle, more dangerous background threats.",
      proTip: "Even if an email looks 'stupid', don't underestimate the person who sent it.",
      redFlags: ["Deceptive obviousness", "Tracking pixels"]
    }
  },
  {
    id: "email_hard_11",
    type: "JUDGE",
    topic: "Supply Chain Compromise",
    questionText: "Is this bank account update from your regular cleaning service vendor safe?",
    scenario: {
      subject: "Updated Bank Information for Future Payments",
      senderName: "Accounts @ Sparkle Cleaning",
      senderEmail: "accounts@sparkle-cleaning.in",
      body: "Hello, we have transitioned to a new banking partner. Please update our details in your system for the next invoice cycle. [Official-looking PDF attached with bank details]",
      attachment: { name: "Banking_Details_2024.pdf", type: "pdf", size: "450KB" }
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "This is a classic 'Invoice Fraud' or 'Payment Redirection' attack. Even if the domain is correct, any change in financial details MUST be verified via a second, out-of-band channel like a known phone number.",
      proTip: "Never trust an email for bank detail changes, even from a trusted partner.",
      redFlags: ["Unsolicited financial change", "Reliance on email for banking updates"]
    }
  },
  {
    id: "email_hard_12",
    type: "FILL_BLANK",
    topic: "DMARC Policies",
    questionText: "What is the DMARC policy that instructs the receiving server to completely discard the email if it fails SPF/DKIM?",
    scenario: {},
    blanks: [
      { id: "b1", textBefore: "A DMARC policy of p=", textAfter: " will ensure that failing emails are never seen by the user.", correctAnswer: "reject" }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) allows domain owners to set a policy (none, quarantine, or reject) for what to do with unauthenticated mail.",
      proTip: "Check your company's DMARC policy; 'reject' is the gold standard for security.",
      redFlags: ["Weak DMARC policy"]
    }
  },
  {
    id: "email_hard_13",
    type: "ORDER",
    topic: "Spear Phishing Research",
    questionText: "Order how an attacker builds a spear-phishing profile using OSINT.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Search LinkedIn for targets with specific software skills" },
      { id: "o2", text: "Find company conference photos on Twitter to see ID badge styles" },
      { id: "o3", text: "Identify internal project code-names from public GitHub repos" },
      { id: "o4", text: "Craft a lure that mentions a specific project and uses internal terminology" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "Your 'Digital Footprint' provides the bricks that attackers use to build a wall of trust around their lies.",
      proTip: "Be careful about what company-specific details you share on personal social media.",
      redFlags: ["OSINT-based targeting"]
    }
  },
  {
    id: "email_hard_14",
    type: "MCQ",
    topic: "Advanced Domain Spoofing",
    questionText: "What is a 'Subdomain Takeover'?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Registering a domain that looks like a subdomain (e.g. apple-support.com)" },
      { id: "b", key: "B", text: "Gaining control of a legitimate subdomain that points to a deleted cloud service." },
      { id: "c", key: "C", text: "Changing the MX records of a domain to steal its email." },
      { id: "d", key: "D", text: "Creating 100+ subdomains on a malicious site." }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "If a company has a DNS record pointing a subdomain (dev.company.com) to a cloud service they no longer use, an attacker can register that cloud service name and host a perfectly legitimate-looking phishing site on the company's own domain.",
      proTip: "These are the most dangerous attacks because the URL *is* actually legitimate.",
      redFlags: ["Dangling DNS records"]
    }
  },
  {
    id: "email_hard_15",
    type: "OPEN_TEXT",
    topic: "AI in Phishing",
    questionText: "How does Generative AI (like ChatGPT) make phishing more difficult for the average user to detect?",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "AI eliminates the 'classic' red flags like poor grammar, spelling mistakes, and unnatural phrasing. It allows attackers to generate perfect, professional, and highly personalized lures in seconds, in any language.",
      proTip: "In the age of AI, you can no longer rely on 'bad English' to spot a scam.",
      redFlags: ["AI-generated perfection"]
    }
  }
];
