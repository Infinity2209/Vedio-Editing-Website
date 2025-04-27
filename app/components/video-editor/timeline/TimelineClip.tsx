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

      <div className="ml-4 flex space-x-1">
        <button
          onClick={handleAddScene}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
          title="Add Scene"
        >
          Add Scene
        </button>
        <button
          onClick={handleRemoveScene}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
          title="Remove Scene"
        >
          Remove Scene
        </button>
        <button
          onClick={handleCut}
          className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded"
          title="Cut"
        >
          Cut
        </button>
        <button
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
          title="Edit"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
