from flask import request, jsonify
from models.user import UserModel
from services.encryption_service import EncryptionService

encryption_service = EncryptionService()


def register_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    passwords = []

    password_hash = encryption_service.hash_password(password)

    if not username or not password_hash:
        return jsonify({"error": "Missing required fields"}), 400

    user = UserModel(username, password_hash, passwords)
    user.save_to_db()
    return jsonify({"message": "User created successfully"}), 201


def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = UserModel.get_user(username)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    elif user and encryption_service.verify_password(password, user.password_hash):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401


def sign_out_user():
    return jsonify({"message": "User signed out"}), 200
