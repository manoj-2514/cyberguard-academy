import os
import json
import logging
import asyncio
import importlib
import re
from pydantic import BaseModel, ValidationError
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# --- Groq Configuration ---
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if GROQ_API_KEY:
    print(f"🔑 Groq API Key loaded (starts with {GROQ_API_KEY[:7]}...)")
else:
    print("⚠️ GROQ_API_KEY not found in environment!")

import httpx
http_client = httpx.AsyncClient(verify=False)
groq_client = AsyncGroq(api_key=GROQ_API_KEY, http_client=http_client) if GROQ_API_KEY else None
GROQ_MODEL = "llama-3.3-70b-versatile"

# ==========================
# MODELS
# ==========================
class RedFlagDetail(BaseModel):
    flag: str
    explanation: str

class ExplanationDetailsOutput(BaseModel):
    isPhishing: bool
    why: str
    redFlags: list[RedFlagDetail]
    anatomy: list[str]
    psychology: str
    mistakes: list[str]
    variations: list[str]
    mindset: str
    interacted: str
    realWorldExample: str
    quickTip: str

class CaseStudyOutput(BaseModel):
    title: str
    organization: str
    attack_type: str
    what_happened: str
    attack_flow: list[str]
    impact: str
    key_mistake: str
    lessons_learned: str

# ==========================
# CASE STUDY GENERATOR
# ==========================
async def generate_case_study(topic: str) -> CaseStudyOutput:
    if not groq_client:
        return CaseStudyOutput(
            title=f"Incident Report: {topic}",
            organization="Global Entity",
            attack_type=topic,
            what_happened="A sophisticated cyber attack targeting organizational infrastructure.",
            attack_flow=["Reconnaissance", "Initial Access", "Execution", "Exfiltration"],
            impact="Significant data loss and operational downtime.",
            key_mistake="Inadequate monitoring and slow incident response.",
            lessons_learned="Implement real-time monitoring and regular employee training."
        )

    prompt = f"""
You are a Cyber Forensic Investigator.
Generate a DETAILED, PROFESSIONAL CASE STUDY for a real-world cybersecurity incident related to: {topic}.

If a famous real-world incident exists for this topic (e.g., MGM for social engineering, Equifax for unpatched servers), use it.
If not, create a realistic, high-fidelity forensic report.

STRUCTURE:
1. Title: Clear incident name
2. Organization: Victim name (Real or Realistic)
3. Attack Type: specific technique used
4. What Happened: Detailed narrative (2-3 paragraphs)
5. Attack Flow: 5-step technical sequence
6. Impact: Financial, legal, and operational consequences
7. Key Mistake: The single biggest human or technical error
8. Lessons Learned: Actionable takeaways for a security professional

STRICT JSON FORMAT:
{{
  "title": "...",
  "organization": "...",
  "attack_type": "...",
  "what_happened": "...",
  "attack_flow": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "impact": "...",
  "key_mistake": "...",
  "lessons_learned": "..."
}}
"""
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"}
        )
        data = json.loads(response.choices[0].message.content)
        return CaseStudyOutput(**data)
    except Exception as e:
        logger.error(f"AI Case Study generation failed: {e}")
        return CaseStudyOutput(
            title=f"Case Study: {topic}",
            organization="Unknown",
            attack_type=topic,
            what_happened="Data generation failed. Please try again later.",
            attack_flow=["Error"],
            impact="Unknown",
            key_mistake="N/A",
            lessons_learned="Always have a fallback system."
        )

