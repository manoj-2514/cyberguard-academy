import time
from fastapi import Request, HTTPException

# Simple in-memory rate limiter stores: { "ip:bucket": [timestamps] }
RATE_LIMIT_STORE = {}

class RateLimiter:
    def __init__(self, limit: int, window: int = 60):
        self.limit = limit
        self.window = window
        self.bucket_id = f"{limit}_{window}"

    async def __call__(self, request: Request):
        client_ip = request.client.host if request.client else "127.0.0.1"
        key = f"{client_ip}:{self.bucket_id}"
        now = time.time()
        
        if key not in RATE_LIMIT_STORE:
            RATE_LIMIT_STORE[key] = []
            
        # Clean up old requests
        RATE_LIMIT_STORE[key] = [t for t in RATE_LIMIT_STORE[key] if now - t < self.window]
        
        if len(RATE_LIMIT_STORE[key]) >= self.limit:
            raise HTTPException(
                status_code=429, 
                detail=f"Rate limit exceeded. Please wait before trying again."
            )
            
        RATE_LIMIT_STORE[key].append(now)

# Create pre-configured dependency instances
ai_rate_limiter = RateLimiter(limit=15, window=60)
export_rate_limiter = RateLimiter(limit=5, window=60)
