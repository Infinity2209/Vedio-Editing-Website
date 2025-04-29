"use client";

import Upload from "./Upload";

interface UploadSectionProps {
  onUploadComplete?: () => void;
}

export default function UploadSection({ onUploadComplete }: UploadSectionProps) {
  return (
    <div className="space-y-6 mx-5 bg-white p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white">Upload Video</h2>
      <Upload onUploadComplete={onUploadComplete} />
    </div>
  );
}
