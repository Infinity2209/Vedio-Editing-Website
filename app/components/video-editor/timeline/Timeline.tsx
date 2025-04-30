'use client';

import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../lib/redux/store';
import { setCurrentTime, moveClip, selectClip } from '../../../lib/redux/slices/videoSlice';
import TimelineClip from './TimelineClip';
import TimelineSubtitle from './TimelineSubtitle';

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

export default function Timeline() {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { videoClips, currentTime, duration, selectedClipId } = useSelector((state: RootState) => state.video);
  const { subtitles } = useSelector((state: RootState) => state.subtitle);
  const [isDragging, setIsDragging] = useState(false);

  // Fixed timeline width in pixels
  const timelineWidth = 1000;

  // Calculate scale dynamically based on fixed timeline width and video duration
  const scale = duration > 0 ? timelineWidth / duration : 100;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !duration) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    // No scrollLeft since no horizontal scrolling
    const clickedTime = offsetX / scale;
    dispatch(setCurrentTime(Math.min(Math.max(clickedTime, 0), duration)));
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
      </div>

      <div className="relative h-8 bg-slate-900 rounded-t overflow-hidden mx-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {timeMarkers}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-36 bg-slate-800 rounded-b overflow-x-hidden overflow-y-hidden mx-5"
        onClick={handleTimelineClick}
        onMouseDown={handleMouseDown}
      >
        <div style={{ width: `${timelineWidth}px`, height: '100%' }} className="relative">
          {/* Current time indicator and clips rendering would go here */}
          {videoClips.map((clip, index) => (
            <TimelineClip
              key={clip.id}
              clip={clip}
              scale={scale}
              isSelected={clip.id === selectedClipId}
              onSelect={() => onSelectClip(clip.id)}
              onMove={(toIndex) => onMoveClip(index, toIndex)}
            />
          ))}
          {subtitles.map((subtitle) => (
            <TimelineSubtitle key={subtitle.id} subtitle={subtitle} scale={scale} />
          ))}
          <div
            className="absolute top-0 h-full border-l-2 border-red-500"
            style={{ left: currentTime * scale }}
          />
        </div>
      </div>
    </div>
  );
}
