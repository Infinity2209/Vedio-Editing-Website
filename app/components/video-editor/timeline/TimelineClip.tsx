'use client';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function TimelineClip({ clip, index, isSelected, onSelect, moveClip }) {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'CLIP',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'CLIP',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveClip(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  
  drag(drop(ref));
  
  return (
    <div 
      ref={ref}
      className={`
        flex items-center p-2 rounded cursor-move transition-colors
        ${isSelected ? 'bg-blue-900/30 border border-blue-500' : 'bg-slate-800 hover:bg-slate-700'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
      onClick={onSelect}
      data-handler-id={handlerId}
    >
      <div className="w-12 flex-shrink-0">
        <div className="w-10 h-6 bg-slate-700 rounded overflow-hidden">
          {clip.thumbnail && (
            <img src={clip.thumbnail} alt="Clip thumbnail" className="w-full h-full object-cover" />
          )}
        </div>
      </div>
      
      <div className="flex-grow h-6 bg-slate-700 rounded overflow-hidden relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30"
          style={{ width: `${clip.duration / 10 * 100}%` }}
        />
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-white">
          {clip.name || `Clip ${index + 1}`}
        </span>
      </div>
    </div>
  );
}
