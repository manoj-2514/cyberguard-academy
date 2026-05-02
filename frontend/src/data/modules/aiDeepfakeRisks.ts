import type { SimulationModuleDef } from './types';

export const aiDeepfakeRisksModule: SimulationModuleDef = {
  id: 'ai-deepfake-risks',
  title: 'AI & Deepfake Risks',
  category: 'Emerging Threats',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'ai-q1',
      type: 'JUDGE',
      topic: 'Video Authentication',
      questionText: 'Is this video call legitimate or a potential deepfake?',
      scenario: {
        senderName: 'Zoom Call',
        senderEmail: '',
        subject: 'Urgent Wire Transfer',
        body: 'The CEO calls you on Zoom. They are using an unfamiliar headset. They ask you to immediately wire $50k to a new vendor. When you ask them to look directly at the camera, their eyes blur unnaturally and the audio glitches momentarily.',
        url: ''
      },
      correctAnswer: 'FAKE', // FAKE means "It is a deepfake"
      feedbackExplanation: 'This is a classic deepfake presentation attack. Blurring around the eyes, unnatural blinking, audio/video desync, and urgent financial requests are all massive red flags for AI-generated impersonation.',
      proTip: 'Ask the person to turn their head completely to the side (profile view) or pass their hand over their face. Most deepfake software struggles heavily with occlusion and profile angles.',
      readMoreLink: 'modules/ai-deepfake-risks#video-cues',
      scoreValue: 10
    },
    {
      id: 'ai-q2',
      type: 'CLASSIFY',
      topic: 'AI Content Indicators',
      questionText: 'Classify these 8 visual/audio cues when assessing content authenticity.',

      items: [
        { id: 'i1', label: 'Teeth lack individual definition and look like a solid white block' },
        { id: 'i2', label: 'Audio has a robotic, emotionless cadence despite urgent words' },
        { id: 'i3', label: 'Video drops to 480p resolution and gets slightly blurry' },
        { id: 'i4', label: 'Lighting on the face comes from the left, but shadows fall to the left' },
        { id: 'i5', label: 'Person pauses and uses filler words ("um", "uh") naturally' },
        { id: 'i6', label: 'Glasses lack reflections despite bright room lighting' },
        { id: 'i7', label: 'Audio has a slight echo because they are in an empty conference room' },
        { id: 'i8', label: 'Hair blending into the background with a weird shimmering effect' }
      ],
      correctMapping: {
        'i1': 'c-deepfake', // AI struggles with teeth
        'i2': 'c-deepfake', // AI voice cloning often struggles with complex emotion
        'i3': 'c-normal', // Just bad bandwidth
        'i4': 'c-deepfake', // Impossible physics
        'i5': 'c-authentic', // Natural human speech patterns
        'i6': 'c-deepfake', // AI struggles with physics of reflections
        'i7': 'c-normal', // Normal acoustic environment
        'i8': 'c-deepfake' // Classic boundary blending error
      },
      feedbackExplanation: 'AI models struggle with physics (lighting, reflections, teeth definition, hair boundaries). However, low resolution or echoes are often just normal technical issues, requiring careful distinction.',
      proTip: 'Look at the edges: where hair meets the background, where glasses sit on the nose, and the definition of teeth and eyes.',
      readMoreLink: 'modules/ai-deepfake-risks#indicators',
      scoreValue: 10
    },
    {
      id: 'ai-q3',
      type: 'ORDER',
      topic: 'Deepfake Audio Attack',
      questionText: 'Arrange the sequence of how an AI voice cloning attack is used to authorize a fraudulent wire transfer.',
      steps: [
        { id: 's1', label: 'Attacker scrapes 15 seconds of the CEO speaking from public YouTube interviews' },
        { id: 's2', label: 'Attacker feeds the audio into a Generative AI voice cloning tool' },
        { id: 's3', label: 'Attacker types a script demanding an urgent transfer to an offshore account' },
        { id: 's4', label: 'Attacker calls the finance department and plays the generated audio' },
        { id: 's5', label: 'Finance employee recognizes the CEO\'s voice and processes the payment' }
      ],
      correctOrderIds: ['s1', 's2', 's3', 's4', 's5'],
      feedbackExplanation: 'Modern AI only needs a few seconds of clean audio to create a highly convincing clone. Attackers use this to bypass human verification by sounding exactly like an authority figure.',
      proTip: 'Because voice can no longer be trusted as proof of identity, financial transactions must require multi-person authorization or an out-of-band verification code.',
      readMoreLink: 'modules/ai-deepfake-risks#audio-attacks',
      scoreValue: 10
    },
    {
      id: 'ai-q4',
      type: 'OPEN_TEXT',
      topic: 'Out-of-Band Verification',
      questionText: 'Your CFO calls you, sounding frantic, asking for an urgent wire transfer to secure a vendor contract. The voice sounds exactly like them. What do you do?',
      minWords: 15,
      expectedKeywords: ['hang up', 'call back', 'verify', 'known', 'number', 'internal', 'policy', 'duress'],
      feedbackExplanation: 'Do not process the transfer based on the call alone. Inform them you must follow security policy, hang up, and call them back on their known, internal, corporate phone number to verify the request.',
      proTip: 'A common "duress word" or safe word established within the executive team can be used to instantly verify identity during critical phone calls.',
      readMoreLink: 'modules/ai-deepfake-risks#verification',
      scoreValue: 10
    },
    {
      id: 'ai-q5',
      type: 'MCQ',
      topic: 'Identity Verification',
      questionText: 'Given the rise of deepfakes, what is the most reliable way to verify the identity of someone authorizing a sensitive action digitally?',
      options: [
        { key: 'A', text: 'Analyzing the video feed closely for pixelation and blurriness.' },
        { key: 'B', text: 'Using an out-of-band, multi-factor authentication system (like a push approval to their registered device).' },
        { key: 'C', text: 'Asking them personal questions about their childhood.' },
        { key: 'D', text: 'Using consumer-grade deepfake detection software on the call.' }
      ],
      correctOptionId: 'B',
      feedbackExplanation: 'Visual detection is a losing battle as AI improves. Cryptographic, out-of-band verification (like sending an approval push to the CEO\'s registered Okta/Duo app) relies on math, not human senses, making it immune to deepfakes.',
      proTip: 'Trust the cryptographic identity (the device they hold), not the biometric presentation (what they look/sound like on a screen).',
      readMoreLink: 'modules/ai-deepfake-risks#cryptographic-identity',
      scoreValue: 10
    },
    {
      id: 'ai-q6',
      type: 'SPOT',
      topic: 'Synthetic Image Analysis',
      questionText: 'Spot the 4 deepfake artifacts in this synthetic profile image.',
      scenario: {
        senderName: 'LinkedIn Request',
        senderEmail: '',
        subject: 'New Recruiter Connection',
        body: '[Image Analysis]: The image shows a professional in a suit. However, one earring is missing, the background text on a sign is gibberish, the collar of the shirt merges into the neck, and the eyes are looking in slightly different directions.',
        url: ''
      },
      hotspots: [
        { id: 'hs-earring', position: { top: '45%', left: '20%', width: '10%', height: '10%' }, label: 'Asymmetrical jewelry (Missing earring)' },
        { id: 'hs-text', position: { top: '25%', left: '20%', width: '10%', height: '10%' }, label: 'Gibberish background text' },
        { id: 'hs-collar', position: { top: '65%', left: '20%', width: '10%', height: '10%' }, label: 'Collar merging into neck flesh' },
        { id: 'hs-eyes', position: { top: '35%', left: '20%', width: '10%', height: '10%' }, label: 'Misaligned pupils (Strabismus)' },
        { id: 'hs-suit', position: { top: '75%', left: '20%', width: '10%', height: '10%' }, label: 'Normal suit texture' }
      ],
      correctSpotIds: ['hs-earring', 'hs-text', 'hs-collar', 'hs-eyes'],
      feedbackExplanation: 'Generative AI (like Midjourney or DALL-E) often creates asymmetrical details (earrings/glasses), generates pseudo-text that looks like alien language, and struggles with complex edge boundaries (collars).',
      proTip: 'Zoom in on the background. AI focuses heavily on making the face look perfect but often leaves the background distorted or physically impossible.',
      readMoreLink: 'modules/ai-deepfake-risks#image-artifacts',
      scoreValue: 10
    },
    {
      id: 'ai-q7',
      type: 'ORDER',
      topic: 'Call-Back Policy',
      questionText: 'Sequence the steps to establish a call-back verification policy against deepfake social engineering.',
      steps: [
        { id: 'a1', label: 'Receive an urgent, sensitive request via voice or video' },
        { id: 'a2', label: 'Acknowledge the request but state that policy requires secondary verification' },
        { id: 'a3', label: 'Terminate the current communication channel' },
        { id: 'a4', label: 'Look up the requester\'s contact info in the trusted corporate directory' },
        { id: 'a5', label: 'Initiate a new call to the trusted number to confirm the request' }
      ],
      correctOrderIds: ['a1', 'a2', 'a3', 'a4', 'a5'],
      feedbackExplanation: 'The "Hang Up and Call Back" method is the ultimate defense against real-time deepfakes. By breaking the attacker\'s connection and establishing a new one to a known-good endpoint, you bypass the illusion.',
      proTip: 'A strong security culture means executives will praise employees for hanging up on them to verify, rather than punishing them for delays.',
      readMoreLink: 'modules/ai-deepfake-risks#call-back',
      scoreValue: 10
    }
  ]
};
