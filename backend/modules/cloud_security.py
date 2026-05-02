# backend/modules/cloud_security.py

MODULE_NAME = "cloud_security"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Cloud Security (SaaS, IaaS, PaaS).

Analyze this cloud security scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the 'Shared Responsibility Model' and common cloud misconfigurations.
- "redFlags": List the signs of oversharing or shadow IT.
- "realWorldExample": A major cloud data leak case (e.g., S3 bucket leaks, OAuth hijacking).
- "quickTip": A tip for secure cloud collaboration.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the cloud misconfiguration and the correct sharing protocol.",
  "redFlags": [
    {{ "flag": "Misconfiguration", "explanation": "Why this cloud setting is dangerous." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "Cloud safety tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Cloud security often fails due to misconfigured permissions rather than technical flaws in the provider.",
        "redFlags": [
            { "flag": "Public Sharing Link", "explanation": "Setting a folder to 'Anyone with the link' makes it indexable by search engines and accessible to anyone." },
            { "flag": "Third-party App Scopes", "explanation": "Granting 'Full Access' to a simple calendar app allows it to read all your emails and files." }
        ],
        "realWorldExample": "Numerous companies have leaked millions of records because their Amazon S3 buckets were accidentally set to 'Public' instead of 'Private'.",
        "quickTip": "Regularly audit your 'Third-party Apps with Account Access' and remove anything you don't recognize or use."
    }
