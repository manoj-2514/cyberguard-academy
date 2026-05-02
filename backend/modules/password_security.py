# backend/modules/password_security.py

MODULE_NAME = "password_security"

def get_prompt(scenario_content: str, question_text: str):
    return f"""
You are a cybersecurity expert specializing in identity and access management.

Analyze this password security scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain in detail why the correct answer is correct AND why other options are less appropriate or misleading.
- "redFlags": List specific indicators of weak security or common pitfalls. For EACH point, provide a brief explanation.
- "realWorldExample": A high-impact historical or recent incident involving password or credential theft.
- "quickTip": A specific, actionable rule of thumb.

Return JSON only:
{{
  "isPhishing": false,
  "why": "Deep analysis of the scenario and choice comparisons.",
  "redFlags": [
    {{ "flag": "Weakness name", "explanation": "Detailed explanation of this specific risk." }}
  ],
  "realWorldExample": "Incident name and brief context.",
  "quickTip": "Pro tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": False,
        "why": f"The correct answer was {correct_answer}. {explanation}. Modern security relies on defense-in-depth where passwords are just one layer.",
        "redFlags": [
            { "flag": "Credential Reuse", "explanation": "Using the same password across multiple sites allows one breach to compromise all accounts." },
            { "flag": "Low Entropy", "explanation": "Short or predictable passwords can be cracked in seconds using automated tools." }
        ],
        "realWorldExample": "The Colonial Pipeline hack involved a single compromised password on a legacy VPN account.",
        "quickTip": "Use a password manager to generate and store unique, high-entropy passphrases."
    }
