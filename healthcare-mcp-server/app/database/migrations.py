from app.database.models import Base
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("NEON_DATABASE_URL")

def run_migrations():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    run_migrations()
    print("Database tables created.")
