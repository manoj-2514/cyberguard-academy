import sqlite3
import os

db_path = "phishing_v2.db"
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info(users)")
    columns = cursor.fetchall()
    print("Users columns:", [c[1] for c in columns])
    
    cursor.execute("PRAGMA table_info(assessment_sessions)")
    columns = cursor.fetchall()
    print("AssessmentSession columns:", [c[1] for c in columns])
    
    conn.close()
else:
    print("DB not found")
