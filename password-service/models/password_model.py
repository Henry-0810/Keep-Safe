from datetime import datetime
from config.dynamodb_connection import get_dynamodb_connection
from services.encryption_service import EncryptionService

DATETIME_FORMAT = "%d/%m/%Y %H:%M:%S"
class PasswordModel:
    def __init__(self, email):
        self.email = email  
        self.table = get_dynamodb_connection().Table("Users")
        self.encryption_service = EncryptionService()

    def add_password(self, password_name, password):
        new_password = {
            "password_name": password_name,
            "password_hash": self.encryption_service.encrypt(password),
            "created_at": datetime.now().strftime(DATETIME_FORMAT),
            "updated_at": datetime.now().strftime(DATETIME_FORMAT),
        }

        self.table.update_item(
            Key={"email": self.email},  
            UpdateExpression="SET passwords = list_append(if_not_exists(passwords, :empty_list), :new_password)",
            ExpressionAttributeValues={
                ":new_password": [new_password],
                ":empty_list": [],
            },
        )

    def get_password(self, password_name):
        response = self.table.get_item(Key={"email": self.email})  
        passwords = response.get("Item", {}).get("passwords", [])

        for password in passwords:
            if password["password_name"] == password_name:

                decrypted_password = self.encryption_service.decrypt(password["password_hash"])
                
                return {
                    "password_name": password["password_name"],
                    "password": decrypted_password  
                }
            
    def get_passwords(self):
        response = self.table.get_item(Key={"email": self.email})  
        return response.get("Item", {}).get("passwords", [])

    def update_password(self, password_name, new_password):
        response = self.table.get_item(Key={"email": self.email})  
        passwords = response.get("Item", {}).get("passwords", [])

        found = False
        for password in passwords:
            if password["password_name"] == password_name:
                password["password_hash"] = self.encryption_service.encrypt(new_password)
                password["updated_at"] = datetime.now().strftime(DATETIME_FORMAT)
                found = True
                break

        if not found:
            raise ValueError(f"No password found with the name {password_name}")

        self.table.update_item(
            Key={"email": self.email},  
            UpdateExpression="SET passwords = :passwords",
            ExpressionAttributeValues={":passwords": passwords},
        )

    def delete_password(self, password_name):
        response = self.table.get_item(Key={"email": self.email}) 
        passwords = response.get("Item", {}).get("passwords", [])

        latest_passwords = [
            password
            for password in passwords
            if password["password_name"] != password_name
        ]

        self.table.update_item(
            Key={"email": self.email},
            UpdateExpression="SET passwords = :passwords",
            ExpressionAttributeValues={":passwords": latest_passwords},
        )

    @staticmethod
    def check_password(email, password_name):
        table = get_dynamodb_connection().Table("Users")
        response = table.get_item(Key={"email": email})  
        passwords = response.get("Item", {}).get("passwords", [])

        for password in passwords:
            if password["password_name"] == password_name:
                return True

        return False
