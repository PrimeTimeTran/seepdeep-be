# Dockerfile
FROM node:18-alpine3.18

WORKDIR /usr/src/app

RUN apk update
RUN apk upgrade
RUN apk add git
RUN apk add python3
RUN apk add ruby
RUN apk add nodejs
RUN apk add npm
RUN apk add openjdk11
RUN apk add go
RUN apk add g++
ENV DART_VERSION 3.3.4
ENV DART_SDK_URL https://storage.googleapis.com/dart-archive/channels/stable/release/${DART_VERSION}/sdk/dartsdk-linux-x64-release.zip
RUN apk add unzip
RUN wget -q $DART_SDK_URL -O /tmp/dart-sdk.zip && \
    unzip -q /tmp/dart-sdk.zip -d /usr/local && \
    rm /tmp/dart-sdk.zip
ENV PATH "$PATH:/usr/local/dart-sdk/bin"

# Clean up
RUN apk del unzip

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