import jwt
import datetime
from flask import current_app


class TokenService:
    @staticmethod
    def generate_token(data, expires_in=3600):
        payload = {
            "data": data,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
        }
        return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")

    @staticmethod
    def verify_token(token):
        try:
            decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            return decoded["data"]
        except jwt.ExpiredSignatureError:
            return None 
        except jwt.InvalidTokenError:
            return None 
