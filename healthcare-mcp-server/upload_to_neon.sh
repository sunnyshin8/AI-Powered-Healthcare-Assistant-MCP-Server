#!/bin/bash

# Upload CSV data to Neon database
# Make sure to set your NEON_CONNECTION_STRING in .env file

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if NEON_CONNECTION_STRING is set
if [ -z "$NEON_CONNECTION_STRING" ]; then
    echo "Error: NEON_CONNECTION_STRING not found in .env file"
    echo "Please add your Neon connection string to .env file:"
    echo "NEON_CONNECTION_STRING=\"postgresql://neondb_owner:npg_wcqAfES2L4Co@ep-nameless-violet-adjwxsz0-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    exit 1
fi

echo "Connecting to Neon database..."
echo "Uploading patient and appointment data..."

# Execute the SQL commands
psql "$NEON_CONNECTION_STRING" << EOF
-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS patients (
    patient_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255),
    dob DATE,
    gender VARCHAR(20),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    diagnosis TEXT,
    medications TEXT,
    allergies TEXT,
    last_visit DATE,
    appointment_date DATE,
    appointment_provider VARCHAR(100),
    appointment_reason TEXT,
    appointment_status VARCHAR(50),
    insurance_provider VARCHAR(100),
    policy_number VARCHAR(50),
    valid_through DATE,
    insurance_verified BOOLEAN,
    care_coordination TEXT
);

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id VARCHAR(10) PRIMARY KEY,
    patient_id VARCHAR(10),
    provider VARCHAR(100),
    appointment_date DATE,
    appointment_time TIME,
    appointment_type VARCHAR(50),
    status VARCHAR(50),
    reason TEXT,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- Upload data from CSV files
\copy patients FROM 'app/sample_patients.csv' WITH CSV HEADER;
\copy appointments FROM 'app/sample_appointments.csv' WITH CSV HEADER;

-- Verify data upload
SELECT COUNT(*) as total_patients FROM patients;
SELECT COUNT(*) as total_appointments FROM appointments;

-- Show sample data
SELECT 'Sample Patients:' as info;
SELECT name, dob, diagnosis FROM patients LIMIT 5;

SELECT 'Sample Appointments:' as info;
SELECT appointment_id, patient_id, provider, appointment_date FROM appointments LIMIT 5;
EOF

echo "Data upload completed!"
