# NavalStrike 🌊⚓🎯

![Banner](https://via.placeholder.com/1200x400?text=NavalStrike+-+Batalha+Naval+Multiplayer) <!-- Adicione um banner real posteriormente -->

Um sistema distribuído de Batalha Naval multiplayer desenvolvido para a disciplina de Sistemas Distribuídos do IFNMG.

## 📌 Visão Geral
Sistema de Batalha Naval em tempo real com:
- **Arquitetura Cliente-Servidor** distribuída
- Comunicação via **WebSockets** 
- Gerenciamento de sessões concorrentes
- Interface web interativa
- Hospedagem em nuvem AWS

[![Deploy Status](https://img.shields.io/badge/status-online-brightgreen)](http://navalstrike.ddns.net)
[![Python Version](https://img.shields.io/badge/python-3.11%2B-blue)](https://www.python.org/)
[![GitHub Issues](https://img.shields.io/github/issues/Keltonmd/NavalStrike)](https://github.com/Keltonmd/NavalStrike/issues)

## �🏻‍ Equipe
| Integrante               | Função Principal           | Repositório |
|--------------------------|-----------------------------|-------------|
| João Pedro Santos R.     | Backend & Lógica do Jogo    | [@JPJohn1110](https://github.com/JPJohn1110) |
| Kelton Martins D.        | Infraestrutura & Servidor   | [@Keltonmd](https://github.com/Keltonmd) |
| Lucas Magalhães R.       | Frontend & UI/UX            | [@iamlucasmagalhaes](https://github.com/iamlucasmagalhaes) |

## 🛠️ Tecnologias
**Backend:**
- Python 3.11
- Socket.IO
- Threading
- Multiprocessing
- AWS EC2

**Frontend:**
- HTML5 Canvas
- CSS Grid/Flexbox
- JavaScript Moderno (ES6+)
- WebSocket API

**Infraestrutura:**
- Nginx (Reverse Proxy)
- DNS Dinâmico (no-ip.com)
- Gerenciamento de Pacotes: pip/npm

## 🚀 Começando

### Pré-requisitos
- Python 3.11+
- Node.js 16+
- Navegador moderno

### Instalação Local
```bash
# Clonar repositório
git clone https://github.com/Keltonmd/NavalStrike.git
cd NavalStrike

# Configurar ambiente virtual (Python)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Instalar dependências do servidor
cd server
pip install -r requirements.txt

# Instalar dependências do cliente
cd ../client
npm install

# Iniciar servidor (em terminal separado)
cd ../server
python main.py

# Iniciar cliente (em outro terminal)
cd ../client
npm start