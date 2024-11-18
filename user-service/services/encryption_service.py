from bcrypt import hashpw, gensalt, checkpw


class EncryptionService:
    @staticmethod
    def hash_password(password):
        return hashpw(password.encode("utf-8"), gensalt()).decode("utf-8")

    @staticmethod
    def verify_password(password, password_hash):
        return checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
