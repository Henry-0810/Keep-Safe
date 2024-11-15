from flask import Blueprint
from src.controllers.password_controller import (
    generate_password,
    add_password,
    update_password,
    delete_password,
    get_passwords,
)

password_routes = Blueprint("password_routes", __name__)

password_routes.route("/generate-password", methods=["POST"])(generate_password)
password_routes.route("/add-password", methods=["POST"])(add_password)
password_routes.route("/update-password", methods=["PUT"])(update_password)
password_routes.route("/delete-password", methods=["DELETE"])(delete_password)
password_routes.route("/get-passwords", methods=["GET"])(get_passwords)
