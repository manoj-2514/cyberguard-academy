import type { SimulationModuleDef } from './types';

export const incidentResponseModule: SimulationModuleDef = {
  id: 'incident-response',
  title: 'Incident Response',
  category: 'Compliance & Risk',
  difficulty: 'Advanced',
  questions: [
    {
      id: 'ir-q1',
      type: 'JUDGE',
      topic: 'Incident vs Event',
      questionText: 'Is this situation a security incident requiring formal response?',
      scenario: {
        senderName: 'Helpdesk Ticket',
        senderEmail: '',
        subject: 'Lost Laptop',
        body: 'A sales executive reported that their laptop, which contains unencrypted client health records (HIPAA data), was stolen from their rental car while traveling.',
        url: ''
      },
      correctAnswer: 'REAL', // REAL means "Yes, it is an incident"
      feedbackExplanation: 'This is a severe, confirmed security incident and a regulatory breach. Because the data was unencrypted (no BitLocker), the HIPAA data is considered compromised, requiring immediate legal and forensic response.',
      proTip: 'If the laptop had full disk encryption, it would be a "Security Event" but likely not a reportable "Data Breach" under HIPAA safe harbor rules.',
      readMoreLink: 'modules/incident-response#incident-vs-event',
      scoreValue: 10
    },
    {
      id: 'ir-q2',
      type: 'CLASSIFY',
      topic: 'Event Classification',
      questionText: 'Classify these 8 occurrences as an Incident, Event, Near Miss, or False Positive.',

      items: [
        { id: 'i1', label: 'Ransomware successfully encrypts a file server' },
        { id: 'i2', label: 'A user logs into the VPN successfully from home' },
        { id: 'i3', label: 'An employee clicks a phishing link, but the proxy blocks the malicious download' },
        { id: 'i4', label: 'Antivirus flags a legitimate custom internal script as malware' },
        { id: 'i5', label: 'An attacker accesses a database and steals 10,000 credit card numbers' },
        { id: 'i6', label: 'The firewall blocks 500 automated SSH login attempts from Russia' },
        { id: 'i7', label: 'A developer accidentally uploads AWS keys to GitHub, but revokes them before they are used' },
        { id: 'i8', label: 'IDS alerts on SQL injection, but it was just a vulnerability scanner run by the security team' }
      ],
      correctMapping: {
        'i1': 'c-incident',
        'i2': 'c-event', // Normal logging event
        'i3': 'c-near-miss', // Preventative controls worked
        'i4': 'c-false-positive',
        'i5': 'c-incident', // Major breach
        'i6': 'c-event', // Routine blocked traffic
        'i7': 'c-near-miss', // High risk, but contained before impact
        'i8': 'c-false-positive'
      },
      feedbackExplanation: 'An Event is any observable occurrence. An Incident is an event that negatively impacts confidentiality, integrity, or availability. A Near Miss is an attack stopped just in time.',
      proTip: 'Alert fatigue happens when security teams are overwhelmed by False Positives and routine Events. Tuning tools is critical to spotting actual Incidents.',
      readMoreLink: 'modules/incident-response#classification',
      scoreValue: 10
    },
    {
      id: 'ir-q3',
      type: 'ORDER',
      topic: 'NIST IR Lifecycle',
      questionText: 'Arrange the 6 phases of the NIST Incident Response lifecycle.',
      steps: [
        { id: 's1', label: 'Preparation (Policies, Tools, Training)' },
        { id: 's2', label: 'Identification (Detecting the attack)' },
        { id: 's3', label: 'Containment (Stopping the spread)' },
        { id: 's4', label: 'Eradication (Removing the threat)' },
        { id: 's5', label: 'Recovery (Restoring services)' },
        { id: 's6', label: 'Lessons Learned (Post-incident review)' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5', 's6'],
      feedbackExplanation: 'NIST SP 800-61 defines this standard lifecycle. Preparation happens before the attack. Once detected (Identification), you must stop the bleeding (Containment) before trying to clean it up (Eradication).',
      proTip: 'The most important, and most frequently skipped, phase is Lessons Learned. It feeds directly back into Preparation to stop the next attack.',
      readMoreLink: 'modules/incident-response#nist-lifecycle',
      scoreValue: 10
    },
    {
      id: 'ir-q4',
      type: 'OPEN_TEXT',
      topic: 'Containment Strategy',
      questionText: 'Walk through your containment strategy for a confirmed ransomware outbreak spreading across 3 critical file servers.',
      minWords: 15,
      expectedKeywords: ['disconnect', 'network', 'cable', 'isolate', 'vlan', 'power', 'do not reboot', 'evidence'],
      feedbackExplanation: 'Immediate physical or logical network isolation (disconnecting cables or moving to an isolated VLAN). Crucially, DO NOT power off or reboot the servers immediately, as this destroys volatile memory (RAM) needed for forensic analysis and might trigger faster encryption.',
      proTip: 'Network isolation stops the spread while preserving the state of the machine for the digital forensics team.',
      readMoreLink: 'modules/incident-response#containment',
      scoreValue: 10
    },
    {
      id: 'ir-q5',
      type: 'MCQ',
      topic: 'Containment Phase Priority',
      questionText: 'What is the absolute highest priority during the Containment phase of a major incident?',
      options: [
        { key: 'A', text: 'Finding out exactly who the attacker is (Attribution)' },
        { key: 'B', text: 'Stopping the spread and preventing further damage' },
        { key: 'C', text: 'Restoring backups to get the business running again' },
        { key: 'D', text: 'Notifying law enforcement' }
      ],
      correctOptionId: 'B',
      feedbackExplanation: 'Containment is about stopping the bleeding. Restoring backups (Recovery) happens much later. If you restore backups before containing and eradicating the threat, the attacker will just encrypt the backups too.',
      proTip: 'Attribution (figuring out if it was a nation-state or a script kiddie) is a luxury for later; it doesn\'t help you stop the fire right now.',
      readMoreLink: 'modules/incident-response#priorities',
      scoreValue: 10
    },
    {
      id: 'ir-q6',
      type: 'SPOT',
      topic: 'Timeline Analysis',
      questionText: 'Spot the 4 mistakes in this Incident Response timeline log.',
      scenario: {
        senderName: 'IR Lead',
        senderEmail: '',
        subject: 'Post-Mortem Timeline',
        body: '08:00 - Ransomware detected on Server A.\n08:05 - Rebooted Server A to try and stop it.\n08:15 - Ran antivirus scan on Server B.\n08:30 - Connected USB backup drive to Server A to restore files.\n09:00 - Deleted malicious files using Shift+Delete.\n09:15 - Network isolated the affected subnet.',
        url: ''
      },
      hotspots: [
        { id: 'hs-reboot', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Rebooting destroys RAM forensics' },
        { id: 'hs-usb', position: { top: '55%', left: '20%', width: '10%', height: '10%' }, label: 'Connecting USB to infected host' },
        { id: 'hs-delete', position: { top: '65%', left: '20%', width: '10%', height: '10%' }, label: 'Deleting evidence' },
        { id: 'hs-isolate', position: { top: '75%', left: '20%', width: '10%', height: '10%' }, label: 'Isolating WAY too late' },
        { id: 'hs-scan', position: { top: '45%', left: '20%', width: '10%', height: '10%' }, label: 'Running AV Scan (Normal)' }
      ],
      correctSpotIds: ['hs-reboot', 'hs-usb', 'hs-delete', 'hs-isolate'],
      feedbackExplanation: 'Rebooting destroys memory forensics. Connecting a backup drive to an infected machine encrypts the backup. Deleting the malware destroys evidence. Network isolation should have happened at 08:01, not 09:15.',
      proTip: 'In incident response, preserving evidence is often just as important as stopping the attack.',
      readMoreLink: 'modules/incident-response#mistakes',
      scoreValue: 10
    },
    {
      id: 'ir-q7',
      type: 'ORDER',
      topic: 'Post-Incident Process',
      questionText: 'Sequence the steps required immediately after eradicating a threat.',
      steps: [
        { id: 'a1', label: 'Verify the environment is completely clean (no backdoors left)' },
        { id: 'a2', label: 'Restore systems and data from known-good offline backups' },
        { id: 'a3', label: 'Monitor the restored network closely for signs of re-infection' },
        { id: 'a4', label: 'Hold a Lessons Learned meeting with all stakeholders' },
        { id: 'a5', label: 'Update the Incident Response Plan based on the findings' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'You must verify eradication before recovery, or you\'ll just get reinfected. Once stable, intense monitoring is required. Finally, close the loop with Lessons Learned and policy updates.',
      proTip: 'Attackers almost always leave a backdoor. "Whack-a-mole" remediation (cleaning one server while they hide on another) guarantees you will lose the network again.',
      readMoreLink: 'modules/incident-response#post-incident',
      scoreValue: 10
    }
  ]
};
