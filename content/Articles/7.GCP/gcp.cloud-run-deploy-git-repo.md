---
createdAt: 2024-02-20
title: 'Nuxt3 Cloud Run Deployment'
description: 'Google Cloud Platform: How to deploy a Nuxt3 web application to Cloud Run, a product of GCP infrastructures.'
tags: GCP, Nuxt
---

# GCP Cloud Run Service Deploy

[Demo App](https://gcp-cloud-run-example-64gv3lpybq-uc.a.run.app/)

CI/CD with Github actions, Docker registry, GCP Cloud Run & NodeJS.

The purpose of this project is to demo how to automate in CI/CD the revision of a GCP Cloud Run Service on push to a Github Repo.

## Requirements

- Github
  - Repo
  - Secrets
  - Actions
  - .yml syntax
- Docker
  - Account
  - Repo
- GCP
  - Service Agent
  - .json

## Steps

### Build app

I used NodeJS and [NPX Express Generator](https://expressjs.com/en/starter/generator.html) because it was quick & easy to get a simple web page which you can checkout [here](https://gcp-cloud-run-example-64gv3lpybq-uc.a.run.app/).

### Update Version Code

Use a Marketplace Github Action to bump the version on push to repo/trigger.
In my case I just have it as push to main because this is a POC.

## Update Response from Github Action

Github actions have a lot of helpers which allow us to manage/administer our CI/CD pipeline more easily.

In this demo I just grab the commit sha to add to the resp as POC.

### Build image

Build the container image within the job.

```sh
docker build -t primetimetran/gcp-cloud-run-example:latest . --platform linux/amd64
```

I included `--platform linux/amd64` because it'll fail in Cloud Run if I don't at the time of writing. Note that you may need to remove it for the next step to succeed.

### Test image works locally

This is what you'd do locally before integrating the CI/CD to produce a revision within Github actions

```sh
docker run -p=3000:3000 primetimetran/gcp-cloud-run-example:latest
```

We map host:container ports with the `-p=3000:3000`. So our host port 3000 will point toward the container port's 3000. If it was `-p=3005:3000` then it'd be host port `3005` to container port `3000`.

### Push image to Docker Hub

Share our local image to DockerHub's container registry so Cloud Run has access to it later.

```sh
docker push primetimetran/gcp-cloud-run-example
```

### Create a service.yaml

To programmatically create/revise a GCP Cloud Run service create a file named `service.yaml` and put in your project specific values. [Read more](https://cloud.google.com/run/docs/deploying#images).

### Test new service revision from local command:

```sh
gcloud run services replace service.yaml
```

## Resources

- [GCP Cloud Run Docs](https://cloud.google.com/run/docs/deploying#service)

## Bonus

Update index file using a step in the jobs action which updates the response to include a url to the commit which triggered the workflow.
