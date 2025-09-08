import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

Base = declarative_base()

class Patient(Base):
    __tablename__ = 'patients'
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    encrypted_data = sa.Column(sa.LargeBinary, nullable=False)  # Encrypted PHI JSON
    created_at = sa.Column(sa.DateTime, default=datetime.utcnow)
    updated_at = sa.Column(sa.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Appointment(Base):
    __tablename__ = 'appointments'
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = sa.Column(UUID(as_uuid=True), sa.ForeignKey('patients.id'))
    provider_id = sa.Column(sa.String, nullable=False)
    appointment_time = sa.Column(sa.DateTime, nullable=False)
    reason = sa.Column(sa.String)
    status = sa.Column(sa.String, default='scheduled')
    created_at = sa.Column(sa.DateTime, default=datetime.utcnow)
    updated_at = sa.Column(sa.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = 'audit_logs'
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user = sa.Column(sa.String, nullable=False)
    action = sa.Column(sa.String, nullable=False)
    resource = sa.Column(sa.String, nullable=False)
    timestamp = sa.Column(sa.DateTime, default=datetime.utcnow)

class OAuthToken(Base):
    __tablename__ = 'oauth_tokens'
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = sa.Column(sa.String, nullable=False)
    token_hash = sa.Column(sa.String, nullable=False)
    created_at = sa.Column(sa.DateTime, default=datetime.utcnow)
    expires_at = sa.Column(sa.DateTime)
