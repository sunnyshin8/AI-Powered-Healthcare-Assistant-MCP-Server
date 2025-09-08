from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, Response
from .audit import log_access

class SecurityMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Example: log all access for HIPAA
        user = request.headers.get("Authorization", "anonymous")
        log_access(user, request.method, request.url.path)
        response: Response = await call_next(request)
        # Add additional security checks here
        return response
