# backend/modules/ransomware.py

MODULE_NAME = "ransomware"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Ransomware attacks and incident response.

Analyze this ransomware scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain in detail why the correct answer is correct. Focus on the impact of ransomware and why certain mitigation/response strategies are better than others.
- "redFlags": List specific indicators of a ransomware attack or its precursor in this scenario.
- "realWorldExample": A real-world ransomware incident (e.g., WannaCry, REvil, or an Indian hospital attack) that mirrors this.
- "quickTip": A specific, actionable rule for ransomware prevention or recovery.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the attack stage and the correct response.",
  "redFlags": [
    {{ "flag": "Indicator", "explanation": "Why this suggests ransomware." }}
  ],
  "realWorldExample": "Incident name and context.",
  "quickTip": "Defence tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Ransomware encrypts your data to hold it hostage. Prevention depends on backups and stopping initial entry.",
        "redFlags": [
            { "flag": "Encrypted Files", "explanation": "Sudden inability to open files or changed file extensions (e.g., .locked)." },
            { "flag": "Ransom Note", "explanation": "A text file or popup demanding payment in cryptocurrency." }
        ],
        "realWorldExample": "In 2022, AIIMS Delhi suffered a massive ransomware attack that crippled its services for days, highlighting the vulnerability of critical infrastructure.",
        "quickTip": "Always keep an offline backup. Ransomware cannot encrypt what it cannot reach."
    }
