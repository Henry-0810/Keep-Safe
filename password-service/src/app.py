from flask import Flask
from flask_cors import CORS
from src.routes.user_routes import user_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_routes, url_prefix="/api/password")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4001, debug=True)