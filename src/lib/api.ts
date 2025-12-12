const API_BASE_URL = "http://localhost:8000";

export interface ScanResult {
  status: string;
  deepfake_probability?: number;
  voice_clone_probability?: number;
  media_type?: string;
  model_breakdown?: Record<string, number>;
  details?: Record<string, number>;
}

export const scanImage = async (file: File): Promise<ScanResult> => {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch(`${API_BASE_URL}/image/scan`, {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error("Failed to scan image");
  }
  
  return response.json();
};

export const scanVideo = async (file: File): Promise<ScanResult> => {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch(`${API_BASE_URL}/video/scan`, {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error("Failed to scan video");
  }
  
  return response.json();
};

export const scanAudio = async (file: File): Promise<ScanResult> => {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch(`${API_BASE_URL}/audio/scan`, {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error("Failed to scan audio");
  }
  
  return response.json();
};

export const scanLink = async (url: string): Promise<ScanResult> => {
  const response = await fetch(
    `${API_BASE_URL}/link/scan?url=${encodeURIComponent(url)}`,
    { method: "POST" }
  );
  
  if (!response.ok) {
    throw new Error("Failed to scan link");
  }
  
  return response.json();
};

export const getProbabilityColor = (probability: number): "safe" | "suspicious" | "danger" => {
  if (probability <= 0.4) return "safe";
  if (probability <= 0.7) return "suspicious";
  return "danger";
};
