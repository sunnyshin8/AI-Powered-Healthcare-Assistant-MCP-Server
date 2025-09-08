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
