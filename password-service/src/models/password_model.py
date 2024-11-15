from datetime import datetime
from config.dynamodb_connection import get_dynamodb_connection
from services.encryption_service import EncryptionService


class PasswordModel:
    def __init__(self, username):
        self.username = username
        self.table = get_dynamodb_connection().Table("Users")
        self.encryption_service = EncryptionService()

    def add_password(self, password_name, password):
        new_password = {
            "password_name": password_name,
            "password_hash": self.encryption_service.hash_password(password),
            "created_at": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            "updated_at": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        }

        self.table.update_item(
            Key={"username": self.username},
            UpdateExpression="SET passwords = list_append(if_not_exists(passwords, :empty_list), :new_password)",
            ExpressionAttributeValues={
                ":new_password": [new_password],
                ":empty_list": [],
            },
        )

    def get_passwords(self):
        response = self.table.get_item(Key={"username": self.username})
        return response.get("Item", {}).get("passwords", [])
    

    def update_password(self, password_name, new_password):
        response = self.table.get_item(Key={"username": self.username})
        passwords = response.get("Item", {}).get("passwords", [])

        found = False
        for password in passwords:
            if password["password_name"] == password_name:
                password["password_hash"] = self.encryption_service.hash_password(new_password)
                password["updated_at"] = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
                found = True
                break
        
        if not found:
            raise ValueError(f"No password found with the name {password_name}")

        self.table.update_item(
            Key={"username": self.username},
            UpdateExpression="SET passwords = :passwords",
            ExpressionAttributeValues={":passwords": passwords},
        )

    def delete_password(self, password_name):
        response = self.table.get_item(Key={"username": self.username})
        passwords = response.get("Item", {}).get("passwords", [])

        latest_passwords = [
            password
            for password in passwords
            if password["password_name"] != password_name
        ]

        self.table.update_item(
            Key={"username": self.username},
            UpdateExpression="SET passwords = :passwords",
            ExpressionAttributeValues={":passwords": latest_passwords},
        )

    @staticmethod
    def check_password(username, password_name):
        response = get_dynamodb_connection().Table("Users")
        passwords = response.get("Item", {}).get("passwords", [])

        for password in passwords:
            if password["password_name"] == password_name:
                return password
        
        return None
