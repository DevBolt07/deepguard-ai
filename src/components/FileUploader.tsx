import { useState, useRef } from "react";
import { Upload, FileImage, FileVideo, FileAudio, X } from "lucide-react";

type FileType = "image" | "video" | "audio";

interface FileUploaderProps {
  type: FileType;
  onUpload: (file: File) => void;
}

const config = {
  image: {
    icon: FileImage,
    accept: "image/*",
    label: "Drop image here or click to upload",
    formats: "PNG, JPG, WEBP up to 50MB",
  },
  video: {
    icon: FileVideo,
    accept: "video/*",
    label: "Drop video here or click to upload",
    formats: "MP4, MOV, AVI up to 500MB",
  },
  audio: {
    icon: FileAudio,
    accept: "audio/*",
    label: "Drop audio here or click to upload",
    formats: "MP3, WAV, M4A up to 100MB",
  },
};

const FileUploader = ({ type, onUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { icon: Icon, accept, label, formats } = config[type];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    onUpload(selectedFile);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrag={handleDrag}
      onDragStart={handleDrag}
      onDragEnd={handleDragOut}
      onDragOver={handleDragIn}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300 ${
        isDragging
          ? "border-primary bg-primary/10"
          : file
          ? "border-success/50 bg-success/5"
          : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex flex-col items-center text-center">
        {file ? (
          <>
            <div className="p-3 rounded-xl bg-success/20 mb-3">
              <Icon className="h-8 w-8 text-success" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1 truncate max-w-[200px]">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <button
              onClick={removeFile}
              className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </>
        ) : (
          <>
            <div className={`p-3 rounded-xl mb-3 transition-colors ${
              isDragging ? "bg-primary/20" : "bg-secondary"
            }`}>
              <Upload className={`h-8 w-8 transition-colors ${
                isDragging ? "text-primary" : "text-muted-foreground"
              }`} />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">{label}</p>
            <p className="text-xs text-muted-foreground">{formats}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
