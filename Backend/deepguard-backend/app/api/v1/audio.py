from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.audio_model import run_audio_inference
from app.services.storage import upload_to_s3, delete_from_s3
from app.services.scoring import combine_scores

router = APIRouter(prefix="/audio", tags=["Audio Voice Clone Detection"])

@router.post("/scan")
async def scan_audio(file: UploadFile = File(...)):
    # 1. Validate file type
    if not file.filename.endswith((".wav", ".mp3", ".m4a", ".aac", ".ogg")):
        raise HTTPException(status_code=400, detail="Invalid audio format")

    # 2. Upload temp file to S3
    s3_path = upload_to_s3(file)

    # 3. Run AI voice model
    model_scores = run_audio_inference(s3_path)

    # 4. Combine scores
    final_score = combine_scores(model_scores)

    # 5. Delete temp file (privacy-first)
    delete_from_s3(s3_path)

    return {
        "status": "success",
        "voice_clone_probability": final_score,
        "model_breakdown": model_scores
    }
