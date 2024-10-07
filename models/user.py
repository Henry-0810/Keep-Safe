from config.config import DynamoDBConnection


class UserModel:
    _dynamodb = DynamoDBConnection()

    def __init__(self, username, password_hash, passwords=None):
        self.username = username
        self.password_hash = password_hash
        self.passwords = passwords if passwords else []

    def save_to_db(self):
        table = self._dynamodb.get_table("Users")

        table.put_item(
            Item={
                "username": self.username,
                "password_hash": self.password_hash,
                "passwords": self.passwords,
            }
        )

    @staticmethod
    def get_user(username):
        table = UserModel._dynamodb.get_table("Users")

        response = table.get_item(Key={"username": username})
        if "Item" in response:
            user_data = response["Item"]
            return UserModel(
                username=user_data["username"],
                password_hash=user_data["password_hash"],
                passwords=user_data.get("passwords", []),
            )
        return None
