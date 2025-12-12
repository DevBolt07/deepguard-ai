from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.image_model import run_image_inference
from app.services.storage import upload_to_s3, delete_from_s3

router = APIRouter(prefix="/image", tags=["Image Deepfake Detection"])

@router.post("/scan")
async def scan_image(file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        raise HTTPException(status_code=400, detail="Invalid image format")

    # Upload
    s3_path = upload_to_s3(file)

    # Run inference
    result = run_image_inference(s3_path)

    # Delete temp
    delete_from_s3(s3_path)

    return {
        "status": "success",
        "deepfake_probability": result["final_score"],
        "model_breakdown": result
    }
