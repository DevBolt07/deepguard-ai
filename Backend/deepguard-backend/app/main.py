from fastapi import FastAPI
from app.api.v1.video import router as video_router
from app.api.v1.audio import router as audio_router
from app.api.v1.link import router as link_router
from app.api.v1.image import router as image_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DeepGuard AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(video_router)
app.include_router(audio_router)
app.include_router(link_router)
app.include_router(image_router)

