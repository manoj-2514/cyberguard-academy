import type { SimulationModuleDef } from './types';

export const cloudSecurityModule: SimulationModuleDef = {
  id: 'cloud-security',
  title: 'Cloud Security',
  category: 'Data & Compliance',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'cs-q1',
      type: 'JUDGE',
      topic: 'S3 Bucket Configurations',
      questionText: 'Is this AWS S3 bucket configuration secure?',
      scenario: {
        senderName: 'Cloud Security Posture Manager',
        senderEmail: '',
        subject: 'S3 Bucket Review',
        body: 'Bucket Name: customer-backups-prod\nPublic Access Block: OFF\nBucket Policy: Allows "GetObject" for Principal: "*"\nEncryption: SSE-S3 Enabled',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "No, it's not secure"
      feedbackExplanation: 'This bucket is completely insecure. A policy allowing "GetObject" for Principal "*" means anyone on the internet can anonymously download your customer backups, regardless of encryption.',
      proTip: 'Always enable "Block Public Access" at the account level unless the bucket is specifically hosting public web assets.',
      readMoreLink: 'modules/cloud-security#s3-buckets',
      scoreValue: 10
    },
    {
      id: 'cs-q2',
      type: 'CLASSIFY',
      topic: 'Cloud Misconfigurations',
      questionText: 'Classify these 8 cloud misconfigurations by their severity.',

      items: [
        { id: 'i1', label: 'Database port (3306) open to 0.0.0.0/0' },
        { id: 'i2', label: 'IAM user with AdministratorAccess does not have MFA enabled' },
        { id: 'i3', label: 'S3 bucket hosting internal documentation has public read access' },
        { id: 'i4', label: 'EC2 instances running Amazon Linux 2 (Support ends 2025)' },
        { id: 'i5', label: 'Root account access keys exist and were used today' },
        { id: 'i6', label: 'CloudTrail logging is disabled in a production region' },
        { id: 'i7', label: 'Unused security group exists' },
        { id: 'i8', label: 'VPC Flow Logs are not enabled for the development VPC' }
      ],
      correctMapping: {
        'i1': 'c-critical',
        'i2': 'c-high',
        'i3': 'c-critical',
        'i4': 'c-medium',
        'i5': 'c-critical',
        'i6': 'c-high',
        'i7': 'c-info',
        'i8': 'c-medium'
      },
      feedbackExplanation: 'Public databases, public internal buckets, and active Root keys are critical vulnerabilities that will lead to immediate compromise.',
      proTip: 'Use Cloud Security Posture Management (CSPM) tools to automatically detect and remediate these issues before attackers find them.',
      readMoreLink: 'modules/cloud-security#misconfigurations',
      scoreValue: 10
    },
    {
      id: 'cs-q3',
      type: 'ORDER',
      topic: 'Data Breach Anatomy',
      questionText: 'Arrange the sequence of how a misconfigured cloud storage leads to a data breach.',
      steps: [
        { id: 's1', label: 'Developer accidentally removes the "Block Public Access" setting on a bucket' },
        { id: 's2', label: 'Automated internet scanning bot discovers the public bucket name' },
        { id: 's3', label: 'Bot indexes the contents and finds sensitive customer data' },
        { id: 's4', label: 'Attacker downloads the data via an anonymous script' },
        { id: 's5', label: 'Attacker posts the data on a dark web forum for sale' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Attackers use automated bots to constantly scan the entire internet for open cloud buckets. The moment a bucket is misconfigured, it is usually found within minutes.',
      proTip: 'Security through obscurity (having a hard-to-guess bucket name) does not work in the cloud. Names are often easily guessable or leaked in DNS records.',
      readMoreLink: 'modules/cloud-security#bucket-breaches',
      scoreValue: 10
    },
    {
      id: 'cs-q4',
      type: 'OPEN_TEXT',
      topic: 'Incident Response',
      questionText: 'You discover an internal database snapshot is publicly accessible on an S3 bucket. What do you do?',
      minWords: 15,
      expectedKeywords: ['restrict', 'block', 'public', 'access', 'report', 'logs', 'cloudtrail', 'security', 'incident'],
      feedbackExplanation: 'Immediately restrict access (e.g., turn on Block Public Access), then report it to the incident response team so they can review CloudTrail logs to determine if anyone actually downloaded the data.',
      proTip: 'Closing the bucket stops the bleeding, but you must assume breach until logs prove otherwise.',
      readMoreLink: 'modules/cloud-security#incident-response',
      scoreValue: 10
    },
    {
      id: 'cs-q5',
      type: 'MCQ',
      topic: 'Shared Responsibility Model',
      questionText: 'Under the cloud Shared Responsibility Model, what are you (the customer) responsible for?',
      options: [
        { key: 'A', text: 'Securing the physical datacenters' },
        { key: 'B', text: 'Patching the hypervisor infrastructure' },
        { key: 'C', text: 'Securing the data, IAM permissions, and resource configurations' },
        { key: 'D', text: 'Ensuring the cloud provider\'s network switches are updated' }
      ],
      correctOptionId: 'C',
      feedbackExplanation: 'The provider is responsible for the security OF the cloud (hardware, hypervisor). You are responsible for security IN the cloud (your data, your firewalls, your permissions).',
      proTip: 'If your S3 bucket is left public, that is your fault under the Shared Responsibility Model, not AWS/Azure\'s fault.',
      readMoreLink: 'modules/cloud-security#shared-responsibility',
      scoreValue: 10
    },
    {
      id: 'cs-q6',
      type: 'SPOT',
      topic: 'IAM Policy Review',
      questionText: 'Spot the 4 dangerous misconfigurations in this IAM JSON policy.',
      scenario: {
        senderName: 'Policy Review',
        senderEmail: '',
        subject: 'IAM JSON',
        body: '{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": "*",\n      "Resource": "*"\n    },\n    {\n      "Effect": "Allow",\n      "Action": "iam:PassRole",\n      "Resource": "*"\n    }\n  ]\n}',
        url: ''
      },
      hotspots: [
        { id: 'hs-admin', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Admin Action (*)' },
        { id: 'hs-resource', position: { top: '45%', left: '20%', width: '10%', height: '10%' }, label: 'All Resources (*)' },
        { id: 'hs-passrole', position: { top: '65%', left: '20%', width: '10%', height: '10%' }, label: 'iam:PassRole' },
        { id: 'hs-passres', position: { top: '75%', left: '20%', width: '10%', height: '10%' }, label: 'PassRole to All (*)' },
        { id: 'hs-version', position: { top: '15%', left: '20%', width: '10%', height: '10%' }, label: 'Policy Version' }
      ],
      correctSpotIds: ['hs-admin', 'hs-resource', 'hs-passrole', 'hs-passres'],
      feedbackExplanation: 'Allowing all actions (*) on all resources (*) grants full administrative privilege. Allowing iam:PassRole on all resources allows privilege escalation.',
      proTip: 'Never use asterisks (*) in IAM policies unless absolutely necessary. Practice Least Privilege.',
      readMoreLink: 'modules/cloud-security#iam-policies',
      scoreValue: 10
    },
    {
      id: 'cs-q7',
      type: 'ORDER',
      topic: 'Cloud Security Audit',
      questionText: 'Sequence the steps to perform a basic cloud security audit.',
      steps: [
        { id: 'a1', label: 'Review the Cloud Provider\'s automated security hub/advisor' },
        { id: 'a2', label: 'Check IAM configurations for active root keys and lack of MFA' },
        { id: 'a3', label: 'Audit public-facing resources (S3, Security Groups) for unintended exposure' },
        { id: 'a4', label: 'Review access logs to identify anomalies or shadow IT' },
        { id: 'a5', label: 'Document findings and assign remediation tasks based on severity' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Start with automated tools, then secure the perimeter (IAM and Public exposure), review behavior (Logs), and finally plan remediation.',
      proTip: 'Cloud environments change rapidly. Audits must be continuous and automated, not just an annual manual check.',
      readMoreLink: 'modules/cloud-security#auditing',
      scoreValue: 10
    }
  ]
};
