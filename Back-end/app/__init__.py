import os
from flask import Flask
from .config import Config
from .extensions import socketio
from .sockets import register_socket_events

def create_app():
    # Serve para iniciar o flask
    app = Flask(__name__)
    
    # Importa configurações gerais
    app.config.from_object(Config)
    
    # WebSockets
    register_socket_events(socketio)

    socketio.init_app(app, cors_allowed_origins="*")

    return app