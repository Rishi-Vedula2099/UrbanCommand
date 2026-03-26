"""Pydantic schemas for request/response models"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# ── GPS ────────────────────────────────────────────────────────────────────────
class GpsPointSchema(BaseModel):
    lat: float = Field(..., ge=-90, le=90)
    lng: float = Field(..., ge=-180, le=180)
    heading: Optional[float] = None
    speed: Optional[float] = None
    timestamp: Optional[datetime] = None


# ── Vehicle ─────────────────────────────────────────────────────────────────────
class VehicleBase(BaseModel):
    name: str
    type: str
    license_plate: str
    driver_name: Optional[str] = None
    fuel_level: Optional[int] = None


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    driver_name: Optional[str] = None
    fuel_level: Optional[int] = None


class VehicleGpsUpdate(BaseModel):
    vehicle_id: str
    location: GpsPointSchema
    status: Optional[str] = None


class VehicleResponse(VehicleBase):
    id: UUID
    status: str
    location: Optional[GpsPointSchema] = None
    last_seen: datetime
    created_at: datetime

    class Config:
        from_attributes = True


# ── Incident ─────────────────────────────────────────────────────────────────────
class IncidentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    severity: str = "medium"
    location: GpsPointSchema
    address: Optional[str] = None
    reported_by: str = "system"


class IncidentUpdate(BaseModel):
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    severity: Optional[str] = None


class IncidentResponse(BaseModel):
    id: UUID
    title: str
    description: Optional[str]
    category: str
    severity: str
    status: str
    address: Optional[str]
    reported_by: str
    assigned_to: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Analytics ────────────────────────────────────────────────────────────────────
class FleetStats(BaseModel):
    total: int
    active: int
    idle: int
    emergency: int
    offline: int
    maintenance: int


class IncidentStats(BaseModel):
    total: int
    open: int
    in_progress: int
    resolved: int
    critical: int
