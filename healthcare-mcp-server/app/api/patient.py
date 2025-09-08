from fastapi import APIRouter, Depends, HTTPException, status
from app.models.patient_data import PatientData
from app.services.mcp_tools import get_patient_data

router = APIRouter(prefix="/patient", tags=["Patient"])

@router.get("/{patient_id}", response_model=dict)
async def get_patient_data_endpoint(patient_id: str):
    """Get patient data by ID"""
    # Simulate patient data response
    return {
        "patient_id": patient_id,
        "name": "John Doe",
        "age": 45,
        "gender": "Male",
        "status": "Active",
        "last_visit": "2024-12-15",
        "conditions": ["Hypertension", "Diabetes Type 2"],
        "medications": ["Lisinopril", "Metformin"],
        "allergies": ["Penicillin"],
        "insurance": "Active - Blue Cross Blue Shield"
    }

@router.post("/data", response_model=PatientData, tags=["Patient Data"])
async def patient_data_endpoint(request: dict):
    """Advanced patient data retrieval with FHIR compliance"""
    # TODO: Add authentication, validation, and call get_patient_data
    return await get_patient_data(**request)