# ==========================
# MODULE-SPECIFIC INTELLIGENCE
# ==========================
MODULE_INTELLIGENCE = {
    "phishing": "Focus on sender spoofing, domain misspellings, urgent tone, and malicious link indicators.",
    "url_analysis": "Focus on domain structure, TLD risks, subdomain tricks, and character replacement (homographs).",
    "password_security": "Focus on entropy, reuse risks, brute-force patterns, and credential stuffing defense.",
    "malware_awareness": "Focus on file extensions, macro risks, download sources, and execution behaviors.",
    "social_engineering": "Focus on psychological triggers: reciprocity, authority, scarcity, and emotional manipulation.",
    "ransomware": "Focus on initial entry vectors, lateral movement, encryption methods, and restoration protocols.",
    "insider_threat": "Focus on behavioral anomalies, unauthorized access, data exfiltration, and privilege abuse.",
    "physical_security": "Focus on tailgating, social engineering at entry, device unattended risks, and visual hacking.",
    "wifi_security": "Focus on rogue APs, 'Evil Twin' networks, packet sniffing risks, and VPN importance.",
    "device_security": "Focus on encryption, patching, BIOS/UEFI security, and lost-device protocols.",
    "cloud_security": "Focus on shared responsibility, misconfigured buckets, SaaS tokens, and MFA on cloud consoles.",
    "mfa_authentication": "Focus on push fatigue, SIM swapping, OTP intercept, and phishing of second factors.",
    "data_classification": "Focus on PII identification, sensitivity labels, retention laws, and safe disposal.",
    "incident_response": "Focus on containment, evidence preservation, communication protocols, and post-mortem.",
    "privacy_awareness": "Focus on data minimization, user consent, tracking transparency, and regulatory compliance.",
    "ai_deepfake": "Focus on voice/video artifacts, prompt injection, LLM leakage, and impersonation at scale.",
    "attack_calls": "Focus on caller ID spoofing, social pressure via voice, and out-of-band verification.",
    "digital_footprint": "Focus on OSINT, metadata in files, public profile leakage, and information aggregation.",
    "safe_browsing": "Focus on malicious extensions, browser notification abuse, and drive-by download triggers.",
    "supply_chain": "Focus on vendor email compromise (VEC), invoice fraud, and unvetted third-party libraries."
}

# ==========================
# MASTER PROMPT GENERATOR
# ==========================
def get_master_prompt(
    module_name: str,
    topic: str,
    scenario: str,
    question: str,
    user_answer: str,
    correct_answer: str,
    is_correct: bool
) -> str:
    module_dna = MODULE_INTELLIGENCE.get(module_name, "Focus on general cybersecurity awareness and risk identification.")
    
    # Infer question type
    q_type = "GENERAL"
    if "JUDGE:" in question: q_type = "JUDGE (Accuracy)"
    elif "SPOT:" in question: q_type = "SPOT (Evidence identification)"
    elif "ORDER:" in question: q_type = "ORDER (Process/Sequence)"
    elif "MCQ:" in question: q_type = "MCQ (Knowledge)"
    elif "REASONING:" in question: q_type = "REASONING (Justification)"

    prompt = f"""
You are an Expert Cybersecurity Mentor at CyberGuard Academy. 
Your job is to provide a COMPLETE TRAINING EXPLANATION (12-point standard) for this specific scenario.

CONTEXT:
- Module: {module_name} ({module_dna})
- Topic: {topic}
- Question Type: {q_type}

SCENARIO EVIDENCE:
{scenario}

QUESTION:
{question}

STUDENT'S ANSWER: {user_answer}
CORRECT ANSWER: {correct_answer}
RESULT: {"Correct" if is_correct else "Incorrect"}

INSTRUCTIONS:
Provide a deep pedagogical analysis covering these dimensions:
1. "why": Deep analysis of the correct choice vs the trap. (Start with "Correct!" if student was right).
2. "redFlags": 2-4 UNIQUE indicators from the text.
3. "anatomy": A 5-step technical attack flow for this specific case.
4. "psychology": Why would a normal person fall for this? (Cognitive bias/Trigger).
5. "mistakes": List 2-3 common errors users make in this exact scenario.
6. "variations": 2-3 other ways this same attack is performed.
8. "mindset": The 'Expert Mindset' required to detect this.
9. "interacted": Damage control steps if the user already clicked or shared info.
10. "realWorldExample": A high-impact case study mirroring this.
11. "quickTip": A short memorable rule of thumb.

STRICT JSON FORMAT:
{{
  "isPhishing": true/false,
  "why": "Specific training analysis...",
  "redFlags": [{{ "flag": "...", "explanation": "..." }}],
  "anatomy": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
  "psychology": "Analysis...",
  "mistakes": ["Error 1", "Error 2"],
  "variations": ["Variant 1", "Variant 2"],
  "mindset": "How to think...",
  "interacted": "1. Step one... 2. Step two...",
  "realWorldExample": "Incident...",
  "quickTip": "Tip..."
}}

Rules:
- NEVER use generic responses.
- ALWAYS use key "isPhishing".
- Return ONLY the JSON object.
"""
    return prompt

