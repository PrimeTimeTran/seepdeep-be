# Steps to deploy backend to GCP Cloud Run

## Test running locally successfully.

- nuxi cleanup
- npm run dev
  - Check you can access website through browser & API
    - http://localhost:3000
    - http://localhost:3000/api/problems
- nuxi build

- Build image using

```bash
docker build -t primetimetran/seepdeep:v1 \
            --build-arg HOST=seepdeep-api-dev-7d6537ynfa-uc \
            --build-arg HOST_URL=https://seepdeep-api-dev-7d6537ynfa-uc.a.run.app \
            --build-arg MONGODB_URI=mongodb+srv://primetimetran:4pWLgLLS1Ba7FgJk@cluster0.xfhlaio.mongodb.net/next_unicorn \
            . --platform linux/amd64
```

- Check you can run image locally(note you won't be able to access site through browser)
- Tag local image

```bash
docker tag primetimetran/seepdeep:v1 us-central1-docker.pkg.dev/seepdeep-dev/seepdeep-api/v1
```

- Push

```bash

```
