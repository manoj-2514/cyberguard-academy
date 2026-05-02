from fastapi import APIRouter, HTTPException, Depends
from backend.schemas import CaseStudy
from backend.ai_service import generate_case_study
from backend.routers.auth import get_current_user
from backend.models import User

router = APIRouter(prefix="/case-study", tags=["Case Study"])

@router.get("/{topic}", response_model=CaseStudy)
async def get_case_study(
    topic: str,
    current_user: User = Depends(get_current_user)
):
    """
    Fetch a detailed case study for a given topic.
    Generates via AI if not available in static cache.
    Requires authentication.
    """
    try:
        case_study = await generate_case_study(topic)
        return case_study
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
