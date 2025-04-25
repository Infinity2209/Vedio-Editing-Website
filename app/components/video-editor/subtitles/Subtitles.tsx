'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { Input } from '../../ui/input';
import Textarea from '../../ui/textarea';
import { addSubtitle, updateSubtitle, removeSubtitle, setSelectedSubtitle } from '../../../lib/redux/slices/subtitleSlice';
import SubtitleItem from './SubtitleItem';
import SubtitleStyler from './SubtitleStyler';

export default function Subtitles() {
  const dispatch = useDispatch();
  const { subtitles, selectedSubtitleId } = useSelector((state: any) => state.subtitle);
  const { currentTime } = useSelector((state: any) => state.video);
  const [newSubtitleText, setNewSubtitleText] = useState('');
  
  const selectedSubtitle = subtitles.find((sub: any) => sub.id === selectedSubtitleId);
  
  const handleAddSubtitle = () => {
    dispatch(addSubtitle({
      text: newSubtitleText || 'New Subtitle',
      startTime: currentTime,
      endTime: currentTime + 3
    }));
    
    setNewSubtitleText('');
  };
  
  const handleSelectSubtitle = (id: string) => {
    dispatch(setSelectedSubtitle(id));
  };
  
  const handleUpdateSubtitle = (id: string, changes: any) => {
    dispatch(updateSubtitle({ id, changes }));
  };
  
  const handleRemoveSubtitle = (id: string) => {
    dispatch(removeSubtitle(id));
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
      <div className="md:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Subtitles</h2>
          
          <Button 
            onClick={() => {
              const confirmed = window.confirm('Are you sure you want to auto-generate subtitles? This may take a few minutes.');
              if (confirmed) {
                // Auto-generation logic would go here
                alert('Auto-generation feature coming soon!');
              }
            }}
            variant="outline"
            size="sm"
            className="text-xs mt-5"
          >
            Auto-Generate
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Textarea
            value={newSubtitleText}
            onChange={(e) => setNewSubtitleText(e.target.value)}
            placeholder="Enter subtitle text..."
            className="bg-slate-900 border-gray-700 flex-grow text-white"
          />
          
          <Button
            onClick={handleAddSubtitle}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {subtitles.length > 0 ? (
            subtitles.map((subtitle: any) => (
              <SubtitleItem
                key={subtitle.id}
                subtitle={subtitle}
                isSelected={subtitle.id === selectedSubtitleId}
                onSelect={() => handleSelectSubtitle(subtitle.id)}
                onUpdate={(changes) => handleUpdateSubtitle(subtitle.id, changes)}
                onRemove={() => handleRemoveSubtitle(subtitle.id)}
              />
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 border border-dashed border-gray-700 rounded">
              No subtitles added yet. Add your first subtitle above.
            </div>
          )}
        </div>
      </div>
      
      <div className="md:col-span-2">
        {selectedSubtitle ? (
          <SubtitleStyler
            subtitle={selectedSubtitle}
            onUpdate={(changes) => handleUpdateSubtitle(selectedSubtitle.id, changes)}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a subtitle to edit its style</p>
          </div>
        )}
      </div>
    </div>
  );
}
