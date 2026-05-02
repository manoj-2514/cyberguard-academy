# backend/modules/physical_security.py

MODULE_NAME = "physical_security"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Physical Security and its impact on digital assets.

Analyze this physical security scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the physical vulnerability and how it could lead to a digital breach.
- "redFlags": List the physical indicators or lapses shown in the scenario.
- "realWorldExample": A case where physical access led to a major hack (e.g., Stuxnet, or an office break-in).
- "quickTip": A tip for better physical security habits.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the physical lapse and the correct security habit.",
  "redFlags": [
    {{ "flag": "Lapse", "explanation": "Why this physical action was dangerous." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "Physical security tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Cyber security starts at the door. If someone can physically access your hardware, your data is at risk.",
        "redFlags": [
            { "flag": "Tailgating", "explanation": "Following an authorized person into a restricted area without scanning your own badge." },
            { "flag": "Unattended Unlocked Device", "explanation": "Leaving a logged-in computer or mobile device in a public or shared space." }
        ],
        "realWorldExample": "USB drop attacks (leaving infected pen drives in parking lots) have been used to infiltrate high-security networks by relying on human curiosity.",
        "quickTip": "Lock your screen every time you step away from your desk, even for a minute."
    }
