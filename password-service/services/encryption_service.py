import boto3
from botocore.exceptions import ClientError

def get_kms_key_id():
    secret_name = "prod/App/password-service"
    region_name = "eu-west-1"

    client = boto3.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    except ClientError as e:
        print(f"Error retrieving secret: {e}")
        raise e

    secret = get_secret_value_response['SecretString']
    return secret 

class EncryptionService:
    def __init__(self):
        self.kms = boto3.client("kms")
        self.key_id = get_kms_key_id()
    
    def encrypt(self, password):
        response = self.kms.encrypt(
            KeyId=self.key_id,
            Plaintext=password.encode('utf-8'),
        )
        return response['CiphertextBlob']

    def decrypt(self, encrypted_password):
        response = self.kms.decrypt(
            KeyId=self.key_id,
            CiphertextBlob=encrypted_password
        )
        return response['Plaintext'].decode('utf-8')