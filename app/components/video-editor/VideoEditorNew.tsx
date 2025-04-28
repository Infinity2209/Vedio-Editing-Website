'use client';

import React from 'react';
import Preview from './preview/Preview';
import Timeline from './timeline/Timeline';

export default function VideoEditorNew() {
  // Simplified to only render Preview and Timeline to isolate loading issue
  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto p-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-gradient-x rounded-lg shadow-lg">
      <div className="flex-none shadow-lg rounded-lg overflow-hidden border border-indigo-300 max-h-[400px]">
        <Preview />
      </div>

      <div className="flex-none shadow-inner rounded-lg overflow-hidden border border-indigo-200">
        <Timeline />
      </div>
    </div>
  );
}
