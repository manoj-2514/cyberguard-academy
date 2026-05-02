# backend/modules/device_security.py

MODULE_NAME = "device_security"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in Endpoint and Device Security (Laptops, Mobiles, BYOD).

Analyze this device security scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain the importance of device hardening and policy compliance.
- "redFlags": List the security lapses in the device configuration or user behavior.
- "realWorldExample": A case where an unmanaged or unpatched device led to a breach.
- "quickTip": A tip for personal device safety.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the device vulnerability and the correct security posture.",
  "redFlags": [
    {{ "flag": "Vulnerability", "explanation": "Why this setting or behavior is a risk." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "Device hardening tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. Your device is the gateway to your professional and personal life. Hardening it prevents local and remote access by attackers.",
        "redFlags": [
            { "flag": "Missing Updates", "explanation": "Outdated software contains known vulnerabilities that attackers can exploit to gain control." },
            { "flag": "No Remote Wipe", "explanation": "If a device is lost, the lack of remote wipe capability means your data remains accessible to whoever finds it." }
        ],
        "realWorldExample": "The Pegasus spyware specifically targeted unpatched mobile devices, emphasizing the critical need for constant OS and app updates.",
        "quickTip": "Enable 'Find My Device' and remote wipe capabilities on all personal and work hardware."
    }
