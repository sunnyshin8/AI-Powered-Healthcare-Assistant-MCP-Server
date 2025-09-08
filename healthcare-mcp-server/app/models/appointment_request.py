from pydantic import BaseModel, Field
from typing import Optional, Annotated

class AppointmentRequest(BaseModel):
    patient_id: Annotated[str, Field(min_length=1)]
    provider_id: Annotated[str, Field(min_length=1)]
    appointment_time: str = Field(..., description="ISO 8601 datetime")
    reason: Optional[str]
    location: Optional[str]
    # HIPAA: Validate all PHI fields
