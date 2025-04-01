// Conexão WebSocket
const socket = io("http://localhost:5000");

// id dos navios
const navios =  [[[1,5], [1,2,5], [1,2,3,5], [1,2,3,4,5]], [[6,10], [6,7,10], [6,7,8,10], [6,7,8,9,10]]];

// id das imagens afundadadas
const afundados = [[[201,203], [201,202,203], [201,202,202,203], [201,202,202,202,203]], [[204,206], [204,205,206], [204,205,205,206], [204,205,205,205,206]]];

// Tipo do navio, quantidade de espaço, quantidade no tabuleiro
const tipos = [["Rebocador",2,4],["Contratopedeiro",3,4],[ "Cruzador",4,2],[ "Porta-avioes",5,1]];

// Tamanho do Tabuleiro
const tabX = 16, tabY = 16;

// Guardar os navios do player
let playerNavios = []

// Controlar o turno do jogador
let playerTurno = false;
let fimGame = false

// Carrega as imagens em memoria
let preloaded = [];
let ids = [1,2,3,4,5,6,7,8,9,10,100,101,102,103,201,202,203,204,205,206];

// Armazenar o SID do player2
let player2 = null;

// Pontos do Jogador
let player1Pontos = 0;
let player2Pontos = 0;

// Tabuleiro pro player1 e player 2
let tabPlayer1 = [], tabPlayer2 = [];

function criarTabuleiro() {
    playerNavios = []
    playerTurno = false;
    fimGame = false
    player1Pontos = 0;
    player2Pontos = 0;
    player2 = null;

    for (let i = 0; i < tabX; i++) {
        tabPlayer1[i] = [];
        tabPlayer2[i] = [];
        for (let j = 0; j < tabY; j++) {
            tabPlayer1[i][j] =  100;
            tabPlayer2[i][j] =  100;
        }    
    }
}

function preCarregamento() {
    window.status = "Precarregando as imagens.";
    for (let i = 0; i < ids.length; i++) {
        let img = new Image;
        let caminho = "static/img/batt"+ids[i]+".gif";
        img.src = caminho
        preloaded[i] = caminho       
    }
}

function posicionarVertical(vertical, tamanho) {
    for (let navio = 0; navio < vertical.length; navio++) {
        if (vertical[navio].length === tamanho) {
            let posicao = true;
            let tentativas = 0;
            while (posicao && tentativas < 100) {
                tentativas++;
                let x = Math.floor(Math.random() * tabX);
                let y = Math.floor(Math.random() * tabY);
                
                if (y + (tamanho - 1) < tabY) {
                    let valido = true;
                    for (let t = 0; t < tamanho; t++) {
                        if (tabPlayer1[x][y + t] !== 100) {
                            valido = false;
                            break;
                        }
                    }
                    if (valido) {
                        let posicoes = [];
                        for (let i = 0; i < tamanho; i++) {
                            tabPlayer1[x][y + i] = vertical[navio][i];
                            posicoes.push([x, y + i]);
                        }
                        playerNavios.push(posicoes);
                        posicao = false;
                    }
                }
            }
        }
    }
}

function posicionarHorizontal(horizontal, tamanho) {
    for (let navio = 0; navio < horizontal.length; navio++) {
        if (horizontal[navio].length === tamanho) {
            let posicao = true;
            let tentativas = 0;
            while (posicao && tentativas < 100) {
                tentativas++;
                let x = Math.floor(Math.random() * tabX);
                let y = Math.floor(Math.random() * tabY);
                
                if (x + (tamanho - 1) < tabX) {
                    let valido = true;
                    for (let t = 0; t < tamanho; t++) {
                        if (tabPlayer1[x + t][y] !== 100) {
                            valido = false;
                            break;
                        }
                    }
                    if (valido) {
                        let posicoes = [];
                        for (let i = 0; i < tamanho; i++) {
                            tabPlayer1[x + i][y] = horizontal[navio][i];
                            posicoes.push([x + i, y]);
                        }
                        playerNavios.push(posicoes);
                        posicao = false;
                    }
                }
            }
        }
    }
}

