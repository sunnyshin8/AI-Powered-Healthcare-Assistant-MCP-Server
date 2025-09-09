import json
import random
import csv
from faker import Faker

fake = Faker()
NUM_PATIENTS = 11000
patients = []

genders = ["Male", "Female", "Other"]
medications = ["Lisinopril", "Metformin", "Atorvastatin", "Amlodipine", "Omeprazole"]
allergies = ["Penicillin", "Peanuts", "Latex", "None"]
providers = ["Dr. Smith", "Dr. Lee", "Dr. Patel", "Dr. Kim", "Dr. Brown"]
insurance_providers = ["Blue Cross", "United Health", "Aetna", "Cigna", "Humana"]
roles = ["Primary Care", "Cardiologist", "Endocrinologist", "Dermatologist", "Orthopedist"]

for i in range(1, NUM_PATIENTS + 1):
    patient_id = f"P{i:05d}"
    name = fake.name()
    dob = fake.date_of_birth(minimum_age=0, maximum_age=99).strftime("%Y-%m-%d")
    gender = random.choice(genders)
    address = fake.address().replace("\n", ", ")
    phone = fake.phone_number()
    email = fake.email()
    medical_records = [{
        "record_id": f"MR{i:05d}",
        "diagnosis": fake.word(),
        "medications": random.sample(medications, k=random.randint(1, 3)),
        "allergies": random.sample(allergies, k=random.randint(1, 2)),
        "last_visit": fake.date_this_year().strftime("%Y-%m-%d")
    }]
    appointments = [{
        "appointment_id": f"A{i:05d}",
        "date": fake.date_between(start_date="today", end_date="+30d").strftime("%Y-%m-%d"),
        "provider": random.choice(providers),
        "reason": fake.sentence(nb_words=3),
        "status": random.choice(["Scheduled", "Completed", "Cancelled"])
    }]
    insurance = {
        "provider": random.choice(insurance_providers),
        "policy_number": fake.bothify(text="??#######"),
        "valid_through": fake.date_between(start_date="today", end_date="+2y").strftime("%Y-%m-%d"),
        "verified": random.choice([True, False])
    }
    care_coordination = [
        {
            "provider": random.choice(providers),
            "role": random.choice(roles),
            "contact": fake.email()
        }
        for _ in range(random.randint(1, 2))
    ]
    patients.append({
        "patient_id": patient_id,
        "name": name,
        "dob": dob,
        "gender": gender,
        "address": address,
        "phone": phone,
        "email": email,
        "medical_records": medical_records,
        "appointments": appointments,
        "insurance": insurance,
        "care_coordination": care_coordination
    })

# Save as JSON
with open("g:/AI-Powered Healthcare Assistant MCP Server/healthcare-mcp-server/app/sample_patients.json", "w") as f:
    json.dump(patients, f, indent=2)

# Save as CSV
csv_fields = [
    "patient_id", "name", "dob", "gender", "address", "phone", "email",
    "diagnosis", "medications", "allergies", "last_visit",
    "appointment_date", "appointment_provider", "appointment_reason", "appointment_status",
    "insurance_provider", "policy_number", "valid_through", "insurance_verified",
    "care_coordination"
]
with open("g:/AI-Powered Healthcare Assistant MCP Server/healthcare-mcp-server/app/sample_patients.csv", "w", newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=csv_fields)
    writer.writeheader()
    for p in patients:
        mr = p["medical_records"][0]
        appt = p["appointments"][0]
        ins = p["insurance"]
        care = "; ".join([f"{c['role']}:{c['provider']}({c['contact']})" for c in p["care_coordination"]])
        writer.writerow({
            "patient_id": p["patient_id"],
            "name": p["name"],
            "dob": p["dob"],
            "gender": p["gender"],
            "address": p["address"],
            "phone": p["phone"],
            "email": p["email"],
            "diagnosis": mr["diagnosis"],
            "medications": ", ".join(mr["medications"]),
            "allergies": ", ".join(mr["allergies"]),
            "last_visit": mr["last_visit"],
            "appointment_date": appt["date"],
            "appointment_provider": appt["provider"],
            "appointment_reason": appt["reason"],
            "appointment_status": appt["status"],
            "insurance_provider": ins["provider"],
            "policy_number": ins["policy_number"],
            "valid_through": ins["valid_through"],
            "insurance_verified": ins["verified"],
            "care_coordination": care
        })
