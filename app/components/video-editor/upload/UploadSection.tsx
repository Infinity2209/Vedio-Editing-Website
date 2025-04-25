'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addVideo } from '../../../lib/redux/slices/videoSlice';

export default function UploadSection() {
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreview, setVideoPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);

      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          dispatch(addVideo(previewUrl));
        }
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Upload Video</h2>

      <input
        type="file"
        accept="video/mp4,video/webm,video/mov,video/avi"
        onChange={onFileChange}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700 cursor-pointer"
      />

      {isUploading && (
        <div className="text-white">Uploading... {uploadProgress}%</div>
      )}

      {videoPreview && !isUploading && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white">Preview</h3>
          <div className="aspect-video bg-black rounded overflow-hidden">
            <video
              src={videoPreview}
              className="w-full h-full object-contain"
              controls
            />
          </div>
        </div>
      )}
    </div>
  );
}
