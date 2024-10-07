from flask import Blueprint, jsonify
from config.config import DynamoDBConnection

user_routes = Blueprint("main_routes", __name__)


@user_routes.route("/")
def hello_world():
    try:
        dynamodb = DynamoDBConnection()
        table = dynamodb.get_table("Users")
        response = table.scan()
        items = response.get("Items", [])

        return jsonify({"message": "Connected to Users table!", "items": items})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
