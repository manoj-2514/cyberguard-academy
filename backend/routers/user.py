from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from backend.database import get_db
from backend.models import User, UserStats, ModuleProgress
from backend.schemas import UserStatsResponse, ModuleProgressResponse, ModuleProgressUpdate
from backend.routers.auth import get_current_user # I need to implement this
from datetime import datetime
from typing import List

router = APIRouter(prefix="/api", tags=["User Data"])

@router.get("/user/stats", response_model=UserStatsResponse)
async def get_user_stats(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(UserStats).where(UserStats.user_id == current_user.id))
    stats = result.scalar_one_or_none()
    
    if not stats:
        # Initialize stats if not present
        stats = UserStats(user_id=current_user.id)
        db.add(stats)
        await db.commit()
        await db.refresh(stats)
    
    return stats

@router.get("/user/progress", response_model=List[ModuleProgressResponse])
async def get_user_progress(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(ModuleProgress).where(ModuleProgress.user_id == current_user.id))
    return result.scalars().all()

@router.post("/modules/update-progress")
async def update_module_progress(
    data: ModuleProgressUpdate, 
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Update or Create progress
    result = await db.execute(
        select(ModuleProgress).where(
            ModuleProgress.user_id == current_user.id,
            ModuleProgress.module_name == data.module_name
        )
    )
    progress = result.scalar_one_or_none()
    
    if progress:
        progress.progress_percentage = data.progress_percentage
        progress.status = data.status
        progress.last_updated = datetime.now().isoformat()
    else:
        progress = ModuleProgress(
            user_id=current_user.id,
            module_name=data.module_name,
            progress_percentage=data.progress_percentage,
            status=data.status,
            last_updated=datetime.now().isoformat()
        )
        db.add(progress)
    
    # Update global stats if module completed
    if data.status == "completed":
        stats_result = await db.execute(select(UserStats).where(UserStats.user_id == current_user.id))
        stats = stats_result.scalar_one_or_none()
        if stats:
            stats.modules_completed += 1
            # In a real app, you'd calculate accuracy from AssessmentSession results
            # For now, we'll increment based on activity
            stats.threats_identified += 10 # Example value
        else:
            stats = UserStats(
                user_id=current_user.id,
                modules_completed=1,
                threats_identified=10
            )
            db.add(stats)

    await db.commit()
    return {"message": "Progress updated successfully"}
