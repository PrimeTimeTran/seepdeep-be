# Use Node.js LTS on Debian Bullseye
FROM node:18-bullseye

# Set working directory
WORKDIR /usr/src/app

# System dependencies (single layer for caching)
RUN apt-get update && apt-get install -y \
  git \
  python3 \
  ruby \
  openjdk-11-jre \
  golang \
  g++ \
  wget \
  unzip \
  && rm -rf /var/lib/apt/lists/*

ENV NUXT_EXPERIMENTAL_OXC=false
RUN npm install -g typescript
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx nuxt prepare
RUN npm run build
RUN chmod +x ./scripts/start.sh
ARG HOST
ARG HOST_URL
ARG MONGODB_URI

EXPOSE 8080

CMD ["sh", "./scripts/start.sh"]
