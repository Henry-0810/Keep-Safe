from flask import request, jsonify
from services.token_service import TokenService  

class JWTAuthMiddleware:
    @staticmethod
    def jwt_required(func):
        def wrapper(*args, **kwargs):
            token = request.headers.get("Authorization")
            if not token:
                return jsonify({"error": "Token missing"}), 401

            token = token.replace("Bearer ", "")
            user_data = TokenService.verify_token(token)
            if not user_data:
                return jsonify({"error": "Invalid or expired token"}), 401

            request.user = user_data
            return func(*args, **kwargs)

        return wrapper