from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.video_model import run_video_inference
from app.services.storage import upload_to_s3, delete_from_s3
from app.services.scoring import combine_scores

router = APIRouter(prefix="/video", tags=["Video Deepfake Detection"])

@router.post("/scan")
async def scan_video(file: UploadFile = File(...)):
    # 1. Validate file type
    if not file.filename.endswith((".mp4", ".mov", ".avi")):
        raise HTTPException(status_code=400, detail="Invalid video format")

    # 2. Upload temporary file to S3
    s3_path = upload_to_s3(file)

    # 3. Run AI Model
    model_scores = run_video_inference(s3_path)

    # 4. Combine scores
    final_score = combine_scores(model_scores)

    # 5. Delete temporary file (privacy-first)
    delete_from_s3(s3_path)

    return {
        "status": "success",
        "deepfake_probability": final_score,
        "model_breakdown": model_scores
    }
