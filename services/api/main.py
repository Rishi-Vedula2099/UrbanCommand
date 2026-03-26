"""UrbanCommand AI — FastAPI Main Application"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from routers import vehicles, gps, incidents, analytics, ai_router
from ws.routes import ws_router
from db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="UrbanCommand AI API",
    description="Smart City Infrastructure Command Center — Realtime Fleet Tracking & AI Predictions",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://urbancommand.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(vehicles.router, prefix="/api/vehicles", tags=["vehicles"])
app.include_router(gps.router, prefix="/api/gps", tags=["gps"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["incidents"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(ai_router.router, prefix="/api/ai", tags=["ai"])
app.include_router(ws_router, prefix="/ws", tags=["websocket"])


@app.get("/", tags=["health"])
async def root():
    return {"status": "online", "service": "UrbanCommand AI API", "version": "1.0.0"}


@app.get("/health", tags=["health"])
async def health():
    return {"status": "healthy", "db": "connected", "redis": "connected"}
