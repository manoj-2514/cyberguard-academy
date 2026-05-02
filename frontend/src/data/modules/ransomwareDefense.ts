import type { SimulationModuleDef } from './types';

export const ransomwareDefenseModule: SimulationModuleDef = {
  id: 'ransomware-defense',
  title: 'Ransomware Defense',
  category: 'Threat Awareness',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'rd-q1',
      type: 'JUDGE',
      topic: 'Delivery Vectors',
      questionText: 'Is this email attachment a likely ransomware delivery vector?',
      scenario: {
        senderName: 'HR Department',
        senderEmail: 'hr@external-portal.com',
        subject: 'Q3 Layoff List - Confidential',
        body: 'Please review the attached highly confidential document regarding upcoming restructuring.\n\nNote: You must enable macros to view this secured document.',
        url: 'Attachment: Q3_Restructuring.docm'
      },
      correctAnswer: 'FAKE',
      feedbackExplanation: 'This is a highly malicious lure. It uses extreme emotional bait (layoffs) to trick you into opening a macro-enabled Word document (.docm), which is a primary delivery method for ransomware.',
      proTip: 'Never enable macros on a document from an unexpected or external source. Macros execute code directly on your machine.',
      readMoreLink: 'modules/ransomware-defense#delivery-vectors',
      scoreValue: 10
    },
    {
      id: 'rd-q2',
      type: 'CLASSIFY',
      topic: 'Ransomware Indicators',
      questionText: 'Classify these 8 behaviors/events based on ransomware risk.',

      items: [
        { id: 'i1', label: 'Hundreds of files suddenly renamed with .crypt extensions' },
        { id: 'i2', label: 'A text file named READ_ME_FOR_DECRYPT.txt on your desktop' },
        { id: 'i3', label: 'Browser redirecting to ad websites constantly' },
        { id: 'i4', label: 'Windows Defender alerting that it was disabled via Group Policy' },
        { id: 'i5', label: 'High disk I/O and CPU usage while machine is idle' },
        { id: 'i6', label: 'Volume Shadow Copies (local backups) suddenly deleted' },
        { id: 'i7', label: 'System slowing down during a scheduled Friday antivirus scan' },
        { id: 'i8', label: 'Mouse moving by itself and opening folders' }
      ],
      correctMapping: {
        'i1': 'c-indicator', // classic ransomware
        'i2': 'c-indicator', // ransom note
        'i3': 'c-malicious', // adware
        'i4': 'c-suspicious', // could be admin, could be attacker prep
        'i5': 'c-suspicious', // could be encryption running
        'i6': 'c-indicator', // ransomware deletes shadow copies to prevent recovery
        'i7': 'c-normal',    // normal scheduled scan behavior
        'i8': 'c-malicious'  // RAT (Remote Access Trojan)
      },
      feedbackExplanation: 'Ransomware has distinct markers: mass file renaming, deleted shadow backups, and ransom notes. Disabling antivirus and high I/O are strong precursors.',
      proTip: 'If you see mass file renaming happening in real-time, pull the network cable and hold the power button to hard shutdown the machine immediately to stop the encryption process.',
      readMoreLink: 'modules/ransomware-defense#indicators',
      scoreValue: 10
    },
    {
      id: 'rd-q3',
      type: 'ORDER',
      topic: 'Ransomware Lifecycle',
      questionText: 'Arrange the 6 stages of a modern double-extortion ransomware attack.',
      steps: [
        { id: 's1', label: 'Initial Access (e.g., Phishing or RDP compromise)' },
        { id: 's2', label: 'Lateral Movement (Spreading across the network)' },
        { id: 's3', label: 'Privilege Escalation (Gaining Admin rights)' },
        { id: 's4', label: 'Data Exfiltration (Stealing sensitive data to leak later)' },
        { id: 's5', label: 'Encryption (Locking the files)' },
        { id: 's6', label: 'Extortion (Demanding payment for the key and to not leak data)' }
      ],
      correctOrderIds: ['s1', 's3', 's2', 's4', 's5', 's6'],
      feedbackExplanation: 'Modern ransomware doesn\'t just encrypt immediately. They gain access, escalate privileges, spread, steal your data first (double extortion), and only then encrypt the network and demand the ransom.',
      proTip: 'Because they steal data before encrypting, having backups is no longer enough to completely mitigate ransomware risk.',
      readMoreLink: 'modules/ransomware-defense#lifecycle',
      scoreValue: 10
    },
    {
      id: 'rd-q4',
      type: 'OPEN_TEXT',
      topic: 'Immediate Response',
      questionText: 'You return from lunch, and your screen is black with a red skull and a message demanding Bitcoin. What are your immediate actions?',
      minWords: 15,
      expectedKeywords: ['disconnect', 'network', 'cable', 'wifi', 'photo', 'picture', 'report', 'it', 'security', 'power'],
      feedbackExplanation: 'Immediately disconnect the network cable or disable WiFi to stop the spread. Take a photo of the screen with your phone for forensics, then contact IT Security out-of-band.',
      proTip: 'Do not pay the ransom. Do not try to clean the machine yourself. Isolate and escalate.',
      readMoreLink: 'modules/ransomware-defense#immediate-response',
      scoreValue: 10
    },
    {
      id: 'rd-q5',
      type: 'MCQ',
      topic: 'Primary Defense',
      questionText: 'What is the most critical technical defense to ensure recovery from a ransomware attack without paying?',
      options: [
        { id: 'opt1', text: 'Having the latest premium antivirus software installed' },
        { id: 'opt2', text: 'Implementing strong, complex passwords for all users' },
        { id: 'opt3', text: 'Maintaining offline, immutable backups that are tested regularly' },
        { id: 'opt4', text: 'Using a VPN for all internet traffic' }
      ],
      correctOptionId: 'opt3',
      feedbackExplanation: 'While antivirus is important, offline immutable backups are the only guarantee you can restore your data if encryption occurs. If backups are online, the ransomware will encrypt them too.',
      proTip: 'The 3-2-1 backup rule: 3 copies of data, 2 different media, 1 copy offsite/offline.',
      readMoreLink: 'modules/ransomware-defense#backups',
      scoreValue: 10
    },
    {
      id: 'rd-q6',
      type: 'SPOT',
      topic: 'Early Warning Signs',
      questionText: 'Identify 4 early warning signs of ransomware prep in this system log snippet.',
      scenario: {
        senderName: 'Syslog',
        senderEmail: 'admin',
        subject: 'Event Viewer',
        body: '14:02 - User login successful (Normal)\n14:05 - vssadmin.exe delete shadows /all /quiet\n14:06 - Windows Defender Real-Time Protection disabled\n14:08 - Large volume outbound traffic to unknown IP over port 443\n14:10 - RDP connection established from foreign IP',
        url: ''
      },
      hotspots: [
        { id: 'hs-vss', x: 20, y: 35, label: 'Deleting Shadow Copies (vssadmin)' },
        { id: 'hs-av', x: 20, y: 45, label: 'Disabling Antivirus' },
        { id: 'hs-exfil', x: 20, y: 55, label: 'Large Outbound Traffic (Data Exfiltration)' },
        { id: 'hs-rdp', x: 20, y: 65, label: 'Unexpected RDP Connection' },
        { id: 'hs-login', x: 20, y: 25, label: 'Normal Login' }
      ],
      correctSpotIds: ['hs-vss', 'hs-av', 'hs-exfil', 'hs-rdp'],
      feedbackExplanation: 'Attackers disable AV, delete local backups (shadow copies) so you can\'t restore, establish remote access (RDP), and exfiltrate data before triggering the final encryption.',
      proTip: 'Alerting on `vssadmin` deleting shadows is one of the highest-fidelity alerts for impending ransomware.',
      readMoreLink: 'modules/ransomware-defense#early-warnings',
      scoreValue: 10
    },
    {
      id: 'rd-q7',
      type: 'ORDER',
      topic: 'Recovery Sequence',
      questionText: 'Sequence the steps for recovering an infected server from a ransomware attack without paying.',
      steps: [
        { id: 'a1', label: 'Isolate the infected server from the network completely' },
        { id: 'a2', label: 'Preserve forensic evidence (memory dump/disk image)' },
        { id: 'a3', label: 'Wipe the server drives completely (Do not attempt to decrypt)' },
        { id: 'a4', label: 'Reinstall the base Operating System from clean media' },
        { id: 'a5', label: 'Restore data from the last known-good offline backup' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'You must isolate, preserve evidence for root-cause analysis, completely nuke the environment (as you cannot trust an infected OS), and rebuild from clean backups.',
      proTip: 'Never connect your backup drives to an infected machine to restore it; the ransomware will instantly encrypt the backup drive.',
      readMoreLink: 'modules/ransomware-defense#recovery',
      scoreValue: 10
    }
  ]
};
