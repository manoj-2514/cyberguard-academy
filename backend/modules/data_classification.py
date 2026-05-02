# backend/modules/data_classification.py

MODULE_NAME = "data_classification"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Data Classification and Governance (DPDP Act, RBI/IT Act guidelines).

Analyze this data classification scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the importance of classifying data and the impact of the DPDP Act.
- "redFlags": List indicators of oversharing or mislabeling.
- "realWorldExample": A case of a data leak due to poor classification or retention policies.
- "quickTip": A tip for secure data handling.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the data sensitivity and the correct classification level.",
  "redFlags": [
    {{ "flag": "Oversharing", "explanation": "Why this data should not be shared through this channel." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "Data classification tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Under India's DPDP Act, organizations have a strict obligation to protect personal data through its entire lifecycle.",
        "redFlags": [
            { "flag": "PII Exposure", "explanation": "Sharing PII (Aadhaar, PAN, etc.) without encryption or on public channels is a major compliance violation." },
            { "flag": "Incorrect Label", "explanation": "Labeling sensitive financial data as 'Internal' instead of 'Confidential' can lead to insufficient security controls." }
        ],
        "realWorldExample": "Several Indian banks have faced penalties for accidentally exposing customer Aadhaar and account details on public-facing portals due to misconfiguration.",
        "quickTip": "Always follow the 'Principle of Data Minimization'—only collect and store the data that is absolutely necessary."
    }
