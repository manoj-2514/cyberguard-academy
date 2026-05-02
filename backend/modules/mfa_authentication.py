# backend/modules/mfa_authentication.py

MODULE_NAME = "mfa_authentication"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Authentication and Identity Management (MFA, OTP, Passkeys).

Analyze this authentication scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the strengths and weaknesses of different MFA methods.
- "redFlags": List indicators of session hijacking or MFA bypass attempts.
- "realWorldExample": A case of MFA fatigue, push bombing, or SIM swapping.
- "quickTip": A tip for robust account security.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the authentication method and the correct response to an attack.",
  "redFlags": [
    {{ "flag": "Auth Threat", "explanation": "Why this specific login behavior is a risk." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "MFA safety tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Multi-Factor Authentication is your last line of defense. However, not all MFA is equal (e.g., SMS is weaker than App-based TOTP).",
        "redFlags": [
            { "flag": "Unsolicited OTP", "explanation": "Receiving an OTP when you didn't try to log in means an attacker already has your password." },
            { "flag": "MFA Fatigue", "explanation": "Constant 'Approve' prompts on your phone designed to wear you down until you click 'Yes' by mistake." }
        ],
        "realWorldExample": "The Uber breach in 2022 was successful because an attacker used 'MFA Fatigue' to bombard an employee until they finally approved a login request.",
        "quickTip": "Prefer App-based authenticators (like Google/Microsoft Authenticator) or Hardware Keys over SMS-based OTPs."
    }
