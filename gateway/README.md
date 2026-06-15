# API Gateway (FastAPI)

A lightweight reverse-proxy gateway that sits in front of the Spring Boot
backend (`backend-settings`, port **8081**) and exposes a single entry point
with auto-generated Swagger documentation.

## What it does

- Listens on port **8080**
- Forwards `/api/auth/*` and `/api/settings/*` to the backend on port 8081
- Handles CORS for the React frontend (`http://localhost:3000`)
- Generates interactive API docs automatically

## Routes

| Method | Gateway path                | Forwards to backend         |
|--------|-----------------------------|-----------------------------|
| POST   | `/api/auth/signup`          | `/api/auth/signup`          |
| POST   | `/api/auth/login`           | `/api/auth/login`           |
| GET    | `/api/settings`             | `/api/settings`             |
| POST   | `/api/settings`             | `/api/settings`             |
| PUT    | `/api/settings/{id}`        | `/api/settings/{id}`        |
| DELETE | `/api/settings/{id}`        | `/api/settings/{id}`        |
| GET    | `/health`                   | (gateway liveness check)    |

## Run

```bash
cd gateway
pip install -r requirements.txt
python run.py
```

## Swagger / Docs

- Swagger UI:  http://localhost:8080/docs
- ReDoc:       http://localhost:8080/redoc
- OpenAPI JSON: http://localhost:8080/openapi.json

## Configuration (optional environment variables)

| Variable          | Default                  | Description                       |
|-------------------|--------------------------|-----------------------------------|
| `BACKEND_URL`     | `http://localhost:8081`  | Spring Boot backend base URL      |
| `GATEWAY_PORT`    | `8080`                   | Port the gateway listens on       |
| `CORS_ORIGINS`    | `http://localhost:3000`  | Comma-separated allowed origins   |
| `REQUEST_TIMEOUT` | `30`                     | Upstream request timeout (seconds)|

## Optional: point the frontend at the gateway

The frontend currently calls the backend directly on port 8081. To route it
through the gateway instead, change the base URLs in
`frontend/src/services/api.js` (and the auth URLs in `Login.js` / `Signup.js`)
from `http://localhost:8081` to `http://localhost:8080`. This is optional and
not required for the gateway to run.