class RedFlagDetail(BaseModel):
    label: str
    detail: str
    legitimate_version: str

class AttackStep(BaseModel):
    step: int
    description: str

class PedagogicalFeedbackOutput(BaseModel):
    result: str
    opening_line: str
    explanation: str
    red_flags: list[RedFlagDetail]
    attack_anatomy: list[AttackStep]
    correct_process: list[str] | None = None
    pro_tip: str
    stay_sharp: str
    closing: str

# ==========================
# PEDAGOGICAL AI ENGINE
# ==========================
async def analyze_error(
    question_text: str,
    scenario: dict,
    user_answer: any,
    question_type: str,
    is_correct: bool = False
) -> PedagogicalFeedbackOutput:
    if not groq_client:
        return PedagogicalFeedbackOutput(
            result="correct" if is_correct else "incorrect",
            opening_line="Good job!" if is_correct else "This one was tricky.",
            explanation="The scenario contained technical indicators of malicious intent.",
            red_flags=[RedFlagDetail(label="Suspicious Elements", detail="Technical indicators missed.", legitimate_version="A verified and authenticated source.")],
            attack_anatomy=[AttackStep(step=1, description="Attacker leverages deception.")],
            correct_process=["Verify the source.", "Check for indicators.", "Report if suspicious."],
            pro_tip="Always trust, but verify.",
            stay_sharp="Attackers constantly evolve their techniques.",
            closing="Keep practicing to hone your skills."
        )

    prompt = f"""
    You are an expert cybersecurity trainer and pedagogy specialist built into a phishing/social engineering awareness training platform.
    Your job is to provide rich, educational feedback after a user answers a scenario-based question. You must always teach — not just evaluate.

    QUESTION: {question_text}
    TYPE: {question_type}
    SCENARIO EVIDENCE: {json.dumps(scenario)}
    USER'S ANSWER: {json.dumps(user_answer)}
    ACTUAL RESULT: {"CORRECT" if is_correct else "INCORRECT"}

    ## FEEDBACK RULES

    ### IF THE USER ANSWERED CORRECTLY (ACTUAL RESULT is CORRECT):
    1. Open with a brief positive reinforcement (1 sentence max). e.g., "Good catch — that one trips up most people."
    2. Explain WHY they were correct: Identify the exact red flag(s) they spotted, name the attack type, and explain the attacker's intent.
    3. Highlight what made it identifiable (quote/reference specific elements).
    4. Add a "Stay Sharp" warning: Describe a more sophisticated version of this attack.
    5. Reinforce the skill: Name one actionable habit they used correctly.

    ### IF THE USER ANSWERED INCORRECTLY (ACTUAL RESULT is INCORRECT):
    1. Open with a soft, non-judgmental reset line. e.g., "This one is designed to be deceptive — here's what to look for."
    2. Explain WHY it was wrong: Name the attack type and technique used.
    3. Point out the red flags they missed (reference the exact suspicious element).
    4. Teach the correct decision process step-by-step.
    5. Give a memorable tip or mnemonic.
    6. End with encouragement + a forward hook.

    ## ATTACK ANATOMY (always include for both correct and incorrect):
    Break down the attack into numbered technical steps:
    1. Reconnaissance
    2. Psychological trigger
    3. Manipulation goal
    4. Consequence of compliance

    ## AI RED FLAG ANALYSIS (always include):
    List each threat indicator with a short label, why it's suspicious, and what a legitimate version looks like.

    ## TONE & STYLE:
    - Professional but human — like a security mentor, not a textbook.
    - Keep total feedback concise.
    
    ## OUTPUT FORMAT:
    Return your response STRICTLY as a JSON object:
    {{
      "result": "{"correct" if is_correct else "incorrect"}",
      "opening_line": "...",
      "explanation": "...",
      "red_flags": [
        {{ "label": "...", "detail": "...", "legitimate_version": "..." }}
      ],
      "attack_anatomy": [
        {{ "step": 1, "description": "..." }}
      ],
      "correct_process": ["Step 1: ...", "Step 2: ..."],
      "pro_tip": "...",
      "stay_sharp": "...",
      "closing": "..."
    }}
    Note: 'correct_process' is required for incorrect answers, but can be empty/null for correct answers.
    """
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"},
            temperature=0.7
        )
        data = json.loads(response.choices[0].message.content)
        return PedagogicalFeedbackOutput(**data)
    except Exception as e:
        logger.error(f"AI Error analysis failed: {e}")
        return PedagogicalFeedbackOutput(
            result="correct" if is_correct else "incorrect",
            opening_line="Good job!" if is_correct else "This one was tricky.",
            explanation="The scenario contained technical indicators of malicious intent.",
            red_flags=[RedFlagDetail(label="Suspicious Elements", detail="Technical indicators missed.", legitimate_version="A verified and authenticated source.")],
            attack_anatomy=[AttackStep(step=1, description="Attacker leverages deception.")],
            correct_process=["Verify the source.", "Check for indicators.", "Report if suspicious."],
            pro_tip="Always trust, but verify.",
            stay_sharp="Attackers constantly evolve their techniques.",
            closing="Keep practicing to hone your skills."
        )

