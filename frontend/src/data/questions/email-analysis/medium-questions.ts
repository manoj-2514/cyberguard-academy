import type { Question } from '../types';

export const mediumQuestions: Question[] = [
  {
    id: "email_med_01",
    type: "JUDGE",
    topic: "Homograph Attacks",
    questionText: "Examine the sender details carefully. Is this email legitimate?",
    scenario: {
      subject: "Action Required: Update your Microsoft account",
      senderName: "Microsoft Security",
      senderEmail: "account-security@microssoft.com",
      body: "We noticed a login from an unusual IP. Please verify your identity."
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "The domain 'microssoft.com' has an extra 's'. This is a subtle homograph attack that exploits visual similarity.",
      proTip: "Read the domain name character by character if the email feels suspicious.",
      redFlags: ["Subtle misspelling (microssoft.com)", "Unusual login alert"]
    }
  },
  {
    id: "email_med_02",
    type: "MCQ",
    topic: "Technical Verification",
    questionText: "You hover over a link and see 'https://support.amazon.co.uk-validate.info/login'. What is the primary domain?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "amazon.co.uk" },
      { id: "b", key: "B", text: "uk-validate.info" },
      { id: "c", key: "C", text: "amazon.co" },
      { id: "d", key: "D", text: "validate.info" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "The primary domain is the word immediately to the left of the TLD extension. Here, '.info' is the TLD, so 'uk-validate.info' is the actual domain.",
      proTip: "Attackers often use long subdomains that start with 'legitimate' brands to hide the real domain.",
      redFlags: ["Subdomain trickery", "Suspicious TLD (.info)"]
    }
  },
  {
    id: "email_med_03",
    type: "SPOT",
    topic: "Header Inspection",
    questionText: "Spot the technical red flags in this header snippet.",
    scenario: {
      headers: {
        "From": "\"Apple Support\" <support@apple.com>",
        "Return-Path": "<bounce-manager@cheap-hosting.biz>",
        "Reply-To": "<security-apple@mail-service.xyz>",
        "X-Mailer": "PHPMailer 5.2.14"
      }
    },
    redFlags: [
      { id: "rf1", x: 30, y: 25, label: "Return-Path Mismatch", explanation: "The Return-Path points to a cheap hosting service, not Apple's servers." },
      { id: "rf2", x: 30, y: 45, label: "Reply-To Discrepancy", explanation: "Replies are directed to a suspicious .xyz domain instead of apple.com." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "Attackers can easily forge the 'From' address, but 'Return-Path' and 'Reply-To' often reveal the true source or destination.",
      proTip: "Check the 'Reply-To' field; if it doesn't match the 'From' domain, be extremely cautious.",
      redFlags: ["Return-Path mismatch", "Suspicious Reply-To"]
    }
  },
  {
    id: "email_med_04",
    type: "FILL_BLANK",
    topic: "Email Protocols",
    questionText: "Which protocol is used to verify that an email was actually sent by the domain owner?",
    scenario: {},
    blanks: [
      { id: "b1", textBefore: "The ", textAfter: " protocol uses cryptographic signatures to verify the sender's domain.", correctAnswer: "DKIM" }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "DKIM (DomainKeys Identified Mail) provides a way to validate a domain name identity that is associated with a message through cryptographic authentication.",
      proTip: "Modern email clients often show a 'shield' or 'verified' icon if DKIM/SPF checks pass.",
      redFlags: ["Lack of authentication signatures"]
    }
  },
  {
    id: "email_med_05",
    type: "CLASSIFY",
    topic: "Attack Variants",
    questionText: "Classify these specific phishing variants.",
    scenario: {},
    items: [
      { id: "i1", text: "CEO asking for a wire transfer", category: "Whaling" },
      { id: "i2", text: "Targeting developers with a fake SDK", category: "Spear Phishing" },
      { id: "i3", text: "Mass email about a generic bonus", category: "Bulk Phishing" },
      { id: "i4", text: "Voice call about a fake bank fraud", category: "Vishing" }
    ],
    categories: ["Whaling", "Spear Phishing", "Bulk Phishing", "Vishing"],
    scoreValue: 10,
    feedback: {
      explanation: "Understanding specific attack types helps in identifying the likely goals of the attacker.",
      proTip: "The more personalized an email is, the higher the risk (Spear Phishing).",
      redFlags: ["Targeted manipulation"]
    }
  },
  {
    id: "email_med_06",
    type: "ORDER",
    topic: "Incident Response",
    questionText: "Order the response steps after accidentally clicking a phishing link.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Disconnect the device from the network" },
      { id: "o2", text: "Change passwords for the compromised account" },
      { id: "o3", text: "Enable MFA on all related accounts" },
      { id: "o4", text: "Contact the IT/Security department" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "Immediate isolation prevents the spread of malware or further data theft.",
      proTip: "Speed is critical in incident response—every second counts.",
      redFlags: ["Post-compromise actions"]
    }
  },
  {
    id: "email_med_07",
    type: "OPEN_TEXT",
    topic: "Attacker Methodology",
    questionText: "Explain how an attacker might use an 'Open Redirect' on a legitimate site to make a phishing link more convincing.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Open redirects allow attackers to create links like 'https://google.com/url?q=http://malicious.com'. The user sees 'google.com' and trusts the link, but is immediately redirected to the phishing site.",
      proTip: "Always look at the *final* destination of a link, not just the starting domain.",
      redFlags: ["Open redirect abuse"]
    }
  },
  {
    id: "email_med_08",
    type: "JUDGE",
    topic: "Sophisticated Spoofing",
    questionText: "Is this internal IT notification legitimate?",
    scenario: {
      subject: "Mandatory Security Update for Workstations",
      senderName: "IT Support",
      senderEmail: "it-support@company.com",
      body: "Please download and run the attached diagnostic tool to ensure your system is compliant with the new security policy.",
      attachment: { name: "security_patch.exe", type: "executable", size: "2.4MB" }
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "Internal IT will almost never send executable files (.exe) via email. Updates are typically managed through automated systems like SCCM or JAMF.",
      proTip: "Be wary of internal emails that bypass standard software delivery channels.",
      redFlags: ["Executable attachment", "Deviation from standard process"]
    }
  },
  {
    id: "email_med_09",
    type: "MCQ",
    topic: "URL Encoding",
    questionText: "What does the encoded string '%2E' represent in a URL?",
    scenario: {
      url: "https://login.microsoft.com%2Esecure-portal.net"
    },
    options: [
      { id: "a", key: "A", text: "A hyphen (-)" },
      { id: "b", key: "B", text: "A dot (.)" },
      { id: "c", key: "C", text: "A slash (/)" },
      { id: "d", key: "D", text: "An '@' symbol" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "%2E is the URL encoding for a dot (.). Attackers use encoding to hide dots and make domains like 'login.microsoft.com.secure-portal.net' look like 'login.microsoft.com'.",
      proTip: "Decoded, the real domain here is 'secure-portal.net'.",
      redFlags: ["URL encoding to hide domain structure"]
    }
  },
  {
    id: "email_med_10",
    type: "SPOT",
    topic: "Visual Cues",
    questionText: "Identify the visual discrepancies in this bank login page clone.",
    scenario: {
      body: "An image of a login page where the logo is slightly blurry, and the 'Secure Login' text uses a slightly different font than the official site."
    },
    redFlags: [
      { id: "rf1", x: 15, y: 20, label: "Low Quality Assets", explanation: "Phishing kits often use low-resolution logos or outdated branding." },
      { id: "rf2", x: 45, y: 55, label: "Inconsistent Typography", explanation: "Fonts that don't match the official brand's style guide are a sign of a fake site." }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "While clones can be very good, they often have small visual imperfections due to limited access to original high-res assets.",
      proTip: "Look for 'off' colors or pixelated elements that wouldn't exist on a billion-dollar company's site.",
      redFlags: ["Low quality branding", "Typography inconsistencies"]
    }
  },
  {
    id: "email_med_11",
    type: "JUDGE",
    topic: "Reply-To Hijacking",
    questionText: "Is this follow-up email from a known vendor safe?",
    scenario: {
      subject: "RE: Invoice #8829 - Question",
      senderName: "Sarah Miller (Vendor)",
      senderEmail: "sarah.miller@vendor.com",
      headers: { "Reply-To": "sarah.miller.vendor@outlook.com" },
      body: "Hi, following up on our previous thread. Could you please review the updated bank details for the wire transfer?"
    },
    isFake: true,
    scoreValue: 10,
    feedback: {
      explanation: "The 'Reply-To' header points to a personal Outlook account instead of the official vendor domain. This suggests the sender's account was compromised or spoofed.",
      proTip: "Always hit 'Reply' and see what address pops up in the 'To' field before sending sensitive info.",
      redFlags: ["Personal email in Reply-To", "Change in financial details"]
    }
  },
  {
    id: "email_med_12",
    type: "FILL_BLANK",
    topic: "Authentication Records",
    questionText: "Which DNS record defines which mail servers are allowed to send email for a domain?",
    scenario: {},
    blanks: [
      { id: "b1", textBefore: "The ", textAfter: " record is a list of IP addresses authorized to send mail on behalf of the domain.", correctAnswer: "SPF" }
    ],
    scoreValue: 10,
    feedback: {
      explanation: "SPF (Sender Policy Framework) helps prevent spoofing by allowing domain owners to specify their authorized mail servers.",
      proTip: "If an email fails SPF, it's highly likely to be a spoof.",
      redFlags: ["SPF failure"]
    }
  },
  {
    id: "email_med_13",
    type: "ORDER",
    topic: "BEC Attack Cycle",
    questionText: "Order the stages of a Business Email Compromise (BEC) attack.",
    scenario: {},
    orderItems: [
      { id: "o1", text: "Attacker researches targets via LinkedIn" },
      { id: "o2", text: "Attacker compromises an executive's email" },
      { id: "o3", text: "Attacker monitors threads for payment discussions" },
      { id: "o4", text: "Attacker interjects with a 'corrected' bank account" }
    ],
    correctOrderIds: ["o1", "o2", "o3", "o4"],
    scoreValue: 10,
    feedback: {
      explanation: "BEC attacks are slow and methodical, often involving weeks of silent observation before the final 'strike'.",
      proTip: "Any change in payment instructions MUST be verified via a second channel (like a phone call).",
      redFlags: ["High-stakes social engineering"]
    }
  },
  {
    id: "email_med_14",
    type: "MCQ",
    topic: "Mobile Vulnerabilities",
    questionText: "Why is phishing often more successful on mobile devices?",
    scenario: {},
    options: [
      { id: "a", key: "A", text: "Mobile browsers have better security" },
      { id: "b", key: "B", text: "URLs are often truncated, hiding the domain" },
      { id: "c", key: "C", text: "MFA doesn't work on mobile" },
      { id: "d", key: "D", text: "Users are more focused on mobile" }
    ],
    correctOptionId: "b",
    scoreValue: 10,
    feedback: {
      explanation: "The small screen size often hides the full URL, making it difficult to spot lookalike or long subdomains.",
      proTip: "Always tap the address bar to see the full, expanded URL on mobile before trusting a site.",
      redFlags: ["UI-based deception"]
    }
  },
  {
    id: "email_med_15",
    type: "OPEN_TEXT",
    topic: "Defense in Depth",
    questionText: "Describe how Multi-Factor Authentication (MFA) helps protect against successful phishing.",
    scenario: {},
    scoreValue: 10,
    feedback: {
      explanation: "Even if an attacker steals your password via phishing, they still need the second factor (like a push code or token) to access the account, effectively neutralizing the stolen credentials.",
      proTip: "MFA is the single most effective defense against credential theft.",
      redFlags: ["Single point of failure"]
    }
  }
];
