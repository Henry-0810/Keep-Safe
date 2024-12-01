import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.encryption_service import EncryptionService
from bcrypt import hashpw, gensalt, checkpw

def test_hash_password():
    password = "securepassword"

    hashed_password = EncryptionService.hash_password(password)
    
    assert hashed_password != password
    
    assert len(hashed_password) > len(password)
    
    assert checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

def test_verify_password():
    password = "securepassword"
    hashed_password = EncryptionService.hash_password(password)

    assert EncryptionService.verify_password(password, hashed_password)

    assert not EncryptionService.verify_password("wrongpassword", hashed_password)
