
# Healthcare AI Assistant MCP Server

A HIPAA-compliant Model Context Protocol (MCP) server for secure healthcare AI workflows. Powered by Cequence AI Gateway for enterprise-ready agent authentication, with Epic/Cerner FHIR, RxNorm, X12 EDI integrations.


## 🚀 Getting Started

### Prerequisites
- Cequence AI Gateway account (sign up at https://app.aigateway.cequence.ai/)
- Descope project configured with healthcare OAuth flows
- Neon PostgreSQL database for PHI storage
- FHIR API credentials (Epic/Cerner developer accounts)

### Local Development
```bash
# 1. Clone and setup environment
│   ├── database/               # Neon PostgreSQL models  
│   └── utils/                  # Encryption, audit logging
├── docs/
│   ├── openapi.yaml            # API spec for Cequence Gateway
│   ├── HIPAA_COMPLIANCE.md     # Security documentation
│   ├── CEQUENCE_SETUP.md       # Gateway configuration guide
│   └── API_REFERENCE.md        # Endpoint documentation
├── requirements.txt
├── Dockerfile  
├── docker-compose.yml
├── .env.example
└── README.md
```

## Getting Started
1. Clone the repository

### Production Deployment
```bash
# Deploy API to Fly.io/Render
fly deploy  # or render deploy

# Update Cequence Gateway with production URLs
# Configure production Descope redirect URIs
# Enable audit logging and monitoring
```


## 🏥 Healthcare Integration

### FHIR Servers
- Epic: Production-ready SMART on FHIR R4
- Cerner: Open FHIR R4 endpoints
- Custom: Any FHIR-compliant EHR system

### Drug Information
- RxNorm API: Drug interaction checking
- OpenFDA API: Adverse event lookups

### Insurance Processing
- X12 EDI 270/271: Eligibility verification
- Change Healthcare: Claims processing
- CMS APIs: Medicare/Medicaid data

## 📊 Monitoring & Compliance

### Audit Logging
- All API calls logged with timestamps
- User actions tracked through Descope
- PHI access logged for HIPAA compliance
- Real-time monitoring via Cequence dashboard

### Security Features
- AES-256 encryption for all PHI data
- OAuth 2.0 with PKCE for AI agent auth
- Rate limiting and DDoS protection
- Automated threat detection

## 📖 Documentation

| Document              | Description                              |
|-----------------------|------------------------------------------|
| CEQUENCE_SETUP.md     | Complete Cequence Gateway configuration   |
| HIPAA_COMPLIANCE.md   | Security controls and audit procedures    |
| API_REFERENCE.md      | Healthcare API endpoint documentation     |
| DEPLOYMENT.md         | Production deployment guide               |
| TESTING.md            | Integration testing with Claude Desktop   |

## 🎯 MCP Tools Available
Once deployed through Cequence, AI agents can access:

- Patient Data Retrieval - FHIR-compliant patient record access
- Appointment Scheduling - Calendar integration with EHR systems
- Drug Safety Checks - RxNorm-powered interaction analysis
- Insurance Verification - Real-time eligibility checking
- Care Coordination - Referral creation and tracking

## 🏆 Global MCP Hackathon - Theme 2
This project implements Theme 2: Security, Authentication & Compliance requirements:

✅ Cequence AI Gateway integration for secure agent-to-app connections
✅ Enterprise OAuth 2.0 authentication via Descope
✅ HIPAA-compliant audit trails and PHI protection
✅ Real-time monitoring and policy enforcement

## 🚀 Quick Test
```bash
# Connect with Claude Desktop
npx @cequence/mcp-client connect <your-server-id>

# Test patient data access
"Can you show me the latest labs for patient ID 12345?"

# Test appointment scheduling  
"Schedule a follow-up appointment for next Tuesday at 2 PM"

# Test drug interactions
"Check for interactions between metformin and lisinopril"
```

## 📄 License
MIT License - see LICENSE.md for details
2. Copy `.env.example` to `.env` and fill in your secrets
3. Build Docker image: `docker build -t healthcare-mcp-server .`
4. Start services: `docker-compose up`
5. Access API at `http://localhost:8000/`

## Environment Variables
See `.env.example` for all required secrets:
- `NEON_DATABASE_URL` (PostgreSQL connection string)
- `JWT_SECRET` (JWT signing key)
- `ENCRYPTION_KEY` (AES-256 encryption key for PHI)
- `DESCOPE_PROJECT_ID` (Descope OAuth project)
- `EPIC_CLIENT_ID` (Epic FHIR API client ID)
- `CERNER_CLIENT_ID` (Cerner FHIR API client ID)

## Documentation
- `HIPAA_COMPLIANCE.md`: Security & compliance details
- `API_REFERENCE.md`: MCP tool API documentation
- `DEPLOYMENT.md`: Production deployment guide

## License
MIT
