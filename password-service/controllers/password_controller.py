from flask import request, jsonify
from models.password_model import PasswordModel
from services.generator_service import PasswordGenerator, EightCharPassword, TwelveCharPassword, SixteenCharPassword

generator = PasswordGenerator(EightCharPassword()) 
MISSING_FIELD = "Missing required fields"

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
    email = data.get("email")  
    password_name = data.get("password_name")
    plaintext_password = data.get("password")

    if not all([email, password_name, plaintext_password]):
        return jsonify({"error": MISSING_FIELD}), 400

    existing_password_name = PasswordModel.check_password(email, password_name)

    if existing_password_name:
        return jsonify({"error": "Password Name already exists"}), 409

    password = PasswordModel(email)
    
    try:
        password.add_password(password_name, plaintext_password)
        return jsonify({"message": "Password added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def update_password():
    data = request.get_json()
    email = data.get("email")  
    password_name = data.get("password_name")
    plaintext_password = data.get("password")

    if not all([email, password_name, plaintext_password]):
        return jsonify({"error": MISSING_FIELD}), 400
    
    password = PasswordModel(email)

    try:
        password.update_password(password_name, plaintext_password)
        return jsonify({"message": f"Password {password_name} updated successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_password():
    data = request.get_json()
    email = data.get("email") 
    password_name = data.get("password_name")

    if not all([email, password_name]):
        return jsonify({"error": MISSING_FIELD}), 400

    try:
        password = PasswordModel(email)
        password.delete_password(password_name)
        return jsonify({"message": f"Password '{password_name}' deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_passwords():
    email = request.args.get("email")  

    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        password = PasswordModel(email)
        passwords = password.get_passwords()

        password_names = [{"password_name": p["password_name"], "created_at": p["created_at"]} for p in passwords]
        
        return jsonify({"passwords": password_names}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
def get_password():
    data = request.get_json()
    email = data.get("email")  
    password_name = data.get("password_name")

    if not all([email, password_name]):
        return jsonify({"error": MISSING_FIELD}), 400

    try:
        password = PasswordModel(email)
        password_data = password.get_password(password_name)
        
        return jsonify({"password": password_data}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
