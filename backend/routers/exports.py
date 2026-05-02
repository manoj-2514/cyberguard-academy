import io
import csv
import zipfile
import sys
import subprocess
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

try:
    from fpdf import FPDF
except ImportError:
    print("fpdf2 not found. Auto-installing...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2"])
    from fpdf import FPDF

from backend.database import get_db
from backend.models import User, AssessmentSession
from backend.routers.auth import get_current_user
from backend.rate_limit import export_rate_limiter

router = APIRouter(prefix="/api/dashboard/export", tags=["Exports"])

class CyberGuardPDF(FPDF):
    def header(self):
        self.set_font("helvetica", "B", 20)
        self.set_text_color(37, 99, 235) # blue-600
        self.cell(0, 10, "CyberGuard Academy", ln=True, align="C")
        self.set_font("helvetica", "I", 10)
        self.set_text_color(100, 116, 139) # slate-500
        self.cell(0, 10, "Building Digital Resilience, One Simulation at a Time", ln=True, align="C")
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font("helvetica", "I", 8)
        self.set_text_color(148, 163, 184) # slate-400
        self.cell(0, 10, f"Page {self.page_no()} | Official CyberGuard Academy Record | Issued {datetime.now().strftime('%Y-%m-%d')}", align="C")

@router.get("/progress-report", dependencies=[Depends(export_rate_limiter)])
async def export_progress_report(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    try:
        # Fetch sessions
        result = await db.execute(select(AssessmentSession).where(AssessmentSession.user_id == current_user.id))
        sessions = result.scalars().all()
        
        pdf = CyberGuardPDF()
        pdf.add_page()
        
        # Title
        pdf.set_font("helvetica", "B", 16)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(0, 15, "PERSONAL PROGRESS REPORT", ln=True, align="L")
        
        # User Details
        pdf.set_font("helvetica", "B", 12)
        pdf.cell(40, 10, "Student Name:", 0)
        pdf.set_font("helvetica", "", 12)
        pdf.cell(0, 10, str(current_user.name), ln=True)
        
        pdf.set_font("helvetica", "B", 12)
        pdf.cell(40, 10, "Email:", 0)
        pdf.set_font("helvetica", "", 12)
        pdf.cell(0, 10, str(current_user.email), ln=True)
        
        pdf.ln(10)
        
        # Summary Stats
        completed = len(set(s.module for s in sessions if s.score >= 70))
        avg_score = sum(s.score for s in sessions) / len(sessions) if sessions else 0
        
        pdf.set_fill_color(248, 250, 252)
        pdf.set_font("helvetica", "B", 12)
        pdf.cell(0, 10, "Performance Summary", 1, ln=True, fill=True)
        pdf.set_font("helvetica", "", 11)
        pdf.cell(95, 10, f"Modules Passed: {completed}/20", 1)
        pdf.cell(95, 10, f"Average Score: {avg_score:.1f}%", 1, ln=True)
        
        pdf.ln(10)
        
        # Table Header
        pdf.set_font("helvetica", "B", 11)
        pdf.set_fill_color(241, 245, 249)
        pdf.cell(80, 10, "Module", 1, 0, "C", True)
        pdf.cell(40, 10, "Status", 1, 0, "C", True)
        pdf.cell(30, 10, "Best Score", 1, 0, "C", True)
        pdf.cell(40, 10, "Last Attempt", 1, 1, "C", True)
        
        # Table Body
        pdf.set_font("helvetica", "", 10)
        module_stats = {}
        for s in sessions:
            if s.module not in module_stats:
                module_stats[s.module] = {"best": 0, "last": "", "passed": False}
            module_stats[s.module]["best"] = max(module_stats[s.module]["best"], s.score)
            module_stats[s.module]["last"] = s.created_at[:10] if s.created_at else "N/A"
            if s.score >= 70: module_stats[s.module]["passed"] = True
            
        for mod, data in module_stats.items():
            pdf.cell(80, 10, str(mod).replace('-', ' ').title(), 1)
            status = "Passed" if data["passed"] else "In Progress"
            pdf.cell(40, 10, status, 1, 0, "C")
            pdf.cell(30, 10, f"{data['best']}%", 1, 0, "C")
            pdf.cell(40, 10, data["last"], 1, 1, "C")

        # Handle different fpdf versions output
        pdf_out = pdf.output(dest='S')
        if isinstance(pdf_out, str):
            pdf_bytes = pdf_out.encode('latin1')
        else:
            pdf_bytes = bytes(pdf_out)

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=CyberGuard_Report_{current_user.id}.pdf"
            }
        )
    except Exception as e:
        import traceback
        with open("error.log", "w") as f:
            f.write(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/certificates", dependencies=[Depends(export_rate_limiter)])
async def export_certificates(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(AssessmentSession).where(AssessmentSession.user_id == current_user.id))
        sessions = result.scalars().all()
        
        passed_modules = {}
        for s in sessions:
            if s.score >= 70:
                if s.module not in passed_modules or s.score > passed_modules[s.module].score:
                    passed_modules[s.module] = s
                    
        if not passed_modules:
            raise HTTPException(status_code=400, detail="No certificates earned yet.")

        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w") as zf:
            for mod, session in passed_modules.items():
                pdf = FPDF(orientation="landscape", format="A4")
                pdf.add_page()
                # Certificate Design
                pdf.set_draw_color(37, 99, 235)
                pdf.set_line_width(5)
                pdf.rect(10, 10, 277, 190)
                
                pdf.set_y(40)
                pdf.set_font("helvetica", "B", 36)
                pdf.cell(0, 20, "CERTIFICATE", ln=True, align="C")
                pdf.set_font("helvetica", "", 16)
                pdf.cell(0, 10, "OF COMPLETION", ln=True, align="C")
                
                pdf.ln(20)
                pdf.set_font("helvetica", "", 14)
                pdf.cell(0, 10, "This is to certify that", ln=True, align="C")
                pdf.set_font("helvetica", "B", 24)
                pdf.cell(0, 20, str(current_user.name), ln=True, align="C")
                
                pdf.set_font("helvetica", "", 14)
                pdf.cell(0, 10, "has successfully completed the simulation module", ln=True, align="C")
                pdf.set_font("helvetica", "B", 20)
                pdf.cell(0, 15, str(mod).replace('-', ' ').title(), ln=True, align="C")
                
                pdf.ln(10)
                pdf.set_font("helvetica", "", 12)
                pdf.cell(0, 10, f"Achieved with a score of {session.score}%", ln=True, align="C")
                pdf.cell(0, 10, f"Issued on {session.created_at[:10] if session.created_at else datetime.now().strftime('%Y-%m-%d')}", ln=True, align="C")
                
                pdf.set_y(160)
                pdf.set_font("helvetica", "I", 10)
                cert_id = f"CGA-{current_user.id[:4]}-{str(mod)[:3].upper()}-{datetime.now().year}"
                pdf.cell(0, 10, f"Certificate ID: {cert_id}", align="C")
                
                pdf_out = pdf.output(dest='S')
                pdf_bytes = pdf_out.encode('latin1') if isinstance(pdf_out, str) else bytes(pdf_out)
                zf.writestr(f"Certificate_{mod}.pdf", pdf_bytes)

        zip_buffer.seek(0)
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={
                "Content-Disposition": f"attachment; filename=CyberGuard_Certificates_{current_user.id}.zip"
            }
        )
    except Exception as e:
        import traceback
        with open("error_cert.log", "w") as f:
            f.write(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/transcript", dependencies=[Depends(export_rate_limiter)])
async def export_transcript(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(AssessmentSession).where(AssessmentSession.user_id == current_user.id))
        sessions = result.scalars().all()
        
        pdf = CyberGuardPDF()
        pdf.add_page()
        
        pdf.set_font("helvetica", "B", 18)
        pdf.cell(0, 10, "OFFICIAL ACADEMIC TRANSCRIPT", ln=True, align="C")
        pdf.ln(5)
        
        # Official info
        pdf.set_font("helvetica", "", 10)
        pdf.cell(0, 5, f"Transcript ID: TRS-{current_user.id[:8].upper()}", ln=True, align="R")
        pdf.cell(0, 5, f"Date of Issue: {datetime.now().strftime('%Y-%m-%d')}", ln=True, align="R")
        
        pdf.ln(10)
        pdf.set_font("helvetica", "B", 12)
        pdf.cell(0, 10, "Student Information", ln=True)
        pdf.set_font("helvetica", "", 11)
        pdf.cell(0, 7, f"Name: {str(current_user.name)}", ln=True)
        pdf.cell(0, 7, f"Student ID: {current_user.id}", ln=True)
        pdf.cell(0, 7, f"Institutional Email: {str(current_user.email)}", ln=True)
        
        pdf.ln(10)
        
        # Table Header
        pdf.set_font("helvetica", "B", 10)
        pdf.set_fill_color(226, 232, 240)
        pdf.cell(10, 10, "#", 1, 0, "C", True)
        pdf.cell(90, 10, "Module Description", 1, 0, "L", True)
        pdf.cell(30, 10, "Attempts", 1, 0, "C", True)
        pdf.cell(30, 10, "Grade", 1, 0, "C", True)
        pdf.cell(30, 10, "Result", 1, 1, "C", True)
        
        # Body
        mod_data = {}
        for s in sessions:
            if s.module not in mod_data:
                mod_data[s.module] = {"attempts": 0, "best": 0}
            mod_data[s.module]["attempts"] += 1
            mod_data[s.module]["best"] = max(mod_data[s.module]["best"], s.score)
            
        for i, (mod, data) in enumerate(mod_data.items(), 1):
            pdf.cell(10, 8, str(i), 1, 0, "C")
            pdf.cell(90, 8, str(mod).replace('-', ' ').title(), 1)
            pdf.cell(30, 8, str(data["attempts"]), 1, 0, "C")
            pdf.cell(30, 8, f"{data['best']}%", 1, 0, "C")
            res = "PASS" if data["best"] >= 70 else "FAIL"
            pdf.cell(30, 8, res, 1, 1, "C")
            
        pdf.ln(15)
        pdf.set_font("helvetica", "B", 12)
        avg_gpa = sum(d["best"] for d in mod_data.values()) / len(mod_data) if mod_data else 0
        pdf.cell(0, 10, f"Cumulative Performance Grade: {avg_gpa:.1f}%", ln=True)
        
        pdf.ln(20)
        pdf.set_font("helvetica", "I", 9)
        pdf.multi_cell(0, 5, "This document is a certified digital record from CyberGuard Academy. Verification of this transcript can be performed via our secure portal using the Transcript ID provided above.")

        pdf_out = pdf.output(dest='S')
        pdf_bytes = pdf_out.encode('latin1') if isinstance(pdf_out, str) else bytes(pdf_out)

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=CyberGuard_Transcript_{current_user.id}.pdf"
            }
        )
    except Exception as e:
        import traceback
        with open("error_transcript.log", "w") as f:
            f.write(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/data", dependencies=[Depends(export_rate_limiter)])
async def export_data(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AssessmentSession).where(AssessmentSession.user_id == current_user.id))
    sessions = result.scalars().all()
    
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=[
        "session_id", "module", "score", "status", "created_at"
    ])
    writer.writeheader()
    for s in sessions:
        writer.writerow({
            "session_id": s.id,
            "module": s.module,
            "score": s.score,
            "status": "passed" if s.score >= 70 else "failed",
            "created_at": s.created_at or ""
        })
    
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=CyberGuard_Data_{current_user.id}.csv"
        }
    )
