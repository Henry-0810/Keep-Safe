from flask import request, jsonify, make_response, session
from models.user_model import UserModel
from services.token_service import TokenService
from services.encryption_service import EncryptionService


def register_user():
    data = request.get_json()
    username = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    existing_user = UserModel.get_user(username)
    if existing_user:
        return jsonify({"error": "Username already exists"}), 409

    password_hash = EncryptionService.hash_password(password)
    user = UserModel(username, email, password_hash)

    try:
        token_payload = {"username": username, "email": email}
        token = TokenService.generate_token(token_payload)
        user.save_to_db()
        return jsonify({"message": "User created successfully", "data": {"token": token, "email": email}}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = UserModel.get_user(email)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if EncryptionService.verify_password(password, user.password_hash):
        token_payload = {"username": user.username, "email": user.email}
        token = TokenService.generate_token(token_payload)
        return jsonify({"message": "Login successful", "data": {"token": token, "email": user.email}}), 200

    return jsonify({"error": "Invalid credentials"}), 401


def sign_out_user():
    return jsonify({"message": "User signed out"}), 200

def user_status():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Not authenticated"}), 401

    token = token.replace("Bearer ", "")
    user_data = TokenService.verify_token(token)
    if not user_data:
        return jsonify({"error": "Invalid or expired token"}), 401

    return jsonify({"email": user_data.get("email")}), 200
