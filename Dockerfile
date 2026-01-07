FROM node:18-bullseye

WORKDIR /usr/src/app

# System deps (single layer)
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

# Global tools
RUN npm install -g typescript

# Copy deps first for better caching
COPY package.json package-lock.json ./

# Deterministic install (important for Nuxt + native modules)
RUN npm ci

# Copy rest of the app
COPY . .

RUN chmod +x ./scripts/start.sh

# Build Nuxt
RUN npm run build

ARG HOST
ARG HOST_URL
ARG MONGODB_URI

EXPOSE 8080

CMD ["sh", "./scripts/start.sh"]
