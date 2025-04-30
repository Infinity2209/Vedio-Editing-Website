"use client";

import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addScene, removeScene } from '../../../lib/redux/slices/videoSlice';

interface DragItem {
  index: number;
  type: string;
}

interface TimelineClipProps {
  clip: {
    id: string;
    name?: string;
    duration: number;
    thumbnail?: string;
  };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  moveClip: (fromIndex: number, toIndex: number) => void;
}

export default function TimelineClip({ clip, index, isSelected, onSelect, moveClip }: TimelineClipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

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
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveClip(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleAddScene = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(addScene(clip.id));
  };

  const handleRemoveScene = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeScene(clip.id));
  };

  const handleCut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Cut function is a mock and not implemented.');
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Edit function is a mock and not implemented.');
  };

  return (
    <div
      ref={ref}
      className={`
        flex flex-col cursor-move transition-colors rounded
        ${isSelected ? 'bg-blue-900/30 border border-blue-500' : 'bg-slate-800 hover:bg-slate-700'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();
      }}
      onDragStart={(e) => e.preventDefault()}
      data-handler-id={handlerId}
    >
      {/* Timeline clip box with thumbnail and name */}
      <div className="flex items-center p-2 h-16 bg-slate-700 rounded-t overflow-hidden">
        <div className="w-24 h-full rounded overflow-hidden flex-shrink-0">
          {clip.thumbnail && (
            <img
              src={clip.thumbnail}
              alt="Clip thumbnail"
              className="w-full h-full object-cover"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          )}
        </div>
        <div className="flex-grow relative ml-4 flex items-center h-full">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded"
            style={{ width: `${clip.duration / 10 * 100}%` }}
          />
          <span className="relative text-white text-sm font-semibold">
            {clip.name || `Clip ${index + 1}`}
          </span>
        </div>
      </div>

      {/* Buttons below the timeline clip box */}
      <div className="flex justify-center space-x-3 p-2 bg-slate-800 rounded-b">
        <button
          onClick={handleAddScene}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
          title="Add Scene"
        >
          Add Scene
        </button>
        <button
          onClick={handleRemoveScene}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
          title="Remove Scene"
        >
          Remove Scene
        </button>
        <button
          onClick={handleCut}
          className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-3 py-1 rounded"
          title="Cut"
        >
          Cut
        </button>
        <button
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
          title="Edit"
        >
          Edit
        </button>
      </div>
    </div>
  );
}