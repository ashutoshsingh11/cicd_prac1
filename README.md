# hello-docker-backend

A minimal Node.js HTTP server that returns the current **IST (GMT+5:30)** time, containerised with Docker and shipped via a GitHub Actions CI/CD pipeline.

---

## Response

```
Hello from Docker  DD/MM/YYYY HH:MM:SS IST (GMT+5:30)
```

A `/health` endpoint returns `{"status":"ok"}` for the Docker health-check.

---

## Run locally (Node.js)

```bash
npm install
npm start
# → http://localhost:3000
```

## Run with Docker

```bash
# Build
docker build -t hello-docker-backend .

# Run
docker run -p 3000:3000 hello-docker-backend

# Test
curl http://localhost:3000
```

---

## CI/CD (GitHub Actions)

The workflow at `.github/workflows/ci-cd.yml` has three jobs:

| Job | Trigger | What it does |
|---|---|---|
| **test** | every push / PR | Runs `npm test` on Node 18 |
| **build-and-push** | push to `main`/`master` | Builds multi-arch image (`amd64` + `arm64`) and pushes to **GHCR** |
| **smoke-test** | after build | Pulls the image, starts a container, hits the endpoint |

### Secrets needed

| Secret | Description |
|---|---|
| `GITHUB_TOKEN` | Auto-provided by GitHub — used for GHCR login |
| `DOCKERHUB_USERNAME` *(optional)* | Your Docker Hub username |
| `DOCKERHUB_TOKEN` *(optional)* | Docker Hub access token |

The image is published at:
```
ghcr.io/<your-github-username>/hello-docker-backend:latest
```
