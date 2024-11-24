from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import base64

class EncryptionService:
    def __init__(self, key=None):
        self.key = bytes.fromhex("f2fdbdff652de9743f20ece480c7bb6253e90e231fbc9f0d96ac2e60cffc9ad1")

    def encrypt(self, password: str):
        iv = get_random_bytes(AES.block_size)  
        cipher = AES.new(self.key, AES.MODE_CBC, iv)  

        encrypted_password = cipher.encrypt(pad(password.encode(), AES.block_size)) 
        encrypted_data = {
            "iv": base64.b64encode(iv).decode('utf-8'),
            "ciphertext": base64.b64encode(encrypted_password).decode('utf-8')
        }
        return encrypted_data

    def decrypt(self, encrypted_data: dict):
        iv = base64.b64decode(encrypted_data["iv"])
        ciphertext = base64.b64decode(encrypted_data["ciphertext"])

        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        decrypted_password = unpad(cipher.decrypt(ciphertext), AES.block_size) 
        return decrypted_password.decode('utf-8')

