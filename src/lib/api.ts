const API_BASE_URL = "http://localhost:8000";

export interface ScanResult {
  status: string;
  deepfake_probability?: number;
  voice_clone_probability?: number;
  media_type?: string;
  model_breakdown?: Record<string, number>;
  details?: Record<string, number>;
}

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number, public isNetworkError?: boolean) {
    super(message);
    this.name = "ApiError";
  }
}

const handleResponse = async (response: Response, endpoint: string): Promise<ScanResult> => {
  if (!response.ok) {
    console.error(`[API Error] ${endpoint} failed with status ${response.status}`);
    throw new ApiError(`Server error: ${response.status}`, response.status);
  }
  
  const data = await response.json();
  console.log(`[API Success] ${endpoint} response:`, data);
  return data;
};

const handleFetchError = (error: unknown, endpoint: string): never => {
  console.error(`[API Error] ${endpoint} request failed:`, error);
  
  if (error instanceof ApiError) {
    throw error;
  }
  
  if (error instanceof TypeError && error.message.includes("fetch")) {
    throw new ApiError("Cannot connect to backend. Please ensure the server is running on localhost:8000", undefined, true);
  }
  
  throw new ApiError(error instanceof Error ? error.message : "Unknown error occurred");
};

export const scanImage = async (file: File): Promise<ScanResult> => {
  const endpoint = "/image/scan";
  console.log(`[API] Uploading image: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
  
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response, endpoint);
  } catch (error) {
    return handleFetchError(error, endpoint);
  }
};

export const scanVideo = async (file: File): Promise<ScanResult> => {
  const endpoint = "/video/scan";
  console.log(`[API] Uploading video: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
  
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response, endpoint);
  } catch (error) {
    return handleFetchError(error, endpoint);
  }
};

export const scanAudio = async (file: File): Promise<ScanResult> => {
  const endpoint = "/audio/scan";
  console.log(`[API] Uploading audio: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
  
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response, endpoint);
  } catch (error) {
    return handleFetchError(error, endpoint);
  }
};

export const scanLink = async (url: string): Promise<ScanResult> => {
  const endpoint = `/link/scan?url=${encodeURIComponent(url)}`;
  console.log(`[API] Scanning URL: ${url}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
    });
    return handleResponse(response, `/link/scan`);
  } catch (error) {
    return handleFetchError(error, "/link/scan");
  }
};

export const getProbabilityColor = (probability: number): "safe" | "suspicious" | "danger" => {
  if (probability <= 0.4) return "safe";
  if (probability <= 0.7) return "suspicious";
  return "danger";
};
