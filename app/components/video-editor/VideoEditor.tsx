'use client';

import React from 'react';
import Preview from './preview/Preview';
import Timeline from './timeline/Timeline';
import UploadSection from './upload/UploadSection';
import AudioControl from './audio/AudioControl';

export default function VideoEditor() {
  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto p-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-gradient-x rounded-lg shadow-lg">
      <div className="flex-none shadow-lg rounded-lg overflow-hidden border border-indigo-300 max-h-[400px]">
        <Preview />
      </div>

      <div className="flex-none shadow-inner rounded-lg overflow-hidden border border-indigo-200">
        <Timeline />
      </div>

      <div className="flex-none shadow-inner rounded-lg overflow-hidden border border-indigo-200">
        <AudioControl />
      </div>

      <div className="flex-none shadow-inner rounded-lg overflow-hidden border border-indigo-200 bg-white p-4">
        <UploadSection />
      </div>
    </div>
  );
}
