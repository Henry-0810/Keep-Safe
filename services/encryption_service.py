import bcrypt


class EncryptionService:
    def hash_password(self, password):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode("utf-8"), salt)

    def verify_password(self, password, hashed_password):
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password)
