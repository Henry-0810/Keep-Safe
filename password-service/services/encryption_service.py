from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import base64
import os
from dotenv import load_dotenv

class EncryptionService:
    def __init__(self, key=None):
        load_dotenv()
        key_hex = os.getenv("ENCRYPTION_KEY")
        if not key_hex:
            raise RuntimeError("ENCRYPTION_KEY environment variable is not set")
        self.key = bytes.fromhex(key_hex)

    def encrypt(self, password: str):
        cipher = AES.new(self.key, AES.MODE_GCM)  # Use AES-GCM mode
        ciphertext, tag = cipher.encrypt_and_digest(password.encode())
        encrypted_data = {
            "nonce": base64.b64encode(cipher.nonce).decode('utf-8'),  # Store nonce
            "ciphertext": base64.b64encode(ciphertext).decode('utf-8'),
            "tag": base64.b64encode(tag).decode('utf-8')  # Store authentication tag
        }
        return encrypted_data

    def decrypt(self, encrypted_data: dict):
        try:
            nonce = base64.b64decode(encrypted_data["nonce"])
            ciphertext = base64.b64decode(encrypted_data["ciphertext"])
            tag = base64.b64decode(encrypted_data["tag"])
            cipher = AES.new(self.key, AES.MODE_GCM, nonce=nonce)
            decrypted_password = cipher.decrypt_and_verify(ciphertext, tag)
            return decrypted_password.decode('utf-8')
        except (ValueError, KeyError) as e:
            raise RuntimeError("Decryption failed: " + str(e))

