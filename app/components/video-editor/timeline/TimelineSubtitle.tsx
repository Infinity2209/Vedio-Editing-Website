'use client';

import { useDispatch } from 'react-redux';
import { updateSubtitle } from '../../../lib/redux/slices/subtitleSlice';

export default function TimelineSubtitle({ subtitle, scale }) {
  const dispatch = useDispatch();
  
  const handleDrag = (e, direction) => {
    e.stopPropagation();
    // Drag logic for resizing would go here
  };
  
  const handleDragMove = (e) => {
    // Drag move logic would go here
  };
  
  const subtitleStyle = {
    left: `${subtitle.startTime * scale}px`,
    width: `${(subtitle.endTime - subtitle.startTime) * scale}px`,
  };
  
  return (
    <div
      className="absolute h-8 bg-green-800 rounded cursor-move hover:bg-green-700"
      style={subtitleStyle}
    >
      <div className="p-1 text-xs text-white truncate">
        {subtitle.text}
      </div>
      
      {/* Resize handles */}
      <div 
        className="absolute left-0 top-0 h-full w-1.5 bg-green-500 cursor-w-resize"
        onMouseDown={(e) => handleDrag(e, 'start')}
      />
      <div 
        className="absolute right-0 top-0 h-full w-1.5 bg-green-500 cursor-e-resize"
        onMouseDown={(e) => handleDrag(e, 'end')}
      />
    </div>
  );
}