# ==========================
# AI FEEDBACK FUNCTION (Existing)
# ==========================
async def generate_feedback(
    module_name: str,
    scenario_content: str,
    question_text: str,
    user_answer: str,
    correct_answer: str,
    explanation: str,
    is_correct: bool,
    topic: str = "General Security"
) -> ExplanationDetailsOutput:

    prompt = get_master_prompt(
        module_name,
        topic,
        scenario_content,
        question_text,
        user_answer,
        correct_answer,
        is_correct
    )

    if groq_client:
        try:
            print(f"📡 Groq request → {module_name} | Topic: {topic}")

            response = await asyncio.wait_for(
                groq_client.chat.completions.create(
                    model=GROQ_MODEL,
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    temperature=0.4, # Lower temperature for consistency
                ),
                timeout=30.0 # Increased timeout for complex 70B model responses
            )

            content = response.choices[0].message.content
            print(f"✅ Groq response received for {module_name}")
            data = json.loads(content)

            # Strict Enforcement: Remove red flags if correct (even if AI hallucinated them)
            if is_correct:
                data["redFlags"] = []
                if not data.get("why", "").startswith("Correct!"):
                    data["why"] = f"Correct! {data.get('why', '')}"

            return ExplanationDetailsOutput(**data)

        except Exception as e:
            print(f"⚠️ Groq failed: {e}")

    # ==========================
    # FALLBACK (Module-Specific but Static)
    # ==========================
    print("❌ Using fallback explanation")
    
    # Simple fallback based on the provided explanation from static_data.py
    fallback = {
        "isPhishing": True,
        "why": f"{'Correct! ' if is_correct else ''}{explanation}",
        "redFlags": [],
        "anatomy": ["Reconnaissance", "Initial Access", "Execution", "Exfiltration", "Impact"],
        "psychology": "Attackers leverage urgency and authority to bypass critical thinking.",
        "mistakes": ["Trusting the sender name without checking the email address.", "Clicking links from unknown or suspicious sources."],
        "variations": ["Similar attacks may use SMS (Smishing) or Voice (Vishing)."],
        "mindset": "Always verify unexpected requests through an independent channel.",
        "interacted": "1. Disconnect from network. 2. Change passwords. 3. Report to IT.",
        "realWorldExample": "This technique is widely used in modern cyberattacks.",
        "quickTip": "Always verify unexpected requests through a trusted, secondary channel."
    }
    
    return ExplanationDetailsOutput(**fallback)

