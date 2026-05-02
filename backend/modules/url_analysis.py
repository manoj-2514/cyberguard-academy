# backend/modules/url_analysis.py

MODULE_NAME = "url_analysis"

def get_prompt(scenario_content: str, question_text: str):
    return f"""
You are a cybersecurity expert specializing in network security and URL forensics.

Analyze this URL-based threat scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain in detail why the correct answer is correct AND why other options are less appropriate or misleading.
- "redFlags": List specific indicators in the URL or link structure. For EACH indicator, provide a brief explanation.
- "realWorldExample": A high-impact incident involving URL spoofing or DNS hijacking.
- "quickTip": A specific, actionable rule of thumb.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Deep analysis of the scenario and choice comparisons.",
  "redFlags": [
    {{ "flag": "URL Anomaly", "explanation": "Detailed explanation of this specific technical red flag." }}
  ],
  "realWorldExample": "Incident name and brief context.",
  "quickTip": "Pro tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Attackers use technical tricks like punycode or sub-domain masking to hide their true destination.",
        "redFlags": [
            { "flag": "Typosquatting", "explanation": "Using slightly misspelled domains (e.g., g00gle.com) to catch users off guard." },
            { "flag": "Misleading TLDs", "explanation": "Using unusual top-level domains like .xyz or .biz for phishing sites." }
        ],
        "realWorldExample": "The 'Apple' punycode attack used Cyrillic characters to create a pixel-perfect fake of apple.com.",
        "quickTip": "Always inspect the root domain (the part just before the .com, .org, etc.) rather than the subdomains."
    }
