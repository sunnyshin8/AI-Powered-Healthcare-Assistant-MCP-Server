import os
from fastapi import Request, HTTPException, status, Depends
from fastapi.security import OAuth2AuthorizationCodeBearer
from dotenv import load_dotenv

load_dotenv()

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl="https://auth.smarthealthit.org/authorize",
    tokenUrl="https://auth.smarthealthit.org/token"
)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    # TODO: Validate token with Descope/SMART on FHIR
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return token
