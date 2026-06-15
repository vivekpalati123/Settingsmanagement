"""Request/response models mirroring the Spring Boot backend.

These are used purely so the gateway's Swagger UI documents the real payload
shapes. They mirror the Java models in backend-settings.
"""
from typing import Optional

from pydantic import BaseModel, Field


class SignupRequest(BaseModel):
    name: str = Field(..., example="Jane Doe")
    email: str = Field(..., example="jane@example.com")
    password: str = Field(..., example="secret123")


class LoginRequest(BaseModel):
    email: str = Field(..., example="jane@example.com")
    password: str = Field(..., example="secret123")


class SettingRequest(BaseModel):
    theme: Optional[str] = Field(None, example="Dark")
    language: Optional[str] = Field(None, example="English")
    fontSize: Optional[str] = Field(None, example="Medium")
    notifications: Optional[bool] = Field(None, example=True)
    privacyMode: Optional[bool] = Field(None, example=False)
