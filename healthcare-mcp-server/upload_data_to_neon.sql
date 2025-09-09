-- Upload CSV data to Neon database
-- Replace YOUR_NEON_CONNECTION_STRING with your actual connection string from .env

-- Connect to your Neon database
-- psql "YOUR_NEON_CONNECTION_STRING" 

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

-- Sample queries to test the data
SELECT name, dob, diagnosis FROM patients LIMIT 5;
SELECT appointment_id, patient_id, provider, appointment_date FROM appointments LIMIT 5;
