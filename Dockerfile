# Stage Build #
FROM node:18-alpine AS builder

WORKDIR /server

COPY package*.json ./
COPY .env.example ./.env

RUN npm install

COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run build

EXPOSE 8000