# ==========================
# LIVE SIMULATOR ENGINE
# ==========================
class EmailRedFlag(BaseModel):
    label: str
    explanation: str
    legitimate_version: str

class AnalyzeEmailResponse(BaseModel):
    threat_level: str
    verdict: str
    attack_type: str
    attacker_intent: str
    confidence_score: int
    red_flags: list[EmailRedFlag]
    what_to_do: list[str]

def extract_json(text: str) -> str:
    """Strip markdown backticks and extract JSON to handle Groq formatting quirks."""
    match = re.search(r'```(?:json)?\s*(\{.*\})\s*```', text, re.DOTALL)
    if match:
        return match.group(1)
    return text.strip()

async def analyze_email(sender: str, subject: str, body: str) -> AnalyzeEmailResponse:
    if not groq_client:
        # Fallback if Groq is disconnected
        return AnalyzeEmailResponse(
            threat_level="SAFE",
            verdict="AI service is offline, unable to analyze.",
            attack_type="Unknown",
            attacker_intent="Unknown",
            confidence_score=0,
            red_flags=[],
            what_to_do=["Check your internet connection.", "Ensure GROQ API key is configured."]
        )

    prompt = f"""
You are an expert cybersecurity analyst specializing in email threat detection.
A user will provide you with an email (sender, subject, body).
Your job is to analyze it for phishing, spear phishing, BEC, or social engineering indicators.

EMAIL DETAILS:
From: {sender}
Subject: {subject}
Body:
{body}

Always respond ONLY in valid JSON matching this exact schema:
{{
  "threat_level": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
  "verdict": "one punchy sentence summarizing the threat",
  "attack_type": "name of the attack technique",
  "attacker_intent": "what the attacker was trying to achieve",
  "confidence_score": number between 0 and 100,
  "red_flags": [
    {{
      "label": "short flag name",
      "explanation": "why this element is suspicious",
      "legitimate_version": "what this would look like in a real email"
    }}
  ],
  "what_to_do": ["Step 1", "Step 2", "Step 3"]
}}

Rules:
- If the email looks completely safe, say so honestly with threat_level SAFE
- Never guess — base your analysis strictly on what is provided
- Be specific, not generic. Reference actual content from the email
- Keep verdict under 20 words
- List at least 2 red_flags if SUSPICIOUS or DANGEROUS
- Return NO text outside the JSON object. No preamble, no markdown fences.
"""
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"},
            temperature=0.3  # Lower temperature for analytical precision
        )
        
        content = response.choices[0].message.content
        clean_json_str = extract_json(content)
        data = json.loads(clean_json_str)
        return AnalyzeEmailResponse(**data)
    except Exception as e:
        logger.error(f"Live Simulator email analysis failed: {e}")
        return AnalyzeEmailResponse(
            threat_level="SUSPICIOUS",
            verdict="Analysis failed due to an internal error.",
            attack_type="Error",
            attacker_intent="Unknown",
            confidence_score=0,
            red_flags=[],
            what_to_do=["Try again later."]
        )

# --- URL Analysis ---
class DomainAnalysis(BaseModel):
    domain: str
    subdomain_flags: str
    path_flags: str
    estimated_age: str

class AnalyzeUrlResponse(BaseModel):
    threat_level: str
    verdict: str
    attack_type: str
    domain_analysis: DomainAnalysis
    confidence_score: int
    red_flags: list[EmailRedFlag]
    what_to_do: list[str]

