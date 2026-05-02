from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Any
from backend import ai_service
from backend.routers.auth import get_current_user
from backend.rate_limit import ai_rate_limiter

router = APIRouter(prefix="/api/ai", tags=["AI"])

class ErrorAnalysisRequest(BaseModel):
    question: str
    scenario: dict
    userAnswer: Any
    type: str
    isCorrect: bool

@router.post("/analyze-error", dependencies=[Depends(ai_rate_limiter)])
async def analyze_error_endpoint(
    req: ErrorAnalysisRequest,
    current_user: Any = Depends(get_current_user)
):
    try:
        analysis = await ai_service.analyze_error(
            question_text=req.question,
            scenario=req.scenario,
            user_answer=req.userAnswer,
            question_type=req.type,
            is_correct=req.isCorrect
        )
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
