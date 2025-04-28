'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTime } from '../../../lib/redux/slices/videoSlice';

// Custom hook to simulate render process with progress and completion
function useRenderSimulation() {
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderComplete, setRenderComplete] = useState(false);

  const startRender = async () => {
    if (isRendering) return;
    setIsRendering(true);
    setRenderProgress(0);
    setRenderComplete(false);

    // Simulate render progress with interval
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setRenderProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsRendering(false);
            setRenderComplete(true);
            resolve();
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    });
  };

  return { isRendering, renderProgress, renderComplete, startRender };
}

export default function Preview() {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videos, currentTime } = useSelector((state: any) => state.video);
  const [isPlaying, setIsPlaying] = useState(false);

  const { isRendering, renderProgress, renderComplete, startRender } = useRenderSimulation();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      dispatch(setCurrentTime(videoRef.current.currentTime));
    }
  };

  const handleRender = () => {
    startRender();
  };

  const handleDownload = () => {
    if (!renderComplete) return;
    const blob = new Blob(['Simulated exported video content'], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported-video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  const videoUrl = videos[0];

  return (
    <div className="relative bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 rounded-lg overflow-hidden shadow-md ring-1 ring-indigo-400 animate-fadeIn max-h-[400px] p-4">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto rounded-md shadow-md"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        controls={false}
      />
      <div className="absolute bottom-2 left-2 flex flex-col space-y-2 items-start">
        <div className="flex space-x-2 items-center">
          <button
            onClick={togglePlay}
            className="p-2 rounded bg-indigo-400 hover:bg-indigo-300 shadow-sm transition-transform duration-300 hover:scale-110"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <rect x="6" y="4" width="4" height="8"></rect>
                <rect x="14" y="4" width="4" height="8"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <button className="p-2 rounded bg-indigo-400 hover:bg-indigo-300 shadow-sm transition-transform duration-300 hover:scale-110" aria-label="Stop">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
              <rect x="7" y="7" width="10" height="10" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button className="p-2 rounded bg-indigo-400 hover:bg-indigo-300 shadow-sm transition-transform duration-300 hover:scale-110" aria-label="Fullscreen">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>
        </div>
        <div className="w-full flex items-center space-x-2">
          <button
            onClick={handleRender}
            disabled={isRendering}
            className={`flex-1 p-2 rounded bg-green-500 hover:bg-green-400 shadow-sm transition-transform duration-300 hover:scale-110 text-white ${isRendering ? 'opacity-70 cursor-not-allowed' : ''}`}
            aria-label="Render"
          >
            {isRendering ? 'Rendering...' : 'Render'}
          </button>
          <button
            onClick={handleDownload}
            disabled={!renderComplete}
            className={`p-2 rounded bg-blue-600 hover:bg-blue-500 shadow-sm transition-transform duration-300 hover:scale-110 text-white ${!renderComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Download"
          >
            Download
          </button>
        </div>
        {isRendering && (
          <div className="w-full bg-gray-300 rounded h-2 overflow-hidden">
            <div
              className="bg-green-600 h-2 transition-all duration-300"
              style={{ width: `${renderProgress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to format time (hh:mm:ss)
function formatTime(seconds: number) {
  if (isNaN(seconds)) return '00:00';

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds();

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  }
  return `${mm}:${ss.toString().padStart(2, '0')}`;
}
