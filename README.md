# Healthcare AI Assistant MCP Server

A HIPAA-compliant Model Context Protocol (MCP) server for secure healthcare AI workflows. Powered by Cequence AI Gateway for enterprise-ready agent authentication, with Epic/Cerner FHIR, RxNorm, X12 EDI integrations.


## 🚀 Full Setup Guide: Real Data Integration with Descope

### Prerequisites
- Git, Docker, Node.js, Python 3.10+
- Cequence AI Gateway account ([sign up](https://app.aigateway.cequence.ai/))
- Descope project ([docs](https://docs.descope.com/)) with healthcare OAuth flows enabled
- Neon PostgreSQL database (for PHI storage)
- FHIR API credentials (Epic/Cerner developer accounts)

### 1. Clone and Install
```bash
git clone https://github.com/sunnyshin8/AI-Powered-Healthcare-Assistant-MCP-Server.git
cd AI-Powered-Healthcare-Assistant-MCP-Server
# Python backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
# Node.js frontend
cd frontend
npm install
```

### 2. Configure Environment
- Copy `.env.example` to `.env` and fill in:
	- DESCOPE_PROJECT_ID, DESCOPE_API_KEY
	- NEON_DB_URL
	- CEQUENCE_GATEWAY_URL
	- FHIR_API credentials

### 3. Run with Real Data
```bash
# Start backend (Python)
cd healthcare-mcp-server
python app/main.py
# Start frontend (Next.js)
cd ../frontend
npm run dev
```

### 4. Descope Authentication Flow
- Users log in via Descope OAuth (Google, Microsoft, etc.)
- Descope issues JWT tokens for secure API access
- Frontend stores session and passes token to backend for all requests
- Backend validates token with Descope before accessing PHI

### 5. Real Data Flow
1. User logs in (Descope)
2. Frontend requests patient/appointment data
3. Backend fetches from Neon DB, FHIR APIs, RxNorm, X12 EDI, etc.
4. Data is returned to frontend and displayed in dashboard
5. All access is logged and audited for compliance

### 6. Production Deployment
```bash
# Deploy backend and frontend (Fly.io, Render, Vercel, etc.)
fly deploy  # or render deploy
# Update Cequence Gateway and Descope with production URLs
# Enable audit logging and monitoring
```

## 🏥 Healthcare Integration

### FHIR Servers
- Epic: SMART on FHIR R4
- Cerner: FHIR R4 endpoints
- Custom: Any FHIR-compliant EHR system

### Drug Information
- RxNorm API: Drug interaction checking
- OpenFDA API: Adverse event lookups

### Insurance Processing
- X12 EDI 270/271: Eligibility verification
- Change Healthcare: Claims processing
- CMS APIs: Medicare/Medicaid data

---
For more details, see `docs/CEQUENCE_SETUP.md`, `docs/HIPAA_COMPLIANCE.md`, and `docs/API_REFERENCE.md`.
