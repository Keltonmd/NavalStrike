# NavalStrike 🌊⚓🎯

<p align="center">
 <img src= "navalLogo.png" width=20% height=20%>
</p>
  
## 📌 Sobre o Projeto

NavalStrike é um jogo multiplayer de Batalha Naval desenvolvido como parte da disciplina de Sistemas Distribuídos, ministrada pelo professor Adriano Antunes ([GitHub](https://github.com/adrianoifnmg)). O objetivo do projeto é aplicar conceitos de sistemas distribuídos, como comunicação entre processos, concorrência e escalabilidade, em um jogo interativo e dinâmico.

O jogo foi desenvolvido utilizando tecnologias como:
- **☁️ Servidor AWS** para hospedar a aplicação
- **🔗 WebSockets** para comunicação em tempo real
- **🐍 Python** no backend
- **🌐 JavaScript, HTML e CSS** para o front-end

O NavalStrike possui dois modos de jogo:
- **🎮 Singleplayer**: O jogador enfrenta uma inteligência artificial
- **⚔️ Multiplayer**: Dois jogadores competem entre si em tempo real

Este projeto se destaca como um excelente exemplo para aplicação de sistemas distribuídos, pois envolve:
- Alta troca de mensagens entre os jogadores e o servidor
- Gerenciamento de filas para matchmaking
- Comunicação eficiente entre dois jogadores
- Gerenciamento de sessões desconectadas

Além de ser um projeto tecnicamente desafiador, o NavalStrike também serve como uma ótima forma de exercitar lógica de programação e aprender mais sobre desenvolvimento distribuído.

---

## 🎯 Proposta Geral

O objetivo do projeto é desenvolver um jogo de Batalha Naval multiplayer utilizando conceitos de sistemas distribuídos. O jogo permitirá que jogadores se conectem via internet e disputem partidas em tempo real, com comunicação realizada por meio de WebSockets para garantir interatividade fluida e responsiva.

O servidor será responsável por:
- Gerenciar conexões
- Processar jogadas
- Manter o estado do jogo
- Gerenciar matchmaking para o modo multiplayer

---

## 📖 Justificativa

Este projeto está diretamente relacionado aos conceitos estudados na disciplina de Sistemas Distribuídos, abordando:

- **📡 Comunicação entre processos**: Uso de WebSockets para troca de mensagens entre clientes e servidor.
- **⚡ Concorrência**: Implementação de threads e multiprocessing para suportar múltiplos jogadores simultaneamente.
- **📊 Distribuição de carga**: Uso de pool de workers para gerenciar as requisições dos jogadores.
- **🌍 Disponibilidade e escalabilidade**: Implementação do servidor na nuvem (AWS) para garantir acessibilidade e desempenho.

---

## 📂 Estrutura de Arquivos no Servidor

A distribuição dos arquivos no servidor está organizada da seguinte forma:

```
/var/www/                # Gerenciado pelo Nginx
│── navalstrike.ddns.net/  # Diretório servido pelo Nginx
│   ├── index.html
│   ├── multiplayer.html
│   ├── singleplayer.html
│── static/              # Arquivos estáticos (CSS, JS, imagens)
│   ├── css/
│       ├── multiplayer.css
│       ├── global.css
│   ├── js/
│       ├── singleplayer.js
│       ├── multiplayer.js
│   ├── img/
│       ├── batt1.gif
│       ├── batt2.gif
│       ├── batt3.gif
│       ├── batt4.gif
│       ├── batt5.gif
│       ├── batt6.gif
│       ├── batt7.gif
│       ├── batt8.gif
│       ├── batt9.gif
│       ├── batt10.gif
│       ├── batt100.gif
│       ├── batt101.gif
│       ├── batt102.gif
│       ├── batt103.gif
│       ├── batt201.gif
│       ├── batt202.gif
│       ├── batt203.gif
│       ├── batt204.gif
│       ├── batt205.gif
│       ├── batt206.gif

/home/admin/backend/      # Aplicação Flask
│── app/
│   ├── __init__.py      # Configuração do Flask
│   ├── config.py        # Rotas REST (caso precise)
│   ├── extensions.py    # WebSockets (Flask-SocketIO)
│   ├── sockets.py       # Configuração geral
│── run.py               # Arquivo para rodar o servidor
```

---

## 👥 Equipe e Responsabilidades

O projeto foi desenvolvido pelos seguintes integrantes:

## �🏻‍ Equipe
| Integrante               | Função Principal           | Repositório |
|--------------------------|-----------------------------|-------------|
| 💻 João Pedro Santos R.     | Implementação da lógica do jogo e do servidor backend.    | [@JPJohn1110](https://github.com/JPJohn1110) |
| 💻 Kelton Martins D.        | Implementação da comunicação via WebSockets e desenvolvimento do backend.  | [@Keltonmd](https://github.com/Keltonmd) |
| 🎨 Lucas Magalhães R.       | Desenvolvimento da interface gráfica do jogo (front-end) usando HTML, CSS e JavaScript.            | [@iamlucasmagalhaes](https://github.com/iamlucasmagalhaes) |

---

## 🖥️ Sobre o Servidor

O NavalStrike está hospedado em uma **instância EC2 da AWS**, garantindo maior desempenho e escalabilidade. O jogo pode ser acessado por meio do endereço:

🔗 [navalstrike.ddns.net](http://navalstrike.ddns.net)

Para que o servidor esteja disponível, um dos membros da equipe precisa ativá-lo manualmente. Isso garante melhor controle sobre os recursos e evita custos desnecessários na AWS.

---

## 🚀 Tecnologias Utilizadas

O projeto **NavalStrike** faz uso de diversas tecnologias para garantir um funcionamento eficiente e escalável. Abaixo, detalhamos cada uma delas e seu papel dentro do sistema.

### 🐍 Python
Python é a principal linguagem utilizada no **backend** do projeto. Sua escolha se deve à facilidade de desenvolvimento, vasta gama de bibliotecas e compatibilidade com servidores de alto desempenho.

**📌 Papel no projeto:**
- Implementação do **servidor do jogo**;
- Gerenciamento de **WebSockets** para comunicação em tempo real;
- Processamento da lógica do jogo de **Batalha Naval**;
- Integração com a infraestrutura de **AWS**.

---

### 🌍 Flask
Flask é um **microframework** para aplicações web em Python. Ele foi escolhido por ser leve, flexível e fácil de integrar com **WebSockets**.

**📌 Papel no projeto:**
- Criação da API do jogo;
- Gerenciamento das **rotas REST**;
- Configuração do servidor **WebSocket** com **Flask-SocketIO**;
- Comunicação entre os jogadores e o servidor.

---

### 🌐 Nginx
Nginx é um **servidor web** que atua como um proxy reverso e balanceador de carga. Ele é essencial para garantir alta disponibilidade e desempenho.

**📌 Papel no projeto:**
- Servir os arquivos **HTML, CSS e JavaScript** para o front-end;
- Gerenciar as conexões **HTTP e WebSocket**;
- Melhorar o desempenho do site com **cache** e otimizações;
- Redirecionar requisições para o backend Flask.

---

### 🎨 HTML, CSS e JavaScript
Estas são as principais tecnologias utilizadas para a interface do jogo.

**📌 Papel no projeto:**
- **HTML:** Estrutura das páginas do jogo (**index.html, singleplayer.html, multiplayer.html**);
- **CSS:** Estilização e responsividade da interface gráfica (**global.css, multiplayer.css**);
- **JavaScript:** Programação do front-end, permitindo a interação do jogador com o jogo (**singleplayer.js, multiplayer.js**).

---

### 🔄 WebSocket
WebSocket é um protocolo de comunicação **bidirecional** que permite a troca de mensagens em **tempo real** entre cliente e servidor.

**📌 Papel no projeto:**
- Comunicação entre jogadores durante as partidas multiplayer;
- Envio e recebimento de jogadas sem necessidade de recarregar a página;
- Gerenciamento de **matchmaking** e organização das partidas.

---

### ☁️ AWS (Amazon Web Services)
O jogo está hospedado em uma **instância EC2** da **AWS**, garantindo **escalabilidade e disponibilidade**.

**📌 Papel no projeto:**
- Hospedagem do **backend** e **servidor WebSocket**;
- Infraestrutura para rodar o Flask e gerenciar conexões simultâneas;
- Alta **disponibilidade** e **desempenho** para múltiplos jogadores.

---

### 🌎 NoIP
O NoIP é um serviço de **DNS dinâmico**, que permite acessar o servidor utilizando um **nome de domínio fixo**.

**📌 Papel no projeto:**
- Permite que o jogo seja acessado em **navalstrike.ddns.net**, mesmo que o IP da AWS mude;
- Facilita o acesso ao jogo sem necessidade de lembrar endereços IPs complexos.

---

### 🔒 Certbot Nginx
O Certbot é uma ferramenta para configurar e gerenciar certificados **SSL/TLS**, garantindo uma conexão segura **HTTPS**.

**📌 Papel no projeto:**
- Emissão de **certificados SSL gratuitos** através do **Let's Encrypt**;
- Configuração automática do **Nginx** para servir páginas com **HTTPS**;
- Garantia de **segurança e proteção** contra ataques de interceptação de dados.

---

Aqui está a versão aprimorada da seção do README, com instruções mais detalhadas e organizadas para rodar o **NavalStrike** corretamente.  

---

# 🚀 Como Rodar o Projeto na Sua Máquina  

Para executar o **NavalStrike** localmente, siga os passos abaixo. O projeto é dividido em **Backend (servidor Flask)** e **Frontend (interface do jogo)**.  

---

## 🔧 1. Configurar o Backend (Servidor Flask)  

O backend do **NavalStrike** é responsável por gerenciar a lógica do jogo, comunicação WebSocket e controle das partidas. Ele foi desenvolvido em **Python** com **Flask** e precisa de um ambiente virtual para rodar corretamente.  

### 🖥️ Passos para configurar:  

1️⃣ **Clone o repositório** e entre na pasta do backend:  
```bash
git clone https://github.com/Keltonmd/NavalStrike.git
cd NavalStrike/home/admin/backend
```

2️⃣ **Crie e ative um ambiente virtual (venv)** dentro da pasta `backend`:  
```bash
python3 -m venv .venv
source .venv/bin/activate  # Para Linux/macOS
# No Windows, use: .venv\Scripts\activate
```

3️⃣ **Instale as dependências do projeto**:  
```bash
pip install -r requirements.txt
```

4️⃣ **Execute o servidor Flask**:  
```bash
python run.py
```
> O servidor estará rodando por padrão em **http://0.0.0.0:5000**.  

---

## 🎨 2. Configurar o Frontend (Interface do Jogo)  

O frontend do **NavalStrike** pode ser rodado diretamente no navegador, utilizando uma ferramenta como **Live Server** do VS Code.  

### 🖥️ Passos para configurar:  

1️⃣ **Abra a pasta do frontend** no VS Code ou outro editor.  

2️⃣ **Instale e inicie o Live Server** (se ainda não tiver a extensão instalada, adicione-a no VS Code).  

3️⃣ **Acesse o jogo no navegador**:  
   - `http://127.0.0.1:5500/index.html` (caso esteja rodando pelo Live Server).  

---

## 🔄 3. Alterar a Rota do WebSocket para o Ambiente Local  

No código do **frontend**, nos arquivos `js/singleplayer.js` e `js/multiplayer.js`, é necessário modificar a conexão WebSocket para apontar para o **IP do ambiente local**.  

📌 **Altere esta linha:**  
```js
const socket = io("https://navalstrike.ddns.net");  // Original
```
🔄 **Para o IP local do Flask** (exemplo: `http://127.0.0.1:5000`):  
```js
const socket = io("http://127.0.0.1:5000");  // Localhost
```

Se o servidor estiver rodando em outra máquina da rede, altere para o **IP correto**.

---

## 🚀 4. Rodar o Flask para Conexões na Rede  

Se quiser que o servidor Flask aceite conexões externas (por exemplo, para jogar em rede local), execute o **run.py** com esta configuração:  
```python
socketio.run(app, host="0.0.0.0", port=5000, debug=True)
```
Isso permitirá que outros dispositivos na rede acessem o servidor.

---

Agora o **NavalStrike** está pronto para rodar no seu ambiente! 🎯💥 Se precisar de ajuda, entre em contato com a equipe! 🚀

---

## 🤝 Repositório

O código-fonte e toda a documentação do projeto estão disponíveis no repositório do GitHub:
[NavalStrike - GitHub](https://github.com/Keltonmd/NavalStrike)

[![My Skills](https://skillicons.dev/icons?i=python,aws,javascript,html,css,flask,git,)](https://skillicons.dev)

Sinta-se à vontade para explorar, contribuir e sugerir melhorias!