import threading
from flask import request
from .extensions import socketio
from flask_socketio import emit

# Variaveis
jogadores_Disponiveis = []
salas = {}
lock = threading.Lock()


def register_socket_events(socketio):
    """Registra os eventos do WebSocket"""
    
    @socketio.on('connect')
    def handle_connect():
        print(f"Cliente {request.sid} conectado.")
        emit('response', {'message': 'Conectado com sucesso!'})

    @socketio.on('disconnect')
    def handle_disconnect():
        sid = request.sid
        print(f"Cliente {sid} desconectado.")

        with lock:
            # Remover da fila de espera se ele ainda não jogava
            if sid in jogadores_Disponiveis:
                jogadores_Disponiveis.remove(sid)
                print(f"Jogador {sid} estava na fila e desconectou.")
            
            # Rover os jogadores da sala e avisar para o player2 sua desconexão
            if sid in salas:
                player2 = salas[sid]
                emit('desconexao', {}, room=player2)
                del salas[player2]
                print(f"Jogador: {player2}, removido da sala")
                del salas[sid]
                print(f"Jogador: {sid}, removido da sala")
            
    @socketio.on('multiplayer')
    def multiplayer(data):
        sid = request.sid
        with lock:
            if sid not in jogadores_Disponiveis and sid not in salas:
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
            'y': y,
            'nomePlayer2': data['playerName'] 
        }
        emit('recebeJogada', mensagem, room=player2)
        print(f"Enviando jogada: X - {x} e y - {y}, para o jogador: {player2}")


    @socketio.on('envAtualizacao')
    def envSituacao(data):
        player2 = data['player2']
        mensagem = {
            'situacao': data['situacao']
        }
        emit('recebeSituacao', mensagem, room=player2)
        print(f"Enviando situação: {data['situacao']}, para o jogador: {player2}")

    def conectar_Players():
        if len(jogadores_Disponiveis) >= 2:
            player1 = jogadores_Disponiveis.pop(0)
            player2 = jogadores_Disponiveis.pop(0)

            # Inserindo os jogadores na sala
            salas[player1] = player2
            salas[player2] = player1

            # Avisando os jogadores
            emit('multiplayerConexao', {'player1': player1, 'anfitriao': True}, room=player2)
            emit('multiplayerConexao', {'player2': player2, 'anfitriao': False}, room=player1)

            print(f"Jogador {player1} e Jogador {player2}, estão conectados")