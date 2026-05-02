# backend/modules/privacy_awareness.py

MODULE_NAME = "privacy_awareness"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Privacy Awareness (DPDP Act 2023, GDPR).

Analyze this privacy scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain user rights (Right to Erasure, Right to Correction) and lawful basis for processing.
- "redFlags": List privacy-intrusive elements or deceptive patterns (Dark Patterns).
- "realWorldExample": A case of a massive privacy fine or breach of trust.
- "quickTip": A tip for protecting personal privacy in apps.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the privacy implication and the lawful data handling requirement.",
  "redFlags": [
    {{ "flag": "Privacy Risk", "explanation": "Why this specific tracker or consent form is problematic." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "Privacy tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Privacy is now a fundamental right in India under the DPDP Act 2023. Organizations must obtain clear, affirmative consent.",
        "redFlags": [
            { "flag": "Pre-ticked Boxes", "explanation": "Consent must be 'opt-in', not 'opt-out'. Pre-ticked boxes for marketing are no longer considered valid consent." },
            { "flag": "Vague Purpose", "explanation": "Data fiduciaries must specify the exact purpose for which data is collected; 'to improve experience' is often too vague." }
        ],
        "realWorldExample": "Multiple fintech apps in India have been scrutinized for accessing contact lists and photos without a clear and justifiable service-related purpose.",
        "quickTip": "Regularly audit 'App Permissions' on your phone and revoke access to location or microphone for apps that don't need them."
    }
