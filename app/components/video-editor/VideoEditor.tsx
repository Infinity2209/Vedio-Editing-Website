
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsTrigger } from '../ui/tabs';
import UploadSection from './upload/UploadSection';
import Subtitles from './subtitles/Subtitles';
import ImageOverlay from './image-overlay/ImageOverlay';
import Preview from './preview/Preview';
import Timeline from './timeline/Timeline';
import Export from './export/Export';
import Button from '../ui/Button';

export default function VideoEditor() {
  const [activeTab, setActiveTab] = useState('subtitles');

  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto p-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-gradient-x rounded-lg shadow-lg">
      <div className="flex-none shadow-lg rounded-lg overflow-hidden border border-indigo-300 max-h-[400px]">
        <Preview />
      </div>

      <div className="flex-none shadow-inner rounded-lg overflow-hidden border border-indigo-200">
        <Timeline />
      </div>

      <div className="flex-grow overflow-hidden rounded-lg shadow-lg border border-indigo-300 bg-white/80 backdrop-blur-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col space-y-4 p-4">
          {/* For each tab trigger, render the trigger and its content immediately below */}
          <div style={{margin: "1rem", gap:"1rem"}}>
            <TabsTrigger
              value="upload"
              className="w-full rounded-t-md bg-white data-[state=active]:bg-indigo-200 data-[state=active]:text-indigo-900 transition-colors duration-300"
            >
              Upload
            </TabsTrigger>
            <TabsContent value="upload" className="border border-t-0 border-indigo-300 rounded-b-md p-4 bg-white">
              <UploadSection />
            </TabsContent>
          </div>

          <div style={{margin: "1rem", gap:"1rem"}}>
            <TabsTrigger
              value="subtitles"
              className="w-full rounded-t-md bg-white data-[state=active]:bg-indigo-200 data-[state=active]:text-indigo-900 transition-colors duration-300"
            >
              Subtitles
            </TabsTrigger>
            <TabsContent value="subtitles" className="border border-t-0 border-indigo-300 rounded-b-md p-4 bg-white">
              <Subtitles />
            </TabsContent>
          </div>

          <div style={{margin: "1rem", gap:"1rem"}}>
            <TabsTrigger
              value="overlays"
              className="w-full rounded-t-md bg-white data-[state=active]:bg-indigo-200 data-[state=active]:text-indigo-900 transition-colors duration-300"
            >
              Image Overlays
            </TabsTrigger>
            <TabsContent value="overlays" className="border border-t-0 border-indigo-300 rounded-b-md p-4 bg-white">
              <ImageOverlay />
            </TabsContent>
          </div>

          <div style={{margin: "1rem", gap:"1rem"}}>
            <TabsTrigger
              value="export"
              className="w-full rounded-t-md bg-white data-[state=active]:bg-indigo-200 data-[state=active]:text-indigo-900 transition-colors duration-300"
            >
              Export
            </TabsTrigger>
            <TabsContent value="export" className="border border-t-0 border-indigo-300 rounded-b-md p-4 bg-white">
              <Export />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
