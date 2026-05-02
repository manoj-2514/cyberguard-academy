import random
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models import Scenario, Question, AssessmentSession
from backend.static_data import get_static_scenarios

async def create_assessment_session(db: AsyncSession, user_id: str, module_name: str = "phishing") -> AssessmentSession:
    """
    Creates a session for a specific module with 7 questions following a structured topic progression.
    Ensures module isolation and exact count of 7. Uses ONLY static structured bank for stability.
    """
    print(f"[DEBUG] Starting structured session for module: {module_name} for user: {user_id}")

    question_ids = [] 
    for i in range(7):
        static_data = get_static_scenarios(module_name, i)
        
        # Module-specific query
        check = await db.execute(
            select(Question).where(
                Question.question_text == static_data["question"]["question_text"],
                Question.module == module_name
            )
        )
        existing_q = check.scalars().first()
        
        if existing_q:
            question_ids.append(existing_q.id)
        else:
            sc = Scenario(
                sender_email=static_data["sender_email"],
                subject=static_data["subject"],
                email_body=static_data["email_body"],
                difficulty=static_data["difficulty"],
                module=module_name,
                topic=static_data["topic"]
            )
            db.add(sc)
            await db.flush()
            q = Question(
                scenario_id=sc.id,
                question_text=static_data["question"]["question_text"],
                options=static_data["question"]["options"],
                correct_answer=static_data["question"]["correct_answer"],
                explanation=static_data["question"]["explanation"],
                module=module_name
            )
            db.add(q)
            await db.flush()
            question_ids.append(q.id)

    # Final Validation
    if len(question_ids) != 7:
        raise ValueError(f"CRITICAL: Failed to build a valid session for {module_name}. Questions found: {len(question_ids)}")

    # Create session
    from datetime import datetime
    session = AssessmentSession(
        user_id=user_id,
        questions_list=question_ids,
        current_question_index=0,
        score=0,
        module=module_name,
        created_at=datetime.now().isoformat()
    )

    db.add(session)
    await db.commit()
    await db.refresh(session)

    print(f"[DEBUG] Session {session.id} created successfully for {module_name}")
    return session