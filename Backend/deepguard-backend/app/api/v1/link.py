import requests
from fastapi import APIRouter, HTTPException
from app.utils.extractor import extract_media_url
from app.utils.helpers import download_media_from_url
from app.models.video_model import run_video_inference
from app.models.image_model import run_image_inference
from app.models.audio_model import run_audio_inference

router = APIRouter(prefix="/link", tags=["Link Scan"])

@router.post("/scan")
async def scan_link(url: str):
    media_url = extract_media_url(url)

    if not media_url:
        raise HTTPException(400, "Unable to extract media URL")

    file_path, media_type = download_media_from_url(media_url)

    if not file_path or media_type == "unknown":
        raise HTTPException(400, "Unable to download or detect media type")

    if media_type == "image":
        result = run_image_inference(file_path)

    elif media_type == "video":
        result = run_video_inference(file_path)

    elif media_type == "audio":
        result = run_audio_inference(file_path)

    else:
        raise HTTPException(400, f"Unsupported media type: {media_type}")

    return {
        "media_type": media_type,
        "deepfake_probability": result["final_score"],
        "details": result
    }
