from pydantic import BaseModel, Field
from typing import Optional

class InsuranceEligibility(BaseModel):
    patient_id: str
    insurance_id: str
    eligible: bool
    plan_name: Optional[str]
    coverage_details: Optional[str]
    copay: Optional[float]
    deductible: Optional[float]
    # HIPAA: Validate and protect all PHI fields
