from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_routes

app = Flask(__name__)
app.config["SECRET_KEY"] = "henry_super_key_0810"


app.register_blueprint(user_routes, url_prefix="/api/user")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
