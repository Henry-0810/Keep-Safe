
from abc import ABC, abstractmethod
import random
import string

class PasswordStrategy(ABC):
    @abstractmethod
    def generate_password(self):
        pass

class EightCharPassword(PasswordStrategy):
    def generate_password(self):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

class TwelveCharPassword(PasswordStrategy):
    def generate_password(self):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=12))

class SixteenCharPassword(PasswordStrategy):
    def generate_password(self):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=16))

class PasswordGenerator:
    def __init__(self, strategy: PasswordStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: PasswordStrategy):
        self._strategy = strategy

    def generate(self):
        return self._strategy.generate_password()
