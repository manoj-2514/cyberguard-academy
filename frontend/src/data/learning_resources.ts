export interface LevelContent {
  title: string;
  description: string;
  threatLevel: string;
  threatDescription: string;
  defenseType: string;
  defenseDescription: string;
  priority: string;
  priorityDescription: string;
  missionStatement: string;
  learningObjectives: string[];
  financialImpact: string;
  complexityIndex: string;
  caseStudy: {
    incident: string;
    analysis: string;
    flowchart: string[];
    prevention: string[];
  };
  concepts: { name: string; description: string }[];
  attackLifecycle: { step: number; action: string; explanation: string }[];
  technicalIntelligence: {
    scenario: string;
    metrics: { label: string; value: string }[];
  };
  checklists: {
    detection: string[];
    mitigation: string[];
  };
  terminalScript: string;
}

export interface ResourceModule {
  id: string;
  name: string;
  category: string;
  levels: {
    easy: LevelContent;
    medium: LevelContent;
    hard: LevelContent;
  };
}

export const learningResources: ResourceModule[] = [
  {
    id: "phishing",
    name: "Email Analysis",
    category: "Email Security",
    levels: {
      easy: {
        title: "The Basics of Phishing Identification",
        description: "Learn how to spot the most common and obvious signs of email-based attacks. This level focuses on branded impersonation and urgent threats.",
        threatLevel: "Initial Danger",
        threatDescription: "Broad-spectrum attacks targeting thousands of users with generic lures.",
        defenseType: "Foundational Defense",
        defenseDescription: "Visual inspection and basic sender verification techniques.",
        priority: "High Priority",
        priorityDescription: "The first line of defense against account compromise.",
        missionStatement: "Identifying a scam is 90% observation and 10% skepticism. Master the obvious to prevent the catastrophic.",
        learningObjectives: [
          "Identify common lookalike domains (e.g., g00gle.com vs google.com)",
          "Recognize generic greetings and unprofessional tone",
          "Understand how attackers use fear and urgency to bypass logic",
          "Learn to safely hover over links before clicking"
        ],
        financialImpact: "$1.8 Billion lost annually to basic phishing campaigns.",
        complexityIndex: "Low - Simple brand spoofing and urgency.",
        caseStudy: {
          incident: "The 2017 Google/Facebook Invoice Scam",
          analysis: "Attackers used simple lookalike domains to impersonate a legitimate vendor (Quanta Computer) and sent fake invoices for services that seemed plausible but were never rendered.",
          flowchart: [
            "Attacker registers lookalike vendor domain",
            "Sends simple PDF invoice to finance department",
            "Finance pays invoice due to urgent 'late fee' warning",
            "Money is laundered through international accounts"
          ],
          prevention: [
            "Verify sender domains against official records",
            "Call the vendor on a known number to confirm invoice changes",
            "Implement basic payment verification workflows"
          ]
        },
        concepts: [
          { name: "Lookalike Domains", description: "Domains that visually mimic real brands using typos or similar characters." },
          { name: "Urgency Tactic", description: "Using threats or time limits to force a fast, unthinking response." },
          { name: "Display Name Spoofing", description: "Changing the sender name to look like a trusted entity while hiding the real email." },
          { name: "Generic Greetings", description: "Using 'Dear Customer' instead of your specific name as a sign of bulk phishing." }
        ],
        attackLifecycle: [
          { step: 1, action: "Reconnaissance", explanation: "Attacker picks a famous brand like Amazon or PayPal to impersonate." },
          { step: 2, action: "Weaponization", explanation: "A simple email template is created with an urgent 'action required' message." },
          { step: 3, action: "Delivery", explanation: "The email is sent to millions of stolen email addresses." },
          { step: 4, action: "Exploitation", explanation: "User clicks the link and enters their credentials on a fake login page." },
          { step: 5, action: "Data Theft", explanation: "The attacker captures the login info and sells it or steals funds." }
        ],
        technicalIntelligence: {
          scenario: "Simple bulk phishing email targeting Office 365 users.",
          metrics: [
            { label: "Execution Speed", value: "Fast (hours)" },
            { label: "Traceability", value: "High (public servers)" },
            { label: "Scale Potential", value: "Global (millions)" }
          ]
        },
        checklists: {
          detection: [
            "Is the sender's email domain spelled correctly?",
            "Is the greeting generic or specific to you?",
            "Does the email sound overly threatening or urgent?",
            "Does the link destination match the display text?"
          ],
          mitigation: [
            "Do not click any links in the email",
            "Report the email to your IT security team",
            "Delete the email after reporting",
            "Warn colleagues if the email looks like an internal spoof"
          ]
        },
        terminalScript: "grep -i 'suspicious_domain' /var/log/mail.log\n# Alert: Found 24 hits for lookalike-domain.com"
      },
      medium: {
        title: "Technical Verification & Verification",
        description: "Dive deeper into how attackers craft convincing scenarios and learn technical methods to verify email authenticity beyond visual cues.",
        threatLevel: "Strategic Danger",
        threatDescription: "Targeted attacks using homograph characters and hidden metadata.",
        defenseType: "Technical Defense",
        defenseDescription: "Header analysis and domain-level protocol verification (SPF/DKIM).",
        priority: "Mission Critical",
        priorityDescription: "Essential for protecting enterprise-level access and data.",
        missionStatement: "Trust is a vulnerability. Technical verification is the patch. Don't just look—validate.",
        learningObjectives: [
          "Analyze email headers to find the true originating server",
          "Identify homograph attacks using RN vs M or similar character swaps",
          "Understand SPF and DKIM records and how to check them",
          "Recognize 'Open Redirect' attacks on legitimate sites"
        ],
        financialImpact: "BEC (Business Email Compromise) costs businesses over $2.4 Billion yearly.",
        complexityIndex: "Medium - Involves technical manipulation of headers and DNS.",
        caseStudy: {
          incident: "The 2020 GoDaddy DNS Hijacking",
          analysis: "Attackers compromised several employee accounts to gain access to the company's internal tools, allowing them to redirect traffic for various customer domains to phishing sites.",
          flowchart: [
            "Attacker targets employees with highly specific phishing",
            "Gains access to internal DNS management tools",
            "Modifies A-records for target high-value domains",
            "Users are directed to malicious servers on 'legitimate' URLs"
          ],
          prevention: [
            "Use hardware-based MFA (FIDO2) for all internal tools",
            "Monitor DNS change logs in real-time",
            "Implement strict change control for internal management systems"
          ]
        },
        concepts: [
          { name: "Homograph Attack", description: "Using characters from different alphabets that look identical to Latin characters (e.g., Cyrillic 'а' vs Latin 'a')." },
          { name: "Email Headers", description: "The hidden metadata of an email that tracks its journey across the internet." },
          { name: "SPF/DKIM", description: "Domain-level authentication protocols that verify if the sender is authorized." },
          { name: "Subdomain Manipulation", description: "Placing a brand name in a subdomain (e.g., paypal.security-update.com) to hide the real domain." }
        ],
        attackLifecycle: [
          { step: 1, action: "Domain Research", explanation: "Attacker identifies lookalike characters and registers a confusing domain." },
          { step: 2, action: "Infrastructure Setup", explanation: "A VPS is set up to bypass simple IP-based blacklists." },
          { step: 3, action: "Header Crafting", explanation: "Attacker forged the 'From' header while leaving 'Reply-To' directed to them." },
          { step: 4, action: "Bypassing Filters", explanation: "Email is sent through a legitimate relay service to improve deliverability." },
          { step: 5, action: "Credential Capture", explanation: "User is tricked by a pixel-perfect login page and session-hijacking scripts." },
          { step: 6, action: "Persistence", explanation: "Attacker uses stolen session cookies to maintain access without needing MFA." }
        ],
        technicalIntelligence: {
          scenario: "Technical analysis of an email spoofed via an open relay.",
          metrics: [
            { label: "Execution Speed", value: "Medium (days)" },
            { label: "Traceability", value: "Moderate (hidden relays)" },
            { label: "Scale Potential", value: "Enterprise-wide" }
          ]
        },
        checklists: {
          detection: [
            "Do the 'Received' headers show a path from the expected domain?",
            "Does the 'Reply-To' address match the 'From' domain?",
            "Does the link destination use any URL encoding (%2E) to hide dots?",
            "Does the site have a valid SSL certificate for the *correct* domain?"
          ],
          mitigation: [
            "Check SPF/DKIM status in the email header details",
            "Use a sandbox to analyze any suspicious links or attachments",
            "Report the malicious IP to the hosting provider's abuse team",
            "Reset session cookies for the targeted service immediately"
          ]
        },
        terminalScript: "dig TXT company.com | grep 'v=spf1'\n# Result: v=spf1 include:_spf.google.com ~all"
      },
      hard: {
        title: "Spear Phishing & Zero-Trust Mastery",
        description: "The final level. Master the detection of highly personalized attacks (Spear Phishing), Business Email Compromise (BEC), and zero-day style scenarios.",
        threatLevel: "Critical Danger",
        threatDescription: "Nation-state level attacks using deep reconnaissance and bespoke social engineering.",
        defenseType: "Advanced Defense",
        defenseDescription: "Zero-trust principles, threat hunting, and automated detection bypass identification.",
        priority: "Survival Critical",
        priorityDescription: "Defending the organization's core assets and intellectual property.",
        missionStatement: "Advanced threats are invisible to tools. They are only visible to a mind that assumes everything is a lie until proven otherwise.",
        learningObjectives: [
          "Detect 'Living off the Land' phishing from compromised legitimate accounts",
          "Identify spear-phishing built using OSINT (Open Source Intelligence)",
          "Understand BEC (Business Email Compromise) and invoice redirection tactics",
          "Master the application of Zero-Trust principles to all digital communication"
        ],
        financialImpact: "Total global loss to advanced social engineering exceeds $10 Billion annually.",
        complexityIndex: "High - Deep psychological manipulation and perfectly forged scenarios.",
        caseStudy: {
          incident: "The 2022 Uber Social Engineering Breach",
          analysis: "An attacker used MFA Fatigue (Push Spam) against an employee and then contacted them via WhatsApp pretending to be IT support to 'fix' the issue, gaining full internal access.",
          flowchart: [
            "Attacker steals credentials via previous leak",
            "Triggers hundreds of MFA push notifications (Fatigue)",
            "Contacts employee on personal mobile via WhatsApp",
            "Persuades employee to 'Approve' a final request",
            "Gains access to internal Slack and cloud console"
          ],
          prevention: [
            "Implement MFA Number Matching (no simple Approve/Deny)",
            "Enforce strict 'No personal messaging' policies for IT support",
            "Train employees to recognize 'Out-of-band' social engineering"
          ]
        },
        concepts: [
          { name: "Spear Phishing", description: "Highly targeted attacks built using specific details about a person's role and projects." },
          { name: "MFA Fatigue", description: "Spamming a user with authentication requests until they click 'Approve' out of annoyance." },
          { name: "BEC Fraud", description: "Impersonating an executive or vendor to redirect high-value wire transfers." },
          { name: "Zero-Trust Email", description: "An architecture where no internal email is trusted more than an external one without multi-factor verification." }
        ],
        attackLifecycle: [
          { step: 1, action: "Deep Reconnaissance", explanation: "Attacker maps the company's hierarchy and internal project names via LinkedIn and GitHub." },
          { step: 2, action: "Account Selection", explanation: "Attacker compromises a 'low-value' vendor account to gain a trusted entry point." },
          { step: 3, action: "Social Engineering", explanation: "A perfectly crafted thread-hijacking email is sent into an existing conversation." },
          { step: 4, action: "Credential Proxying", explanation: "An AiTM (Adversary-in-the-Middle) server is used to capture MFA tokens in real-time." },
          { step: 5, action: "Internal Pivot", explanation: "Attacker uses the access to steal session cookies for internal tools (Slack, Jira)." },
          { step: 6, action: "Data Exfiltration", explanation: "Intellectual property is compressed and exfiltrated via encrypted channels." },
          { step: 7, action: "Cleanup", explanation: "Attacker deletes logs and modifies file timestamps to hide their presence." }
        ],
        technicalIntelligence: {
          scenario: "Detection of a thread-hijacking BEC attack targeting the CFO.",
          metrics: [
            { label: "Execution Speed", value: "Slow (weeks/months)" },
            { label: "Traceability", value: "Very Low (bespoke infrastructure)" },
            { label: "Scale Potential", value: "Bespoke (one target)" }
          ]
        },
        checklists: {
          detection: [
            "Is the request out-of-character for the sender even if the email is 'Real'?",
            "Does the request bypass established financial or security procedures?",
            "Was the email sent at an unusual time for that specific contact?",
            "Does the scenario rely on a sense of 'Special Privilege' or 'Confidentiality'?"
          ],
          mitigation: [
            "Perform out-of-band verification via a known-good phone number",
            "Initiate a threat hunt for similar emails across the organization",
            "Revoke all session tokens for the suspected accounts immediately",
            "Review internal access logs for any unauthorized pivoting or data movement"
          ]
        },
        terminalScript: "tail -f /var/log/audit/audit.log | grep -E 'suspicious_api_call|unusual_exfiltration'"
      }
    }
  },
  {
    id: "password_security",
    name: "Password Security",
    category: "Identity Security",
    levels: {
      easy: {
        title: "Credential Stuffing & Reuse",
        description: "Credential stuffing is a type of cyberattack where stolen account credentials (usernames and passwords) are used to gain unauthorized access to user accounts through automated login requests.",
        threatLevel: "High",
        threatDescription: "A single breach at a low-security site (like a pizza shop) can compromise your high-security accounts (banking, corporate email) if you reuse the same password.",
        defenseType: "Credential Management",
        defenseDescription: "Use a Password Manager to generate and store unique, complex passwords for every account.",
        priority: "Critical",
        priorityDescription: "If you use it twice, you're rolling the dice!",
        missionStatement: "Every account is an island. A breach on one should never sink the others. Use unique keys for every door.",
        learningObjectives: ["Understand Credential Stuffing", "Using variations of the same password", "Failing to enable Multi-Factor Authentication (MFA)"],
        financialImpact: "The 2023 23andMe breach was primarily due to credential stuffing targeting users who reused passwords.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "The 2023 23andMe breach",
          analysis: "Your personal email and password were leaked in a breach of an old forum. An attacker uses these to successfully log into your corporate portal, which used the same credentials.",
          flowchart: ["Attacker acquires a 'Combo List' (leaked usernames and passwords) from a data breach.", "They use automated 'Stuffing' tools to test these credentials on thousands of major sites.", "The tool flags successful logins where the victim reused their password.", "Attacker logs in, changes recovery info, and steals sensitive data or funds.", "The compromised account is used to pivot into the corporate network."],
          prevention: ["Change the compromised password IMMEDIATELY.", "Enable MFA on the account right away.", "Check for any 'Rule Changes' in email (e.g., auto-forwarding set up by attacker).", "Review recent transactions or data exports.", "Change the same password on any OTHER site where you reused it."]
        },
        concepts: [{ name: "Credential Stuffing & Reuse", description: "Credential stuffing is a type of cyberattack where stolen account credentials (usernames and passwords) are used to gain unauthorized access to user accounts through automated login requests." }],
        attackLifecycle: [{ step: 1, action: "Acquisition", explanation: "Attacker acquires a Combo List." }, { step: 2, action: "Stuffing", explanation: "Attacker uses automated tools to test credentials." }],
        technicalIntelligence: { scenario: "Your personal email and password were leaked in a breach of an old forum. An attacker uses these to successfully log into your corporate portal, which used the same credentials.", metrics: [] },
        checklists: { detection: ["Notifications of 'Successful Logins' from devices or locations you don't recognize.", "Password reset emails you didn't initiate.", "Accounts being 'Locked' due to multiple failed login attempts from unknown IPs."], mitigation: ["Change the compromised password IMMEDIATELY.", "Enable MFA on the account right away."] },
        terminalScript: "analyze --target password_reuse"
      },
      medium: {
        title: "Credential Stuffing & Reuse (Intermediate)",
        description: "Credential stuffing is a type of cyberattack where stolen account credentials (usernames and passwords) are used to gain unauthorized access to user accounts through automated login requests.",
        threatLevel: "High",
        threatDescription: "A single breach at a low-security site (like a pizza shop) can compromise your high-security accounts (banking, corporate email) if you reuse the same password.",
        defenseType: "Credential Management",
        defenseDescription: "Use a Password Manager to generate and store unique, complex passwords for every account.",
        priority: "Critical",
        priorityDescription: "If you use it twice, you're rolling the dice!",
        missionStatement: "Every account is an island. A breach on one should never sink the others. Use unique keys for every door.",
        learningObjectives: ["Understand Credential Stuffing", "Using variations of the same password", "Failing to enable Multi-Factor Authentication (MFA)"],
        financialImpact: "The 2023 23andMe breach was primarily due to credential stuffing targeting users who reused passwords.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "The 2023 23andMe breach",
          analysis: "Your personal email and password were leaked in a breach of an old forum. An attacker uses these to successfully log into your corporate portal, which used the same credentials.",
          flowchart: ["Attacker acquires a 'Combo List' (leaked usernames and passwords) from a data breach.", "They use automated 'Stuffing' tools to test these credentials on thousands of major sites.", "The tool flags successful logins where the victim reused their password.", "Attacker logs in, changes recovery info, and steals sensitive data or funds.", "The compromised account is used to pivot into the corporate network."],
          prevention: ["Change the compromised password IMMEDIATELY.", "Enable MFA on the account right away.", "Check for any 'Rule Changes' in email (e.g., auto-forwarding set up by attacker).", "Review recent transactions or data exports.", "Change the same password on any OTHER site where you reused it."]
        },
        concepts: [{ name: "Credential Stuffing & Reuse", description: "Credential stuffing is a type of cyberattack where stolen account credentials (usernames and passwords) are used to gain unauthorized access to user accounts through automated login requests." }],
        attackLifecycle: [{ step: 1, action: "Acquisition", explanation: "Attacker acquires a Combo List." }, { step: 2, action: "Stuffing", explanation: "Attacker uses automated tools to test credentials." }],
        technicalIntelligence: { scenario: "Your personal email and password were leaked in a breach of an old forum. An attacker uses these to successfully log into your corporate portal, which used the same credentials.", metrics: [] },
        checklists: { detection: ["Notifications of 'Successful Logins' from devices or locations you don't recognize.", "Password reset emails you didn't initiate.", "Accounts being 'Locked' due to multiple failed login attempts from unknown IPs."], mitigation: ["Change the compromised password IMMEDIATELY.", "Enable MFA on the account right away."] },
        terminalScript: "analyze --target password_reuse"
      },
      hard: {
        title: "Credential Stuffing & Reuse (Advanced)",
        description: "Credential stuffing is a type of cyberattack where stolen account credentials (usernames and passwords) are used to gain unauthorized access to user accounts through automated login requests.",
        threatLevel: "High",
        threatDescription: "A single breach at a low-security site (like a pizza shop) can compromise your high-security accounts (banking, corporate email) if you reuse the same password.",
        defenseType: "Credential Management",
        defenseDescription: "Use a Password Manager to generate and store unique, complex passwords for every account.",
        priority: "Critical",
        priorityDescription: "If you use it twice, you're rolling the dice!",
        missionStatement: "Every account is an island. A breach on one should never sink the others. Use unique keys for every door.",
        learningObjectives: ["Understand Credential Stuffing", "Using variations of the same password", "Failing to enable Multi-Factor Authentication (MFA)"],
        financialImpact: "The 2023 23andMe breach was primarily due to credential stuffing targeting users who reused passwords.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "The 2023 23andMe breach",
          analysis: "Your personal email and password were leaked in a breach of an old forum. An attacker uses these to successfully log into your corporate portal, which used the same credentials.",
          flowchart: ["Attacker acquires a 'Combo List' (leaked usernames and passwords) from a data breach.", "They use automated 'Stuffing' tools to test these credentials on thousands of major sites.", "The tool flags successful logins where the victim reused their password.", "Attacker logs in, changes recovery info, and steals sensitive data or funds.", "The compromised account is used to pivot into the corporate network."],
          prevention: ["Change the compromised password IMMEDIATELY.", "Enable MFA on the account right away.", "Check for any 'Rule Changes' in email (e.g., auto-forwarding set up by attacker).", "Review recent transactions or data exports.", "Change the same password on any OTHER site where you reused it."]
        },
        concepts: [{ name: "Credential Stuffing & Reuse", description: "Credential stuffing is a type of cyberattack where stolen account credentials (usernames and passwords) are used to gain unauthorized access to user accounts through automated login requests." }],
        attackLifecycle: [{ step: 1, action: "Acquisition", explanation: "Attacker acquires a Combo List." }, { step: 2, action: "Stuffing", explanation: "Attacker uses automated tools to test credentials." }],
        technicalIntelligence: { scenario: "Your personal email and password were leaked in a breach of an old forum. An attacker uses these to successfully log into your corporate portal, which used the same credentials.", metrics: [] },
        checklists: { detection: ["Notifications of 'Successful Logins' from devices or locations you don't recognize.", "Password reset emails you didn't initiate.", "Accounts being 'Locked' due to multiple failed login attempts from unknown IPs."], mitigation: ["Change the compromised password IMMEDIATELY.", "Enable MFA on the account right away."] },
        terminalScript: "analyze --target password_reuse"
      }
    }
  },
  {
    id: "malware_awareness",
    name: "Malware Awareness",
    category: "Device Security",
    levels: {
      easy: {
        title: "Malicious Macros in Documents",
        description: "Macros are small programs embedded in files (like Excel or Word) to automate tasks. Attackers use them to hide malicious code.",
        threatLevel: "Medium",
        threatDescription: "Macros can download ransomware, steal your keystrokes, or turn your computer into a bot.",
        defenseType: "Technical Defense",
        defenseDescription: "Configure Office to disable macros by default.",
        priority: "High",
        priorityDescription: "Macros are Programs, not Papers. Don't run them!",
        missionStatement: "A document is a container for data. If it asks to run a program (Macro), it's no longer just data—it's a threat.",
        learningObjectives: ["Identify malicious macro requests", "Understand the risk of 'Enable Content'", "Learn to safely handle Office attachments"],
        financialImpact: "The Emotet botnet primarily used malicious macros in Word documents to infect millions of machines.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Emotet Botnet",
          analysis: "You receive an 'Invoice' as an Excel attachment. Upon opening, a yellow bar appears asking to 'Enable Macros' to view the full details. You click, and a hidden shell script starts encrypting your files.",
          flowchart: ["Attacker crafts a phishing email with a financial lure.", "A malicious VBA script is hidden inside the document.", "User opens the file and is socially engineered to bypass the 'Protected View' warning.", "The macro calls a remote server to download the actual malware payload."],
          prevention: ["Disconnect from the network immediately.", "Alert your IT Security team.", "Run a full scan with a reputable EDR tool."]
        },
        concepts: [{ name: "Macro-based Dropper", description: "Macros are small programs embedded in files (like Excel or Word) to automate tasks. Attackers use them to hide malicious code." }],
        attackLifecycle: [{ step: 1, action: "Delivery", explanation: "Phishing email with attachment." }, { step: 2, action: "Execution", explanation: "User enables macros." }],
        technicalIntelligence: { scenario: "Malicious macro in an Excel file.", metrics: [] },
        checklists: { detection: ["Documents from outside sources that demand you 'Enable Content'.", "Unusual file extensions like .xlsm, .docm.", "Blurred document content until you enable scripts."], mitigation: ["Disable macros by default.", "Never enable macros for external files."] },
        terminalScript: "scan --file invoice.xlsx"
      },
      medium: {
        title: "Malicious Macros in Documents (Intermediate)",
        description: "Macros are small programs embedded in files (like Excel or Word) to automate tasks. Attackers use them to hide malicious code.",
        threatLevel: "Medium",
        threatDescription: "Macros can download ransomware, steal your keystrokes, or turn your computer into a bot.",
        defenseType: "Technical Defense",
        defenseDescription: "Configure Office to disable macros by default.",
        priority: "High",
        priorityDescription: "Macros are Programs, not Papers. Don't run them!",
        missionStatement: "A document is a container for data. If it asks to run a program (Macro), it's no longer just data—it's a threat.",
        learningObjectives: ["Identify malicious macro requests", "Understand the risk of 'Enable Content'", "Learn to safely handle Office attachments"],
        financialImpact: "The Emotet botnet primarily used malicious macros in Word documents to infect millions of machines.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Emotet Botnet",
          analysis: "You receive an 'Invoice' as an Excel attachment. Upon opening, a yellow bar appears asking to 'Enable Macros' to view the full details. You click, and a hidden shell script starts encrypting your files.",
          flowchart: ["Attacker crafts a phishing email with a financial lure.", "A malicious VBA script is hidden inside the document.", "User opens the file and is socially engineered to bypass the 'Protected View' warning.", "The macro calls a remote server to download the actual malware payload."],
          prevention: ["Disconnect from the network immediately.", "Alert your IT Security team.", "Run a full scan with a reputable EDR tool."]
        },
        concepts: [{ name: "Macro-based Dropper", description: "Macros are small programs embedded in files (like Excel or Word) to automate tasks. Attackers use them to hide malicious code." }],
        attackLifecycle: [{ step: 1, action: "Delivery", explanation: "Phishing email with attachment." }, { step: 2, action: "Execution", explanation: "User enables macros." }],
        technicalIntelligence: { scenario: "Malicious macro in an Excel file.", metrics: [] },
        checklists: { detection: ["Documents from outside sources that demand you 'Enable Content'.", "Unusual file extensions like .xlsm, .docm.", "Blurred document content until you enable scripts."], mitigation: ["Disable macros by default.", "Never enable macros for external files."] },
        terminalScript: "scan --file invoice.xlsx"
      },
      hard: {
        title: "Malicious Macros in Documents (Advanced)",
        description: "Macros are small programs embedded in files (like Excel or Word) to automate tasks. Attackers use them to hide malicious code.",
        threatLevel: "Medium",
        threatDescription: "Macros can download ransomware, steal your keystrokes, or turn your computer into a bot.",
        defenseType: "Technical Defense",
        defenseDescription: "Configure Office to disable macros by default.",
        priority: "High",
        priorityDescription: "Macros are Programs, not Papers. Don't run them!",
        missionStatement: "A document is a container for data. If it asks to run a program (Macro), it's no longer just data—it's a threat.",
        learningObjectives: ["Identify malicious macro requests", "Understand the risk of 'Enable Content'", "Learn to safely handle Office attachments"],
        financialImpact: "The Emotet botnet primarily used malicious macros in Word documents to infect millions of machines.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Emotet Botnet",
          analysis: "You receive an 'Invoice' as an Excel attachment. Upon opening, a yellow bar appears asking to 'Enable Macros' to view the full details. You click, and a hidden shell script starts encrypting your files.",
          flowchart: ["Attacker crafts a phishing email with a financial lure.", "A malicious VBA script is hidden inside the document.", "User opens the file and is socially engineered to bypass the 'Protected View' warning.", "The macro calls a remote server to download the actual malware payload."],
          prevention: ["Disconnect from the network immediately.", "Alert your IT Security team.", "Run a full scan with a reputable EDR tool."]
        },
        concepts: [{ name: "Macro-based Dropper", description: "Macros are small programs embedded in files (like Excel or Word) to automate tasks. Attackers use them to hide malicious code." }],
        attackLifecycle: [{ step: 1, action: "Delivery", explanation: "Phishing email with attachment." }, { step: 2, action: "Execution", explanation: "User enables macros." }],
        technicalIntelligence: { scenario: "Malicious macro in an Excel file.", metrics: [] },
        checklists: { detection: ["Documents from outside sources that demand you 'Enable Content'.", "Unusual file extensions like .xlsm, .docm.", "Blurred document content until you enable scripts."], mitigation: ["Disable macros by default.", "Never enable macros for external files."] },
        terminalScript: "scan --file invoice.xlsx"
      }
    }
  },
  {
    id: "ransomware",
    name: "Ransomware Defense",
    category: "System Security",
    levels: {
      easy: {
        title: "Double Extortion Tactic",
        description: "Modern ransomware doesn't just encrypt your files; it steals them first. Attackers threaten to leak your data publicly if you don't pay.",
        threatLevel: "Critical",
        threatDescription: "Massive reputation damage and legal fines. Even if you restore from backups, the threat of a data leak can force companies to pay.",
        defenseType: "Data Protection",
        defenseDescription: "Maintain air-gapped backups and implement EDR to stop exfiltration.",
        priority: "High",
        priorityDescription: "Backups save your files; Encryption/DLP saves your reputation!",
        missionStatement: "Ransomware is a data breach first, and an encryption event second. Monitor your data's movement, not just its availability.",
        learningObjectives: ["Understand Double Extortion", "Identify red flags of data exfiltration", "Learn incident response for ransomware"],
        financialImpact: "The Colonial Pipeline attack in 2021 involved DarkSide ransomware and high-pressure extortion.",
        complexityIndex: "High",
        caseStudy: {
          incident: "Colonial Pipeline Attack",
          analysis: "Your company is hit by ransomware. You have backups and start restoring, but the attackers send you a sample of your own customer's private data to prove they will leak it.",
          flowchart: ["Attacker gains initial access.", "They spend days or weeks 'lurking' and stealing sensitive data.", "They locate and delete local backups and shadow copies.", "The ransomware payload is deployed across the entire network simultaneously.", "The ransom note demands payment for both the 'Key' and the 'Deletion' of stolen data."],
          prevention: ["Isolate the infected system immediately.", "Do NOT pay the ransom.", "Verify the integrity of your offline backups."]
        },
        concepts: [{ name: "Encryption + Exfiltration", description: "Modern ransomware doesn't just encrypt your files; it steals them first. Attackers threaten to leak your data publicly if you don't pay." }],
        attackLifecycle: [{ step: 1, action: "Access", explanation: "Phishing or RDP exploit." }, { step: 2, action: "Exfiltration", explanation: "Stealing sensitive data." }],
        technicalIntelligence: { scenario: "Ransomware attack with data leak threat.", metrics: [] },
        checklists: { detection: ["Sudden spikes in outbound network traffic.", "Ransom notes mentioning 'Data Leak'.", "Presence of unauthorized tools like Rclone."], mitigation: ["Maintain air-gapped backups.", "Implement EDR."] },
        terminalScript: "check --ransomware --status"
      },
      medium: {
        title: "Double Extortion Tactic (Intermediate)",
        description: "Modern ransomware doesn't just encrypt your files; it steals them first. Attackers threaten to leak your data publicly if you don't pay.",
        threatLevel: "Critical",
        threatDescription: "Massive reputation damage and legal fines. Even if you restore from backups, the threat of a data leak can force companies to pay.",
        defenseType: "Data Protection",
        defenseDescription: "Maintain air-gapped backups and implement EDR to stop exfiltration.",
        priority: "High",
        priorityDescription: "Backups save your files; Encryption/DLP saves your reputation!",
        missionStatement: "Ransomware is a data breach first, and an encryption event second. Monitor your data's movement, not just its availability.",
        learningObjectives: ["Understand Double Extortion", "Identify red flags of data exfiltration", "Learn incident response for ransomware"],
        financialImpact: "The Colonial Pipeline attack in 2021 involved DarkSide ransomware and high-pressure extortion.",
        complexityIndex: "High",
        caseStudy: {
          incident: "Colonial Pipeline Attack",
          analysis: "Your company is hit by ransomware. You have backups and start restoring, but the attackers send you a sample of your own customer's private data to prove they will leak it.",
          flowchart: ["Attacker gains initial access.", "They spend days or weeks 'lurking' and stealing sensitive data.", "They locate and delete local backups and shadow copies.", "The ransomware payload is deployed across the entire network simultaneously.", "The ransom note demands payment for both the 'Key' and the 'Deletion' of stolen data."],
          prevention: ["Isolate the infected system immediately.", "Do NOT pay the ransom.", "Verify the integrity of your offline backups."]
        },
        concepts: [{ name: "Encryption + Exfiltration", description: "Modern ransomware doesn't just encrypt your files; it steals them first. Attackers threaten to leak your data publicly if you don't pay." }],
        attackLifecycle: [{ step: 1, action: "Access", explanation: "Phishing or RDP exploit." }, { step: 2, action: "Exfiltration", explanation: "Stealing sensitive data." }],
        technicalIntelligence: { scenario: "Ransomware attack with data leak threat.", metrics: [] },
        checklists: { detection: ["Sudden spikes in outbound network traffic.", "Ransom notes mentioning 'Data Leak'.", "Presence of unauthorized tools like Rclone."], mitigation: ["Maintain air-gapped backups.", "Implement EDR."] },
        terminalScript: "check --ransomware --status"
      },
      hard: {
        title: "Double Extortion Tactic (Advanced)",
        description: "Modern ransomware doesn't just encrypt your files; it steals them first. Attackers threaten to leak your data publicly if you don't pay.",
        threatLevel: "Critical",
        threatDescription: "Massive reputation damage and legal fines. Even if you restore from backups, the threat of a data leak can force companies to pay.",
        defenseType: "Data Protection",
        defenseDescription: "Maintain air-gapped backups and implement EDR to stop exfiltration.",
        priority: "High",
        priorityDescription: "Backups save your files; Encryption/DLP saves your reputation!",
        missionStatement: "Ransomware is a data breach first, and an encryption event second. Monitor your data's movement, not just its availability.",
        learningObjectives: ["Understand Double Extortion", "Identify red flags of data exfiltration", "Learn incident response for ransomware"],
        financialImpact: "The Colonial Pipeline attack in 2021 involved DarkSide ransomware and high-pressure extortion.",
        complexityIndex: "High",
        caseStudy: {
          incident: "Colonial Pipeline Attack",
          analysis: "Your company is hit by ransomware. You have backups and start restoring, but the attackers send you a sample of your own customer's private data to prove they will leak it.",
          flowchart: ["Attacker gains initial access.", "They spend days or weeks 'lurking' and stealing sensitive data.", "They locate and delete local backups and shadow copies.", "The ransomware payload is deployed across the entire network simultaneously.", "The ransom note demands payment for both the 'Key' and the 'Deletion' of stolen data."],
          prevention: ["Isolate the infected system immediately.", "Do NOT pay the ransom.", "Verify the integrity of your offline backups."]
        },
        concepts: [{ name: "Encryption + Exfiltration", description: "Modern ransomware doesn't just encrypt your files; it steals them first. Attackers threaten to leak your data publicly if you don't pay." }],
        attackLifecycle: [{ step: 1, action: "Access", explanation: "Phishing or RDP exploit." }, { step: 2, action: "Exfiltration", explanation: "Stealing sensitive data." }],
        technicalIntelligence: { scenario: "Ransomware attack with data leak threat.", metrics: [] },
        checklists: { detection: ["Sudden spikes in outbound network traffic.", "Ransom notes mentioning 'Data Leak'.", "Presence of unauthorized tools like Rclone."], mitigation: ["Maintain air-gapped backups.", "Implement EDR."] },
        terminalScript: "check --ransomware --status"
      }
    }
  },
  {
    id: "insider_threat",
    name: "Insider Threat",
    category: "Organizational Security",
    levels: {
      easy: {
        title: "Malicious Data Theft",
        description: "An insider threat occurs when someone with legitimate access (employee, contractor) intentionally steals data for personal gain or revenge.",
        threatLevel: "High",
        threatDescription: "Insiders know where the 'Crown Jewels' are. They can bypass many perimeter defenses because they already have the keys.",
        defenseType: "Access Control",
        defenseDescription: "Implement 'Least Privilege' and monitor for unusual spikes in data movement.",
        priority: "High",
        priorityDescription: "Access is for work, not for keeping. Leave it at the door!",
        missionStatement: "Trust but Verify. Access should be based on the 'Principle of Least Privilege' (PoLP).",
        learningObjectives: ["Identify red flags of insider threats", "Understand the anatomy of data exfiltration", "Learn how to respond to internal theft"],
        financialImpact: "A former Google engineer was charged with stealing self-driving car trade secrets for a competitor.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Google Trade Secret Theft",
          analysis: "A salesperson who is about to resign downloads the entire client database to a personal USB drive to take to a competitor.",
          flowchart: ["The insider identifies valuable data they have access to.", "They begin 'grooming' the data for export.", "They use a 'low and slow' approach to avoid triggering alerts.", "The data is exported via personal email, USB, or cloud storage.", "The employee resigns shortly after the theft is completed."],
          prevention: ["Revoke the user's access immediately.", "Perform a forensic audit of their recent file activity.", "Secure any company-owned hardware."]
        },
        concepts: [{ name: "Internal Data Exfiltration", description: "An insider threat occurs when someone with legitimate access (employee, contractor) intentionally steals data for personal gain or revenge." }],
        attackLifecycle: [{ step: 1, action: "Identification", explanation: "Targeting valuable data." }, { step: 2, action: "Exfiltration", explanation: "Exporting data via USB/Cloud." }],
        technicalIntelligence: { scenario: "Employee stealing customer database.", metrics: [] },
        checklists: { detection: ["Accessing large volumes of sensitive data outside hours.", "Use of personal cloud storage or USB drives.", "Attempting to access systems unrelated to their role."], mitigation: ["Implement Least Privilege.", "Monitor data movement."] },
        terminalScript: "audit --user internal_theft"
      },
      medium: {
        title: "Malicious Data Theft (Intermediate)",
        description: "An insider threat occurs when someone with legitimate access (employee, contractor) intentionally steals data for personal gain or revenge.",
        threatLevel: "High",
        threatDescription: "Insiders know where the 'Crown Jewels' are. They can bypass many perimeter defenses because they already have the keys.",
        defenseType: "Access Control",
        defenseDescription: "Implement 'Least Privilege' and monitor for unusual spikes in data movement.",
        priority: "High",
        priorityDescription: "Access is for work, not for keeping. Leave it at the door!",
        missionStatement: "Trust but Verify. Access should be based on the 'Principle of Least Privilege' (PoLP).",
        learningObjectives: ["Identify red flags of insider threats", "Understand the anatomy of data exfiltration", "Learn how to respond to internal theft"],
        financialImpact: "A former Google engineer was charged with stealing self-driving car trade secrets for a competitor.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Google Trade Secret Theft",
          analysis: "A salesperson who is about to resign downloads the entire client database to a personal USB drive to take to a competitor.",
          flowchart: ["The insider identifies valuable data they have access to.", "They begin 'grooming' the data for export.", "They use a 'low and slow' approach to avoid triggering alerts.", "The data is exported via personal email, USB, or cloud storage.", "The employee resigns shortly after the theft is completed."],
          prevention: ["Revoke the user's access immediately.", "Perform a forensic audit of their recent file activity.", "Secure any company-owned hardware."]
        },
        concepts: [{ name: "Internal Data Exfiltration", description: "An insider threat occurs when someone with legitimate access (employee, contractor) intentionally steals data for personal gain or revenge." }],
        attackLifecycle: [{ step: 1, action: "Identification", explanation: "Targeting valuable data." }, { step: 2, action: "Exfiltration", explanation: "Exporting data via USB/Cloud." }],
        technicalIntelligence: { scenario: "Employee stealing customer database.", metrics: [] },
        checklists: { detection: ["Accessing large volumes of sensitive data outside hours.", "Use of personal cloud storage or USB drives.", "Attempting to access systems unrelated to their role."], mitigation: ["Implement Least Privilege.", "Monitor data movement."] },
        terminalScript: "audit --user internal_theft"
      },
      hard: {
        title: "Malicious Data Theft (Advanced)",
        description: "An insider threat occurs when someone with legitimate access (employee, contractor) intentionally steals data for personal gain or revenge.",
        threatLevel: "High",
        threatDescription: "Insiders know where the 'Crown Jewels' are. They can bypass many perimeter defenses because they already have the keys.",
        defenseType: "Access Control",
        defenseDescription: "Implement 'Least Privilege' and monitor for unusual spikes in data movement.",
        priority: "High",
        priorityDescription: "Access is for work, not for keeping. Leave it at the door!",
        missionStatement: "Trust but Verify. Access should be based on the 'Principle of Least Privilege' (PoLP).",
        learningObjectives: ["Identify red flags of insider threats", "Understand the anatomy of data exfiltration", "Learn how to respond to internal theft"],
        financialImpact: "A former Google engineer was charged with stealing self-driving car trade secrets for a competitor.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Google Trade Secret Theft",
          analysis: "A salesperson who is about to resign downloads the entire client database to a personal USB drive to take to a competitor.",
          flowchart: ["The insider identifies valuable data they have access to.", "They begin 'grooming' the data for export.", "They use a 'low and slow' approach to avoid triggering alerts.", "The data is exported via personal email, USB, or cloud storage.", "The employee resigns shortly after the theft is completed."],
          prevention: ["Revoke the user's access immediately.", "Perform a forensic audit of their recent file activity.", "Secure any company-owned hardware."]
        },
        concepts: [{ name: "Internal Data Exfiltration", description: "An insider threat occurs when someone with legitimate access (employee, contractor) intentionally steals data for personal gain or revenge." }],
        attackLifecycle: [{ step: 1, action: "Identification", explanation: "Targeting valuable data." }, { step: 2, action: "Exfiltration", explanation: "Exporting data via USB/Cloud." }],
        technicalIntelligence: { scenario: "Employee stealing customer database.", metrics: [] },
        checklists: { detection: ["Accessing large volumes of sensitive data outside hours.", "Use of personal cloud storage or USB drives.", "Attempting to access systems unrelated to their role."], mitigation: ["Implement Least Privilege.", "Monitor data movement."] },
        terminalScript: "audit --user internal_theft"
      }
    }
  },
  {
    id: "physical_security",
    name: "Physical Security",
    category: "Physical Security",
    levels: {
      easy: {
        title: "Tailgating & Entry Fraud",
        description: "Tailgating is when an unauthorized person follows an authorized person into a secure area without scanning their own badge.",
        threatLevel: "Medium",
        threatDescription: "Physical access is the ultimate 'God Mode'. Once inside, an attacker can steal hardware, install keyloggers, or gain access to workstations.",
        defenseType: "Physical Defense",
        defenseDescription: "Politely ask the person to scan their badge. If they can't, direct them to the security desk.",
        priority: "Medium",
        priorityDescription: "One Badge, One Person. Don't let politeness compromise protection!",
        missionStatement: "The badge reader is the only guard that doesn't get distracted by politeness. Let it do its job.",
        learningObjectives: ["Identify tailgating behavior", "Understand the risk of physical social engineering", "Learn 'One Badge, One Entry' policies"],
        financialImpact: "Security audits consistently show that 80%+ of employees will hold the door for an 'authorized looking' stranger.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Physical Security Audit",
          analysis: "You hold the door open for someone carrying two heavy boxes who 'forgot' their badge. They are actually a social engineer who then plants a rogue Wi-Fi device.",
          flowchart: ["Attacker identifies a target building and observes patterns.", "They dress to blend in (courier, contractor).", "They time their approach to coincide with high-traffic periods.", "They use a 'Social Trigger' (holding boxes) to elicit politeness.", "The authorized employee holds the door, and the attacker enters."],
          prevention: ["Notify building security immediately.", "Note the person's description and direction.", "Check your area for unknown devices."]
        },
        concepts: [{ name: "Physical Social Engineering", description: "Tailgating is when an unauthorized person follows an authorized person into a secure area without scanning their own badge." }],
        attackLifecycle: [{ step: 1, action: "Observation", explanation: "Mapping entry patterns." }, { step: 2, action: "Entry", explanation: "Tailgating an authorized employee." }],
        technicalIntelligence: { scenario: "Tailgating into a secure office.", metrics: [] },
        checklists: { detection: ["Someone waiting near a secure entrance.", "People using distractions to avoid badging.", "Individuals without visible ID badges."], mitigation: ["Politely ask to scan badge.", "Notify security."] },
        terminalScript: "security --physical --status"
      },
      medium: {
        title: "Tailgating & Entry Fraud (Intermediate)",
        description: "Tailgating is when an unauthorized person follows an authorized person into a secure area without scanning their own badge.",
        threatLevel: "Medium",
        threatDescription: "Physical access is the ultimate 'God Mode'. Once inside, an attacker can steal hardware, install keyloggers, or gain access to workstations.",
        defenseType: "Physical Defense",
        defenseDescription: "Politely ask the person to scan their badge. If they can't, direct them to the security desk.",
        priority: "Medium",
        priorityDescription: "One Badge, One Person. Don't let politeness compromise protection!",
        missionStatement: "The badge reader is the only guard that doesn't get distracted by politeness. Let it do its job.",
        learningObjectives: ["Identify tailgating behavior", "Understand the risk of physical social engineering", "Learn 'One Badge, One Entry' policies"],
        financialImpact: "Security audits consistently show that 80%+ of employees will hold the door for an 'authorized looking' stranger.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Physical Security Audit",
          analysis: "You hold the door open for someone carrying two heavy boxes who 'forgot' their badge. They are actually a social engineer who then plants a rogue Wi-Fi device.",
          flowchart: ["Attacker identifies a target building and observes patterns.", "They dress to blend in (courier, contractor).", "They time their approach to coincide with high-traffic periods.", "They use a 'Social Trigger' (holding boxes) to elicit politeness.", "The authorized employee holds the door, and the attacker enters."],
          prevention: ["Notify building security immediately.", "Note the person's description and direction.", "Check your area for unknown devices."]
        },
        concepts: [{ name: "Physical Social Engineering", description: "Tailgating is when an unauthorized person follows an authorized person into a secure area without scanning their own badge." }],
        attackLifecycle: [{ step: 1, action: "Observation", explanation: "Mapping entry patterns." }, { step: 2, action: "Entry", explanation: "Tailgating an authorized employee." }],
        technicalIntelligence: { scenario: "Tailgating into a secure office.", metrics: [] },
        checklists: { detection: ["Someone waiting near a secure entrance.", "People using distractions to avoid badging.", "Individuals without visible ID badges."], mitigation: ["Politely ask to scan badge.", "Notify security."] },
        terminalScript: "security --physical --status"
      },
      hard: {
        title: "Tailgating & Entry Fraud (Advanced)",
        description: "Tailgating is when an unauthorized person follows an authorized person into a secure area without scanning their own badge.",
        threatLevel: "Medium",
        threatDescription: "Physical access is the ultimate 'God Mode'. Once inside, an attacker can steal hardware, install keyloggers, or gain access to workstations.",
        defenseType: "Physical Defense",
        defenseDescription: "Politely ask the person to scan their badge. If they can't, direct them to the security desk.",
        priority: "Medium",
        priorityDescription: "One Badge, One Person. Don't let politeness compromise protection!",
        missionStatement: "The badge reader is the only guard that doesn't get distracted by politeness. Let it do its job.",
        learningObjectives: ["Identify tailgating behavior", "Understand the risk of physical social engineering", "Learn 'One Badge, One Entry' policies"],
        financialImpact: "Security audits consistently show that 80%+ of employees will hold the door for an 'authorized looking' stranger.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Physical Security Audit",
          analysis: "You hold the door open for someone carrying two heavy boxes who 'forgot' their badge. They are actually a social engineer who then plants a rogue Wi-Fi device.",
          flowchart: ["Attacker identifies a target building and observes patterns.", "They dress to blend in (courier, contractor).", "They time their approach to coincide with high-traffic periods.", "They use a 'Social Trigger' (holding boxes) to elicit politeness.", "The authorized employee holds the door, and the attacker enters."],
          prevention: ["Notify building security immediately.", "Note the person's description and direction.", "Check your area for unknown devices."]
        },
        concepts: [{ name: "Physical Social Engineering", description: "Tailgating is when an unauthorized person follows an authorized person into a secure area without scanning their own badge." }],
        attackLifecycle: [{ step: 1, action: "Observation", explanation: "Mapping entry patterns." }, { step: 2, action: "Entry", explanation: "Tailgating an authorized employee." }],
        technicalIntelligence: { scenario: "Tailgating into a secure office.", metrics: [] },
        checklists: { detection: ["Someone waiting near a secure entrance.", "People using distractions to avoid badging.", "Individuals without visible ID badges."], mitigation: ["Politely ask to scan badge.", "Notify security."] },
        terminalScript: "security --physical --status"
      }
    }
  },
  {
    id: "wifi_security",
    name: "Wi-Fi Security",
    category: "Network Security",
    levels: {
      easy: {
        title: "The Evil Twin Access Point",
        description: "An 'Evil Twin' is a fraudulent Wi-Fi network that appears legitimate but is actually controlled by an attacker to intercept your data.",
        threatLevel: "High",
        threatDescription: "Man-in-the-Middle (MitM) attack. The attacker can see every site you visit and capture your passwords.",
        defenseType: "Network Defense",
        defenseDescription: "Always use a reputable VPN on public Wi-Fi. Disable 'Auto-Join' in your settings.",
        priority: "High",
        priorityDescription: "Free Wi-Fi? Open Season for hackers. VPN up!",
        missionStatement: "If the network is free, YOU are the product (and your data is the price). Treat all public Wi-Fi as 'Compromised' by default.",
        learningObjectives: ["Identify Evil Twin networks", "Understand MitM risks", "Learn how to secure public Wi-Fi usage"],
        financialImpact: "The 'DarkHotel' group used hotel Wi-Fi networks to target traveling executives with MitM attacks.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "DarkHotel Hotel Wi-Fi",
          analysis: "You connect to 'Airport_Guest_WiFi'. It's actually a laptop in a backpack nearby. The attacker captures your credentials as you check your email.",
          flowchart: ["Attacker uses a device to broadcast a common SSID.", "They jam or de-authenticate users from the real network.", "The victim's device automatically connects to the stronger 'Evil Twin'.", "Attacker routes traffic through their machine.", "Attacker runs a sniffer to capture unencrypted packets."],
          prevention: ["Disconnect from the network immediately.", "Forget the network in your device settings.", "Change all passwords used during that session."]
        },
        concepts: [{ name: "Man-in-the-Middle (Wi-Fi)", description: "An 'Evil Twin' is a fraudulent Wi-Fi network that appears legitimate but is actually controlled by an attacker to intercept your data." }],
        attackLifecycle: [{ step: 1, action: "Broadcasting", explanation: "Fake SSID setup." }, { step: 2, action: "Interception", explanation: "Sniffing traffic on the fake network." }],
        technicalIntelligence: { scenario: "Connecting to a fake public hotspot.", metrics: [] },
        checklists: { detection: ["Multiple Wi-Fi networks with nearly identical names.", "Public network asking for login/password it didn't need before.", "Unusual browser warnings about 'Insecure Connection'."], mitigation: ["Use a VPN.", "Disable Auto-Join."] },
        terminalScript: "wifi --scan --mitm"
      },
      medium: {
        title: "The Evil Twin Access Point (Intermediate)",
        description: "An 'Evil Twin' is a fraudulent Wi-Fi network that appears legitimate but is actually controlled by an attacker to intercept your data.",
        threatLevel: "High",
        threatDescription: "Man-in-the-Middle (MitM) attack. The attacker can see every site you visit and capture your passwords.",
        defenseType: "Network Defense",
        defenseDescription: "Always use a reputable VPN on public Wi-Fi. Disable 'Auto-Join' in your settings.",
        priority: "High",
        priorityDescription: "Free Wi-Fi? Open Season for hackers. VPN up!",
        missionStatement: "If the network is free, YOU are the product (and your data is the price). Treat all public Wi-Fi as 'Compromised' by default.",
        learningObjectives: ["Identify Evil Twin networks", "Understand MitM risks", "Learn how to secure public Wi-Fi usage"],
        financialImpact: "The 'DarkHotel' group used hotel Wi-Fi networks to target traveling executives with MitM attacks.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "DarkHotel Hotel Wi-Fi",
          analysis: "You connect to 'Airport_Guest_WiFi'. It's actually a laptop in a backpack nearby. The attacker captures your credentials as you check your email.",
          flowchart: ["Attacker uses a device to broadcast a common SSID.", "They jam or de-authenticate users from the real network.", "The victim's device automatically connects to the stronger 'Evil Twin'.", "Attacker routes traffic through their machine.", "Attacker runs a sniffer to capture unencrypted packets."],
          prevention: ["Disconnect from the network immediately.", "Forget the network in your device settings.", "Change all passwords used during that session."]
        },
        concepts: [{ name: "Man-in-the-Middle (Wi-Fi)", description: "An 'Evil Twin' is a fraudulent Wi-Fi network that appears legitimate but is actually controlled by an attacker to intercept your data." }],
        attackLifecycle: [{ step: 1, action: "Broadcasting", explanation: "Fake SSID setup." }, { step: 2, action: "Interception", explanation: "Sniffing traffic on the fake network." }],
        technicalIntelligence: { scenario: "Connecting to a fake public hotspot.", metrics: [] },
        checklists: { detection: ["Multiple Wi-Fi networks with nearly identical names.", "Public network asking for login/password it didn't need before.", "Unusual browser warnings about 'Insecure Connection'."], mitigation: ["Use a VPN.", "Disable Auto-Join."] },
        terminalScript: "wifi --scan --mitm"
      },
      hard: {
        title: "The Evil Twin Access Point (Advanced)",
        description: "An 'Evil Twin' is a fraudulent Wi-Fi network that appears legitimate but is actually controlled by an attacker to intercept your data.",
        threatLevel: "High",
        threatDescription: "Man-in-the-Middle (MitM) attack. The attacker can see every site you visit and capture your passwords.",
        defenseType: "Network Defense",
        defenseDescription: "Always use a reputable VPN on public Wi-Fi. Disable 'Auto-Join' in your settings.",
        priority: "High",
        priorityDescription: "Free Wi-Fi? Open Season for hackers. VPN up!",
        missionStatement: "If the network is free, YOU are the product (and your data is the price). Treat all public Wi-Fi as 'Compromised' by default.",
        learningObjectives: ["Identify Evil Twin networks", "Understand MitM risks", "Learn how to secure public Wi-Fi usage"],
        financialImpact: "The 'DarkHotel' group used hotel Wi-Fi networks to target traveling executives with MitM attacks.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "DarkHotel Hotel Wi-Fi",
          analysis: "You connect to 'Airport_Guest_WiFi'. It's actually a laptop in a backpack nearby. The attacker captures your credentials as you check your email.",
          flowchart: ["Attacker uses a device to broadcast a common SSID.", "They jam or de-authenticate users from the real network.", "The victim's device automatically connects to the stronger 'Evil Twin'.", "Attacker routes traffic through their machine.", "Attacker runs a sniffer to capture unencrypted packets."],
          prevention: ["Disconnect from the network immediately.", "Forget the network in your device settings.", "Change all passwords used during that session."]
        },
        concepts: [{ name: "Man-in-the-Middle (Wi-Fi)", description: "An 'Evil Twin' is a fraudulent Wi-Fi network that appears legitimate but is actually controlled by an attacker to intercept your data." }],
        attackLifecycle: [{ step: 1, action: "Broadcasting", explanation: "Fake SSID setup." }, { step: 2, action: "Interception", explanation: "Sniffing traffic on the fake network." }],
        technicalIntelligence: { scenario: "Connecting to a fake public hotspot.", metrics: [] },
        checklists: { detection: ["Multiple Wi-Fi networks with nearly identical names.", "Public network asking for login/password it didn't need before.", "Unusual browser warnings about 'Insecure Connection'."], mitigation: ["Use a VPN.", "Disable Auto-Join."] },
        terminalScript: "wifi --scan --mitm"
      }
    }
  },
  {
    id: "device_security",
    name: "Device Security",
    category: "Device Security",
    levels: {
      easy: {
        title: "Unpatched OS & Software",
        description: "Patches are security fixes. An unpatched device has 'known holes' that attackers can walk through using automated exploit kits.",
        threatLevel: "High",
        threatDescription: "Zero-Day and N-Day exploits. Attackers can take remote control of your device simply by you visiting a malicious site.",
        defenseType: "Software Defense",
        defenseDescription: "Enable 'Auto-Update' everywhere. Patch critical vulnerabilities within 24 hours.",
        priority: "High",
        priorityDescription: "A Patch a day keeps the hacker away!",
        missionStatement: "Security is a race between the Patch and the Exploit. Don't let the hackers win the race.",
        learningObjectives: ["Understand the importance of patching", "Identify risks of unpatched software", "Learn how to manage system updates"],
        financialImpact: "The massive Equifax breach was caused by a single unpatched server running an old version of Apache Struts.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Equifax Breach",
          analysis: "You keep clicking 'Remind me later' on updates. An attacker uses the 'BlueKeep' exploit to remotely install a miner on your laptop.",
          flowchart: ["A vulnerability is discovered in popular software.", "The vendor releases a security patch.", "The attacker analyzes the patch to find the vulnerability.", "They create exploit code.", "They scan the internet for unpatched devices."],
          prevention: ["Install updates immediately.", "Run a full system scan.", "Check installed apps for unknown entries."]
        },
        concepts: [{ name: "Exploiting Known Vulnerabilities", description: "Patches are security fixes. An unpatched device has 'known holes' that attackers can walk through using automated exploit kits." }],
        attackLifecycle: [{ step: 1, action: "Scanning", explanation: "Looking for unpatched devices." }, { step: 2, action: "Exploitation", explanation: "Executing code via the vulnerability." }],
        technicalIntelligence: { scenario: "Unpatched Windows OS.", metrics: [] },
        checklists: { detection: ["Frequent update notifications being ignored.", "Using software that is 'End of Life'.", "Sudden system slowdowns."], mitigation: ["Enable Auto-Update.", "Patch within 24 hours."] },
        terminalScript: "update --check --security"
      },
      medium: {
        title: "Unpatched OS & Software (Intermediate)",
        description: "Patches are security fixes. An unpatched device has 'known holes' that attackers can walk through using automated exploit kits.",
        threatLevel: "High",
        threatDescription: "Zero-Day and N-Day exploits. Attackers can take remote control of your device simply by you visiting a malicious site.",
        defenseType: "Software Defense",
        defenseDescription: "Enable 'Auto-Update' everywhere. Patch critical vulnerabilities within 24 hours.",
        priority: "High",
        priorityDescription: "A Patch a day keeps the hacker away!",
        missionStatement: "Security is a race between the Patch and the Exploit. Don't let the hackers win the race.",
        learningObjectives: ["Understand the importance of patching", "Identify risks of unpatched software", "Learn how to manage system updates"],
        financialImpact: "The massive Equifax breach was caused by a single unpatched server running an old version of Apache Struts.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Equifax Breach",
          analysis: "You keep clicking 'Remind me later' on updates. An attacker uses the 'BlueKeep' exploit to remotely install a miner on your laptop.",
          flowchart: ["A vulnerability is discovered in popular software.", "The vendor releases a security patch.", "The attacker analyzes the patch to find the vulnerability.", "They create exploit code.", "They scan the internet for unpatched devices."],
          prevention: ["Install updates immediately.", "Run a full system scan.", "Check installed apps for unknown entries."]
        },
        concepts: [{ name: "Exploiting Known Vulnerabilities", description: "Patches are security fixes. An unpatched device has 'known holes' that attackers can walk through using automated exploit kits." }],
        attackLifecycle: [{ step: 1, action: "Scanning", explanation: "Looking for unpatched devices." }, { step: 2, action: "Exploitation", explanation: "Executing code via the vulnerability." }],
        technicalIntelligence: { scenario: "Unpatched Windows OS.", metrics: [] },
        checklists: { detection: ["Frequent update notifications being ignored.", "Using software that is 'End of Life'.", "Sudden system slowdowns."], mitigation: ["Enable Auto-Update.", "Patch within 24 hours."] },
        terminalScript: "update --check --security"
      },
      hard: {
        title: "Unpatched OS & Software (Advanced)",
        description: "Patches are security fixes. An unpatched device has 'known holes' that attackers can walk through using automated exploit kits.",
        threatLevel: "High",
        threatDescription: "Zero-Day and N-Day exploits. Attackers can take remote control of your device simply by you visiting a malicious site.",
        defenseType: "Software Defense",
        defenseDescription: "Enable 'Auto-Update' everywhere. Patch critical vulnerabilities within 24 hours.",
        priority: "High",
        priorityDescription: "A Patch a day keeps the hacker away!",
        missionStatement: "Security is a race between the Patch and the Exploit. Don't let the hackers win the race.",
        learningObjectives: ["Understand the importance of patching", "Identify risks of unpatched software", "Learn how to manage system updates"],
        financialImpact: "The massive Equifax breach was caused by a single unpatched server running an old version of Apache Struts.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Equifax Breach",
          analysis: "You keep clicking 'Remind me later' on updates. An attacker uses the 'BlueKeep' exploit to remotely install a miner on your laptop.",
          flowchart: ["A vulnerability is discovered in popular software.", "The vendor releases a security patch.", "The attacker analyzes the patch to find the vulnerability.", "They create exploit code.", "They scan the internet for unpatched devices."],
          prevention: ["Install updates immediately.", "Run a full system scan.", "Check installed apps for unknown entries."]
        },
        concepts: [{ name: "Exploiting Known Vulnerabilities", description: "Patches are security fixes. An unpatched device has 'known holes' that attackers can walk through using automated exploit kits." }],
        attackLifecycle: [{ step: 1, action: "Scanning", explanation: "Looking for unpatched devices." }, { step: 2, action: "Exploitation", explanation: "Executing code via the vulnerability." }],
        technicalIntelligence: { scenario: "Unpatched Windows OS.", metrics: [] },
        checklists: { detection: ["Frequent update notifications being ignored.", "Using software that is 'End of Life'.", "Sudden system slowdowns."], mitigation: ["Enable Auto-Update.", "Patch within 24 hours."] },
        terminalScript: "update --check --security"
      }
    }
  },
  {
    id: "cloud_security",
    name: "Cloud Security",
    category: "Infrastructure Security",
    levels: {
      easy: {
        title: "Exposed Cloud Storage (S3)",
        description: "Cloud 'Buckets' are used to store massive data. A misconfiguration can make these buckets 'Public', allowing anyone to download everything.",
        threatLevel: "Critical",
        threatDescription: "Massive data leaks of PII or internal code. No 'hacking' is required—the data is simply open to the world.",
        defenseType: "Infrastructure Defense",
        defenseDescription: "Enable 'Public Access Block' by default and use 'Least Privilege' for IAM roles.",
        priority: "High",
        priorityDescription: "In the Cloud, 'Public' means 'The Whole World'. Lock it!",
        missionStatement: "The Cloud is someone else's computer. If you don't lock it, it's a public library.",
        learningObjectives: ["Identify misconfigured cloud buckets", "Understand IAM role security", "Learn how to block public access"],
        financialImpact: "The Capital One breach was largely due to a misconfigured cloud firewall and WAF.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Capital One S3 Leak",
          analysis: "A developer sets a bucket to 'Public' for testing and forgets to switch it back. Your customer database is found by a researcher.",
          flowchart: ["Company creates a cloud storage bucket.", "A user changes permissions to 'Public' for convenience.", "Attackers use automated tools to guess bucket names.", "The open bucket is discovered and contents are scraped.", "Data is sold or used for targeted attacks."],
          prevention: ["Change bucket permissions to Private immediately.", "Enable 'Block Public Access'.", "Audit access logs."]
        },
        concepts: [{ name: "Cloud Misconfiguration", description: "Cloud 'Buckets' are used to store massive data. A misconfiguration can make these buckets 'Public', allowing anyone to download everything." }],
        attackLifecycle: [{ step: 1, action: "Discovery", explanation: "Fuzzing for public bucket names." }, { step: 2, action: "Scraping", explanation: "Downloading data from open buckets." }],
        technicalIntelligence: { scenario: "Publicly accessible S3 bucket.", metrics: [] },
        checklists: { detection: ["Storage URLs that don't require authentication.", "Permissive IAM roles.", "Lack of Public Access Block."], mitigation: ["Block Public Access.", "Use Least Privilege IAM."] },
        terminalScript: "cloud --audit --storage"
      },
      medium: {
        title: "Exposed Cloud Storage (S3) (Intermediate)",
        description: "Cloud 'Buckets' are used to store massive data. A misconfiguration can make these buckets 'Public', allowing anyone to download everything.",
        threatLevel: "Critical",
        threatDescription: "Massive data leaks of PII or internal code. No 'hacking' is required—the data is simply open to the world.",
        defenseType: "Infrastructure Defense",
        defenseDescription: "Enable 'Public Access Block' by default and use 'Least Privilege' for IAM roles.",
        priority: "High",
        priorityDescription: "In the Cloud, 'Public' means 'The Whole World'. Lock it!",
        missionStatement: "The Cloud is someone else's computer. If you don't lock it, it's a public library.",
        learningObjectives: ["Identify misconfigured cloud buckets", "Understand IAM role security", "Learn how to block public access"],
        financialImpact: "The Capital One breach was largely due to a misconfigured cloud firewall and WAF.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Capital One S3 Leak",
          analysis: "A developer sets a bucket to 'Public' for testing and forgets to switch it back. Your customer database is found by a researcher.",
          flowchart: ["Company creates a cloud storage bucket.", "A user changes permissions to 'Public' for convenience.", "Attackers use automated tools to guess bucket names.", "The open bucket is discovered and contents are scraped.", "Data is sold or used for targeted attacks."],
          prevention: ["Change bucket permissions to Private immediately.", "Enable 'Block Public Access'.", "Audit access logs."]
        },
        concepts: [{ name: "Cloud Misconfiguration", description: "Cloud 'Buckets' are used to store massive data. A misconfiguration can make these buckets 'Public', allowing anyone to download everything." }],
        attackLifecycle: [{ step: 1, action: "Discovery", explanation: "Fuzzing for public bucket names." }, { step: 2, action: "Scraping", explanation: "Downloading data from open buckets." }],
        technicalIntelligence: { scenario: "Publicly accessible S3 bucket.", metrics: [] },
        checklists: { detection: ["Storage URLs that don't require authentication.", "Permissive IAM roles.", "Lack of Public Access Block."], mitigation: ["Block Public Access.", "Use Least Privilege IAM."] },
        terminalScript: "cloud --audit --storage"
      },
      hard: {
        title: "Exposed Cloud Storage (S3) (Advanced)",
        description: "Cloud 'Buckets' are used to store massive data. A misconfiguration can make these buckets 'Public', allowing anyone to download everything.",
        threatLevel: "Critical",
        threatDescription: "Massive data leaks of PII or internal code. No 'hacking' is required—the data is simply open to the world.",
        defenseType: "Infrastructure Defense",
        defenseDescription: "Enable 'Public Access Block' by default and use 'Least Privilege' for IAM roles.",
        priority: "High",
        priorityDescription: "In the Cloud, 'Public' means 'The Whole World'. Lock it!",
        missionStatement: "The Cloud is someone else's computer. If you don't lock it, it's a public library.",
        learningObjectives: ["Identify misconfigured cloud buckets", "Understand IAM role security", "Learn how to block public access"],
        financialImpact: "The Capital One breach was largely due to a misconfigured cloud firewall and WAF.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Capital One S3 Leak",
          analysis: "A developer sets a bucket to 'Public' for testing and forgets to switch it back. Your customer database is found by a researcher.",
          flowchart: ["Company creates a cloud storage bucket.", "A user changes permissions to 'Public' for convenience.", "Attackers use automated tools to guess bucket names.", "The open bucket is discovered and contents are scraped.", "Data is sold or used for targeted attacks."],
          prevention: ["Change bucket permissions to Private immediately.", "Enable 'Block Public Access'.", "Audit access logs."]
        },
        concepts: [{ name: "Cloud Misconfiguration", description: "Cloud 'Buckets' are used to store massive data. A misconfiguration can make these buckets 'Public', allowing anyone to download everything." }],
        attackLifecycle: [{ step: 1, action: "Discovery", explanation: "Fuzzing for public bucket names." }, { step: 2, action: "Scraping", explanation: "Downloading data from open buckets." }],
        technicalIntelligence: { scenario: "Publicly accessible S3 bucket.", metrics: [] },
        checklists: { detection: ["Storage URLs that don't require authentication.", "Permissive IAM roles.", "Lack of Public Access Block."], mitigation: ["Block Public Access.", "Use Least Privilege IAM."] },
        terminalScript: "cloud --audit --storage"
      }
    }
  },
  {
    id: "mfa_authentication",
    name: "MFA & Authentication",
    category: "Identity Security",
    levels: {
      easy: {
        title: "MFA Fatigue (Push Spam)",
        description: "MFA Fatigue is when an attacker sends dozens of 'Push' notifications to your phone, hoping you'll eventually click 'Approve' just to make the noise stop.",
        threatLevel: "High",
        threatDescription: "Bypasses the strongest security layer (MFA). Once you click 'Approve', the attacker has full access to your account.",
        defenseType: "Identity Defense",
        defenseDescription: "Use 'Number Matching' MFA instead of simple 'Approve/Deny'. Never approve a prompt you didn't start.",
        priority: "Critical",
        priorityDescription: "If you didn't ask for the key, don't open the door!",
        missionStatement: "MFA is a 'Challenge-Response' system. If you didn't start the challenge, the only response is REJECT.",
        learningObjectives: ["Identify MFA fatigue attacks", "Understand the risk of push spam", "Learn secure MFA practices"],
        financialImpact: "The 2022 Uber breach involved a successful MFA Fatigue attack against an employee.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Uber MFA Breach",
          analysis: "It's 3 AM. Your phone starts buzzing with Microsoft Authenticator prompts. After the 20th one, you click 'Approve' to stop the noise.",
          flowchart: ["Attacker steals your password.", "Attacker attempts to log into your account.", "The system sends a push notification.", "Attacker repeats login attempt hundreds of times.", "User eventually clicks 'Approve' out of annoyance."],
          prevention: ["Change your password immediately.", "Report MFA spam to IT.", "Revoke 'Remembered Devices'."]
        },
        concepts: [{ name: "MFA Exhaustion Attack", description: "MFA Fatigue is when an attacker sends dozens of 'Push' notifications to your phone, hoping you'll eventually click 'Approve' just to make the noise stop." }],
        attackLifecycle: [{ step: 1, action: "Authentication", explanation: "Triggering multiple MFA prompts." }, { step: 2, action: "Compromise", explanation: "User approves the fake prompt." }],
        technicalIntelligence: { scenario: "MFA push notification spam.", metrics: [] },
        checklists: { detection: ["Multiple MFA prompts when you aren't logging in.", "Prompts from unrecognized locations.", "Prompts at unusual times."], mitigation: ["Reject all unauthorized prompts.", "Report to security."] },
        terminalScript: "mfa --audit --status"
      },
      medium: {
        title: "MFA Fatigue (Push Spam) (Intermediate)",
        description: "MFA Fatigue is when an attacker sends dozens of 'Push' notifications to your phone, hoping you'll eventually click 'Approve' just to make the noise stop.",
        threatLevel: "High",
        threatDescription: "Bypasses the strongest security layer (MFA). Once you click 'Approve', the attacker has full access to your account.",
        defenseType: "Identity Defense",
        defenseDescription: "Use 'Number Matching' MFA instead of simple 'Approve/Deny'. Never approve a prompt you didn't start.",
        priority: "Critical",
        priorityDescription: "If you didn't ask for the key, don't open the door!",
        missionStatement: "MFA is a 'Challenge-Response' system. If you didn't start the challenge, the only response is REJECT.",
        learningObjectives: ["Identify MFA fatigue attacks", "Understand the risk of push spam", "Learn secure MFA practices"],
        financialImpact: "The 2022 Uber breach involved a successful MFA Fatigue attack against an employee.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Uber MFA Breach",
          analysis: "It's 3 AM. Your phone starts buzzing with Microsoft Authenticator prompts. After the 20th one, you click 'Approve' to stop the noise.",
          flowchart: ["Attacker steals your password.", "Attacker attempts to log into your account.", "The system sends a push notification.", "Attacker repeats login attempt hundreds of times.", "User eventually clicks 'Approve' out of annoyance."],
          prevention: ["Change your password immediately.", "Report MFA spam to IT.", "Revoke 'Remembered Devices'."]
        },
        concepts: [{ name: "MFA Exhaustion Attack", description: "MFA Fatigue is when an attacker sends dozens of 'Push' notifications to your phone, hoping you'll eventually click 'Approve' just to make the noise stop." }],
        attackLifecycle: [{ step: 1, action: "Authentication", explanation: "Triggering multiple MFA prompts." }, { step: 2, action: "Compromise", explanation: "User approves the fake prompt." }],
        technicalIntelligence: { scenario: "MFA push notification spam.", metrics: [] },
        checklists: { detection: ["Multiple MFA prompts when you aren't logging in.", "Prompts from unrecognized locations.", "Prompts at unusual times."], mitigation: ["Reject all unauthorized prompts.", "Report to security."] },
        terminalScript: "mfa --audit --status"
      },
      hard: {
        title: "MFA Fatigue (Push Spam) (Advanced)",
        description: "MFA Fatigue is when an attacker sends dozens of 'Push' notifications to your phone, hoping you'll eventually click 'Approve' just to make the noise stop.",
        threatLevel: "High",
        threatDescription: "Bypasses the strongest security layer (MFA). Once you click 'Approve', the attacker has full access to your account.",
        defenseType: "Identity Defense",
        defenseDescription: "Use 'Number Matching' MFA instead of simple 'Approve/Deny'. Never approve a prompt you didn't start.",
        priority: "Critical",
        priorityDescription: "If you didn't ask for the key, don't open the door!",
        missionStatement: "MFA is a 'Challenge-Response' system. If you didn't start the challenge, the only response is REJECT.",
        learningObjectives: ["Identify MFA fatigue attacks", "Understand the risk of push spam", "Learn secure MFA practices"],
        financialImpact: "The 2022 Uber breach involved a successful MFA Fatigue attack against an employee.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Uber MFA Breach",
          analysis: "It's 3 AM. Your phone starts buzzing with Microsoft Authenticator prompts. After the 20th one, you click 'Approve' to stop the noise.",
          flowchart: ["Attacker steals your password.", "Attacker attempts to log into your account.", "The system sends a push notification.", "Attacker repeats login attempt hundreds of times.", "User eventually clicks 'Approve' out of annoyance."],
          prevention: ["Change your password immediately.", "Report MFA spam to IT.", "Revoke 'Remembered Devices'."]
        },
        concepts: [{ name: "MFA Exhaustion Attack", description: "MFA Fatigue is when an attacker sends dozens of 'Push' notifications to your phone, hoping you'll eventually click 'Approve' just to make the noise stop." }],
        attackLifecycle: [{ step: 1, action: "Authentication", explanation: "Triggering multiple MFA prompts." }, { step: 2, action: "Compromise", explanation: "User approves the fake prompt." }],
        technicalIntelligence: { scenario: "MFA push notification spam.", metrics: [] },
        checklists: { detection: ["Multiple MFA prompts when you aren't logging in.", "Prompts from unrecognized locations.", "Prompts at unusual times."], mitigation: ["Reject all unauthorized prompts.", "Report to security."] },
        terminalScript: "mfa --audit --status"
      }
    }
  },
  {
    id: "data_classification",
    name: "Data Classification",
    category: "Data Security",
    levels: {
      easy: {
        title: "Safe Handling of PII",
        description: "Personally Identifiable Information (PII) is any data that can identify a person. Safe handling means ensuring only authorized people can see it.",
        threatLevel: "High",
        threatDescription: "Identity theft, regulatory fines (GDPR), and loss of trust. PII is the most valuable asset for social engineers.",
        defenseType: "Data Defense",
        defenseDescription: "Always use 'Data Masking' or 'Anonymization' before sharing datasets. Double-check sensitivity labels.",
        priority: "High",
        priorityDescription: "If it's PII, keep it on the 'I' (Inside)!",
        missionStatement: "Data is a liability. Only hold what you need, and only share what is absolutely required.",
        learningObjectives: ["Identify PII types", "Understand data classification labels", "Learn secure data sharing methods"],
        financialImpact: "Many Indian startups have faced leaks due to unencrypted customer PII in their databases.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Accidental Data Disclosure",
          analysis: "You send a spreadsheet to a vendor but forgot to delete a 'hidden' column with Credit Card numbers.",
          flowchart: ["Sensitive data is collected.", "Data is not labeled correctly.", "User shares whole file for speed.", "Recipient system is compromised.", "PII is leaked, triggering breach notification."],
          prevention: ["Notify DPO immediately.", "Attempt to Recall the email.", "Ask recipient to delete the file."]
        },
        concepts: [{ name: "Safe Handling of PII", description: "Personally Identifiable Information (PII) is any data that can identify a person. Safe handling means ensuring only authorized people can see it." }],
        attackLifecycle: [{ step: 1, action: "Disclosure", explanation: "Accidental sharing of sensitive data." }, { step: 2, action: "Exploitation", explanation: "Attacker uses leaked PII for theft." }],
        technicalIntelligence: { scenario: "Sharing customer list with PII.", metrics: [] },
        checklists: { detection: ["Files with PAN/CC info being sent unencrypted.", "Lack of 'Confidential' labels.", "Sharing without a Data Processing Agreement."], mitigation: ["Mask sensitive data.", "Double-check labels."] },
        terminalScript: "data --scan --pii"
      },
      medium: {
        title: "Safe Handling of PII (Intermediate)",
        description: "Personally Identifiable Information (PII) is any data that can identify a person. Safe handling means ensuring only authorized people can see it.",
        threatLevel: "High",
        threatDescription: "Identity theft, regulatory fines (GDPR), and loss of trust. PII is the most valuable asset for social engineers.",
        defenseType: "Data Defense",
        defenseDescription: "Always use 'Data Masking' or 'Anonymization' before sharing datasets. Double-check sensitivity labels.",
        priority: "High",
        priorityDescription: "If it's PII, keep it on the 'I' (Inside)!",
        missionStatement: "Data is a liability. Only hold what you need, and only share what is absolutely required.",
        learningObjectives: ["Identify PII types", "Understand data classification labels", "Learn secure data sharing methods"],
        financialImpact: "Many Indian startups have faced leaks due to unencrypted customer PII in their databases.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Accidental Data Disclosure",
          analysis: "You send a spreadsheet to a vendor but forgot to delete a 'hidden' column with Credit Card numbers.",
          flowchart: ["Sensitive data is collected.", "Data is not labeled correctly.", "User shares whole file for speed.", "Recipient system is compromised.", "PII is leaked, triggering breach notification."],
          prevention: ["Notify DPO immediately.", "Attempt to Recall the email.", "Ask recipient to delete the file."]
        },
        concepts: [{ name: "Safe Handling of PII", description: "Personally Identifiable Information (PII) is any data that can identify a person. Safe handling means ensuring only authorized people can see it." }],
        attackLifecycle: [{ step: 1, action: "Disclosure", explanation: "Accidental sharing of sensitive data." }, { step: 2, action: "Exploitation", explanation: "Attacker uses leaked PII for theft." }],
        technicalIntelligence: { scenario: "Sharing customer list with PII.", metrics: [] },
        checklists: { detection: ["Files with PAN/CC info being sent unencrypted.", "Lack of 'Confidential' labels.", "Sharing without a Data Processing Agreement."], mitigation: ["Mask sensitive data.", "Double-check labels."] },
        terminalScript: "data --scan --pii"
      },
      hard: {
        title: "Safe Handling of PII (Advanced)",
        description: "Personally Identifiable Information (PII) is any data that can identify a person. Safe handling means ensuring only authorized people can see it.",
        threatLevel: "High",
        threatDescription: "Identity theft, regulatory fines (GDPR), and loss of trust. PII is the most valuable asset for social engineers.",
        defenseType: "Data Defense",
        defenseDescription: "Always use 'Data Masking' or 'Anonymization' before sharing datasets. Double-check sensitivity labels.",
        priority: "High",
        priorityDescription: "If it's PII, keep it on the 'I' (Inside)!",
        missionStatement: "Data is a liability. Only hold what you need, and only share what is absolutely required.",
        learningObjectives: ["Identify PII types", "Understand data classification labels", "Learn secure data sharing methods"],
        financialImpact: "Many Indian startups have faced leaks due to unencrypted customer PII in their databases.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Accidental Data Disclosure",
          analysis: "You send a spreadsheet to a vendor but forgot to delete a 'hidden' column with Credit Card numbers.",
          flowchart: ["Sensitive data is collected.", "Data is not labeled correctly.", "User shares whole file for speed.", "Recipient system is compromised.", "PII is leaked, triggering breach notification."],
          prevention: ["Notify DPO immediately.", "Attempt to Recall the email.", "Ask recipient to delete the file."]
        },
        concepts: [{ name: "Safe Handling of PII", description: "Personally Identifiable Information (PII) is any data that can identify a person. Safe handling means ensuring only authorized people can see it." }],
        attackLifecycle: [{ step: 1, action: "Disclosure", explanation: "Accidental sharing of sensitive data." }, { step: 2, action: "Exploitation", explanation: "Attacker uses leaked PII for theft." }],
        technicalIntelligence: { scenario: "Sharing customer list with PII.", metrics: [] },
        checklists: { detection: ["Files with PAN/CC info being sent unencrypted.", "Lack of 'Confidential' labels.", "Sharing without a Data Processing Agreement."], mitigation: ["Mask sensitive data.", "Double-check labels."] },
        terminalScript: "data --scan --pii"
      }
    }
  },
  {
    id: "incident_response",
    name: "Incident Response",
    category: "Security Operations",
    levels: {
      easy: {
        title: "Evidence Preservation",
        description: "When a hack happens, the first instinct is to 'Fix it'. However, doing so incorrectly can destroy digital evidence.",
        threatLevel: "High",
        threatDescription: "Losing the chance to find out 'How' it happened. Without logs or memory captures, the attacker could still be in your system.",
        defenseType: "Response Defense",
        defenseDescription: "Isolate the device. Do NOT remediate it yourself. Call the professionals.",
        priority: "High",
        priorityDescription: "Isolate the Cord, Save the Record!",
        missionStatement: "A hacked computer is a crime scene. Don't touch anything. Call the experts.",
        learningObjectives: ["Understand evidence preservation", "Identify panic-based mistakes", "Learn proper isolation techniques"],
        financialImpact: "In many corporate hacks, the biggest hurdle is the 'Helpful IT guy' who formatted the server before investigators arrived.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Panic Cleanup",
          analysis: "You find a virus on your machine. You run a 'Full Clean' and delete temporary files, erasing the attacker's footprints.",
          flowchart: ["A security breach occurs.", "A non-expert discover the issue.", "Driven by panic, they attempt self-remediation.", "They delete malicious files and clear history.", "IR team finds zero evidence of entry."],
          prevention: ["Stop using the machine immediately.", "Disconnect network cable.", "Do NOT turn off or reboot."]
        },
        concepts: [{ name: "Digital Forensics preservation", description: "When a hack happens, the first instinct is to 'Fix it'. However, doing so incorrectly can destroy digital evidence." }],
        attackLifecycle: [{ step: 1, action: "Detection", explanation: "Identifying a compromise." }, { step: 2, action: "Isolation", explanation: "Stopping the spread without destroying data." }],
        technicalIntelligence: { scenario: "Preserving a hacked workstation.", metrics: [] },
        checklists: { detection: ["Shutting down instead of disconnecting.", "Deleting log files during cleanup.", "Modifying file timestamps."], mitigation: ["Isolate device.", "Report to IR team."] },
        terminalScript: "response --isolate --preserve"
      },
      medium: {
        title: "Evidence Preservation (Intermediate)",
        description: "When a hack happens, the first instinct is to 'Fix it'. However, doing so incorrectly can destroy digital evidence.",
        threatLevel: "High",
        threatDescription: "Losing the chance to find out 'How' it happened. Without logs or memory captures, the attacker could still be in your system.",
        defenseType: "Response Defense",
        defenseDescription: "Isolate the device. Do NOT remediate it yourself. Call the professionals.",
        priority: "High",
        priorityDescription: "Isolate the Cord, Save the Record!",
        missionStatement: "A hacked computer is a crime scene. Don't touch anything. Call the experts.",
        learningObjectives: ["Understand evidence preservation", "Identify panic-based mistakes", "Learn proper isolation techniques"],
        financialImpact: "In many corporate hacks, the biggest hurdle is the 'Helpful IT guy' who formatted the server before investigators arrived.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Panic Cleanup",
          analysis: "You find a virus on your machine. You run a 'Full Clean' and delete temporary files, erasing the attacker's footprints.",
          flowchart: ["A security breach occurs.", "A non-expert discover the issue.", "Driven by panic, they attempt self-remediation.", "They delete malicious files and clear history.", "IR team finds zero evidence of entry."],
          prevention: ["Stop using the machine immediately.", "Disconnect network cable.", "Do NOT turn off or reboot."]
        },
        concepts: [{ name: "Digital Forensics preservation", description: "When a hack happens, the first instinct is to 'Fix it'. However, doing so incorrectly can destroy digital evidence." }],
        attackLifecycle: [{ step: 1, action: "Detection", explanation: "Identifying a compromise." }, { step: 2, action: "Isolation", explanation: "Stopping the spread without destroying data." }],
        technicalIntelligence: { scenario: "Preserving a hacked workstation.", metrics: [] },
        checklists: { detection: ["Shutting down instead of disconnecting.", "Deleting log files during cleanup.", "Modifying file timestamps."], mitigation: ["Isolate device.", "Report to IR team."] },
        terminalScript: "response --isolate --preserve"
      },
      hard: {
        title: "Evidence Preservation (Advanced)",
        description: "When a hack happens, the first instinct is to 'Fix it'. However, doing so incorrectly can destroy digital evidence.",
        threatLevel: "High",
        threatDescription: "Losing the chance to find out 'How' it happened. Without logs or memory captures, the attacker could still be in your system.",
        defenseType: "Response Defense",
        defenseDescription: "Isolate the device. Do NOT remediate it yourself. Call the professionals.",
        priority: "High",
        priorityDescription: "Isolate the Cord, Save the Record!",
        missionStatement: "A hacked computer is a crime scene. Don't touch anything. Call the experts.",
        learningObjectives: ["Understand evidence preservation", "Identify panic-based mistakes", "Learn proper isolation techniques"],
        financialImpact: "In many corporate hacks, the biggest hurdle is the 'Helpful IT guy' who formatted the server before investigators arrived.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "Panic Cleanup",
          analysis: "You find a virus on your machine. You run a 'Full Clean' and delete temporary files, erasing the attacker's footprints.",
          flowchart: ["A security breach occurs.", "A non-expert discover the issue.", "Driven by panic, they attempt self-remediation.", "They delete malicious files and clear history.", "IR team finds zero evidence of entry."],
          prevention: ["Stop using the machine immediately.", "Disconnect network cable.", "Do NOT turn off or reboot."]
        },
        concepts: [{ name: "Digital Forensics preservation", description: "When a hack happens, the first instinct is to 'Fix it'. However, doing so incorrectly can destroy digital evidence." }],
        attackLifecycle: [{ step: 1, action: "Detection", explanation: "Identifying a compromise." }, { step: 2, action: "Isolation", explanation: "Stopping the spread without destroying data." }],
        technicalIntelligence: { scenario: "Preserving a hacked workstation.", metrics: [] },
        checklists: { detection: ["Shutting down instead of disconnecting.", "Deleting log files during cleanup.", "Modifying file timestamps."], mitigation: ["Isolate device.", "Report to IR team."] },
        terminalScript: "response --isolate --preserve"
      }
    }
  },
  {
    id: "privacy_awareness",
    name: "Privacy Awareness",
    category: "Privacy Awareness",
    levels: {
      easy: {
        title: "Over-permissioned Apps",
        description: "Apps often ask for permissions they don't need (e.g., a Flashlight app asking for location). These are often 'Privacy Leaks'.",
        threatLevel: "Medium",
        threatDescription: "Continuous monitoring. Apps build profiles of where you go and who you talk to, which can be sold or used for phishing.",
        defenseType: "Privacy Defense",
        defenseDescription: "Review permissions quarterly. Deny anything that isn't absolutely necessary.",
        priority: "Medium",
        priorityDescription: "Permission Denied is Privacy Applied!",
        missionStatement: "My data is my life. Does this app really need to know where I sleep?",
        learningObjectives: ["Identify over-permissioned apps", "Understand the risk of data harvesting", "Learn how to manage mobile permissions"],
        financialImpact: "Many 'Flashlight' apps were found to be sending user location and contact data to remote servers.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Data Harvesting Apps",
          analysis: "You install a 'Photo Filter' app. It asks for access to 'Contacts'. A week later, your contacts receive spam from your number.",
          flowchart: ["Developer creates a utility app.", "Includes data-scraping SDKs.", "App is listed for free.", "User grants all permissions.", "App scrapes data in the background."],
          prevention: ["Uninstall suspicious apps immediately.", "Revoke permissions in Settings.", "Run a mobile security scan."]
        },
        concepts: [{ name: "Data Harvesting via Permissions", description: "Apps often ask for permissions they don't need (e.g., a Flashlight app asking for location). These are often 'Privacy Leaks'." }],
        attackLifecycle: [{ step: 1, action: "Installation", explanation: "User installs a 'free' app." }, { step: 2, action: "Harvesting", explanation: "Scraping data via granted permissions." }],
        technicalIntelligence: { scenario: "Malicious mobile app permissions.", metrics: [] },
        checklists: { detection: ["Apps asking for unrelated permissions.", "Free app requiring massive data access.", "High-risk permissions like 'Read SMS'."], mitigation: ["Review permissions quarterly.", "Deny unnecessary access."] },
        terminalScript: "privacy --audit --apps"
      },
      medium: {
        title: "Over-permissioned Apps (Intermediate)",
        description: "Apps often ask for permissions they don't need (e.g., a Flashlight app asking for location). These are often 'Privacy Leaks'.",
        threatLevel: "Medium",
        threatDescription: "Continuous monitoring. Apps build profiles of where you go and who you talk to, which can be sold or used for phishing.",
        defenseType: "Privacy Defense",
        defenseDescription: "Review permissions quarterly. Deny anything that isn't absolutely necessary.",
        priority: "Medium",
        priorityDescription: "Permission Denied is Privacy Applied!",
        missionStatement: "My data is my life. Does this app really need to know where I sleep?",
        learningObjectives: ["Identify over-permissioned apps", "Understand the risk of data harvesting", "Learn how to manage mobile permissions"],
        financialImpact: "Many 'Flashlight' apps were found to be sending user location and contact data to remote servers.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Data Harvesting Apps",
          analysis: "You install a 'Photo Filter' app. It asks for access to 'Contacts'. A week later, your contacts receive spam from your number.",
          flowchart: ["Developer creates a utility app.", "Includes data-scraping SDKs.", "App is listed for free.", "User grants all permissions.", "App scrapes data in the background."],
          prevention: ["Uninstall suspicious apps immediately.", "Revoke permissions in Settings.", "Run a mobile security scan."]
        },
        concepts: [{ name: "Data Harvesting via Permissions", description: "Apps often ask for permissions they don't need (e.g., a Flashlight app asking for location). These are often 'Privacy Leaks'." }],
        attackLifecycle: [{ step: 1, action: "Installation", explanation: "User installs a 'free' app." }, { step: 2, action: "Harvesting", explanation: "Scraping data via granted permissions." }],
        technicalIntelligence: { scenario: "Malicious mobile app permissions.", metrics: [] },
        checklists: { detection: ["Apps asking for unrelated permissions.", "Free app requiring massive data access.", "High-risk permissions like 'Read SMS'."], mitigation: ["Review permissions quarterly.", "Deny unnecessary access."] },
        terminalScript: "privacy --audit --apps"
      },
      hard: {
        title: "Over-permissioned Apps (Advanced)",
        description: "Apps often ask for permissions they don't need (e.g., a Flashlight app asking for location). These are often 'Privacy Leaks'.",
        threatLevel: "Medium",
        threatDescription: "Continuous monitoring. Apps build profiles of where you go and who you talk to, which can be sold or used for phishing.",
        defenseType: "Privacy Defense",
        defenseDescription: "Review permissions quarterly. Deny anything that isn't absolutely necessary.",
        priority: "Medium",
        priorityDescription: "Permission Denied is Privacy Applied!",
        missionStatement: "My data is my life. Does this app really need to know where I sleep?",
        learningObjectives: ["Identify over-permissioned apps", "Understand the risk of data harvesting", "Learn how to manage mobile permissions"],
        financialImpact: "Many 'Flashlight' apps were found to be sending user location and contact data to remote servers.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "Data Harvesting Apps",
          analysis: "You install a 'Photo Filter' app. It asks for access to 'Contacts'. A week later, your contacts receive spam from your number.",
          flowchart: ["Developer creates a utility app.", "Includes data-scraping SDKs.", "App is listed for free.", "User grants all permissions.", "App scrapes data in the background."],
          prevention: ["Uninstall suspicious apps immediately.", "Revoke permissions in Settings.", "Run a mobile security scan."]
        },
        concepts: [{ name: "Data Harvesting via Permissions", description: "Apps often ask for permissions they don't need (e.g., a Flashlight app asking for location). These are often 'Privacy Leaks'." }],
        attackLifecycle: [{ step: 1, action: "Installation", explanation: "User installs a 'free' app." }, { step: 2, action: "Harvesting", explanation: "Scraping data via granted permissions." }],
        technicalIntelligence: { scenario: "Malicious mobile app permissions.", metrics: [] },
        checklists: { detection: ["Apps asking for unrelated permissions.", "Free app requiring massive data access.", "High-risk permissions like 'Read SMS'."], mitigation: ["Review permissions quarterly.", "Deny unnecessary access."] },
        terminalScript: "privacy --audit --apps"
      }
    }
  },
  {
    id: "ai_deepfake",
    name: "AI & Deepfake Risks",
    category: "AI Security",
    levels: {
      easy: {
        title: "AI Voice Cloning Fraud",
        description: "AI can clone a person's voice using just seconds of audio. Attackers use this to impersonate executives or family members.",
        threatLevel: "High",
        threatDescription: "Extreme Social Engineering. When you 'hear' a trusted voice, your skepticism drops, leading to unauthorized transfers.",
        defenseType: "AI Defense",
        defenseDescription: "Establish a 'Code Word' for sensitive requests. Always verify via a secondary, known channel.",
        priority: "High",
        priorityDescription: "Trust the EAR, but VERIFY the gear!",
        missionStatement: "In the age of AI, audio and video are no longer proof of identity. Use out-of-band verification.",
        learningObjectives: ["Identify AI voice cloning", "Understand deepfake risks", "Learn out-of-band verification methods"],
        financialImpact: "A company in Hong Kong lost $25 million after an employee was tricked by a deepfake video call.",
        complexityIndex: "High",
        caseStudy: {
          incident: "CEO Voice Clone",
          analysis: "An employee receives a call from their 'CEO'. The voice is identical. They ask for an urgent transfer of ₹5 Lakhs.",
          flowchart: ["Attacker collects audio from social media.", "AI model clones the voice.", "Attacker spoofs caller ID.", "Voice clone used in high-pressure call.", "Victim bypasses controls."],
          prevention: ["Terminate the call immediately.", "Call back on official number.", "Establish a Code Word."]
        },
        concepts: [{ name: "AI-Augmented Vishing", description: "AI can clone a person's voice using just seconds of audio. Attackers use this to impersonate executives or family members." }],
        attackLifecycle: [{ step: 1, action: "Cloning", explanation: "Creating the AI voice model." }, { step: 2, action: "Vishing", explanation: "Executing the fraudulent phone call." }],
        technicalIntelligence: { scenario: "Deepfake voice call from boss.", metrics: [] },
        checklists: { detection: ["Unusual emotional state/crisis.", "Person 'can't talk' further.", "Strange robotic artifacts."], mitigation: ["Out-of-band verification.", "Use Code Words."] },
        terminalScript: "ai --scan --deepfake"
      },
      medium: {
        title: "AI Voice Cloning Fraud (Intermediate)",
        description: "AI can clone a person's voice using just seconds of audio. Attackers use this to impersonate executives or family members.",
        threatLevel: "High",
        threatDescription: "Extreme Social Engineering. When you 'hear' a trusted voice, your skepticism drops, leading to unauthorized transfers.",
        defenseType: "AI Defense",
        defenseDescription: "Establish a 'Code Word' for sensitive requests. Always verify via a secondary, known channel.",
        priority: "High",
        priorityDescription: "Trust the EAR, but VERIFY the gear!",
        missionStatement: "In the age of AI, audio and video are no longer proof of identity. Use out-of-band verification.",
        learningObjectives: ["Identify AI voice cloning", "Understand deepfake risks", "Learn out-of-band verification methods"],
        financialImpact: "A company in Hong Kong lost $25 million after an employee was tricked by a deepfake video call.",
        complexityIndex: "High",
        caseStudy: {
          incident: "CEO Voice Clone",
          analysis: "An employee receives a call from their 'CEO'. The voice is identical. They ask for an urgent transfer of ₹5 Lakhs.",
          flowchart: ["Attacker collects audio from social media.", "AI model clones the voice.", "Attacker spoofs caller ID.", "Voice clone used in high-pressure call.", "Victim bypasses controls."],
          prevention: ["Terminate the call immediately.", "Call back on official number.", "Establish a Code Word."]
        },
        concepts: [{ name: "AI-Augmented Vishing", description: "AI can clone a person's voice using just seconds of audio. Attackers use this to impersonate executives or family members." }],
        attackLifecycle: [{ step: 1, action: "Cloning", explanation: "Creating the AI voice model." }, { step: 2, action: "Vishing", explanation: "Executing the fraudulent phone call." }],
        technicalIntelligence: { scenario: "Deepfake voice call from boss.", metrics: [] },
        checklists: { detection: ["Unusual emotional state/crisis.", "Person 'can't talk' further.", "Strange robotic artifacts."], mitigation: ["Out-of-band verification.", "Use Code Words."] },
        terminalScript: "ai --scan --deepfake"
      },
      hard: {
        title: "AI Voice Cloning Fraud (Advanced)",
        description: "AI can clone a person's voice using just seconds of audio. Attackers use this to impersonate executives or family members.",
        threatLevel: "High",
        threatDescription: "Extreme Social Engineering. When you 'hear' a trusted voice, your skepticism drops, leading to unauthorized transfers.",
        defenseType: "AI Defense",
        defenseDescription: "Establish a 'Code Word' for sensitive requests. Always verify via a secondary, known channel.",
        priority: "High",
        priorityDescription: "Trust the EAR, but VERIFY the gear!",
        missionStatement: "In the age of AI, audio and video are no longer proof of identity. Use out-of-band verification.",
        learningObjectives: ["Identify AI voice cloning", "Understand deepfake risks", "Learn out-of-band verification methods"],
        financialImpact: "A company in Hong Kong lost $25 million after an employee was tricked by a deepfake video call.",
        complexityIndex: "High",
        caseStudy: {
          incident: "CEO Voice Clone",
          analysis: "An employee receives a call from their 'CEO'. The voice is identical. They ask for an urgent transfer of ₹5 Lakhs.",
          flowchart: ["Attacker collects audio from social media.", "AI model clones the voice.", "Attacker spoofs caller ID.", "Voice clone used in high-pressure call.", "Victim bypasses controls."],
          prevention: ["Terminate the call immediately.", "Call back on official number.", "Establish a Code Word."]
        },
        concepts: [{ name: "AI-Augmented Vishing", description: "AI can clone a person's voice using just seconds of audio. Attackers use this to impersonate executives or family members." }],
        attackLifecycle: [{ step: 1, action: "Cloning", explanation: "Creating the AI voice model." }, { step: 2, action: "Vishing", explanation: "Executing the fraudulent phone call." }],
        technicalIntelligence: { scenario: "Deepfake voice call from boss.", metrics: [] },
        checklists: { detection: ["Unusual emotional state/crisis.", "Person 'can't talk' further.", "Strange robotic artifacts."], mitigation: ["Out-of-band verification.", "Use Code Words."] },
        terminalScript: "ai --scan --deepfake"
      }
    }
  },
  {
    id: "attack_calls",
    name: "Simulated Attack Calls",
    category: "Scenario Simulations",
    levels: {
      easy: {
        title: "Introduction to Vishing",
        description: "Voice phishing (vishing) uses phone calls to manipulate victims. Learn the common scripts used by attackers.",
        threatLevel: "Medium",
        threatDescription: "Emotional Manipulation. Attackers use fear and urgency to bypass your logical thinking.",
        defenseType: "Verification",
        defenseDescription: "Always hang up and call back on an official, trusted number. Never share OTPs over the phone.",
        priority: "High",
        priorityDescription: "Vishing is the fastest growing threat in the digital age.",
        missionStatement: "Silence is safety. If you didn't initiate the call, don't share the data.",
        learningObjectives: ["Identify common vishing scripts", "Understand the 'Fear State' tactic", "Learn to report fraudulent numbers"],
        financialImpact: "Vishing accounts for billions in losses annually, targeting individuals and businesses alike.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "The 'Refund' Scam",
          analysis: "A user receives a call about a 'wrongful subscription'. The caller asks for screen sharing to 'process the refund'.",
          flowchart: ["Call received from 'Amazon'.", "User told they are owed ₹5,000.", "User asked to install AnyDesk.", "Attacker gains full PC access.", "Bank account drained."],
          prevention: ["Never install remote access software for 'support'.", "No company calls to 'give' you money."]
        },
        concepts: [{ name: "Caller ID Spoofing", description: "Attackers can make any number appear on your screen, including your bank's official number." }],
        attackLifecycle: [{ step: 1, action: "Recon", explanation: "Finding active phone numbers." }, { step: 2, action: "The Hook", explanation: "Creating a crisis (e.g., 'Your card is blocked')." }],
        technicalIntelligence: { scenario: "Incoming call from +91-XXXXXXXXXX pretending to be TRAI.", metrics: [] },
        checklists: { detection: ["High pressure/Urgency.", "Requests for OTP/PIN.", "Offer that seems too good to be true."], mitigation: ["Hang up.", "Block number.", "Report on Sanchar Saathi."] },
        terminalScript: "telecom --trace --spoof-detect"
      },
      medium: {
        title: "Anatomy of a Govt Agency Scam",
        description: "Advanced vishing involves impersonating government authorities like TRAI, CBI, or the Police to extort money.",
        threatLevel: "High",
        threatDescription: "Legal Extortion. Victims are threatened with 'Digital Arrest' or legal action for crimes they didn't commit.",
        defenseType: "Legal Awareness",
        defenseDescription: "Government agencies never handle legal matters via WhatsApp or cold calls. They follow formal procedures.",
        priority: "Critical",
        priorityDescription: "Digital Arrest scams have traumatized thousands of citizens.",
        missionStatement: "Authority is not a reason to bypass security. No official agency asks for UPI payments on a call.",
        learningObjectives: ["Deconstruct Govt agency vishing scripts", "Identify fake badge numbers and credentials", "Understand the 'Digital Arrest' tactic"],
        financialImpact: "Some victims have lost their entire life savings (up to ₹5 Crores) in a single 'Digital Arrest' session.",
        complexityIndex: "High",
        caseStudy: {
          incident: "The 'TRAI' Disconnection Scam",
          analysis: "A caller claims to be from TRAI. They say your Aadhar was used to buy 9 illegal SIM cards. They 'connect' you to the police.",
          flowchart: ["IVR says 'Disconnected in 2 hrs'.", "Press 1 for Customer Care.", "Connected to fake officer on Skype.", "Officer shows fake warrant.", "Victim pays 'bail' via UPI."],
          prevention: ["Police don't use Skype for arrests.", "TRAI doesn't disconnect via phone calls.", "Call 1930 immediately."]
        },
        concepts: [{ name: "Authority Bias", description: "The psychological tendency to obey figures of authority without questioning their requests." }],
        attackLifecycle: [{ step: 1, action: "Phasing", explanation: "Transitioning from automated IVR to live agent." }, { step: 2, action: "Isolation", explanation: "Preventing the victim from contacting family/friends." }],
        technicalIntelligence: { scenario: "Voice recording of a fake CBI officer script.", metrics: [] },
        checklists: { detection: ["Demands for 'Digital Arrest' over video.", "Request for UPI payment for 'verification'.", "Strict confidentiality demand."], mitigation: ["Terminate the call.", "Verify with local police.", "Report on Cybercrime portal."] },
        terminalScript: "vishing --analyze --nlp-threat"
      },
      hard: {
        title: "Enterprise Vishing & BEC",
        description: "Enterprise-level vishing targets IT helpdesks and finance teams to gain network access or redirect large payments.",
        threatLevel: "Critical",
        threatDescription: "Systemic Compromise. A single phone call to an IT admin can compromise the entire corporate infrastructure.",
        defenseType: "Multi-Channel Auth",
        defenseDescription: "Helpdesks must use pre-established secrets or MFA-based identity verification before resetting passwords.",
        priority: "Critical",
        priorityDescription: "Major casino and tech hacks have started with a simple vishing call to the helpdesk.",
        missionStatement: "Identity is verified, not assumed. Every request for access must be authenticated out-of-band.",
        learningObjectives: ["Identify 'Social Engineering' at the helpdesk", "Learn to spot 'MFA Fatigue' vishing", "Understand Helpdesk Verification Protocols"],
        financialImpact: "MGM Resorts lost $100M+ in 2023 due to a vishing call that compromised their identity provider (Okta).",
        complexityIndex: "Extreme",
        caseStudy: {
          incident: "The MGM Helpdesk Hack",
          analysis: "Attackers identified an IT employee on LinkedIn. They called the helpdesk pretending to be that employee and asked for a password reset.",
          flowchart: ["OSINT on LinkedIn for employee data.", "Vishing call to IT Helpdesk.", "Helpdesk resets MFA for attacker.", "Attacker gains admin access.", "Ransomware deployed across hotels."],
          prevention: ["Strict employee ID verification.", "MFA reset requires manager approval.", "Helpdesk training on vishing lures."]
        },
        concepts: [{ name: "MFA Fatigue", description: "Bombarding a user with MFA prompts while calling them to 'fix a bug', tricking them into clicking 'Approve'." }],
        attackLifecycle: [{ step: 1, action: "Profiling", explanation: "Identifying helpdesk staff and employee IDs." }, { step: 2, action: "Impersonation", explanation: "Calling with confidence and technical jargon." }],
        technicalIntelligence: { scenario: "IT Helpdesk call log with suspicious MFA reset request.", metrics: [{ label: "Time to Compromise", value: "10 mins" }] },
        checklists: { detection: ["Unexpected password reset requests.", "Caller cannot provide secondary ID.", "Urgency and technical name-dropping."], mitigation: ["Call back on registered number.", "Require manager override.", "Log all verification steps."] },
        terminalScript: "idp --verify --mfa-logs"
      }
    }
  },
  {
    id: "digital_footprint",
    name: "Digital Footprint & OSINT",
    category: "User Awareness",
    levels: {
      easy: {
        title: "Your Public Profile",
        description: "Every photo, post, and comment creates a digital footprint. Learn how attackers map your life.",
        threatLevel: "Low",
        threatDescription: "Target Profiling. Attackers use your public data to craft convincing lies for phishing.",
        defenseType: "Privacy Hygiene",
        defenseDescription: "Set your social media to private. Never post photos of badges, tickets, or sensitive work items.",
        priority: "Medium",
        priorityDescription: "A clean digital footprint is your first line of defense.",
        missionStatement: "If a stranger shouldn't know it, a computer shouldn't show it.",
        learningObjectives: ["Identify sensitive data in photos", "Understand the 'Social Media Challenge' risks", "Learn to set privacy controls"],
        financialImpact: "Individual losses from identity theft due to oversharing often exceed ₹2 Lakhs per victim.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "The 'New Job' Badge Post",
          analysis: "A user posts a photo of their new employee badge. An attacker uses the QR code on the badge to clone their credentials.",
          flowchart: ["Photo posted on LinkedIn.", "Attacker zooms in on badge QR.", "QR code decrypted.", "Fake badge printed.", "Unauthorized building entry."],
          prevention: ["Blur sensitive info in photos.", "Never post your ID cards online."]
        },
        concepts: [{ name: "Oversharing", description: "Disclosing sensitive personal or professional information on public platforms." }],
        attackLifecycle: [{ step: 1, action: "Scraping", explanation: "Collecting data from public profiles." }, { step: 2, action: "Correlation", explanation: "Linking data across different sites." }],
        technicalIntelligence: { scenario: "LinkedIn profile with visible company email.", metrics: [] },
        checklists: { detection: ["Too much personal info in bio.", "Visible badges in photos.", "Location tagging active."], mitigation: ["Sanitize profiles.", "Remove location tags.", "Limit 'Public' posts."] },
        terminalScript: "osint --scan --profile"
      },
      medium: {
        title: "OSINT: The Hacker's Blueprint",
        description: "Open Source Intelligence (OSINT) is used by hackers to map entire company hierarchies and technical stacks.",
        threatLevel: "Medium",
        threatDescription: "Precision Targeting. Detailed job descriptions tell hackers exactly which software your company uses.",
        defenseType: "Data Minimization",
        defenseDescription: "Limit technical details in job listings and LinkedIn profiles. Use generic terms for internal tools.",
        priority: "High",
        priorityDescription: "OSINT is the planning phase of 90% of successful cyberattacks.",
        missionStatement: "What's useful for a recruiter is a goldmine for a hacker. Balance professional presence with security.",
        learningObjectives: ["Understand OSINT tools and techniques", "Analyze job descriptions for threat intelligence", "Identify 'Shadow Data' on the web"],
        financialImpact: "Company-wide data leaks often start with a single employee's over-detailed LinkedIn profile.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "The Tech Stack Leak",
          analysis: "A developer posts an 'Ask Me Anything' about their company's migration to AWS. They mention the specific versions of outdated software.",
          flowchart: ["Dev posts on Reddit.", "Attacker identifies vulnerable software.", "Attacker finds a known exploit (CVE).", "Attacker targets the company server.", "Data breach occurs."],
          prevention: ["Don't name internal versions publically.", "Use official communication channels for tech help."]
        },
        concepts: [{ name: "Target Mapping", description: "The process of creating a complete picture of an organization's network using public data." }],
        attackLifecycle: [{ step: 1, action: "Footprinting", explanation: "Finding IP ranges and domain data." }, { step: 2, action: "Enumeration", explanation: "Listing employees and their roles." }],
        technicalIntelligence: { scenario: "Company job post listing 'Required: 5 years experience in Windows Server 2012'.", metrics: [] },
        checklists: { detection: ["Detailed internal tool names.", "Team structures listed publically.", "Company org charts on social media."], mitigation: ["Use generic job titles.", "Audit public documentation.", "Train staff on OSINT risks."] },
        terminalScript: "nmap --osint --target-discovery"
      },
      hard: {
        title: "Advanced OSINT & Metadata",
        description: "Hidden data (metadata) in files can reveal your GPS location, software versions, and internal server paths.",
        threatLevel: "High",
        threatDescription: "Inadvertent Data Leakage. Files that look 'safe' (like PDFs or JPEGs) can contain a wealth of hidden secrets.",
        defenseType: "Metadata Stripping",
        defenseDescription: "Always scrub metadata from documents before sharing them externally. Use automated tools for scrubbing.",
        priority: "High",
        priorityDescription: "Metadata has been used to track down whistleblowers and locate hidden data centers.",
        missionStatement: "Data is more than what you see. Scrub the invisible layers before you send.",
        learningObjectives: ["Identify EXIF data in images", "Analyze PDF metadata for internal paths", "Understand the risks of 'Google Dorking'"],
        financialImpact: "The cost of remediating a breach caused by leaked internal paths can reach $4.5 Million.",
        complexityIndex: "High",
        caseStudy: {
          incident: "The Secret Lab Leak",
          analysis: "A journalist posts a photo of a new data center. The EXIF metadata contains the exact GPS coordinates of the classified location.",
          flowchart: ["Photo taken on smartphone.", "GPS data embedded in EXIF.", "Photo shared on news site.", "Attacker extracts GPS via online tool.", "Physical security risk created."],
          prevention: ["Disable 'Location' in camera settings.", "Use EXIF scrubbers before posting."]
        },
        concepts: [{ name: "Google Dorking", description: "Using advanced search operators to find sensitive files like 'config.php' or 'password.txt' indexed by search engines." }],
        attackLifecycle: [{ step: 1, action: "Dorking", explanation: "Searching for 'filetype:pdf company_confidential'." }, { step: 2, action: "Exfiltration", explanation: "Downloading and analyzing found files." }],
        technicalIntelligence: { scenario: "A PDF report with metadata showing the author's internal PC username: 'C:\\Users\\admin_manoj\\...'.", metrics: [{ label: "Hidden Fields", value: "24" }] },
        checklists: { detection: ["GPS tags in JPGs.", "Revision history in DOCX.", "Author names in PDFs."], mitigation: ["Scrub files.", "Disable GPS for camera.", "Audit public file servers."] },
        terminalScript: "exiftool -all= image.jpg"
      }
    }
  },
  {
    id: "safe_browsing",
    name: "Safe Browsing",
    category: "Network & Device",
    levels: {
      easy: {
        title: "Web Safety Basics",
        description: "The web is full of 'Fake' sites. Learn to identify the visual signs of a dangerous website.",
        threatLevel: "Medium",
        threatDescription: "Phishing & Spoofing. Sites that look 100% real can be traps to steal your passwords.",
        defenseType: "Visual Literacy",
        defenseDescription: "Always check the URL in the address bar. Look for typos or extra words (e.g., 'amazon-support.com').",
        priority: "High",
        priorityDescription: "The browser is your window to the digital world—keep it guarded.",
        missionStatement: "Don't trust the pixels, trust the URL. The lock icon doesn't mean the site is 'Safe', only 'Encrypted'.",
        learningObjectives: ["Identify typosquatting URLs", "Understand HTTPS vs HTTP", "Learn to use safe search tools"],
        financialImpact: "Individual losses from browser-based phishing average ₹1.5 Lakhs per successful attack.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "The 'HDFC' Fake Portal",
          analysis: "A user clicks a link for 'HDFC-KYC-Update.com'. The site looks identical to the bank. They enter their net banking PIN.",
          flowchart: ["SMS received with urgent link.", "User lands on fake bank portal.", "User enters credentials.", "Attacker redirects to real bank.", "Funds stolen via real-time relay."],
          prevention: ["Only use official bookmarks.", "Never click links for KYC updates."]
        },
        concepts: [{ name: "Typosquatting", description: "Registering domains that are common misspellings of popular sites to trick users." }],
        attackLifecycle: [{ step: 1, action: "Registration", explanation: "Buying a domain like 'gogle.com'." }, { step: 2, action: "Luring", explanation: "Sending emails with the fake link." }],
        technicalIntelligence: { scenario: "URL: https://amzn-rewards-india.top/login", metrics: [] },
        checklists: { detection: ["URL doesn't match official site.", "Site asks for excessive info.", "Spelling mistakes in content."], mitigation: ["Close the tab.", "Report as Phishing.", "Clear browser cache."] },
        terminalScript: "url --scan --reputation"
      },
      medium: {
        title: "Malicious Extensions & Scripts",
        description: "Browser extensions can see every keystroke you type. Learn the risks of 'Convenience' over 'Security'.",
        threatLevel: "High",
        threatDescription: "Session Hijacking. Malicious extensions can steal your 'Session Cookies' to bypass MFA.",
        defenseType: "Extension Audit",
        defenseDescription: "Only install extensions from official stores. Remove any that you haven't used in 3 months.",
        priority: "High",
        priorityDescription: "Extensions have 'God-mode' access to your browser data.",
        missionStatement: "Less is more. Every extension is a potential spy in your digital life.",
        learningObjectives: ["Understand browser permission levels", "Identify malicious extension behavior", "Learn to manage cookie security"],
        financialImpact: "Corporate data leaks via malicious extensions have cost firms upwards of $2 Million.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "The 'Dark Mode' Spyware",
          analysis: "A popular Dark Mode extension was updated with a script that captured all credit card data entered in the browser.",
          flowchart: ["Extension gets 100k users.", "Dev sells extension to attacker.", "Update pushed with spyware.", "Attacker scrapes CVV numbers.", "Fraudulent charges globally."],
          prevention: ["Check extension reviews.", "Limit 'All Sites' permissions.", "Use 'Incognito' for banking."]
        },
        concepts: [{ name: "Session Cookie", description: "A small piece of data that keeps you logged in. If stolen, anyone can 'be' you without a password." }],
        attackLifecycle: [{ step: 1, action: "Infection", explanation: "User installs a 'free' utility." }, { step: 2, action: "Exfiltration", explanation: "Background script sends cookies to attacker." }],
        technicalIntelligence: { scenario: "Extension manifest requesting 'all_urls' permission.", metrics: [] },
        checklists: { detection: ["Sudden browser slowdown.", "New toolbars appearing.", "Redirects during login."], mitigation: ["Remove unused extensions.", "Change all passwords.", "Audit 'Active Sessions' list."] },
        terminalScript: "browser --scan --extensions"
      },
      hard: {
        title: "Advanced Browser Exploits",
        description: "Zero-day browser vulnerabilities can infect your machine just by visiting a site. Learn about 'Sandbox' security.",
        threatLevel: "Critical",
        threatDescription: "Drive-by Downloads. A compromised legitimate site can infect your device without you clicking anything.",
        defenseType: "System Hardening",
        defenseDescription: "Keep your browser and OS updated. Use 'Site Isolation' and modern endpoint protection (EDR).",
        priority: "Critical",
        priorityDescription: "State-sponsored hackers use browser exploits to target high-value individuals.",
        missionStatement: "Trust no site. Use a hardened browser and never ignore 'Update' prompts.",
        learningObjectives: ["Understand 'Drive-by' infection vectors", "Analyze browser 'Sandboxing' mechanics", "Identify 'Clickjacking' techniques"],
        financialImpact: "The average cost of a Zero-day exploit used in a browser attack is estimated at $1.5 Million on the black market.",
        complexityIndex: "Extreme",
        caseStudy: {
          incident: "Operation Aurora",
          analysis: "A high-profile attack that used a browser exploit to infiltrate Google and other major tech firms.",
          flowchart: ["User visits compromised site.", "Hidden script triggers memory error.", "Shellcode executes in background.", "Internal network mapped.", "Intellectual property stolen."],
          prevention: ["Zero-trust browsing.", "Isolate sensitive tasks.", "Update browser DAILY."]
        },
        concepts: [{ name: "Drive-by Download", description: "An attack where malicious code is downloaded and installed on a computer without the user's knowledge or consent." }],
        attackLifecycle: [{ step: 1, action: "Exploitation", explanation: "Triggering a bug in the browser engine." }, { step: 2, action: "Payload", explanation: "Running code outside the browser sandbox." }],
        technicalIntelligence: { scenario: "JavaScript exploit code targeting Chrome V8 engine.", metrics: [{ label: "CVSS Score", value: "9.8" }] },
        checklists: { detection: ["System crashing after visiting a site.", "High CPU usage on simple pages.", "Security software alerts."], mitigation: ["Update immediately.", "Use browser isolation.", "Run full system scan."] },
        terminalScript: "sys --check --browser-integrity"
      }
    }
  },
  {
    id: "supply_chain",
    name: "Supply Chain Risk",
    category: "Data & Compliance",
    levels: {
      easy: {
        title: "Third-Party Trust",
        description: "Your security depends on your partners. Learn why 'Vendor Risk' matters.",
        threatLevel: "Medium",
        threatDescription: "Indirect Attacks. Hackers attack smaller vendors to gain access to their larger clients.",
        defenseType: "Vendor Vetting",
        defenseDescription: "Always verify bank account changes via a phone call to a known contact. Never trust an email alone.",
        priority: "High",
        priorityDescription: "Supply chain attacks have increased by 300% in the last 2 years.",
        missionStatement: "You are only as strong as your weakest link. Verify every partner.",
        learningObjectives: ["Identify 'Invoice Fraud' scripts", "Understand vendor risk management", "Learn the 'Dual-Control' payment method"],
        financialImpact: "Small businesses are often the 'Entry Point' for attacks on Fortune 500 companies.",
        complexityIndex: "Low",
        caseStudy: {
          incident: "The HVAC Hack",
          analysis: "A major retailer was hacked because their HVAC (AC) vendor had weak security. Hackers used the vendor's billing account to enter the retailer's network.",
          flowchart: ["HVAC vendor hacked via phishing.", "Attacker gets vendor's VPN credentials.", "Attacker enters retailer's internal network.", "Attacker targets Point-of-Sale (POS).", "40 Million credit cards stolen."],
          prevention: ["Isolate vendor access.", "Use MFA for all remote logins."]
        },
        concepts: [{ name: "Vendor Risk", description: "The risk that a third-party partner's security failures will impact your organization." }],
        attackLifecycle: [{ step: 1, action: "Targeting", explanation: "Identifying a vendor with weak security." }, { step: 2, action: "Pivoting", explanation: "Using the vendor as a bridge to the real target." }],
        technicalIntelligence: { scenario: "Invoice from 'Global Office Supplies' with new bank details.", metrics: [] },
        checklists: { detection: ["Changes in payment instructions.", "Email from a vendor you haven't used.", "Urgent requests for 'Late' payments."], mitigation: ["Voice verification.", "Dual-control for transfers.", "Check invoice templates."] },
        terminalScript: "procure --audit --vendor"
      },
      medium: {
        title: "Business Email Compromise (BEC)",
        description: "BEC happens when a vendor's actual email is hacked. The phishing comes from a 'Trusted' source.",
        threatLevel: "High",
        threatDescription: "Authentic Deception. Because the email is real, it bypasses technical filters and human suspicion.",
        defenseType: "Protocol Hardening",
        defenseDescription: "Establish a 'Verification Protocol' for all financial changes. No changes allowed via email only.",
        priority: "Critical",
        priorityDescription: "BEC is the most financially damaging cybercrime reported to the FBI.",
        missionStatement: "Trust the human, verify the request. Digital identity can be stolen, human relationships can't.",
        learningObjectives: ["Deconstruct BEC attack patterns", "Identify 'Thread Hijacking' techniques", "Learn to implement financial 'Kill Switches'"],
        financialImpact: "Global BEC losses exceeded $50 Billion in 2023.",
        complexityIndex: "Medium",
        caseStudy: {
          incident: "The Fake Hardware Vendor",
          analysis: "An attacker impersonated a major hardware manufacturer. They sent fake invoices for 'Server Maintenance' for two years, stealing $100M.",
          flowchart: ["Attacker monitors public contracts.", "Attacker registers lookalike domain.", "Attacker sends realistic invoices.", "Company finance team pays regularly.", "Money laundered through shell companies."],
          prevention: ["Verify invoice against purchase order.", "Phone verification for account changes."]
        },
        concepts: [{ name: "Thread Hijacking", description: "An attacker replies to an ongoing, real email conversation between you and a vendor, injecting a malicious request." }],
        attackLifecycle: [{ step: 1, action: "Infiltration", explanation: "Hacking the vendor's email inbox." }, { step: 2, action: "Patience", explanation: "Waiting for a high-value invoice thread." }],
        technicalIntelligence: { scenario: "Email thread with 'RE: Invoice #882' where the bank account changed in the last message.", metrics: [] },
        checklists: { detection: ["Slight tone change in email.", "Reply-to address is different.", "Inconsistent font/logo in invoice."], mitigation: ["Call the vendor.", "Use 'Challenge-Response' verification.", "Audit previous 3 payments."] },
        terminalScript: "mail --audit --headers"
      },
      hard: {
        title: "Software Supply Chain Attacks",
        description: "Attackers inject malicious code into software updates. You get infected by updating 'Trusted' software.",
        threatLevel: "Extreme",
        threatDescription: "Systemic Infrastructure Risk. If the software you trust is poisoned, your entire defense is bypassed.",
        defenseType: "Code Signing & SBOM",
        defenseDescription: "Use Software Bill of Materials (SBOM) to track components. Verify code signatures for every update.",
        priority: "Critical",
        priorityDescription: "Attacks like SolarWinds have changed the way the world thinks about software trust.",
        missionStatement: "Updates are not always upgrades. Verify the integrity of your code chain.",
        learningObjectives: ["Understand 'Upstream' vulnerabilities", "Analyze the 'SolarWinds' attack pattern", "Learn about SBOM and Integrity Checks"],
        financialImpact: "A major software supply chain attack can cause global economic damage exceeding $10 Billion.",
        complexityIndex: "Extreme",
        caseStudy: {
          incident: "SolarWinds Orion Breach",
          analysis: "Hackers injected a 'Backdoor' into a software update for Orion. 18,000 customers (including Govt agencies) installed the infected update.",
          flowchart: ["Hackers breach the software dev lab.", "Backdoor added to build server.", "Signed, 'Safe' update released.", "Customers install update.", "Hackers gain remote access to all networks."],
          prevention: ["Network segmentation.", "Monitor outgoing traffic from servers.", "Demand SBOM from vendors."]
        },
        concepts: [{ name: "SBOM (Software Bill of Materials)", description: "A formal record containing the details and supply chain relationships of various components used in building software." }],
        attackLifecycle: [{ step: 1, action: "Upstream Breach", explanation: "Compromising the software vendor's build pipeline." }, { step: 2, action: "Distribution", explanation: "Using the vendor's update system as a vector." }],
        technicalIntelligence: { scenario: "A software update package with a suspicious DLL file injected.", metrics: [{ label: "Infected Nodes", value: "18,000" }] },
        checklists: { detection: ["Unusual outbound traffic from servers.", "Changes in code signature values.", "Alerts for 'Shadow Processes'."], mitigation: ["Disconnect from internet.", "Revert to known good backup.", "Audit build pipelines."] },
        terminalScript: "pkg --verify --integrity-hash"
      }
    }
  }
];
