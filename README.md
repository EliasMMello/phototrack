PhotoTrack - App de Fotos com Geolocalização (MVP)

1. DESCRIÇÃO GERAL
--------------------------------------------------------------------------------
Aplicação web client-side (HTML5, CSS3, JavaScript Vanilla puro) projetada para 
dispositivos móveis e navegadores modernos. 

Permite capturar fotos em alta resolução ou selecionar imagens da galeria e 
carimbar automaticamente no rodapé a estampa oficial com:
- Logotipo posicionado à esquerda;
- Tarja azul institucional semi-transparente;
- Linha 1: [Logradouro], [Número] - [Bairro], [Cidade] - [UF], [CEP]
- Linha 2: Lat: [Latitude com 6 casas decimais], Long: [Longitude com 6 casas decimais]
- Linha 3: [Dia da Semana], [DD/MM/AAAA], [HH:MM:SS], GMT[X]

Todo o processamento é 100% executado no navegador do usuário via HTML5 Canvas, 
sem envio de fotos para servidores externos ou necessidade de backend.


--------------------------------------------------------------------------------
2. ESTRUTURA DOS ARQUIVOS
--------------------------------------------------------------------------------
├── index.html              -> Estrutura HTML5 com viewfinder e preview
├── style.css               -> Estilos responsivos com tema mobile-first
├── app.js                  -> Câmera, GPS, API Nominatim, Canvas e Download
├── README.txt              -> Este guia de execução e testes
└── assets/
    ├── icon.jfif           -> Ícone do aplicativo
    └── logotipo_novacap.png -> Logotipo oficial da marca NOVACAP


--------------------------------------------------------------------------------
3. POR QUE É NECESSÁRIO HTTPS NO CELULAR?
--------------------------------------------------------------------------------
As APIs modernas de Câmera (navigator.mediaDevices.getUserMedia) e Geolocalização 
(navigator.geolocation) são classificadas pelos navegadores (Chrome, Safari, 
Edge, Firefox) como "Powerful Features". Por regras internacionais de privacidade:
- No computador (localhost / 127.0.0.1): funcionam via HTTP normal.
- No celular (IP de rede local como 192.168.x.x): exigem OBRIGATORIAMENTE conexão HTTPS.


--------------------------------------------------------------------------------
4. COMO EXECUTAR LOCALMENTE NO COMPUTADOR (TESTES RÁPIDOS)
--------------------------------------------------------------------------------
Abra a pasta do projeto no terminal ou prompt de comando e use uma das opções:

Opção A (Python 3):
    python -m http.server 8080
    -> Acesse no navegador do PC: http://localhost:8080

Opção B (Node.js / npx):
    npx serve .
    ou
    npx http-server -p 8080
    -> Acesse: http://localhost:8080

Opção C (Visual Studio Code):
    Instale a extensão "Live Server", clique com o botão direito em index.html 
    e selecione "Open with Live Server".


--------------------------------------------------------------------------------
5. COMO TESTAR DIRETAMENTE NO CELULAR (COM HTTPS)
--------------------------------------------------------------------------------

MÉTODO 1: GitHub Pages (Mais simples e 100% gratuito)
1. Crie um repositório no seu GitHub e suba os arquivos do projeto.
2. Vá em Settings > Pages > Source e escolha a branch principal ("main" ou "master").
3. O GitHub fornecerá uma URL HTTPS segura (ex: https://seu-usuario.github.io/phototrack/).
4. Abra esse link no navegador do celular (Chrome ou Safari) e permita a câmera e o GPS.

MÉTODO 2: Ngrok ou LocalTunnel (Túnel HTTPS instantâneo para seu PC)
1. Inicie o servidor local no seu PC (ex: python -m http.server 8080).
2. No terminal, execute:
   npx ngrok http 8080
   ou
   npx localtunnel --port 8080
3. O terminal gerará uma URL segura (ex: https://abc-123.ngrok-free.app).
4. Abra o link gerado no celular.

MÉTODO 3: Depuração Remota USB (Chrome DevTools)
1. Conecte o celular ao PC via cabo USB com "Depuração USB" ativada.
2. No Chrome do PC, acesse: chrome://inspect
3. Ative o "Port forwarding": direcione a porta 8080 do celular para localhost:8080.
4. No Chrome do celular, basta acessar: http://localhost:8080 (o navegador trata 
   o localhost no celular como origem segura e libera a câmera e o GPS).


--------------------------------------------------------------------------------
6. FUNCIONAMENTO DO MODO OFFLINE E TRATAMENTO DE ERROS
--------------------------------------------------------------------------------
- Sem Internet / Conexão fraca: Se a API Nominatim (OpenStreetMap) não responder, 
  a Linha 1 exibirá automaticamente: "Endereço: Indisponível (Sem Conexão)".
- Coordenadas GPS e Data/Hora continuam funcionando mesmo sem internet.
- Caso o usuário não tenha câmera ou utilize desktop sem webcam, o aplicativo 
  oferece o botão de Galeria (ícone de foto) para selecionar qualquer imagem 
  do disco e aplicar a estampa com a mesma precisão.
================================================================================
