# Dockerfile
FROM node:18-alpine3.18

WORKDIR /usr/src/app

RUN apk update && apk upgrade
RUN apk add git

COPY .env.production .
COPY package.json .
COPY package-lock.json ./
COPY ./scripts/start.sh .
COPY . .

RUN chmod +x start.sh
RUN npm install 

ARG HOST
ARG HOST_URL
ARG MONGODB_URI

RUN echo $HOST
RUN echo $MONGODB_URI
RUN echo $HOST_URL

RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "cd /usr/src/app && ./scripts/start.sh"]