async def analyze_url(url: str) -> AnalyzeUrlResponse:
    if not groq_client:
        return AnalyzeUrlResponse(
            threat_level="SAFE",
            verdict="AI service offline.",
            attack_type="Unknown",
            domain_analysis=DomainAnalysis(domain="", subdomain_flags="", path_flags="", estimated_age=""),
            confidence_score=0,
            red_flags=[],
            what_to_do=["Check connection."]
        )

    prompt = f"""
You are an expert cybersecurity analyst specializing in malicious URL detection.
A user will provide a URL: {url}

Analyze:
- The domain name (typos, lookalike characters, suspicious TLDs)
- Subdomain structure (excessive subdomains, misleading nesting)
- Path and query string (encoded characters, suspicious keywords)
- Overall structure vs legitimate versions of similar URLs

Always respond ONLY in valid JSON matching this exact schema:
{{
  "threat_level": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
  "verdict": "one punchy sentence under 20 words",
  "attack_type": "name of the attack technique or None",
  "domain_analysis": {{
    "domain": "extracted root domain",
    "subdomain_flags": "any subdomain concerns or None",
    "path_flags": "any path/query concerns or None",
    "estimated_age": "estimated domain age based on naming patterns"
  }},
  "confidence_score": number 0-100,
  "red_flags": [
    {{
      "label": "short flag name",
      "explanation": "why this is suspicious",
      "legitimate_version": "what a safe version looks like"
    }}
  ],
  "what_to_do": ["Step 1", "Step 2", "Step 3"]
}}

Rules:
- Be specific — reference actual parts of the URL provided
- If the URL looks completely safe, return threat_level SAFE honestly
- Return NO text outside the JSON. No preamble, no markdown fences.
"""
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"},
            temperature=0.2
        )
        data = json.loads(extract_json(response.choices[0].message.content))
        return AnalyzeUrlResponse(**data)
    except Exception as e:
        logger.error(f"URL analysis failed: {e}")
        return AnalyzeUrlResponse(threat_level="SUSPICIOUS", verdict="Analysis error.", attack_type="Error", domain_analysis=DomainAnalysis(domain="", subdomain_flags="", path_flags="", estimated_age=""), confidence_score=0, red_flags=[], what_to_do=["Try again."])

# --- Social Engineering Analysis ---
class SocialEngineeringTactic(BaseModel):
    name: str
    usage: str
    trigger: str

class AnalyzeScriptResponse(BaseModel):
    threat_level: str
    verdict: str
    attack_category: str
    attacker_goal: str
    psychological_trigger: str
    confidence_score: int
    tactics: list[SocialEngineeringTactic]
    what_to_do: list[str]

async def analyze_script(scenario_type: str, script: str) -> AnalyzeScriptResponse:
    if not groq_client:
        return AnalyzeScriptResponse(threat_level="SAFE", verdict="Offline.", attack_category="None", attacker_goal="None", psychological_trigger="Trust", confidence_score=0, tactics=[], what_to_do=[])

    prompt = f"""
You are an expert in social engineering and human manipulation tactics.
Scenario Type: {scenario_type}
Script/Message:
{script}

Analyze it for manipulation tactics, psychological triggers, and social engineering techniques.

Always respond ONLY in valid JSON matching this exact schema:
{{
  "threat_level": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
  "verdict": "one punchy sentence under 20 words",
  "attack_category": "type of social engineering attack",
  "attacker_goal": "what the attacker is trying to achieve",
  "psychological_trigger": "Fear" | "Greed" | "Trust" | "Urgency" | "Curiosity",
  "confidence_score": number 0-100,
  "tactics": [
    {{
      "name": "tactic name",
      "usage": "how it appears in this specific script",
      "trigger": "psychological vulnerability it exploits"
    }}
  ],
  "what_to_do": ["Step 1", "Step 2", "Step 3"]
}}

Rules:
- Reference specific lines or phrases from the script provided
- Identify at least 2 tactics if SUSPICIOUS or DANGEROUS
- If it looks like a normal, safe conversation, return SAFE honestly
- Return NO text outside the JSON. No preamble.
"""
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"},
            temperature=0.3
        )
        data = json.loads(extract_json(response.choices[0].message.content))
        return AnalyzeScriptResponse(**data)
    except Exception as e:
        logger.error(f"Script analysis failed: {e}")
        return AnalyzeScriptResponse(threat_level="SUSPICIOUS", verdict="Error.", attack_category="Error", attacker_goal="Unknown", psychological_trigger="Trust", confidence_score=0, tactics=[], what_to_do=[])

