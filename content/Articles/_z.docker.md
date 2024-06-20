# Docker

## Install Docker Desktop
Install Docker by installing [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 📜 Create/Write/Define Dockerfile
Define a `Dockerfile` in the root directory of the app you want to containerize.

## 🩻  Build image:
Create a image from the Dockerfile. An image is more or less minified/optimized code which Docker containers must have to run.

`docker image build .`

Look for Dockerfile in this directory and use it to build an image.

### 📇 Build with name/tag:version
Look for Dockerfile in this directory and use it to build an image with name, tag, version.

`docker build -t primetimetran/turboship:v1 .`

## 🏃🏻 Run container
Start a container using the newly created image, `primetimetran/turboship:v1`, also exposing it's internal port `3000` on the host machine's port `3000`.

`docker run -p 3000:3000 primetimetran/turboship:v1`

## 👀 View Containers

`docker ps`

## 🕵🏻‍♂️ View Detailed Container Info

`docker inspect`

## 🌎 Inspect running container

`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 3ebb27d047cd`

## 🧧 Pass Env Var from command line

`docker compose run -e MONGODB_URI=mongodb://localhost:27017/turboship`

## Tagging

Adding tags to an image is how you'll figure out whats what in a long list of docker images.

The pattern is typically docker-username/project-name:version

## Publishing
Publishing to Dockerhub's registry.

`docker push primetimetran/turboship:v1`