function posicionarNavio() {
    for (const tipo of tipos) {
        let tamanho = tipo[1];
        let quantidade = tipo[2];
        let horizontal = navios[0];
        let vertical = navios[1];
        
        for (let i = 0; i < quantidade; i++) {
            let num = Math.random();
            if (num < 0.5) {
                posicionarHorizontal(horizontal, tamanho);
            } else {
                posicionarVertical(vertical, tamanho);
            }
        }
    }
}

function carregarTabuleiro() {
    const tabuleiro1 = document.getElementById("tabuleiro1"); 
    const tabuleiro2 = document.getElementById("tabuleiro2"); 

    tabuleiro1.innerHTML = "";
    tabuleiro2.innerHTML = "";

    for (let i = 0; i < tabX; i++) {
        const row1 = document.createElement("div");
        row1.classList.add("linha");

        const row2 = document.createElement("div");
        row2.classList.add("linha");

        for (let j = 0; j < tabY; j++) {
            // Criando células para o tabuleiro do adversário (clicável)
            const cell1 = document.createElement("div");
            cell1.classList.add("celula");
            cell1.dataset.x = i;
            cell1.dataset.y = j;
            cell1.appendChild(criarImagem(tabPlayer1[i][j]));

            // Criando células para o tabuleiro do jogador (exibe navios)
            const cell2 = document.createElement("div");
            cell2.classList.add("celula");
            cell2.dataset.x = i;
            cell2.dataset.y = j;
            cell2.addEventListener("click", () => realizarJogada(i, j));
            cell2.appendChild(criarImagem(tabPlayer2[i][j])); 

            row1.appendChild(cell1);
            row2.appendChild(cell2);
            
        }
        tabuleiro1.appendChild(row1);
        tabuleiro2.appendChild(row2);
    }
}

// Função para criar a imagem de cada célula
function criarImagem(valor) {
    const img = document.createElement("img");
    let imagemSrc = ""

    let index = ids.indexOf(valor)
    imagemSrc = preloaded[index];

    img.src = imagemSrc;
    return img;
}

function realizarJogada(x, y) {
    if(fimGame) {
        return
    }
    if(!playerTurno) {
        atualizarPainel("Não é o seu Turno!")
        return
    }
    if (tabPlayer2[x][y] != 100) {
        atualizarPainel("Você já escolheu essa coordenada!")
        return
    }
    socket.emit('envJogada', {
        x: x,
        y: y,
        player2: player2
    })
    let mensagem = `Fim do seu turno!\nVocê escolheu as Coordenadas:\n(${y + 1}, ${x + 1})`;
    atualizarPainel(mensagem)
    playerTurno = false
}

function tipoNavio(tamanho) {
    for (let i = 0; i < tipos.length; i++) {
        if (tipos[i][1] === tamanho) {
            return tipos[i][0];
        }
    }
}

function verificarNavio(navio, imgs, tipo) {
    let afundou = true;
    
    // Determinar se o navio está na horizontal ou vertical
    let horizontal = navio[0][1] === navio[1][1];
    let vertical = navio[0][0] === navio[1][0];

    // Verifica se todas as partes do navio foram atingidas (103)
    for (let i = 0; i < navio.length; i++) {
        if (tabPlayer1[navio[i][0]][navio[i][1]] !== 103) {
            afundou = false;
            break;
        }
    }

    // Se o navio afundou, substituir por imagens de navio afundado
    if (afundou) {
        player2Pontos += 1
        tipo = tipoNavio(navio.length)

        let afundadoLista = horizontal ? afundados[0] : afundados[1];
        for (let i = 0; i < afundadoLista.length; i++) {
            if (afundadoLista[i].length === navio.length) {
                for (let j = 0; j < navio.length; j++) {
                    let x = navio[j][0];
                    let y = navio[j][1];

                    tabPlayer1[x][y] = afundadoLista[i][j]; 
                    atualizarTab1(x, y, tabPlayer1[x][y]);

                    imgs.push({x: x, y: y, id: tabPlayer1[x][y]});
                }
                break;
            }
        }

        // atualizar painel com navio afundado
        atualizarPainel(`Player2 afundou o ${tipo}`)

    }
    return tipo
}

