import logging
from datetime import datetime

logger = logging.getLogger("audit")
handler = logging.FileHandler("audit.log")
formatter = logging.Formatter('%(asctime)s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

def log_access(user: str, action: str, resource: str):
    logger.info(f"User: {user} | Action: {action} | Resource: {resource}")
