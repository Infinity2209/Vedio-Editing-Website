'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTime } from '../../../lib/redux/slices/videoSlice';
import { useEffect, useRef, useState } from 'react';

export default function Preview() {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const { video, currentTime, duration } = useSelector((state: any) => state.video);
  const [isPlaying, setIsPlaying] = useState(false);

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

  if (!video) {
    // Return empty div instead of "No video loaded" message
    return "";
  }

  return (
    <div className="relative bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 rounded-lg overflow-hidden shadow-md ring-1 ring-indigo-400 animate-fadeIn max-h-[400px]">
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-auto rounded-md shadow-md"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        controls={false}
      />
      <div className="absolute bottom-2 left-2 flex space-x-2 items-center">
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
