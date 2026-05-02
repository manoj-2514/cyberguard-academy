# backend/modules/phishing.py

MODULE_NAME = "phishing"

def get_prompt(scenario_content: str, question_text: str):
    return f"""
You are a cybersecurity expert specializing in phishing detection.

Analyze this phishing scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain in detail why the correct answer is correct AND why other options are less appropriate or misleading.
- "redFlags": List specific indicators in the content. For EACH red flag, provide a brief explanation of how an attacker uses it.
- "realWorldExample": A high-impact historical or recent phishing incident that mirrors this technique.
- "quickTip": A specific, actionable rule of thumb.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Deep analysis of the scenario and choice comparisons.",
  "redFlags": [
    {{ "flag": "Flag name", "explanation": "Detailed explanation of this specific flag." }}
  ],
  "realWorldExample": "Incident name and brief context.",
  "quickTip": "Pro tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. This technique is common because it exploits human psychology or technical misconfigurations.",
        "redFlags": [
            { "flag": "Suspicious Sender", "explanation": "The email address doesn't match the official domain of the purported sender." },
            { "flag": "Urgent Tone", "explanation": "Attackers create artificial pressure to make you act before thinking." }
        ],
        "realWorldExample": "The 2016 DNC email hack used similar credential harvesting techniques.",
        "quickTip": "Always verify unexpected requests through a secondary, trusted channel."
    }
