import jwt
import datetime
from flask import current_app

class TokenBuilder:
    def __init__(self):
        self.payload = {}

    def add_data(self, data):
        self.payload["data"] = data
        return self

    def set_issued_at(self):
        self.payload["iat"] = datetime.datetime.utcnow()
        return self

    def set_expiry(self, expires_in=3600):
        self.payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
        return self

    def build(self):
        if not self.payload:
            raise ValueError("Token payload is empty. Add data to the token.")
        return self.payload

class TokenService:
    @staticmethod
    def generate_token(data, expires_in=3600):
        builder = TokenBuilder()
        payload = (
            builder.add_data(data)
                   .set_issued_at()
                   .set_expiry(expires_in)
                   .build()
        )
        return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    
    @staticmethod
    def verify_token(token):
        try:
            decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            return decoded.get("data")
        except jwt.ExpiredSignatureError:
            return {"error": "Token expired"}
        except jwt.InvalidTokenError:
            return None
