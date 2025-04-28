'use client';

import React from 'react';
import Preview from './preview/Preview';
import Timeline from './timeline/Timeline';
import UploadSection from './upload/UploadSection';
import AudioControl from './audio/AudioControl';
import ImageOverlay from './image-overlay/ImageOverlay';

export default function VideoEditor() {
  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto p-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-gradient-x rounded-lg shadow-lg">
      <div className="flex-none overflow-hidden max-h-[400px]">
        <UploadSection />
      </div>

      <div className="flex-none overflow-hidden">
        <Timeline />
      </div>

      <div className="flex-none overflow-hidden">
        <Preview />
      </div>

      <div className="flex-none overflow-hidden">
        <AudioControl />
      </div>

      <div className="flex-none overflow-hidden">
        {/* Subtitles & Text Overlay component placeholder */}
      </div>

      <div className="flex-none overflow-hidden">
        <ImageOverlay />
      </div>
    </div>
  );
}
