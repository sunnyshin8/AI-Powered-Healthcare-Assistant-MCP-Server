from fastapi import APIRouter, Depends, HTTPException, status
from app.models.insurance_eligibility import InsuranceEligibility
from app.services.mcp_tools import verify_insurance_eligibility

router = APIRouter(prefix="/insurance", tags=["Insurance"])

@router.post("/verify", response_model=dict)
async def verify_insurance_eligibility_endpoint(patient_id: str, insurance_info: dict):
    """Verify insurance eligibility for a patient"""
    # Simulate insurance verification
    return {
        "patient_id": patient_id,
        "eligible": True,
        "plan_name": "Blue Cross Blue Shield Premium",
        "member_id": "BC123456789",
        "group_number": "GRP-001",
        "effective_date": "2024-01-01",
        "expiration_date": "2024-12-31",
        "copay_primary": "$25",
        "copay_specialist": "$50",
        "deductible_remaining": "$500",
        "out_of_pocket_max": "$2000",
        "coverage_details": {
            "preventive_care": "100% covered",
            "emergency_room": "80% after deductible",
            "prescription_drugs": "Generic $10, Brand $35"
        },
        "verified_at": "2024-12-15T10:30:00Z"
    }

@router.post("/", response_model=InsuranceEligibility, tags=["Insurance"])
async def insurance_eligibility_endpoint(request: dict):
    """Advanced insurance eligibility verification with FHIR compliance"""
    # TODO: Add authentication, validation, and call verify_insurance_eligibility
    return await verify_insurance_eligibility(**request)
