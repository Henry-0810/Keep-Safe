from flask import request, jsonify
from src.models.user_model import UserModel
from src.services.encryption_service import EncryptionService

encryption_service = EncryptionService()


def register_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    existing_user = UserModel.get_user(username)
    if existing_user:
        return jsonify({"error": "Username already exists"}), 409

    password_hash = encryption_service.hash_password(password)
    user = UserModel(username, password_hash)

    try:
        user.save_to_db()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = UserModel.get_user(username)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    elif encryption_service.verify_password(password, user.password_hash):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401


def sign_out_user():
    return jsonify({"message": "User signed out"}), 200
