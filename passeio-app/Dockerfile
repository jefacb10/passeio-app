#etapa 1 - Build (rodar aplicação)
FROM node:24-alpine AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./
#./ para mais de um arquivo. Copia os arquivos que possuem as dependências

RUN npm install

COPY . .
#Copia tudo que está na pasta atual para a pasta do container

RUN npm run build --prod

#etapa 2 - Rodar a aplicação
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
#remove o que tem na pasta html que vem no nginx

COPY --from=build /app/dist/passeio-app/browser /usr/share/nginx/html
#Copia os arquivos compilados

EXPOSE 80

ENTRYPOINT nginx -g 'daemon off;'
#Comando que inicializa o nginx dentro do container