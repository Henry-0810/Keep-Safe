from config.dynamodb_connection import get_dynamodb_connection
import uuid

class UserModel:

    def __init__(self, username, email, password_hash, passwords=None, user_id=None):
        self.id = user_id if user_id else str(uuid.uuid4())
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.passwords = passwords if passwords else []
        self.table = get_dynamodb_connection().Table("Users")

    def save_to_db(self):
        self.table.put_item(
            Item={
                "id": self.id,
                "username": self.username,
                "email": self.email,
                "password_hash": self.password_hash,
                "passwords": self.passwords,
            }
        )

    @staticmethod
    def get_user(email):
        table = get_dynamodb_connection().Table("Users")
        response = table.get_item(Key={"email": email})
        if "Item" in response:
            user_data = response["Item"]
            return UserModel(
                user_id=user_data["id"],
                username=user_data["username"],
                email=user_data["email"],
                password_hash=user_data["password_hash"],
                passwords=user_data.get("passwords", []),
            )
        return None
