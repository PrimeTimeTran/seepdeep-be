# How to setup a CI/CD pipeline for a backend API/Service

## Repository Variables

HOST=0.0.0.0
HOST_URL=https://turboship-64gv3lpybq-uc.a.run.app
VERSION_CODE=v24

## Repository Secrets

Collect these values before getting started

ENV_CONTENT=
MONGODB_URI=
DOCKER_USERNAME=
DOCKER_PASSWORD=
GCP_CREDENTIALS=
REPO_ACCESS_TOKEN=
FIREBASE_SERVICE_ACCOUNT_TURBOSHIP_DEV=

- Create new repo on GCP Artifact Registry
  https://console.cloud.google.com/artifacts/create-repo?project=seepdeep-dev

> May need to enable the api if you've never used it for the GCP project before.

- Build image

```bash
# Remote
docker build -t primetimetran/seepdeep . --platform linux/amd64

# CLI
docker build -t primetimetran/seepdeep:v1 \
            --build-arg HOST=0.0.0.0 \
            --build-arg HOST_URL=http://seepdeep-api-dev-7d6537ynfa-uc.a.run.app \
            --build-arg MONGODB_URI=mongodb+srv://primetimetran:mypassword@cluster0.xfhlaio.mongodb.net/next_unicorn \
            . --platform linux/amd64
```

- Tag image

```bash
docker tag primetimetran/seepdeep us-central1-docker.pkg.dev/seepdeep-dev/seepdeep-api/v1
```

- Push image to GCP Artifact Registry

```bash
docker push us-central1-docker.pkg.dev/seepdeep-dev/seepdeep-api/v1
```

- Create new service in GCP Cloud run

```

```
