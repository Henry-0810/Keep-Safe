import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError


def get_dynamodb_connection():
    try:
        dynamodb = boto3.resource("dynamodb")
        print("DynamoDB connection established")
        return dynamodb
    except (NoCredentialsError, PartialCredentialsError):
        print("Credentials not available or incomplete")
        raise
