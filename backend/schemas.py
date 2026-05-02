from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict

# ==========================
# AUTH SCHEMAS
# ==========================

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: str
    is_active: bool
    preferences: Optional[Dict] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# ==========================
# ASSESSMENT SCHEMAS
# ==========================

class StartAssessmentRequest(BaseModel):
    module: str

class AssessmentSessionResponse(BaseModel):
    session_id: str
    message: str

class QuestionBase(BaseModel):
    id: str
    question_text: str
    options: Dict[str, str]

class ScenarioResponse(BaseModel):
    id: str
    sender_email: str
    subject: str
    email_body: str
    phishing_url: Optional[str] = None
    difficulty: str
    topic: str
    question: QuestionBase

class RedFlag(BaseModel):
    flag: str
    explanation: str

class ExplanationDetails(BaseModel):
    isPhishing: bool
    why: str
    redFlags: List[RedFlag]
    anatomy: Optional[List[str]] = None
    psychology: Optional[str] = None
    mistakes: Optional[List[str]] = None
    variations: Optional[List[str]] = None
    mindset: Optional[str] = None
    interacted: Optional[str] = None
    realWorldExample: str
    quickTip: str

class SubmitAnswerRequest(BaseModel):
    session_id: str
    question_id: str
    selected_option: str

class SubmitAnswerResponse(BaseModel):
    is_correct: bool
    correct_answer: str
    score: int
    explanation: ExplanationDetails
    next_question_available: bool

class ResultHistory(BaseModel):
    question_id: str
    is_correct: bool
    selected_option: str
    topic: str

class ResultResponse(BaseModel):
    score: int
    total_questions: int
    weak_areas: List[str]
    history: List[ResultHistory]

# ==========================
# CASE STUDY SCHEMAS
# ==========================

class CaseStudy(BaseModel):
    title: str
    organization: str
    attack_type: str
    what_happened: str
    attack_flow: List[str]
    impact: str
    key_mistake: str
    lessons_learned: str

# ==========================
# USER DATA SCHEMAS
# ==========================

class ModuleProgressResponse(BaseModel):
    id: str
    module_name: str
    progress_percentage: int
    status: str
    last_updated: Optional[str] = None

    class Config:
        from_attributes = True

class UserStatsResponse(BaseModel):
    modules_completed: int
    current_accuracy: int
    threats_identified: int

    class Config:
        from_attributes = True

class ModuleProgressUpdate(BaseModel):
    module_name: str
    progress_percentage: int
    status: str

# ==========================
# DASHBOARD SCHEMAS
# ==========================

class MilestoneProgress(BaseModel):
    completed_10_modules: bool
    earned_10_certificates: bool
    completed_15_modules: bool
    completed_20_modules: bool
    achieved_85_avg: bool

class DashboardModuleInfo(BaseModel):
    id: str
    title: str
    score: int

class DashboardStatsResponse(BaseModel):
    modules_completed: int
    certificates_earned: int
    overall_accuracy: int
    overall_pass_rate: int
    first_try_pass_rate: int
    milestone_progress: MilestoneProgress
    top_performer: Optional[DashboardModuleInfo] = None
    priority_area: Optional[DashboardModuleInfo] = None
    recent_activity: List[Dict] = []
