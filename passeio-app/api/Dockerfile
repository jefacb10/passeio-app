FROM node:24-alpine
#Origem da imagem

WORKDIR /app
#Cria pasta app

RUN npm install -g json-server@0.17.4
#Executa a instalação do Json-Server

COPY ./db.production.json .
#Copia o banco para dentro da pasta app

EXPOSE 4000
#Expoe a porta da aplicação

ENTRYPOINT json-server --watch ./db.production.json --host 0.0.0.0 --port 4000
#Inicializa o sistema


