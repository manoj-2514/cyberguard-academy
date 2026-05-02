# backend/modules/social_engineering.py

MODULE_NAME = "social_engineering"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in social engineering and human manipulation tactics.

Analyze this social engineering scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis.
- "why": Explain in detail why the correct answer is correct AND why other options are less appropriate or misleading. If the user got it wrong, explain what manipulation tactic was used.
- "redFlags": List specific indicators of social engineering in this scenario. For EACH flag, provide a brief explanation of the psychological principle the attacker exploited.
- "realWorldExample": A real-world social engineering incident from India or globally that mirrors this technique.
- "quickTip": A specific, actionable defence rule of thumb.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Deep analysis of the scenario and why the correct answer protects the user.",
  "redFlags": [
    {{ "flag": "Tactic name", "explanation": "Detailed explanation of this specific manipulation technique." }}
  ],
  "realWorldExample": "Incident name and brief context.",
  "quickTip": "Specific defence tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Social engineers exploit trust, authority, and urgency to bypass rational thinking.",
        "redFlags": [
            { "flag": "Authority Impersonation", "explanation": "The attacker posed as someone with authority (IT, bank, police) to lower your guard and compel compliance." },
            { "flag": "Artificial Urgency", "explanation": "Creating time pressure prevents you from pausing to verify the request through official channels." }
        ],
        "realWorldExample": "In 2021, scammers impersonating TRAI (Telecom Regulatory Authority of India) officials called Indian mobile users threatening number disconnection unless a 'verification fee' was paid immediately.",
        "quickTip": "Any request that creates urgency and asks for credentials, OTPs, or money is almost certainly a social engineering attack. Always verify through the organisation's official number."
    }
