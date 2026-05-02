# backend/modules/insider_threat.py

MODULE_NAME = "insider_threat"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Insider Threats (malicious, negligent, or compromised).

Analyze this insider threat scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the motivation or mistake of the insider and why the correct answer is the right way to detect or handle it.
- "redFlags": List behavioural or technical indicators shown in the scenario.
- "realWorldExample": A real-world insider threat case (e.g., Tesla, Apple, or an Indian financial firm case).
- "quickTip": A tip for spotting or preventing insider risks.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the insider's actions and the proper protocol.",
  "redFlags": [
    {{ "flag": "Warning Sign", "explanation": "Why this behavior is suspicious." }}
  ],
  "realWorldExample": "Case context.",
  "quickTip": "Prevention tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Insider threats are difficult to detect because they involve legitimate users with authorized access.",
        "redFlags": [
            { "flag": "Unusual Access", "explanation": "Accessing sensitive data at odd hours or data not related to the employee's role." },
            { "flag": "Massive Downloads", "explanation": "A sudden spike in data transfer to external storage or personal cloud drives." }
        ],
        "realWorldExample": "In many cases, departing employees take proprietary data to their new jobs, which is a classic example of a malicious insider threat.",
        "quickTip": "Follow the 'Principle of Least Privilege'—only give employees access to what they absolutely need for their job."
    }
