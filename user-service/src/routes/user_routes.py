from flask import Blueprint
from src.controllers.user_controller import register_user, login_user, sign_out_user

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/register", methods=["POST"])
def register():
    return register_user()


@user_routes.route("/login", methods=["POST"])
def login():
    return login_user()


@user_routes.route("/signout", methods=["POST"])
def signout():
    return sign_out_user()
