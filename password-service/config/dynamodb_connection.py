import boto3
import os
from botocore.exceptions import NoCredentialsError, PartialCredentialsError


def get_dynamodb_connection():
    try:
        aws_region = os.getenv("AWS_REGION")
        dynamodb = boto3.resource("dynamodb", region_name="eu-west-1")
        print("DynamoDB connection established")
        return dynamodb
    except (NoCredentialsError, PartialCredentialsError):
        print("Credentials not available or incomplete")
        raise
