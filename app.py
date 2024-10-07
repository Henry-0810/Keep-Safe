from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_routes
from config.config import DynamoDBConnection

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_routes)

dynamodb = DynamoDBConnection()
dynamodb.get_table("Users")

if __name__ == "__main__":
    app.run(debug=True)
