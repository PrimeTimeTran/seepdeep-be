# Dockerfile
FROM node:18-alpine3.18

WORKDIR /usr/src/app

RUN apk add git
RUN apk update && \
    apk upgrade && \
    apk add python3 ruby nodejs npm dart openjdk11 go g++
RUN npm install -g typescript
ENV PATH "$PATH:/usr/lib/dart/bin"

RUN echo "Python version: $(python3 --version)" && \
    echo "Ruby version: $(ruby --version)" && \
    echo "Node.js version: $(node --version)" && \
    echo "npm version: $(npm --version)" && \
    echo "Dart version: $(dart --version)" && \
    echo "Java version: $(java -version 2>&1 | head -n 1)" && \
    echo "Go version: $(go version)" && \
    echo "C++ compiler version: $(g++ --version)"

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