import type { SimulationModuleDef } from './types';

export const supplyChainRiskModule: SimulationModuleDef = {
  id: 'supply-chain-risk',
  title: 'Supply Chain Risk',
  category: 'Compliance & Risk',
  difficulty: 'Advanced',
  questions: [
    {
      id: 'sc-q1',
      type: 'JUDGE',
      topic: 'Vendor Posture',
      questionText: 'Is this third-party vendor\'s security posture acceptable for handling corporate data?',
      scenario: {
        senderName: 'Vendor Assessment',
        senderEmail: '',
        subject: 'SaaS Provider Audit',
        body: 'Service: Cloud HR Platform\nData Handled: Employee PII and Payroll\nSecurity Posture:\n- SOC 2 Type II Report: Not available.\n- Data Encryption: At rest only, not in transit.\n- Penetration Testing: Last performed 3 years ago.\n- Access Control: No MFA required for admin accounts.',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "No, not acceptable"
      feedbackExplanation: 'This vendor is a massive liability. Handling sensitive PII and payroll without in-transit encryption, no MFA for admins, and outdated pen tests makes them highly susceptible to a breach that will ultimately cost YOUR company.',
      proTip: 'If a vendor handles your data, a breach of their systems is legally and reputationally a breach of YOUR systems.',
      readMoreLink: 'modules/supply-chain-risk#vendor-posture',
      scoreValue: 10
    },
    {
      id: 'sc-q2',
      type: 'CLASSIFY',
      topic: 'Vendor Behaviors',
      questionText: 'Classify these 8 vendor characteristics regarding supply chain risk.',

      items: [
        { id: 'i1', label: 'Vendor provides a current SOC 2 Type II report with no exceptions' },
        { id: 'i2', label: 'Vendor software requires "Domain Admin" rights to install' },
        { id: 'i3', label: 'Vendor uses open-source libraries but does not track them (No SBOM)' },
        { id: 'i4', label: 'Vendor hosts your data in a country without data privacy laws' },
        { id: 'i5', label: 'Vendor enforces SSO/SAML integration for your users' },
        { id: 'i6', label: 'Vendor had a breach 2 years ago, but completely overhauled their security' },
        { id: 'i7', label: 'Vendor refuses to sign a Data Processing Agreement (DPA)' },
        { id: 'i8', label: 'Vendor uses shared generic accounts for their support staff to access your tenant' }
      ],
      correctMapping: {
        'i1': 'c-low',
        'i2': 'c-high', // Principle of least privilege violation
        'i3': 'c-med', // Hidden vulnerabilities
        'i4': 'c-block', // Compliance violation (e.g., GDPR)
        'i5': 'c-low',
        'i6': 'c-med', // Historical risk, but remediated
        'i7': 'c-block', // Legal liability
        'i8': 'c-high' // No accountability
      },
      feedbackExplanation: 'Refusing legal agreements (DPA) or hosting in non-compliant regions are block-level offenses. Over-privileged software and shared accounts are high risks. Validated compliance (SOC2) and SSO integration show maturity.',
      proTip: 'Never give a vendor more access to your network than they strictly need to perform their function.',
      readMoreLink: 'modules/supply-chain-risk#classifications',
      scoreValue: 10
    },
    {
      id: 'sc-q3',
      type: 'ORDER',
      topic: 'SolarWinds Anatomy',
      questionText: 'Arrange the steps of how the devastating SolarWinds-style supply chain attack unfolded.',
      steps: [
        { id: 's1', label: 'Nation-state attackers breach the software vendor (SolarWinds)' },
        { id: 's2', label: 'Attackers secretly inject malicious code into the vendor\'s official software update' },
        { id: 's3', label: 'Vendor digitally signs the update, making it look 100% legitimate' },
        { id: 's4', label: 'Thousands of corporate and government customers download the "trusted" update' },
        { id: 's5', label: 'The malicious code activates inside the customer networks, creating backdoors' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Supply chain attacks bypass your perimeter defenses by compromising the tools you already trust. Because the malicious update was digitally signed by the vendor, customer antivirus systems completely ignored it.',
      proTip: 'You cannot completely prevent supply chain attacks, which is why network segmentation and behavioral monitoring (EDR) are critical to catch the post-breach activity.',
      readMoreLink: 'modules/supply-chain-risk#solarwinds',
      scoreValue: 10
    },
    {
      id: 'sc-q4',
      type: 'OPEN_TEXT',
      topic: 'Vendor Breach Response',
      questionText: 'A key SaaS vendor you use for customer support announces they suffered a major data breach. Walk through your organization\'s immediate response.',
      minWords: 15,
      expectedKeywords: ['disconnect', 'disable', 'api', 'keys', 'assess', 'data', 'passwords', 'legal'],
      feedbackExplanation: 'Immediately disable any API keys or SSO integrations connecting your network to the vendor to sever the link. Then, assess exactly what data of yours was housed there, force password resets if applicable, and involve Legal.',
      proTip: 'Speed is critical. If the vendor is breached, the attacker might use the vendor\'s trusted API connection to pivot back into your corporate network.',
      readMoreLink: 'modules/supply-chain-risk#vendor-breach',
      scoreValue: 10
    },
    {
      id: 'sc-q5',
      type: 'MCQ',
      topic: 'Software Bill of Materials (SBOM)',
      questionText: 'What is a Software Bill of Materials (SBOM) and why does it matter in supply chain security?',
      options: [
        { key: 'A', text: 'An invoice showing how much a software license costs.' },
        { key: 'B', text: 'A detailed inventory of all the open-source and third-party components used to build a piece of software.' },
        { key: 'C', text: 'A legal document transferring liability to the vendor.' },
        { key: 'D', text: 'A tool that automatically patches vulnerable software.' }
      ],
      correctOptionId: 'B',
      feedbackExplanation: 'An SBOM is like an ingredient list on food. When a major vulnerability (like Log4j) is discovered, an SBOM allows you to instantly know if your vendor\'s software contains that vulnerable "ingredient."',
      proTip: 'Without an SBOM, you have to wait for the vendor to manually check and tell you if they are vulnerable, which wastes critical incident response time.',
      readMoreLink: 'modules/supply-chain-risk#sbom',
      scoreValue: 10
    },
    {
      id: 'sc-q6',
      type: 'SPOT',
      topic: 'Questionnaire Red Flags',
      questionText: 'Spot the 4 supply chain risk indicators in this vendor security questionnaire snippet.',
      scenario: {
        senderName: 'Vendor Compliance',
        senderEmail: '',
        subject: 'SIG Lite Responses',
        body: 'Q: Is all customer data encrypted at rest? A: Yes, using proprietary encryption.\nQ: Do you use MFA for remote access? A: No, we use IP whitelisting.\nQ: Do you have a dedicated security team? A: Yes, the CTO handles security part-time.\nQ: How quickly do you apply critical patches? A: Within 90 days of release.\nQ: Do you perform background checks on employees? A: Yes, standard checks.',
        url: ''
      },
      hotspots: [
        { id: 'hs-crypto', position: { top: '15%', left: '20%', width: '10%', height: '10%' }, label: 'Proprietary encryption (Never invent your own crypto)' },
        { id: 'hs-mfa', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'No MFA for remote access' },
        { id: 'hs-team', position: { top: '55%', left: '20%', width: '10%', height: '10%' }, label: 'No dedicated security team (CTO part-time)' },
        { id: 'hs-patch', position: { top: '75%', left: '20%', width: '10%', height: '10%' }, label: '90 days for critical patches (Way too slow)' },
        { id: 'hs-bg', position: { top: '85%', left: '20%', width: '10%', height: '10%' }, label: 'Background checks (Normal)' }
      ],
      correctSpotIds: ['hs-crypto', 'hs-mfa', 'hs-team', 'hs-patch'],
      feedbackExplanation: 'Proprietary crypto is universally insecure. IP whitelisting is not a replacement for MFA. A part-time CTO cannot handle enterprise security, and 90 days to patch a critical zero-day guarantees they will be breached.',
      proTip: 'Reviewing vendor questionnaires requires reading between the lines to spot systemic immaturity.',
      readMoreLink: 'modules/supply-chain-risk#questionnaires',
      scoreValue: 10
    },
    {
      id: 'sc-q7',
      type: 'ORDER',
      topic: 'Vendor Onboarding',
      questionText: 'Sequence the steps to securely assess and onboard a new third-party software vendor.',
      steps: [
        { id: 'a1', label: 'Define the data and systems the vendor will have access to' },
        { id: 'a2', label: 'Send the vendor a standard security questionnaire (e.g., SIG Lite)' },
        { id: 'a3', label: 'Review the questionnaire and their independent audit reports (SOC 2)' },
        { id: 'a4', label: 'Ensure Legal includes security requirements and SLAs in the contract' },
        { id: 'a5', label: 'Provision access using the Principle of Least Privilege' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'Determine the risk first. Then assess their posture via questionnaires and third-party audits. Lock in their obligations legally, and finally, give them only the technical access they absolutely need.',
      proTip: 'Trust but verify. Do not take a vendor\'s word that they are secure; always demand the independent SOC 2 or ISO 27001 certification.',
      readMoreLink: 'modules/supply-chain-risk#onboarding',
      scoreValue: 10
    }
  ]
};
