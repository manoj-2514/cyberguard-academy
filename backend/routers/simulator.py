from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from backend import ai_service
from backend.rate_limit import ai_rate_limiter

router = APIRouter(prefix="/api/simulator", tags=["Simulator"])

class AnalyzeEmailRequest(BaseModel):
    sender: str
    subject: str
    body: str

class AnalyzeUrlRequest(BaseModel):
    url: str

class AnalyzeScriptRequest(BaseModel):
    scenario_type: str
    script: str

class AnalyzePasswordRequest(BaseModel):
    password: str

class AnalyzeQrRequest(BaseModel):
    url: str

class AnalyzeWebpageRequest(BaseModel):
    mode: str
    content: str

@router.post("/analyze-email", dependencies=[Depends(ai_rate_limiter)])
async def analyze_email_endpoint(req: AnalyzeEmailRequest):
    if not req.body.strip():
        raise HTTPException(status_code=400, detail="Email body is required.")
    try:
        return await ai_service.analyze_email(sender=req.sender, subject=req.subject, body=req.body)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-url", dependencies=[Depends(ai_rate_limiter)])
async def analyze_url_endpoint(req: AnalyzeUrlRequest):
    if not req.url.strip():
        raise HTTPException(status_code=400, detail="URL is required.")
    try:
        return await ai_service.analyze_url(url=req.url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-script", dependencies=[Depends(ai_rate_limiter)])
async def analyze_script_endpoint(req: AnalyzeScriptRequest):
    if not req.script.strip():
        raise HTTPException(status_code=400, detail="Script is required.")
    try:
        return await ai_service.analyze_script(scenario_type=req.scenario_type, script=req.script)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-password", dependencies=[Depends(ai_rate_limiter)])
async def analyze_password_endpoint(req: AnalyzePasswordRequest):
    if not req.password.strip():
        raise HTTPException(status_code=400, detail="Password is required.")
    try:
        return await ai_service.analyze_password(password=req.password)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-qr", dependencies=[Depends(ai_rate_limiter)])
async def analyze_qr_endpoint(req: AnalyzeQrRequest):
    if not req.url.strip():
        raise HTTPException(status_code=400, detail="URL is required.")
    try:
        return await ai_service.analyze_qr(url=req.url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-webpage", dependencies=[Depends(ai_rate_limiter)])
async def analyze_webpage_endpoint(req: AnalyzeWebpageRequest):
    if not req.content.strip():
        raise HTTPException(status_code=400, detail="Content is required.")
    try:
        return await ai_service.analyze_webpage(mode=req.mode, content=req.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
