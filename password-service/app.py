from flask import Flask
from flask_cors import CORS
from routes.password_routes import password_routes

app = Flask(__name__)
app.config["SECRET_KEY"] = "henry_super_key_0810"

app.register_blueprint(password_routes, url_prefix="/api/password")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4001, debug=True)