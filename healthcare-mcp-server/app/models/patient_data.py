from pydantic import BaseModel, Field, constr
from typing import List, Optional

class Condition(BaseModel):
    code: str = Field(..., description="FHIR Condition code")
    description: str

class Medication(BaseModel):
    code: str = Field(..., description="FHIR Medication code")
    name: str
    dosage: Optional[str]

class Allergy(BaseModel):
    code: str = Field(..., description="FHIR Allergy code")
    substance: str
    reaction: Optional[str]

class PatientData(BaseModel):
    id: constr(min_length=1)
    name: str
    birth_date: str
    gender: str
    conditions: List[Condition]
    medications: List[Medication]
    allergies: List[Allergy]
    # HIPAA: All PHI fields must be validated and encrypted at rest