# --- Password Analysis ---
class PasswordVulnerability(BaseModel):
    pattern: str
    attack_vector: str
    risk_level: str

class AnalyzePasswordResponse(BaseModel):
    strength: str
    crack_time: str
    strength_score: int
    confidence_score: int
    vulnerabilities: list[PasswordVulnerability]
    what_makes_it: list[str]
    suggestions: list[str]

async def analyze_password(password: str) -> AnalyzePasswordResponse:
    if not groq_client:
        return AnalyzePasswordResponse(strength="WEAK", crack_time="Unknown", strength_score=0, confidence_score=0, vulnerabilities=[], what_makes_it=[], suggestions=[])

    prompt = f"""
You are an expert in password security and cryptographic attack techniques.
Analyze the following password for weaknesses: {password}

Always respond ONLY in valid JSON matching this exact schema:
{{
  "strength": "WEAK" | "MODERATE" | "STRONG" | "VERY STRONG",
  "crack_time": "human-readable estimated crack time",
  "strength_score": number 0-100,
  "confidence_score": number 0-100,
  "vulnerabilities": [
    {{
      "pattern": "detected pattern name",
      "attack_vector": "which attack exploits this",
      "risk_level": "LOW" | "MEDIUM" | "HIGH"
    }}
  ],
  "what_makes_it": ["specific observation 1", "specific observation 2"],
  "suggestions": ["specific actionable tip 1", "tip 2", "tip 3"]
}}

Rules:
- crack_time must reference modern GPU attack speeds
- Return NO text outside the JSON. No preamble.
"""
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"},
            temperature=0.1
        )
        data = json.loads(extract_json(response.choices[0].message.content))
        return AnalyzePasswordResponse(**data)
    except Exception as e:
        logger.error(f"Password analysis failed: {e}")
        return AnalyzePasswordResponse(strength="WEAK", crack_time="N/A", strength_score=0, confidence_score=0, vulnerabilities=[], what_makes_it=[], suggestions=[])

# --- QR Analysis ---
class AnalyzeQrResponse(BaseModel):
    threat_level: str
    verdict: str
    attack_type: str
    destination_category: str
    delivery_risk_note: str
    url_visibility_warning: str
    domain_analysis: DomainAnalysis
    confidence_score: int
    red_flags: list[EmailRedFlag]
    what_to_do: list[str]

async def analyze_qr(url: str) -> AnalyzeQrResponse:
    if not groq_client:
        return AnalyzeQrResponse(threat_level="SAFE", verdict="Offline.", attack_type="None", destination_category="Unknown", delivery_risk_note="", url_visibility_warning="", domain_analysis=DomainAnalysis(domain="", subdomain_flags="", path_flags="", estimated_age=""), confidence_score=0, red_flags=[], what_to_do=[])

    prompt = f"""
You are an expert cybersecurity analyst specializing in QR code phishing (Quishing) and QR-based social engineering attacks.
URL extracted from QR: {url}

Analyze the URL for phishing, malware, or any malicious indicators, keeping in mind the unique danger of QR codes: users cannot preview the destination before scanning.

Always respond ONLY in valid JSON matching this exact schema:
{{
  "threat_level": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
  "verdict": "one punchy sentence under 20 words",
  "attack_type": "specific QR attack technique or None",
  "destination_category": "what kind of page/resource this likely leads to",
  "delivery_risk_note": "one sentence on why QR delivery increases risk here",
  "url_visibility_warning": "one sentence on the hidden URL danger specific to this case",
  "domain_analysis": {{
    "domain": "extracted root domain",
    "subdomain_flags": "subdomain concerns or None",
    "path_flags": "path/query concerns or None",
    "estimated_age": "estimated domain age based on naming patterns"
  }},
  "confidence_score": number 0-100,
  "red_flags": [
    {{
      "label": "short flag name",
      "explanation": "why this is suspicious",
      "legitimate_version": "what a safe version looks like"
    }}
  ],
  "what_to_do": ["Step 1", "Step 2", "Step 3"]
}}

Rules:
- Highlight the unique danger of QR delivery vs a plain link
- Minimum 2 red_flags if SUSPICIOUS or DANGEROUS
- Return NO text outside the JSON.
"""
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"},
            temperature=0.2
        )
        data = json.loads(extract_json(response.choices[0].message.content))
        return AnalyzeQrResponse(**data)
    except Exception as e:
        logger.error(f"QR analysis failed: {e}")
        return AnalyzeQrResponse(threat_level="SUSPICIOUS", verdict="Error.", attack_type="Error", destination_category="Unknown", delivery_risk_note="", url_visibility_warning="", domain_analysis=DomainAnalysis(domain="", subdomain_flags="", path_flags="", estimated_age=""), confidence_score=0, red_flags=[], what_to_do=[])

