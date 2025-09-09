# PowerShell script to upload CSV data to Neon database
# Make sure to set your NEON_CONNECTION_STRING in .env file

# Load environment variables from .env file
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match "^([^#][^=]+)=(.*)$") {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
}

# Check if NEON_CONNECTION_STRING is set
$neonConnectionString = [Environment]::GetEnvironmentVariable("NEON_CONNECTION_STRING")
if (-not $neonConnectionString) {
    Write-Host "Error: NEON_CONNECTION_STRING not found in .env file" -ForegroundColor Red
    Write-Host "Please add your Neon connection string to .env file:" -ForegroundColor Yellow
    Write-Host 'NEON_CONNECTION_STRING="postgresql://username:password@host/database?sslmode=require"' -ForegroundColor Yellow
    exit 1
}

Write-Host "Connecting to Neon database..." -ForegroundColor Green
Write-Host "Uploading patient and appointment data..." -ForegroundColor Green

# Create SQL script content
$sqlScript = @"
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
"@

# Write SQL script to temporary file
$tempSqlFile = "temp_upload.sql"
$sqlScript | Out-File -FilePath $tempSqlFile -Encoding UTF8

try {
    # Execute psql command
    & psql $neonConnectionString -f $tempSqlFile
    Write-Host "Data upload completed!" -ForegroundColor Green
} catch {
    Write-Host "Error executing psql command: $_" -ForegroundColor Red
    Write-Host "Make sure PostgreSQL client (psql) is installed and in your PATH" -ForegroundColor Yellow
} finally {
    # Clean up temporary file
    if (Test-Path $tempSqlFile) {
        Remove-Item $tempSqlFile
    }
}
