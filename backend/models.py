from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
import uuid
from backend.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Scenario(Base):
    __tablename__ = "scenarios"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    sender_email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    email_body = Column(String, nullable=False)
    phishing_url = Column(String, nullable=True)
    difficulty = Column(String, nullable=False) # 'easy', 'medium', 'hard'
    topic = Column(String, nullable=False) # 'phishing_email', 'url_detection', 'attachment', 'domain_spoofing'
    module = Column(String, nullable=False, default="phishing")
    
    questions = relationship("Question", back_populates="scenario")

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    scenario_id = Column(String, ForeignKey("scenarios.id"))
    question_text = Column(String, nullable=False)
    options = Column(JSON, nullable=False) # e.g. {"A": "...", "B": "...", "C": "...", "D": "..."}
    correct_answer = Column(String, nullable=False) # e.g. "A"
    explanation = Column(String, nullable=False)
    module = Column(String, nullable=False, default="phishing")
    ai_explanation = Column(JSON, nullable=True) # Cached AI response
    
    scenario = relationship("Scenario", back_populates="questions")

class AssessmentSession(Base):
    __tablename__ = "assessment_sessions"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=True) # Linked to user
    current_question_index = Column(Integer, default=0)
    questions_list = Column(JSON, nullable=False) # list of 7 Question IDs
    score = Column(Integer, default=0)
    module = Column(String, nullable=False, default="phishing")
    created_at = Column(String, nullable=True)

class UserAnswer(Base):
    __tablename__ = "user_answers"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    session_id = Column(String, ForeignKey("assessment_sessions.id"))
    question_id = Column(String, ForeignKey("questions.id"))
    selected_option = Column(String, nullable=False)
    is_correct = Column(Boolean, nullable=False)
    topic = Column(String, nullable=False)
    ai_feedback = Column(String, nullable=True)
    feedback_type = Column(String, nullable=True) # 'mistake', 'improvement', 'warning'

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(String, nullable=True)
    preferences = Column(JSON, nullable=True, default=lambda: {"dark_mode": False})
    
    # Relationships
    stats = relationship("UserStats", back_populates="user", uselist=False)
    progress = relationship("ModuleProgress", back_populates="user")

class ModuleProgress(Base):
    __tablename__ = "module_progress"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"))
    module_name = Column(String, nullable=False)
    progress_percentage = Column(Integer, default=0)
    status = Column(String, default="in-progress") # 'completed', 'in-progress'
    last_updated = Column(String, nullable=True)
    
    user = relationship("User", back_populates="progress")

class UserStats(Base):
    __tablename__ = "user_stats"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"))
    modules_completed = Column(Integer, default=0)
    current_accuracy = Column(Integer, default=0)
    threats_identified = Column(Integer, default=0)
    
    user = relationship("User", back_populates="stats")
