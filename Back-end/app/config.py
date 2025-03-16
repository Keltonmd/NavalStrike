import os

class Config:
    # Chave secreta para segurança, WebSocket e ataques
    SECRET_KEY = os.getenv('SECRET_KEY', 'CriptoAlternativa')
    DEBUG = True
    TESTING = False