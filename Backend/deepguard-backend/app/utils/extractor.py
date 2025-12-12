from yt_dlp import YoutubeDL

def extract_media_url(url):
    ydl_opts = {
        "quiet": True,
        "skip_download": True,
    }

    try:
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

            # YouTube, Instagram, TikTok, FB return this:
            if "url" in info:
                return info["url"]

            # some sites return formats list
            if "formats" in info and len(info["formats"]) > 0:
                # highest quality mp4
                for f in info["formats"]:
                    if f.get("ext") == "mp4" and f.get("url"):
                        return f["url"]

        return None

    except Exception as e:
        print("Extractor error:", e)
        return None
