'use client';

import React, { useState } from 'react';
import Preview from './preview/Preview';
import Timeline from './timeline/Timeline';
import UploadSection from './upload/UploadSection';
import AudioControl from './audio/AudioControl';
import ImageOverlay from './image-overlay/ImageOverlay';
import Subtitles from './subtitles/Subtitles';

// Utility function to format time in seconds to mm:ss
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function VideoEditor() {
  // Show UploadSection modal by default on initial load
  const [showUpload, setShowUpload] = useState(true);

  // Example state for currentTime and duration to demonstrate formatTime usage
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handler to close modal after upload completes
  const handleUploadComplete = () => {
    setShowUpload(false);
  };

  return (
    <>
      {/* UploadSection as a modal/drawer, visible by default */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowUpload(false)}
              aria-label="Close Upload Section"
            >
              &#x2715;
            </button>
            <UploadSection onUploadComplete={handleUploadComplete} />
          </div>
        </div>
      )}

      <div className="flex flex-col h-full max-w-7xl mx-auto p-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-gradient-x rounded-lg shadow-lg">
        {/* Button to open UploadSection modal */}
        <div className="mb-4">
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Upload Media
          </button>
        </div>

        {/* Main content area */}
        <div className="flex flex-1 gap-4 h-full">
          {/* Left sidebar: ImageOverlay */}
          <aside className="w-64 bg-white bg-opacity-20 backdrop-blur-sm rounded p-2 overflow-auto gap-10">
            <ImageOverlay />
            <AudioControl />
          </aside>

          {/* Right main area: Preview, Timeline, and controls */}
          <div className="flex flex-col flex-1 gap-4">
            {/* Preview section */}
            <main className="flex-1 bg-white bg-opacity-30 backdrop-blur-sm rounded p-2 flex flex-col">
              <div className="flex-1 overflow-hidden rounded">
                <Preview />
              </div>

              {/* Example usage of formatTime */}
              <div className="text-white mt-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </main>

            {/* Timeline section (moved from footer) */}
            <section className="h-68 bg-white bg-opacity-30 backdrop-blur-sm rounded p-2 overflow-auto">
              <Timeline />
            </section>

            {/* Bottom controls: Subtitles and AudioControl side by side */}
            <footer className="h-70 bg-white bg-opacity-30 backdrop-blur-sm rounded p-2 overflow-auto">
                <Subtitles />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}