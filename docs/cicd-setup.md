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
# Local
docker build -t primetimetran/seepdeep:v1 . --platform linux/amd64

# "Remote" aka if on CI/CD these vars will be defined within the building container so we wouldn't have to. But if you want to manually run our build we have to include these cli ARGS
docker build -t primetimetran/seepdeep:v1 \
            --build-arg HOST=my_host_name \
            --build-arg HOST_URL=http://my_host_name \
            --build-arg MONGODB_URI=mongodb+srv://my_db_username:my_db_password@cluster0.xfhlaio.mongodb.net/my_db_name \
            . --platform linux/amd64

# Example: Note password has been changed
docker build -t primetimetran/seepdeep:v1 \
            --build-arg HOST=0.0.0.0 \
            --build-arg HOST_URL=http://seepdeep-api-dev-7d6537ynfa-uc.a.run.app \
            --build-arg MONGODB_URI=mongodb+srv://primetimetran:apWLgLLS1Bm7FgJk@cluster0.xfhlaio.mongodb.net/next_unicorn \
            . --platform linux/amd64
```

- Tag image

```bash
# Local
docker tag primetimetran/seepdeep:v1 us-central1-docker.pkg.dev/seepdeep-dev/seepdeep-api/v1

# Remote
docker tag primetimetran/seepdeep:v1 us-central1-docker.pkg.dev/seepdeep-dev/seepdeep-api/v1
```

- Push image to GCP Artifact Registry

```bash
docker push us-central1-docker.pkg.dev/seepdeep-dev/seepdeep-api/v1
```

- Create new service in GCP Cloud run

```

```
