'use client';

import { useState } from 'react';
import UploadSection from './upload/UploadSection';
import Subtitles from './subtitles/Subtitles';
import ImageOverlay from './image-overlay/ImageOverlay';
import Preview from './preview/Preview';
import Timeline from './timeline/Timeline';
import Export from './export/Export';

const tabs = [
  { key: 'upload', title: 'Upload', component: UploadSection },
  { key: 'subtitles', title: 'Subtitles', component: Subtitles },
  { key: 'overlays', title: 'Image Overlays', component: ImageOverlay },
  { key: 'export', title: 'Export', component: Export },
];

export default function VideoEditorNew() {
  const [activeTab, setActiveTab] = useState('subtitles');
  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component || Subtitles;

  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto p-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-gradient-x rounded-lg shadow-lg">
      <div className="flex-none shadow-lg rounded-lg overflow-hidden border border-indigo-300 max-h-[400px]">
        <Preview />
      </div>

      <div className="flex-none shadow-inner rounded-lg overflow-hidden border border-indigo-200">
        <Timeline />
      </div>

      <div className="flex-grow overflow-hidden rounded-lg shadow-lg border border-indigo-300 bg-white/80 backdrop-blur-md p-6">
        <div className="flex flex-col space-y-6">
          {tabs.map(tab => (
            <div key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left text-xl font-semibold p-2 rounded ${
                  activeTab === tab.key ? 'bg-indigo-200 text-indigo-900' : 'bg-white text-gray-700'
                }`}
              >
                {tab.title}
              </button>
              {activeTab === tab.key && (
                <div className="mt-4 h-full overflow-auto">
                  <tab.component />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
