import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError


# Singleton class to establish connection with DynamoDB
class DynamoDBConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DynamoDBConnection, cls).__new__(cls)
            try:
                cls._instance.dynamodb = boto3.resource("dynamodb")
                print("DynamoDB connection established")
            except NoCredentialsError:
                print("Credentials not available")
            except PartialCredentialsError:
                print("Incomplete credentials provided")
        return cls._instance

    def get_table(self, table_name):
        return self.dynamodb.Table(table_name)
