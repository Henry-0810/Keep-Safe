import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.encryption_service import EncryptionService

@pytest.fixture
def encryption_service():
    return EncryptionService()

def test_encryption_decryption(encryption_service):
    password = "securepassword123"

    encrypted_data = encryption_service.encrypt(password)
    assert encrypted_data["ciphertext"] != password
    
    decrypted_password = encryption_service.decrypt(encrypted_data)
    assert decrypted_password == password
