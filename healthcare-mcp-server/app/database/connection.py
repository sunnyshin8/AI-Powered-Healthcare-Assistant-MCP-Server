import os
import asyncpg
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("NEON_DATABASE_URL")

async def test_connection():
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        await conn.close()
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False
