from pydantic import BaseModel, Field
from typing import List

class InteractionDetail(BaseModel):
    drug_a: str
    drug_b: str
    severity: str = Field(..., description="Severity level: minor, moderate, major")
    description: str

class MedicationInteraction(BaseModel):
    interactions: List[InteractionDetail]
    recommendations: List[str]
