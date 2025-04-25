"use client";

import React, { useState, useRef } from 'react';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const videoFiles = Array.from(selectedFiles).filter(file =>
      ['video/mp4', 'video/webm', 'video/ogg'].includes(file.type)
    );

    if (videoFiles.length !== selectedFiles.length) {
      alert('Some files were rejected. Only mp4, webm, and ogg video formats are allowed.');
    }

    const mappedFiles = videoFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );

    setFiles(current => [...current, ...mappedFiles]);

    mappedFiles.forEach(file => {
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev[file.name] + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...prev, [file.name]: 100 };
          }
          return { ...prev, [file.name]: newProgress };
        });
      }, 300);
    });
  };

  const onInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="border-2 border-dashed border-gray-400 rounded p-4 cursor-pointer text-center"
      >
        <input
          type="file"
          multiple
          accept="video/mp4,video/webm,video/ogg"
          ref={fileInputRef}
          onChange={onInputChange}
          className="hidden"
        />
        <p>Drag & drop video files here, or click to select files</p>
      </div>
      <div className="mt-4">
        {files.map(file => (
          <div key={file.name} className="mb-4 flex items-center space-x-4">
            <video
              src={file.preview}
              controls
              width={120}
              className="rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{file.name}</p>
              <div className="w-full bg-gray-300 rounded h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${uploadProgress[file.name] || 0}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
