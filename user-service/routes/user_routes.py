from flask import Blueprint, request, jsonify
from controllers.user_controller import register_user, login_user, sign_out_user
from middlewares.jwt_middleware import JWTAuthMiddleware

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

@user_routes.route("/protected", methods=["GET"])
@JWTAuthMiddleware.jwt_required
def protected_route():
    return jsonify({"message": f"Hello, {request.user['username']}!"})