from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, desc
from datetime import datetime, timedelta
from typing import List, Optional
from backend.database import get_db
from backend.models import User, AssessmentSession, UserAnswer
from backend.routers.auth import get_current_user, get_optional_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["Leaderboard"])

class LeaderboardEntry(BaseModel):
    rank: int
    user_id: str
    username: str
    score: int
    modules_completed: int
    best_module: str
    accuracy: int
    badges: List[str]
    last_active: str
    is_current_user: bool

class CurrentUserStats(BaseModel):
    rank: int
    score: int
    accuracy: int
    best_module: str
    percentile: int
    badges: List[str]

class LeaderboardResponse(BaseModel):
    mode: str
    total_players: int
    last_updated: str
    leaderboard: List[LeaderboardEntry]
    current_user_stats: Optional[CurrentUserStats]

# STATIC DEMO DATA
DEMO_DATA = [
    {"rank": 1, "username": "CyberHawk_99", "score": 9850, "modules_completed": 20, "best_module": "Phishing Detection", "accuracy": 98, "badges": ["🛡️", "🎯", "🔥", "👁️", "🏆", "🧠"], "last_active": "2 hours ago"},
    {"rank": 2, "username": "PhishSlayer", "score": 9200, "modules_completed": 20, "best_module": "Social Engineering", "accuracy": 94, "badges": ["🛡️", "🎯", "🔥", "👁️", "🏆"], "last_active": "5 hours ago"},
    {"rank": 3, "username": "ZeroTrust_X", "score": 8750, "modules_completed": 18, "best_module": "Malicious URL", "accuracy": 91, "badges": ["🛡️", "🎯", "🔥", "👁️"], "last_active": "1 day ago"},
    {"rank": 4, "username": "QuantumShield", "score": 8100, "modules_completed": 16, "best_module": "QR Code Analysis", "accuracy": 88, "badges": ["🛡️", "🔥", "👁️"], "last_active": "1 day ago"},
    {"rank": 5, "username": "VaultBreaker", "score": 7650, "modules_completed": 14, "best_module": "Password Security", "accuracy": 85, "badges": ["🛡️", "🎯"], "last_active": "2 days ago"},
    {"rank": 6, "username": "DarkPatrol", "score": 7200, "modules_completed": 12, "best_module": "Fake Website Detection", "accuracy": 83, "badges": ["🛡️", "🔥"], "last_active": "3 days ago"},
    {"rank": 7, "username": "SecureNova", "score": 6800, "modules_completed": 10, "best_module": "Phishing Detection", "accuracy": 80, "badges": ["🛡️"], "last_active": "3 days ago"},
    {"rank": 8, "username": "NullPointer_", "score": 6100, "modules_completed": 8, "best_module": "Social Engineering", "accuracy": 77, "badges": ["🛡️"], "last_active": "5 days ago"},
    {"rank": 9, "username": "ByteWarden", "score": 5500, "modules_completed": 5, "best_module": "Password Security", "accuracy": 74, "badges": ["🛡️"], "last_active": "1 week ago"},
    {"rank": 10, "username": "IronVeil", "score": 4900, "modules_completed": 3, "best_module": "Malicious URL", "accuracy": 70, "badges": ["🛡️"], "last_active": "1 week ago"}
]

@router.get("/leaderboard", response_model=LeaderboardResponse)
async def get_leaderboard(
    time_filter: str = Query("all", regex="^(all|month|week)$"),
    module_filter: str = Query("all"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    # 1. Count real users with scores
    user_count_result = await db.execute(select(func.count(func.distinct(AssessmentSession.user_id))))
    real_user_count = user_count_result.scalar() or 0

    # 2. Mode Detection
    # If user is logged in, we always try to show live data (even if empty).
    # Only fallback to demo for guests when the database is empty.
    if not current_user and real_user_count == 0:
        return LeaderboardResponse(
            mode="demo",
            total_players=0,
            last_updated=datetime.now().isoformat(),
            leaderboard=[LeaderboardEntry(**{**d, "user_id": "demo", "is_current_user": False}) for d in DEMO_DATA],
            current_user_stats=None
        )

    # 3. LIVE MODE LOGIC
    # This is simplified for the demo but follows the rules.
    # In a real app, we'd pre-aggregate these stats.
    
    # Base query for scores
    query = select(
        User.id,
        User.name,
        func.sum(AssessmentSession.score).label("total_score"),
        func.count(func.distinct(AssessmentSession.module)).label("modules_completed"),
        func.max(AssessmentSession.module).label("best_module") # Simplified "best"
    ).join(AssessmentSession, User.id == AssessmentSession.user_id).group_by(User.id)

    # Apply filters (Simplified)
    if module_filter != "all":
        query = query.where(AssessmentSession.module == module_filter)

    # Ordering
    query = query.order_by(desc("total_score"))
    
    result = await db.execute(query)
    all_users = result.all()
    
    # Pre-calculate accuracy for all users in one query (N+1 Fix)
    acc_result = await db.execute(
        select(
            AssessmentSession.user_id,
            func.count(UserAnswer.id).label("total"),
            func.sum(func.cast(UserAnswer.is_correct, func.Integer)).label("correct")
        ).join(UserAnswer, UserAnswer.session_id == AssessmentSession.id)
        .group_by(AssessmentSession.user_id)
    )
    acc_map = {row.user_id: {"total": row.total, "correct": row.correct} for row in acc_result.all()}
    
    leaderboard_entries = []
    current_user_stats = None
    
    for idx, row in enumerate(all_users):
        user_id, name, total_score, modules_done, best_mod = row
        rank = idx + 1
        
        # Calculate accuracy for this user (O(1) lookup)
        user_acc = acc_map.get(user_id, {"total": 1, "correct": 0})
        total_ans = user_acc["total"] or 1
        correct_ans = user_acc["correct"] or 0
        accuracy = int((correct_ans / total_ans) * 100)
        
        # Badge Logic (Simplified for this pass)
        badges = []
        if modules_done >= 1: badges.append("🛡️")
        if accuracy == 100: badges.append("🎯")
        if modules_done >= 3: badges.append("🔥")
        if correct_ans >= 10: badges.append("👁️")
        if modules_done >= 6: badges.append("🏆")
        if accuracy >= 90 and modules_done >= 3: badges.append("🧠")

        entry = LeaderboardEntry(
            rank=rank,
            user_id=user_id,
            username=name,
            score=int(total_score),
            modules_completed=int(modules_done),
            best_module=str(best_mod).title(),
            accuracy=accuracy,
            badges=badges,
            last_active="Just now",
            is_current_user=(current_user and user_id == current_user.id)
        )
        
        leaderboard_entries.append(entry)
        
        if current_user and user_id == current_user.id:
            percentile = int((1 - (rank / len(all_users))) * 100) if len(all_users) > 0 else 0
            current_user_stats = CurrentUserStats(
                rank=rank,
                score=int(total_score),
                accuracy=accuracy,
                best_module=str(best_mod).title(),
                percentile=percentile,
                badges=badges
            )

    # Pagination
    start = (page - 1) * limit
    end = start + limit
    paginated_entries = leaderboard_entries[start:end]

    return LeaderboardResponse(
        mode="live",
        total_players=len(all_users),
        last_updated=datetime.now().isoformat(),
        leaderboard=paginated_entries,
        current_user_stats=current_user_stats
    )
