# backend/modules/incident_response.py

MODULE_NAME = "incident_response"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Incident Response (NIST framework, CERT-In guidelines).

Analyze this incident response scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the critical timing of response and reporting obligations (e.g., CERT-In 6-hour rule).
- "redFlags": List mistakes in the response process or evidence handling.
- "realWorldExample": A major breach where the response speed (or lack thereof) determined the outcome.
- "quickTip": A tip for first responders.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the incident handling and the correct containment strategy.",
  "redFlags": [
    {{ "flag": "Response Error", "explanation": "Why this specific action is harmful during a live incident." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "Incident response tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Rapid containment and preserving evidence are the highest priorities in the early stages of a security event.",
        "redFlags": [
            { "flag": "Delayed Reporting", "explanation": "In India, critical incidents must be reported to CERT-In within 6 hours of discovery." },
            { "flag": "Altering Evidence", "explanation": "Restarting a compromised server before taking a memory dump can destroy vital forensic evidence." }
        ],
        "realWorldExample": "The 2022 AIIMS Delhi ransomware attack highlighted the critical need for robust incident response plans and segmented backups in national infrastructure.",
        "quickTip": "If you see something suspicious, report it to your SOC immediately—don't try to 'investigate' it yourself if you aren't trained."
    }
