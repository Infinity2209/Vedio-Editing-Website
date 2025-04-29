'use client';

import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../lib/redux/store';
import { setCurrentTime, moveClip, selectClip } from '../../../lib/redux/slices/videoSlice';
import TimelineClip from './TimelineClip';
import TimelineSubtitle from './TimelineSubtitle';

export default function Timeline() {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { videoClips, currentTime, duration, selectedClipId } = useSelector((state: RootState) => state.video);
  const { subtitles } = useSelector((state: RootState) => state.subtitle);
  const [scale, setScale] = useState(100); // pixels per second
  const [isDragging, setIsDragging] = useState(false);

  // Calculate timeline width based on video duration and scale
  const timelineWidth = duration * scale;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !duration) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const scrollLeft = containerRef.current.scrollLeft;
    const totalX = offsetX + scrollLeft;

    const clickedTime = totalX / scale;
    dispatch(setCurrentTime(Math.min(Math.max(clickedTime, 0), duration)));
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleTimelineClick(e as any);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  // Scroll to current time position
  useEffect(() => {
    if (containerRef.current && !isDragging) {
      const currentPosition = currentTime * scale;
      const containerWidth = containerRef.current.clientWidth;
      const scrollLeft = containerRef.current.scrollLeft;

      // Only scroll if current position is outside visible area
      if (currentPosition < scrollLeft || currentPosition > scrollLeft + containerWidth - 100) {
        containerRef.current.scrollLeft = currentPosition - containerWidth / 2;
      }
    }
  }, [currentTime, scale]);

  // Generate time markers
  const timeMarkers = [];
  if (duration > 0) {
    const interval = scale >= 100 ? 1 : scale >= 50 ? 5 : 10; // Adjust interval based on scale
    for (let time = 0; time <= duration; time += interval) {
      timeMarkers.push(
        <div
          key={time}
          className="absolute top-0 h-4 border-l border-gray-600"
          style={{ left: time * scale }}
        >
          <div className="text-xs text-gray-400 ml-1">{formatTime(time)}</div>
        </div>
      );
    }
  }

  const onSelectClip = (clipId: string) => {
    dispatch(selectClip(clipId));
  };

  const onMoveClip = (fromIndex: number, toIndex: number) => {
    dispatch(moveClip({ fromIndex, toIndex }));
  };

  return (
    <div className="space-y-2 mb-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-white">Timeline</h2>

        <div className="flex items-center space-x-2 mr-5">
          <span className="text-xs text-white">Zoom:</span>
          <input
            type="range"
            min={20}
            max={200}
            value={scale}
            onChange={handleScaleChange}
            className="w-24 h-1 accent-blue-500"
          />
        </div>
      </div>

      <div className="relative h-8 bg-slate-900 rounded-t overflow-hidden mx-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {timeMarkers}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-36 bg-slate-800 rounded-b overflow-x-auto overflow-y-hidden mx-5"
        onClick={handleTimelineClick}
        onMouseDown={handleMouseDown}
      >
        <div style={{ width: `${timelineWidth}px`, height: '100%' }} className="relative">
          {/* Current time indicator */}
          <div
            className="absolute top-0 h-full w-0.5 bg-red-500 z-10"
            style={{ left: `${currentTime * scale}px` }}
          />

          {/* Video clips */}
          <div className="absolute top-0 left-0 h-14 w-full">
            {videoClips.map((clip, index) => (
              <TimelineClip
                key={clip.id}
                clip={clip}
                index={index}
                isSelected={clip.id === selectedClipId}
                onSelect={() => onSelectClip(clip.id)}
                moveClip={onMoveClip}
              />
            ))}
          </div>

          {/* Subtitles */}
          <div className="absolute top-16 left-0 h-14 w-full">
            {subtitles.map(subtitle => (
              <TimelineSubtitle
                key={subtitle.id}
                subtitle={subtitle}
                scale={scale}
              />
            ))}
          </div>
        </div>
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
