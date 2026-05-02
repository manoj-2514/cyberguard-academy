# backend/modules/wifi_security.py

MODULE_NAME = "wifi_security"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Wi-Fi and Network Security.

Analyze this Wi-Fi security scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the network vulnerability and the risks of public Wi-Fi.
- "redFlags": List indicators of an insecure or rogue network.
- "realWorldExample": A real-world incident involving public Wi-Fi or man-in-the-middle attacks.
- "quickTip": A tip for safe browsing on the move.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the network risk and the correct protection method.",
  "redFlags": [
    {{ "flag": "Network Risk", "explanation": "Why this specific network feature is dangerous." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "Wi-Fi safety tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Public Wi-Fi is often unencrypted, allowing attackers to intercept your traffic through Man-in-the-Middle (MitM) attacks.",
        "redFlags": [
            { "flag": "Unencrypted Network", "explanation": "Open networks without a password allow anyone to 'sniff' the data being sent over the air." },
            { "flag": "Same SSID Duplicate", "explanation": "Seeing two networks with the exact same name often indicates an 'Evil Twin' rogue access point." }
        ],
        "realWorldExample": "At major conferences like DEF CON or even in public airports, 'Pineapple' devices are often used to create rogue hotspots that steal credentials from unsuspecting users.",
        "quickTip": "Never conduct banking or sensitive work on public Wi-Fi without a trusted VPN."
    }
