# 🚀 **DeepGuard AI – Backend API Specification (Frontend Integration Guide)**
# 📌 **BASE URL (Local Development)**
```
http://localhost:8000
```
{Note : Before running backend make sure  to ceate virtual enviroment and download requirements
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
}

# ✅ **1. Upload Image for Deepfake Detection**
### **Endpoint**
```
POST /image/scan
```
### **Form Data**
| Field | Type                         | Description   |
| ----- | ---------------------------- | ------------- |
| file  | File (.jpg/.jpeg/.png/.webp) | Image to scan |
### **Response Example**
```json
{
  "status": "success",
  "deepfake_probability": 0.87,
  "model_breakdown": {
    "cnn_score": 0.84,
    "forensics_score": 0.91,
    "final_score": 0.87
  }
}
```

# ✅ **2. Upload Video for Deepfake Detection**
### **Endpoint**
```
POST /video/scan
```
### **Form Data**
| Field | Type                  | Description   |
| ----- | --------------------- | ------------- |
| file  | File (.mp4/.mov/.avi) | Video to scan |
### **Response Example**
```json
{
  "status": "success",
  "deepfake_probability": 0.91,
  "model_breakdown": {
    "xception_score": 0.92,
    "ffpp_score": 0.89,
    "lipsync_score": 0.93,
    "final_score": 0.91
  }
}
```

# ✅ **3. Upload Audio for Voice Clone Detection**
### **Endpoint**
```
POST /audio/scan
```
### **Form Data**
| Field | Type                       |
| ----- | -------------------------- |
| file  | File (.mp3/.wav/.m4a/.aac) |
### **Response Example**
```json
{
  "status": "success",
  "voice_clone_probability": 0.79,
  "model_breakdown": {
    "rawnet_score": 0.75,
    "asvspoof_score": 0.82,
    "final_score": 0.79
  }
}
```

# 🔗 **4. Scan a URL (YouTube, Instagram, Facebook, TikTok, Direct Media)**
### **Endpoint**
```
POST /link/scan
```
### **Query Params**
| Param | Description              |
| ----- | ------------------------ |
| url   | URL of video/image/audio |
Example:
```
/link/scan?url=https://youtu.be/abc123
```

### **Backend Behavior**
1️⃣ Detects platform (YouTube, Instagram, etc.)
2️⃣ Extracts the *actual media file URL* using `yt-dlp`
3️⃣ Downloads the real media
4️⃣ Detects media type (image/video/audio)
5️⃣ Runs appropriate AI model
6️⃣ Deletes temporary file
7️⃣ Returns deepfake scorr
### **Response Example**
```json
{
  "media_type": "video",
  "deepfake_probability": 0.93,
  "details": {
    "xception_score": 0.94,
    "ffpp_score": 0.91,
    "lipsync_score": 0.95,
    "final_score": 0.93
  }
}
```

--
# 🗂️ **5. How Upload Storage Works (Frontend Needs to Know)**
### ✔ No cloud storage in dev
### ✔ Uploaded files stored temporarily in backend folder `temp_uploads/`
### ✔ Files are deleted after model analysis
### ✔ Nothing is stored permanently
### ✔ Privacy-first and perfect for hackathons

So the frontend dev does **not** need to worry about storage.
---

# 🎯 **6. HTTP Request Examples (Frontend Copy-Paste Ready)**
### 📌 Image Upload (React Axios)
```js
const formData = new FormData();
formData.append("file", selectedFile);
axios.post("http://localhost:8000/image/scan", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
```

### 📌 Video Upload
```js
formData.append("file", selectedVideo);
axios.post("http://localhost:8000/video/scan", formData);
```

### 📌 Audio Upload
```js
formData.append("file", selectedAudio);
axios.post("http://localhost:8000/audio/scan", formData);
```

### 📌 Link Scan
```js
axios.post("http://localhost:8000/link/scan?url=" + encodeURIComponent(url));


# 🔥 **7. Important Notes for Frontend Teammate**
### ✔ Don’t send Base64
Use `FormData()` for file uploads.

### ✔ For link scanning:
User enters a link → send it directly to backend → backend handles extraction.

### ✔ Show loader for 2–5 seconds
Models + yt-dlp extraction take time.

### ✔ Show probability as:
* **Green** (0–40%) Safe
* **Yellow** (40–70%) Suspicious
* **Red** (70–100%) Likely Deepfake


# 🎁 **8. These 4 Features Are Ready**
### 1️⃣ Upload Image → Deepfake Detection
### 2️⃣ Upload Video → Deepfake Detection
### 3️⃣ Upload Audio → Voice Clone Detection
### 4️⃣ Scan URL → Auto-Extract → Detect Media → Run AI Models