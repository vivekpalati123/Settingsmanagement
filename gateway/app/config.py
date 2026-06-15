"""Gateway configuration.

Values can be overridden with environment variables so the gateway works in
local dev and other environments without code changes.
"""
import os


class Settings:
    # Where the Spring Boot backend (settings + auth service) is running.
    BACKEND_URL: str = os.getenv("BACKEND_URL", "http://localhost:8081")

    # Port this API gateway listens on.
    GATEWAY_PORT: int = int(os.getenv("GATEWAY_PORT", "8080"))

    # Allowed CORS origins (the React frontend). "*" allows all in dev.
    CORS_ORIGINS: list[str] = os.getenv(
        "CORS_ORIGINS", "http://localhost:3000"
    ).split(",")

    # Upstream request timeout in seconds.
    REQUEST_TIMEOUT: float = float(os.getenv("REQUEST_TIMEOUT", "30"))


settings = Settings()
