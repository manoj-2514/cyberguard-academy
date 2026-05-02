# backend/modules/ai_deepfake.py

MODULE_NAME = "ai_deepfake"

def get_prompt(scenario_content: str, question_text: str, user_answer: str = "", correct_answer: str = ""):
    return f"""
You are a cybersecurity expert specializing in AI-driven threats and Deepfakes.

Analyze this AI/Deepfake scenario:

{scenario_content}

Question: {question_text}

Provide a deep pedagogical analysis. 
- "why": Explain how AI models are used for social engineering and data leakage.
- "redFlags": List technical or behavioral 'glitches' that identify a deepfake or AI bot.
- "realWorldExample": A high-profile deepfake fraud case or LLM prompt injection incident.
- "quickTip": A tip for verifying identity in the age of AI.

Return JSON only:
{{
  "isPhishing": true,
  "why": "Analysis of the AI threat and the correct verification or mitigation strategy.",
  "redFlags": [
    {{ "flag": "AI Indicator", "explanation": "Why this specific behavior suggests AI manipulation." }}
  ],
  "realWorldExample": "Incident context.",
  "quickTip": "AI safety tip."
}}
"""

def fallback_explanation(is_correct: bool, correct_answer: str, explanation: str):
    return {
        "isPhishing": True,
        "why": f"The correct answer was {correct_answer}. {explanation}. AI has made social engineering more convincing by automating the creation of personalized, high-quality audio and video.",
        "redFlags": [
            { "flag": "Unnatural Blinking", "explanation": "Many current deepfake models struggle with realistic eye movement and blinking patterns." },
            { "flag": "Robotic Cadence", "explanation": "While AI voices are getting better, they often have perfectly consistent pacing that lacks the natural pauses of human speech." }
        ],
        "realWorldExample": "In 2024, a finance worker in Hong Kong was tricked into paying $25 million to scammers after a video call with what appeared to be his CFO and other colleagues—all of whom were deepfakes.",
        "quickTip": "Establish a 'Safe Word' or a unique verification question with family and key colleagues to use in case of suspicious urgent requests."
    }
