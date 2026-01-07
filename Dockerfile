FROM node:20-bullseye

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  git \
  ruby \
  openjdk-11-jre \
  golang \
  wget \
  unzip \
  && rm -rf /var/lib/apt/lists/*

ENV NUXT_EXPERIMENTAL_OXC=false
ENV NODE_ENV=production
RUN npm install -g typescript

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx nuxt prepare
RUN npm run build

EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