# --- Webpage Analysis ---
class FakePageIndicators(BaseModel):
    visual_cloning: str
    form_action_analysis: str
    brand_impersonation: str
    ssl_misuse: str

class AnalyzeWebpageResponse(BaseModel):
    threat_level: str
    verdict: str
    attack_type: str
    impersonation_target: str
    fake_page_indicators: FakePageIndicators
    confidence_score: int
    red_flags: list[EmailRedFlag]
    what_to_do: list[str]

async def analyze_webpage(mode: str, content: str) -> AnalyzeWebpageResponse:
    if not groq_client:
        return AnalyzeWebpageResponse(threat_level="SAFE", verdict="Offline.", attack_type="None", impersonation_target="None", fake_page_indicators=FakePageIndicators(visual_cloning="", form_action_analysis="", brand_impersonation="", ssl_misuse=""), confidence_score=0, red_flags=[], what_to_do=[])

    prompt = f"""
You are an expert in detecting fake websites and credential harvesting pages.
Mode: {mode} (url or html source)
Content:
{content}

Analyze the provided content to determine if it is a fake/cloned login page.

Always respond ONLY in valid JSON matching this exact schema:
{{
  "threat_level": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
  "verdict": "one punchy sentence under 20 words",
  "attack_type": "specific attack technique name",
  "impersonation_target": "which brand/service is being impersonated or None",
  "fake_page_indicators": {{
    "visual_cloning": "assessment of visual cloning with specific evidence",
    "form_action_analysis": "where form data is sent and why it is suspicious",
    "brand_impersonation": "specific brand signals detected",
    "ssl_misuse": "SSL/HTTPS assessment"
  }},
  "confidence_score": number 0-100,
  "red_flags": [
    {{
      "label": "short flag name",
      "explanation": "why this is suspicious",
      "legitimate_version": "what the real page looks like"
    }}
  ],
  "what_to_do": ["Step 1", "Step 2", "Step 3"]
}}

Rules:
- SSL/HTTPS alone is NOT a safety indicator
- Minimum 2 red_flags if SUSPICIOUS or DANGEROUS
- Return NO text outside the JSON.
"""
    try:
        response = await groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
            response_format={"type": "json_object"},
            temperature=0.2
        )
        data = json.loads(extract_json(response.choices[0].message.content))
        return AnalyzeWebpageResponse(**data)
    except Exception as e:
        logger.error(f"Webpage analysis failed: {e}")
        return AnalyzeWebpageResponse(threat_level="SUSPICIOUS", verdict="Error.", attack_type="Error", impersonation_target="Unknown", fake_page_indicators=FakePageIndicators(visual_cloning="", form_action_analysis="", brand_impersonation="", ssl_misuse=""), confidence_score=0, red_flags=[], what_to_do=[])