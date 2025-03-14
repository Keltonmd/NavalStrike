import os
from flask import Flask, request
from flask_socketio import SocketIO, emit

# Serve para iniciar o flask
app = Flask(__name__)
# Chave secreta para segurança, WebSocket e ataques
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'CriptoAlternativa')
# Permitir conexão de qualquer endereço
socketio = SocketIO(app)

# Variaveis
jogadores_Disponiveis = []

@socketio.on('connect')
def handle_connect():
    print(f"Cliente {request.sid} conectado.")
    emit('response', {'message': 'Conectado com sucesso!'})

@socketio.on('multiplayer')
def multiplayer(data):
    sid = request.sid
    if sid not in jogadores_Disponiveis:
        jogadores_Disponiveis.append(sid)
        print(f"player {sid} esta requerindo uma sala")
        conectar_Players()

@socketio.on('envJogada')
def envJogada(data):
    player2 = data["player2"]
    x = data['x']
    y = data['y']
    mensagem = {
        'x': x,
        'y': y
    }
    emit('recebeJogada', mensagem, room=player2)

@socketio.on('envAtualizacao')
def envSituacao(data):
    player2 = data['player2']
    mensagem = {
        'situacao': data['situacao']
    }
    emit('recebeSituacao', mensagem, room=player2)

def conectar_Players():
    id_sala = 0
    if len(jogadores_Disponiveis) >= 2:
        player1 = jogadores_Disponiveis.pop(0)
        player2 = jogadores_Disponiveis.pop(0)
        emit('multiplayerConexao', {'player2': player2}, room=player1)
        emit('multiplayerConexao', {'player1': player1}, room=player2)
        print(f"Jogador {player1} e Jogador {player2}, estão conectados na sala {id_sala}")

if __name__ == "__main__":
    socketio.run(app, debug=True)