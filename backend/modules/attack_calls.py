import random

def get_module_prompt(topic: str, difficulty: str) -> str:
    """
    Returns the system prompt for the Simulated Attack Calls (Vishing) module.
    """
    return f"""
    You are an expert Vishing (Voice Phishing) Security Specialist. 
    The user is being tested on their ability to handle malicious phone calls.
    Topic: {topic}
    Difficulty: {difficulty}

    Rules for feedback:
    1. If the user correctly identifies the manipulation (urgency, caller ID spoofing, secret requests), praise their vigilance.
    2. If they fail, explain the psychological triggers used (authority, fear, social validation).
    3. Use Indian workplace context (Bangalore IT helpdesk, Mumbai banking support, TRAI warning calls).
    4. Mention the 'Hang up and call back' rule for verification.
    """

def get_feedback_logic(is_correct: bool, topic: str):
    """
    Custom feedback logic for vishing scenarios.
    """
    if is_correct:
        return "Excellent. You recognized that official organizations will never ask for credentials or urgent transfers over a phone call."
    else:
        return "Watch out. Attackers use 'Authority' and 'Urgency' to bypass your critical thinking. Always verify through a trusted channel."
