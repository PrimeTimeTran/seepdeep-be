---
createdAt: 2024-02-20
title: 'Deploy a Nuxt3 App to a Cloud Run Service'
description: "Steps to ensure successful deploy a Nuxt3 web application to GCP's Cloud Run service/product."
tags: GCP, Nuxt, Cloud Run
---

# GCP: Nuxt3 Cloud Run Deployment

How to deploy Turboship, a Nuxt3 app, on GCP infrastructure

## Dependencies

- [Google Cloud Platform(G.C.P.) account](https://cloud.google.com/gcp)
- [GCP: Artifact Registry](https://cloud.google.com/artifact-registry/docs?hl=en)
- [GCP: Cloud Run](https://cloud.google.com/artifact-registry/docs?hl=en)

## Steps

### Dockerize your app

I suggest you expose your app on port `8080` as it's the default GCP Cloud Run uses.

### Build Image

```sh
docker build -t primetimetran/turboship . --platform linux/amd64
```

> I've added `--platform linux/amd64` because of this [bug/post](https://stackoverflow.com/questions/77998443/simple-docker-image-for-python-on-macos-doesnt-run-in-google-cloud-run-exec?noredirect=1&lq=1) I ran into.

### Navigate to GCP Artifact Registry Product & create a repo

The [repo](https://console.cloud.google.com/artifacts) will hold your images.

### Tag image you created following GCP conventions

Tag your local image following [GCP docs/conventions](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling#tag).

```sh
docker tag primetimetran/turboship us-central1-docker.pkg.dev/turboship-dev/anotsosecretproject/turboship
```

> It's important to have the `region-datacenter`-docker.pkg/`project-id`/`repo-name`/`image-name`

In other words the tag's mapping is as follows:

- region-datacenter: `us-central1`
- project-id: `turboship-dev`
- repo-name: `repo-name`
- image-name: `image-name`

### Authenticate Region

To build on your local you'll need to be authenticated(as opposed to building in GCP console).

```sh
gcloud auth configure-docker us-central1-docker.pkg.dev
```

### Push image to GCP registry/repo.

GCP needs a copy of the image. Artifact registry holds it while Cloud Run deploys/hosts it.

```sh
docker push us-central1-docker.pkg.dev/turboship-dev/anotsosecretproject/turboship
```

A success means something like this back:

```sh
us-central1-docker.pkg.dev/v2/turboship-dev/anotsosecretproject/turboship/blobs/sha256:4f44545e39b2d39866515e7aadec82100f6a7164b24d721f5e5fdbd170868689
```

#### Create a new service selecting from the right drawer menu(because it'll have the image hash)

## Resources

https://dev.to/sakko/deploying-nuxtjs-on-google-cloud-run-1fic

gcloud builds submit --project "project-name" --config=./cloud-build.yaml

## Cheatsheet

- [Artifact Repository](https://console.cloud.google.com/artifacts/docker/turboship-dev/us-central1/anotsosecretproject/turboship?hl=en&project=turboship-dev)
- [Cloud Run Logs](https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22turboship%22%0Aresource.labels.revision_name%3D%22turboship-00011-6qj%22;cursorTimestamp=2024-02-20T20:37:31.407052801Z;duration=PT1H?project=turboship-dev)
- [Cloud Run Services](https://console.cloud.google.com/run?project=turboship-dev)

gcloud logging read "resource.type=\"cloud_run_revision\" AND resource.labels.service_name=\"turboship\"" --project=turboship-dev --limit=1000
