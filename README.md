/var/www/                # Gerenciado pelo Nginx
│── navalstrike.ddns/                # Diretório servido pelo Nginx
│   ├── index.html
│── static/              # Arquivos estáticos (CSS, JS, imagens)
│   ├── css/
│   ├── js/
│       ├── battleship.js
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


/home/user/projeto/      # Aplicação Flask
│── app/
│   ├── __init__.py      # Configuração do Flask
│   ├── config.py        # Rotas REST (caso precise)
│   ├── extensions.py       # WebSockets (Flask-SocketIO)
│   ├── sockets.py        # Configuração geral
│── run.py               # Arquivo para rodar o servidor