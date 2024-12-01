import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from unittest.mock import patch, MagicMock
from services.token_service import TokenService
import jwt
import datetime
from flask import Flask

@pytest.fixture(scope="module")
def app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "test_secret_key" 
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_generate_token(app, client):
    data = {"username": "testuser", "email": "testuser@example.com"}
    
    with app.app_context():
        with patch("services.token_service.jwt.encode") as mock_encode:
            mock_encode.return_value = "mocked_token"

            token = TokenService.generate_token(data)
            
            mock_encode.assert_called_once()
            args, kwargs = mock_encode.call_args
            assert "mocked_token" == token  
            assert kwargs["algorithm"] == "HS256"

def test_verify_token(app, client):
    token = "mocked_token"
    decoded_data = {"data": {"username": "testuser", "email": "testuser@example.com"}}

    with app.app_context():
        with patch("services.token_service.jwt.decode") as mock_decode:
            mock_decode.return_value = decoded_data
            result = TokenService.verify_token(token)
            
            assert result == decoded_data["data"]
            mock_decode.assert_called_once_with(token, "test_secret_key", algorithms=["HS256"])

def test_verify_expired_token(app, client):
    token = "expired_token"
    
    with app.app_context():
        with patch("services.token_service.jwt.decode") as mock_decode:
            mock_decode.side_effect = jwt.ExpiredSignatureError("Token expired")
            
            result = TokenService.verify_token(token)

            assert result == {"error": "Token expired"}

def test_verify_invalid_token(app, client):
    token = "invalid_token"

    with app.app_context():
        with patch("services.token_service.jwt.decode") as mock_decode:
            
            mock_decode.side_effect = jwt.InvalidTokenError("Invalid token")
            
            result = TokenService.verify_token(token)
            
            assert result is None
