from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from backend import models
from backend.database import engine
from backend.routers import assessment, case_study, auth, user, ai_analysis, simulator, leaderboard, dashboard, exports

app = FastAPI(title="Phishing Email Detection Training API")

# ... (Middleware stays same) ...
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # Ensure database tables are created when the server starts
    from backend.database import engine, Base
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(assessment.router)
app.include_router(case_study.router, prefix="/api")
app.include_router(ai_analysis.router)
app.include_router(simulator.router)
app.include_router(leaderboard.router)
app.include_router(dashboard.router)
app.include_router(exports.router)
