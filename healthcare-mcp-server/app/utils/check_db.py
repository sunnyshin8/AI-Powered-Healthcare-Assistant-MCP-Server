import asyncio
from app.database.connection import test_connection

if __name__ == "__main__":
    connected = asyncio.run(test_connection())
    if connected:
        print("Database connection successful.")
    else:
        print("Database connection failed.")
