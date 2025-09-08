from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os, base64
from dotenv import load_dotenv

load_dotenv()

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", "").encode()

class AESEncryption:
    @staticmethod
    def encrypt(plain_text: str) -> str:
        # AES-256 GCM encryption
        if not ENCRYPTION_KEY or len(ENCRYPTION_KEY) != 32:
            raise ValueError("ENCRYPTION_KEY must be 32 bytes for AES-256.")
        iv = os.urandom(12)
        encryptor = Cipher(
            algorithms.AES(ENCRYPTION_KEY),
            modes.GCM(iv),
            backend=default_backend()
        ).encryptor()
        ct = encryptor.update(plain_text.encode()) + encryptor.finalize()
        return base64.b64encode(iv + encryptor.tag + ct).decode()

    @staticmethod
    def decrypt(cipher_text: str) -> str:
        data = base64.b64decode(cipher_text)
        iv, tag, ct = data[:12], data[12:28], data[28:]
        decryptor = Cipher(
            algorithms.AES(ENCRYPTION_KEY),
            modes.GCM(iv, tag),
            backend=default_backend()
        ).decryptor()
        return (decryptor.update(ct) + decryptor.finalize()).decode()
