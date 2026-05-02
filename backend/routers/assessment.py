from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend import schemas, models, crud, ai_service
from backend.database import get_db
from backend.routers.auth import get_current_user

router = APIRouter(tags=["Assessment"])

@router.post("/api/start-assessment", response_model=schemas.AssessmentSessionResponse)
async def start_assessment(
    req: schemas.StartAssessmentRequest, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Initialize a new assessment session."""
    session = await crud.create_assessment_session(db, user_id=current_user.id, module_name=req.module)
    return schemas.AssessmentSessionResponse(
        session_id=session.id,
        message=f"Assessment for {req.module} started successfully."
    )

@router.get("/api/scenario/{session_id}", response_model=schemas.ScenarioResponse)
async def get_scenario(
    session_id: str, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Returns the question at current_question_index. Does NOT reshuffle."""
    result = await db.execute(
        select(models.AssessmentSession).where(models.AssessmentSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    if session.current_question_index >= len(session.questions_list):
        raise HTTPException(status_code=400, detail="Assessment already completed")
        
    q_id = session.questions_list[session.current_question_index]
    
    q_result = await db.execute(
        select(models.Question).where(
            models.Question.id == q_id,
            models.Question.module == session.module
        )
    )
    question = q_result.scalar_one_or_none()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found in this module")
    
    s_result = await db.execute(
        select(models.Scenario).where(
            models.Scenario.id == question.scenario_id,
            models.Scenario.module == session.module
        )
    )
    scenario = s_result.scalar_one_or_none()
    
    return schemas.ScenarioResponse(
        id=scenario.id,
        sender_email=scenario.sender_email,
        subject=scenario.subject,
        email_body=scenario.email_body,
        phishing_url=scenario.phishing_url,
        difficulty=scenario.difficulty,
        topic=scenario.topic,
        question=schemas.QuestionBase(
            id=question.id,
            question_text=question.question_text,
            options=question.options
        )
    )

@router.post("/api/submit-answer", response_model=schemas.SubmitAnswerResponse)
async def submit_answer(
    req: schemas.SubmitAnswerRequest, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Validates answer, handles strict caching, and increments index."""
    result = await db.execute(select(models.AssessmentSession).where(models.AssessmentSession.id == req.session_id))
    session = result.scalar_one_or_none()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    q_result = await db.execute(
        select(models.Question).where(
            models.Question.id == req.question_id,
            models.Question.module == session.module
        )
    )
    question = q_result.scalar_one_or_none()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
        
    s_result = await db.execute(
        select(models.Scenario).where(
            models.Scenario.id == question.scenario_id,
            models.Scenario.module == session.module
        )
    )
    scenario = s_result.scalar_one_or_none()
        
    is_correct = (req.selected_option.upper() == question.correct_answer.upper())
    
    if False and question.ai_explanation: # Always generate fresh feedback for testing
        explanation_data = question.ai_explanation
    else:
        scenario_content = f"Subject: {scenario.subject}\nSender: {scenario.sender_email}\nBody: {scenario.email_body}"
        user_answer_text = question.options.get(req.selected_option, req.selected_option)
        correct_answer_text = question.options.get(question.correct_answer, question.correct_answer)
        
        explanation_details = await ai_service.generate_feedback(
            module_name=session.module,
            scenario_content=scenario_content,
            question_text=question.question_text,
            user_answer=user_answer_text,
            correct_answer=correct_answer_text,
            explanation=question.explanation,
            is_correct=is_correct,
            topic=scenario.topic
        )
        
        explanation_data = {
            "isPhishing": explanation_details.isPhishing,
            "why": explanation_details.why,
            "redFlags": [rf.dict() for rf in explanation_details.redFlags],
            "anatomy": explanation_details.anatomy,
            "psychology": explanation_details.psychology,
            "mistakes": explanation_details.mistakes,
            "variations": explanation_details.variations,
            "mindset": explanation_details.mindset,
            "realWorldExample": explanation_details.realWorldExample,
            "quickTip": explanation_details.quickTip
        }
        
        question.ai_explanation = explanation_data
        db.add(question)
    
    final_explanation = explanation_data.copy()
    if is_correct:
        final_explanation["redFlags"] = []
        if not final_explanation["why"].startswith("Correct!"):
            final_explanation["why"] = f"Correct! {final_explanation['why']}"

    db.add(models.UserAnswer(
        session_id=session.id,
        question_id=question.id,
        selected_option=req.selected_option,
        is_correct=is_correct,
        topic=scenario.topic,
        ai_feedback=final_explanation["why"],
        feedback_type="improvement" if not is_correct else "correct"
    ))
    
    if is_correct:
        session.score += 10        
    session.current_question_index += 1
    db.add(session)
    
    await db.commit()
    await db.refresh(session)
    
    return schemas.SubmitAnswerResponse(
        is_correct=is_correct,
        correct_answer=question.correct_answer,
        score=session.score,
        explanation=schemas.ExplanationDetails(**final_explanation),
        next_question_available=(session.current_question_index < len(session.questions_list))
    )

@router.get("/api/results", response_model=schemas.ResultResponse)
async def get_results(
    session_id: str, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Returns final results."""
    result = await db.execute(select(models.AssessmentSession).where(models.AssessmentSession.id == session_id))
    session = result.scalar_one_or_none()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    ans_result = await db.execute(select(models.UserAnswer).where(models.UserAnswer.session_id == session.id))
    answers = ans_result.scalars().all()
    
    history = []
    weak_areas_set = set()
    
    for ans in answers:
        history.append({
            "question_id": ans.question_id,
            "is_correct": ans.is_correct,
            "selected_option": ans.selected_option,
            "topic": ans.topic
        })
        if not ans.is_correct:
            weak_areas_set.add(ans.topic)
            
    return schemas.ResultResponse(
        score=session.score,
        total_questions=len(session.questions_list),
        weak_areas=list(weak_areas_set),
        history=history
    )
