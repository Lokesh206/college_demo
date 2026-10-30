import os
import secrets
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or secrets.token_hex(32)
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or secrets.token_hex(32)
    ENABLE_DEMO_ACCOUNTS = os.environ.get('ENABLE_DEMO_ACCOUNTS', 'true').lower() == 'true'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
    
    # Dual database support: MySQL when configured, otherwise SQLite in backend directory
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        f"sqlite:///{os.path.join(os.path.dirname(BASE_DIR), 'sri_vidya_puc.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Gemini AI configuration
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')

    # Upload & Receipt folder
    RECEIPT_FOLDER = os.path.join(os.path.dirname(BASE_DIR), 'receipts')
