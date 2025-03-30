// Conectar ao servidor WebSocket
const socket = io('http://localhost:5000');

let player2 = null;
let playerTurno = true;
let gameIniciado = false;
let playerName = "Jogador " + Math.floor(Math.random() * 1000);
let anfitriao = false;

// Quando a conexão for bem-sucedida
socket.on('connect', () => {
    console.log('Conectado ao servidor WebSocket');
    socket.emit('multiplayer', { 
        message: 'Jogador conectado e esperando por oponente',
        playerName: playerName
    });
    atualizarPainel("Conectando ao servidor...");
});

socket.on('multiplayerConexao', (data) => {
    console.log('Dados de conexão recebidos:', data);
    if (data.player2) {
      player2 = data.player2;
      anfitriao = data.anfitriao;
      atualizarPainel("Conectado com " + player2);
      startGame();
    }
});

function atualizarPainel(mensagem) {
    const statusPanel = document.getElementById('status-panel');
    const statusMessage = document.createElement('div');
    statusMessage.className = 'status-message';
    statusMessage.textContent = mensagem;
    statusPanel.appendChild(statusMessage);
    statusPanel.scrollTop = statusPanel.scrollHeight;
}

function enviarJogada(x, y) {
    if (!playerTurno || !gameIniciado) {
        atualizarPainel("Não é sua vez de jogar!");
      return;
    }

    console.log('Enviando jogada:', {x, y, playerName, player2});
    socket.emit('envJogada', {
      x: x,
      y: y,
      player2: player2,
      playerName: playerName,
      timestamp: new Date().toISOString()
    });

    playerTurno = false;
    atualizarTurno();
}

socket.on('recebeJogada', (data) => {
    console.log('Jogada recebida:', data);
    processarJogada(data.x, data.y);
    playerTurno = true;
    atualizarTurno();
});

function enviarAtualizacao(situacao) {
    // Envia a atualização para o servidor
    socket.emit('envAtualizacao', {
      situacao: situacao,
      player2: player2,
      playerName: playerName,
      timestamp: new Date().toISOString()
    });
    
    // Atualiza o painel local
    atualizarPainel(situacao);
}

socket.on('recebeSituacao', (data) => {
    console.log('Situação recebida: ' + data.situacao);
    atualizarPainel(data.situacao);
  });

  function atualizarTurno() {
    const turnIndicator = document.getElementById('turn-indicator');
    turnIndicator.textContent = playerTurno ? "Sua vez!" : "Vez do oponente";
    turnIndicator.style.color = playerTurno ? "#2e7d32" : "#f44336";
}

function startGame() {
    console.log('Iniciando jogo...');
    gameIniciado = true;
    document.querySelector('.waiting-message').style.display = 'none';
    
    // Inicializa o jogo
    imagePreload();
    player = setupPlayer(false);
    computer = setupPlayer(true);
    
    // Renderiza os tabuleiros
    document.getElementById('game-board').innerHTML = `
      <div class="game-board">
        <div class="grid-container">
          <div class="grid-title">NAVIOS INIMIGOS</div>
          <div class="grid" id="enemy-grid"></div>
        </div>
        <div class="grid-container">
          <div class="grid-title">NAVIOS ALIADOS</div>
          <div class="grid" id="player-grid"></div>
        </div>
      </div>
    `;

    // Renderiza as grades
    renderGrids();
    
    // Define quem começa baseado no host
    playerTurno = anfitriao;
    atualizarPainel("Jogo iniciado! " + (anfitriao ? "Você começa!" : "Aguarde sua vez!"));
    atualizarTurno();
}

function renderGrids() {
    // Limpa os containers
    document.getElementById('enemy-grid').innerHTML = '';
    document.getElementById('player-grid').innerHTML = '';

    // Renderiza a grade do inimigo
    for (let y = 0; y < gridy; y++) {
      for (let x = 0; x < gridx; x++) {
        const img = document.createElement('img');
        img.src = "Front-end/static/img/batt100.gif";
        img.width = 16;
        img.height = 16;
        img.onclick = () => gridClick(y, x);
        document.getElementById('enemy-grid').appendChild(img);
      }
      document.getElementById('enemy-grid').appendChild(document.createElement('br'));
    }

    // Renderiza a grade do jogador
    for (let y = 0; y < gridy; y++) {
      for (let x = 0; x < gridx; x++) {
        const img = document.createElement('img');
        img.src = "Front-end/static/img/batt" + player[y][x][0] + ".gif";
        img.width = 16;
        img.height = 16;
        document.getElementById('player-grid').appendChild(img);
      }
      document.getElementById('player-grid').appendChild(document.createElement('br'));
    }
}

function setImage(y, x, id, ispc) {
    const grid = ispc ? 'enemy-grid' : 'player-grid';
    const images = document.getElementById(grid).getElementsByTagName('img');
    const index = y * gridx + x;
    if (images[index]) {
      images[index].src = "Front-end/static/img/batt" + id + ".gif";
    }
}
