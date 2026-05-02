from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc, update
from backend.database import get_db
from backend.models import User, UserStats, ModuleProgress, AssessmentSession, UserAnswer
from backend.schemas import DashboardStatsResponse, MilestoneProgress, DashboardModuleInfo
from backend.routers.auth import get_current_user
from typing import List, Dict, Optional
from datetime import datetime

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=DashboardStatsResponse)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # 1. Fetch all assessment sessions for this user
    session_query = select(AssessmentSession).where(AssessmentSession.user_id == current_user.id).order_by(AssessmentSession.created_at)
    result = await db.execute(session_query)
    sessions = result.scalars().all()
    
    if not sessions:
        return DashboardStatsResponse(
            modules_completed=0,
            certificates_earned=0,
            overall_accuracy=0,
            overall_pass_rate=0,
            first_try_pass_rate=0,
            milestone_progress=MilestoneProgress(
                completed_10_modules=False,
                earned_10_certificates=False,
                completed_15_modules=False,
                completed_20_modules=False,
                achieved_85_avg=False
            ),
            recent_activity=[]
        )

    # Calculate module-wise best scores
    module_stats = {}
    for s in sessions:
        if s.module not in module_stats:
            module_stats[s.module] = {"best_score": 0, "attempts": [], "passed": False}
        module_stats[s.module]["best_score"] = max(module_stats[s.module]["best_score"], s.score)
        module_stats[s.module]["attempts"].append(s)
        if s.score >= 70:
            module_stats[s.module]["passed"] = True

    completed_modules = [m for m, stats in module_stats.items() if stats["passed"]]
    modules_completed_count = len(completed_modules)
    certificates_earned_count = len([m for m, stats in module_stats.items() if stats["best_score"] >= 90])
    
    all_best_scores = [stats["best_score"] for stats in module_stats.values()]
    overall_accuracy = sum(all_best_scores) // len(all_best_scores) if all_best_scores else 0

    # Overall Pass Rate = modules passed (score >= 70%) / total unique modules attempted
    unique_attempted = len(module_stats)
    overall_pass_rate = (modules_completed_count / unique_attempted * 100) if unique_attempted > 0 else 0

    # First-Try Pass Rate: (unique modules where first attempt >= 70) / (total unique attempted)
    first_try_passes = 0
    for m, stats in module_stats.items():
        if stats["attempts"] and stats["attempts"][0].score >= 70:
            first_try_passes += 1
    first_try_pass_rate = (first_try_passes / unique_attempted * 100) if unique_attempted > 0 else 0

    # Top Performer
    top_mod_id = max(module_stats, key=lambda x: module_stats[x]["best_score"]) if module_stats else None
    top_performer = DashboardModuleInfo(
        id=top_mod_id,
        title=top_mod_id.replace('-', ' ').title() if top_mod_id else "",
        score=module_stats[top_mod_id]["best_score"]
    ) if top_mod_id else None

    # Priority Area logic
    priority_area = None
    if modules_completed_count >= 2:
        # 1. Modules with scores < 75
        weak_modules = [(m, s["best_score"]) for m, s in module_stats.items() if s["passed"] and s["best_score"] < 75]
        if weak_modules:
            # Pick lowest scoring one
            lowest_mod = min(weak_modules, key=lambda x: x[1])
            priority_area = DashboardModuleInfo(
                id=lowest_mod[0],
                title=lowest_mod[0].replace('-', ' ').title(),
                score=lowest_mod[1]
            )
        else:
            # 2. All completed >= 75 -> module category with least progress (Mocked for now as we don't have categories in DB)
            # Find a non-completed module to recommend instead of repeating top performer
            uncompleted = [m for m in module_stats if not module_stats[m]["passed"]]
            if uncompleted:
                priority_area = DashboardModuleInfo(
                    id=uncompleted[0],
                    title=uncompleted[0].replace('-', ' ').title(),
                    score=module_stats[uncompleted[0]]["best_score"]
                )

    # Milestone Progress
    milestones = MilestoneProgress(
        completed_10_modules=modules_completed_count >= 10,
        earned_10_certificates=certificates_earned_count >= 10,
        completed_15_modules=modules_completed_count >= 15,
        completed_20_modules=modules_completed_count >= 20,
        achieved_85_avg=overall_accuracy >= 85
    )

    # Recent Activity (Option A for Backend - raw, but we'll return raw for Frontend to group)
    recent_activity = []
    for s in sessions[-15:]:
        recent_activity.append({
            "id": s.id,
            "date": s.created_at or datetime.now().isoformat(),
            "module": s.module.replace('-', ' ').title(),
            "score": s.score,
            "type": "completed" if s.score > 0 else "started"
        })

    return DashboardStatsResponse(
        modules_completed=modules_completed_count,
        certificates_earned=certificates_earned_count,
        overall_accuracy=overall_accuracy,
        overall_pass_rate=int(overall_pass_rate),
        first_try_pass_rate=int(first_try_pass_rate),
        milestone_progress=milestones,
        top_performer=top_performer,
        priority_area=priority_area,
        recent_activity=recent_activity
    )

@router.patch("/preferences")
async def update_preferences(
    prefs: Dict, 
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    user_prefs = current_user.preferences or {}
    user_prefs.update(prefs)
    
    await db.execute(
        update(User).where(User.id == current_user.id).values(preferences=user_prefs)
    )
    await db.commit()
    return {"status": "success", "preferences": user_prefs}
