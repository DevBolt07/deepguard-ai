import uuid
import os

UPLOAD_DIR = "temp_uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

def upload_to_s3(file):
    file_id = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, file_id)

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return file_path  # return local path instead of S3 key


def delete_from_s3(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)
