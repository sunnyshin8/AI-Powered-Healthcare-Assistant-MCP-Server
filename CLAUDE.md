# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### FastAPI Server (Primary Development)
```bash
# Start development server
cd healthcare-mcp-server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Start with Docker
docker-compose up --build

# Run individual components
python -m uvicorn app.main:app --reload  # FastAPI app
python mcp_server.py                     # MCP server via stdio
```

### Testing & Client Connection
```bash
# Test MCP server connection and authentication
python mcp_client_test.py

# Connect to MCP server
python healthcare-mcp-server/mcp_server.py

# Test API endpoints
curl http://localhost:8000/api/status
curl http://localhost:8000/healthz
```

### Environment Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Node.js MCP dependencies
cd healthcare-mcp-server && npm install

# Setup environment variables
cp healthcare-mcp-server/.env.example healthcare-mcp-server/.env
# Edit .env with your credentials
```

## Architecture Overview

### Project Structure
- **Root Level**: Contains MCP client test script and Python environment
- **healthcare-mcp-server/**: Main application directory
  - `app/main.py`: FastAPI application entry point with CORS and router setup
  - `mcp_server.py`: MCP server entry point using stdio transport
  - `app/services/mcp_tools.py`: MCP tool definitions for healthcare workflows

### Core Components

**FastAPI Web Application**
- RESTful API endpoints for healthcare operations
- Template-based web interface with dashboard
- CORS middleware configured for healthcare compliance
- Router modules: patient, appointment, medications, insurance, referral

**MCP Server Integration**
- Uses `@modelcontextprotocol/sdk` for Node.js and `mcp` package for Python
- Implements healthcare-specific MCP tools:
  - `get_patient_data()`: FHIR-compliant patient record retrieval
  - `schedule_appointment()`: FHIR Appointment resource management
  - `check_drug_interactions()`: RxNorm/FDA database integration
  - `verify_insurance_eligibility()`: X12 EDI transaction processing
  - `create_referral()`: FHIR ServiceRequest for specialist referrals

**Security & Compliance Architecture**
- Cequence AI Gateway integration for enterprise authentication
- Descope OAuth 2.0 with PKCE for AI agent authentication
- AES-256 encryption for PHI data protection
- HIPAA-compliant audit logging and monitoring

### Healthcare Integrations
- **FHIR Servers**: Epic/Cerner R4 endpoints with SMART on FHIR
- **Drug Information**: RxNorm API, OpenFDA adverse event lookups
- **Insurance Processing**: X12 EDI 270/271 eligibility verification

### Data Models
Located in `app/models/`:
- `PatientData`: Structured patient information from FHIR resources
- `AppointmentRequest`: Appointment scheduling parameters
- `MedicationInteraction`: Drug interaction analysis results
- `InsuranceEligibility`: Insurance coverage verification response
- `ReferralRequest`: Specialist referral tracking information

### Database
- PostgreSQL via Neon for PHI storage
- SQLAlchemy ORM integration
- Database models in `app/database/`
- Connection string format: `NEON_DATABASE_URL`

### Environment Variables Required
- `NEON_DATABASE_URL`: PostgreSQL connection
- `JWT_SECRET`: JWT signing key
- `ENCRYPTION_KEY`: AES-256 PHI encryption
- `DESCOPE_PROJECT_ID`: OAuth authentication
- `EPIC_CLIENT_ID`, `CERNER_CLIENT_ID`: FHIR API access

### Deployment
- Docker containerization with multi-stage builds
- Production deployment via Fly.io/Render
- Health check endpoint: `/healthz`
- Real-time status monitoring: `/api/status`