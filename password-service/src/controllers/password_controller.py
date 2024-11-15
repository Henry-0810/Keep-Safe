from flask import request, jsonify
from src.models.password_model import PasswordModel
from services.generator_service import PasswordGenerator, EightCharPassword, TwelveCharPassword, SixteenCharPassword

generator = PasswordGenerator(EightCharPassword()) 

def generate_password():
    data = request.get_json()
    difficulty = data.get("difficulty", "easy") 

    if difficulty == "medium":
        generator.set_strategy(TwelveCharPassword())
    elif difficulty == "hard":
        generator.set_strategy(SixteenCharPassword())
    else:
        generator.set_strategy(EightCharPassword())

    try:
        generated_password = generator.generate()
        return jsonify({"generated_password": generated_password}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def add_password():
    data = request.get_json()
    username = data.get("username")
    password_name = data.get("password_name")
    plaintext_password = data.get("password")

    if not all([username, password_name, plaintext_password]):
        return jsonify({"error": "Missing required fields"}), 400

    existing_password_name = PasswordModel.check_password(username, password_name)

    if existing_password_name:
        return jsonify({"error": "Password Name already exists"}), 409

    password = PasswordModel(username)
    
    try:
        password.add_password(password_name, plaintext_password)
        return jsonify({"message": "Password added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def update_password():
    data = request.get_json()
    username = data.get("username")
    password_name = data.get("password_name")
    plaintext_password = data.get("password")

    if not all([username, password_name, plaintext_password]):
        return jsonify({"error": "Missing required fields"}), 400
    
    password = PasswordModel(username)

    try:
        password.update_password(password_name, plaintext_password)
        return jsonify({"message": f"Password {password_name} updated successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_password():
    data = request.get_json()
    username = data.get("username")
    password_name = data.get("password_name")

    if not all([username, password_name]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        password = PasswordModel(username)
        password.delete_password(password_name)
        return jsonify({"message": f"Password '{password_name}' deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_passwords():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Username is required"}), 400

    try:
        password = PasswordModel(username)
        passwords = password.get_passwords()
        return jsonify({"passwords": passwords}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



    