function validarJogada(x, y) {
    let imgs = [];
    let tipo = ""

    for (let i = 0; i < playerNavios.length; i++) {
        for (let j = 0; j < playerNavios[i].length; j++) {
            if (x == playerNavios[i][j][0] && y == playerNavios[i][j][1]) {
                tabPlayer1[x][y] = 103;
                atualizarTab1(x, y, 103);
                imgs.push({x: x, y: y, id: 103});
                tipo = "acertou"

                tipo = verificarNavio(playerNavios[i], imgs, tipo);

                if (imgs.length > 0) {
                    enviarSituacao(imgs, tipo);
                    console.log(tipo)
                }
                validarVencedor()
                return;
            }
        }
    }

    // Caso erre o tiro
    atualizarTab1(x, y, 102);
    imgs.push({x: x, y: y, id: 102});

    enviarSituacao(imgs, "errou");
}

// Atualiza apenas uma célula no tabuleiro
function atualizarTab1(x, y, idImagem) {
    const tabuleiro = document.getElementById("tabuleiro1"); 
    const celula = tabuleiro.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    
    if (celula) {
        celula.innerHTML = ""; // Remove a imagem antiga
        celula.appendChild(criarImagem(idImagem)); 
    }
}

function atualizarTab2(x, y, idImagem) {
    const tabuleiro = document.getElementById("tabuleiro2"); 
    const celula = tabuleiro.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (celula) {
        celula.innerHTML = ""; // Remove a imagem antiga
        celula.appendChild(criarImagem(idImagem)); 
    }
}

function enviarSituacao(validacao, tipo) {
    mensagem = {
        player2: player2,
        imagens: validacao,
        pontuacao: player2Pontos,
        resultado: tipo
    }
    socket.emit('envAtualizacao', mensagem)
}

function validarVencedor() {
    if (player1Pontos == 11) {
        playerTurno = false
        fimGame = true
        atualizarPainel('PARABENS!!!\nVocê foi o Vecedor')
    }
    if (player2Pontos == 11) {
        playerTurno = false
        fimGame = true
        atualizarPainel('Game Over!\nInfelizmente não foi dessa vez!')
    }
}

function atualizarPainel(mensagem) {
    const painel = document.getElementById("painel-info");
    if (painel) {
        const novaMensagem = document.createElement("p");
        novaMensagem.innerHTML = mensagem.replace(/\n/g, "<br>");
        novaMensagem.style.opacity = "0";
        novaMensagem.style.transition = "opacity 0.5s ease-in-out";
        painel.appendChild(novaMensagem);
        
        setTimeout(() => {
            novaMensagem.style.opacity = "1";
        }, 10);

        const mensagens = painel.querySelectorAll("p");
        if (mensagens.length > 5) {
            painel.removeChild(mensagens[0]);
        }

        painel.scrollTop = painel.scrollHeight; // Rola para a última mensagem
    }
}

// Evento de conexão
socket.on("connect", () => {
    console.log("Solicitando conexão ao servidor!");
});

socket.on('response', (data)=> {
    console.log("Servidor: ", data.mensagem)
})

socket.on('recebeJogada', (data)=> {
    let x = data.x;
    let y = data.y;

    validarJogada(x, y)
    if (fimGame) {
        return
    }
    playerTurno = true
    atualizarPainel("Sua vez de Jogar!")
})

socket.on('recebeSituacao', (data)=> {
    let imagens = data.imagens
    if (data.resultado != 'acertou' && data.resultado != 'errou') {
        atualizarPainel(`Você afundou o ${data.resultado}!`);
    }
    player1Pontos = data.pontuacao
    for (let i = 0; i < imagens.length; i++) {
        let x = imagens[i].x
        let y = imagens[i].y
        let id = imagens[i].id
        tabPlayer2[x][y] = id
        atualizarTab2(x, y, id)
    }
    validarVencedor()
})

socket.on('multiplayerConexao', (data)=> {
    player2 = data.player2
    playerTurno = data.anfitriao
    carregarTabuleiro()
    atualizarPainel("Player 2 foi encontrado!")
    if(playerTurno) {
        atualizarPainel("Sua vez de Jogar!")
    }
})

socket.on('desconexao', (data)=> {
    atualizarPainel("O Player2 foi Desconectado!")
    playerTurno = false;
    fimGame = true;
})

function inicarGame() {
    criarTabuleiro()
    posicionarNavio()
    atualizarPainel("Iniciando a Partida!")
    atualizarPainel("Procurando Jogador...")
    socket.emit('multiplayer', {});
}

preCarregamento()
inicarGame()