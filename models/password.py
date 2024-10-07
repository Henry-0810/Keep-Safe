from config.config import DynamoDBConnection
from datetime import datetime


class PasswordModel:
    _dynamodb = DynamoDBConnection()

    def __init__(
        self, password_name, email, password_hash, created_at=None, updated_at=None
    ):
        self.password_name = password_name
        self.email = email
        self.password_hash = password_hash
        self.created_at = (
            created_at if created_at else datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        )
        self.updated_at = updated_at if updated_at else self.created_at
