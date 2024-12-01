import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.generator_service import PasswordGenerator, EightCharPassword, TwelveCharPassword, SixteenCharPassword

@pytest.fixture
def password_generator():
    return PasswordGenerator(EightCharPassword())

def test_generate_password_length(password_generator):
    password_generator.set_strategy(EightCharPassword())
    password = password_generator.generate()
    assert len(password) == 8  
    
    password_generator.set_strategy(TwelveCharPassword())
    password = password_generator.generate()
    assert len(password) == 12 
    
    password_generator.set_strategy(SixteenCharPassword())
    password = password_generator.generate()
    assert len(password) == 16  

def test_generate_random_passwords(password_generator):
    password_generator.set_strategy(EightCharPassword())
    password1 = password_generator.generate()
    password2 = password_generator.generate()
    assert password1 != password2 
