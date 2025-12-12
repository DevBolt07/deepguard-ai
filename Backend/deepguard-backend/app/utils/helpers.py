import requests
import uuid

def download_media_from_url(url):
    r = requests.get(url, stream=True)

    if r.status_code != 200:
        return None, None

    content_type = r.headers.get("Content-Type", "").lower()

    # Step 1: guess media type from content-type
    if "image" in content_type:
        ext = ".jpg"
        media_type = "image"

    elif "video" in content_type:
        ext = ".mp4"
        media_type = "video"

    elif "audio" in content_type:
        ext = ".mp3"
        media_type = "audio"

    else:
        # Step 2: fallback – guess from URL
        if ".jpg" in url or ".jpeg" in url or ".png" in url:
            ext = ".jpg"
            media_type = "image"

        elif ".mp4" in url or ".mov" in url:
            ext = ".mp4"
            media_type = "video"

        elif ".mp3" in url or ".wav" in url:
            ext = ".mp3"
            media_type = "audio"

        else:
            # Still unknown → return error
            return None, "unknown"

    filename = f"temp_{uuid.uuid4()}{ext}"

    with open(filename, "wb") as f:
        for chunk in r.iter_content(1024):
            f.write(chunk)

    return filename, media_type
