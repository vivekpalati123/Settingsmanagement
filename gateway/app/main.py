"""FastAPI API Gateway for the Settings Manager project.

This gateway sits in front of the Spring Boot backend (port 8081) and gives the
project a single entry point with auto-generated Swagger documentation.

It forwards:
  - /api/auth/*     -> backend  (signup, login)
  - /api/settings/* -> backend  (CRUD on settings)

Swagger UI:  http://localhost:8080/docs
ReDoc:       http://localhost:8080/redoc
OpenAPI:     http://localhost:8080/openapi.json
"""
import httpx
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .schemas import LoginRequest, SettingRequest, SignupRequest

app = FastAPI(
    title="Settings Manager API Gateway",
    description=(
        "Single entry point that routes requests to the Spring Boot backend. "
        "Use this gateway from the frontend instead of calling the backend "
        "directly."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Hop-by-hop headers that must not be forwarded between connections.
_EXCLUDED_RESPONSE_HEADERS = {
    "content-encoding",
    "content-length",
    "transfer-encoding",
    "connection",
}


async def _proxy(request: Request, path: str) -> Response:
    """Forward an incoming request to the backend and relay the response."""
    url = f"{settings.BACKEND_URL}{path}"
    body = await request.body()

    # Forward original headers except Host (let httpx set the correct one).
    headers = {
        k: v for k, v in request.headers.items() if k.lower() != "host"
    }

    async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT) as client:
        upstream = await client.request(
            method=request.method,
            url=url,
            content=body,
            headers=headers,
            params=request.query_params,
        )

    response_headers = {
        k: v
        for k, v in upstream.headers.items()
        if k.lower() not in _EXCLUDED_RESPONSE_HEADERS
    }

    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers,
        media_type=upstream.headers.get("content-type"),
    )


# --------------------------------------------------------------------------- #
# Health
# --------------------------------------------------------------------------- #
@app.get("/health", tags=["Gateway"])
async def health() -> dict:
    """Liveness check for the gateway itself."""
    return {"status": "up", "backend": settings.BACKEND_URL}


# --------------------------------------------------------------------------- #
# Auth routes (proxied to backend /api/auth/*)
# --------------------------------------------------------------------------- #
@app.post("/api/auth/signup", tags=["Auth"])
async def signup(payload: SignupRequest, request: Request) -> Response:
    """Register a new user."""
    return await _proxy(request, "/api/auth/signup")


@app.post("/api/auth/login", tags=["Auth"])
async def login(payload: LoginRequest, request: Request) -> Response:
    """Authenticate a user. Returns 'SUCCESS' or 'INVALID'."""
    return await _proxy(request, "/api/auth/login")


# --------------------------------------------------------------------------- #
# Settings routes (proxied to backend /api/settings/*)
# --------------------------------------------------------------------------- #
@app.get("/api/settings", tags=["Settings"])
async def get_settings(request: Request) -> Response:
    """List all saved settings."""
    return await _proxy(request, "/api/settings")


@app.post("/api/settings", tags=["Settings"])
async def save_setting(payload: SettingRequest, request: Request) -> Response:
    """Save a new settings record."""
    return await _proxy(request, "/api/settings")


@app.put("/api/settings/{setting_id}", tags=["Settings"])
async def update_setting(
    setting_id: int, payload: SettingRequest, request: Request
) -> Response:
    """Update an existing settings record by id."""
    return await _proxy(request, f"/api/settings/{setting_id}")


@app.delete("/api/settings/{setting_id}", tags=["Settings"])
async def delete_setting(setting_id: int, request: Request) -> Response:
    """Delete a settings record by id."""
    return await _proxy(request, f"/api/settings/{setting_id}")
