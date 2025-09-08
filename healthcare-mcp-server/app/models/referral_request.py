from pydantic import BaseModel, Field
from typing import Optional

class ReferralRequest(BaseModel):
    patient_id: str
    referring_provider: str
    specialist_provider: str
    reason: str
    status: Optional[str]
    follow_up_required: Optional[bool]
    # HIPAA: Validate and protect all PHI fields
