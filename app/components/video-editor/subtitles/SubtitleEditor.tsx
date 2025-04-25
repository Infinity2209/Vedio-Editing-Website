'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../ui/input';
import Button from '../../ui/Button';
import { addSubtitle, updateSubtitle, removeSubtitle } from '../../../lib/redux/slices/subtitleSlice';
import SubtitleItem from './SubtitleItem';
import SubtitleStyler from './SubtitleStyler';

export default function SubtitleEditor() {
  const dispatch = useDispatch();
  const { subtitles } = useSelector(state => state.subtitle);
  const [newSubtitleText, setNewSubtitleText] = useState('');
  const [selectedSubtitleId, setSelectedSubtitleId] = useState(null);
  
  const handleAddSubtitle = () => {
    if (newSubtitleText.trim()) {
      dispatch(addSubtitle({
        id: Date.now().toString(),
        text: newSubtitleText,
        startTime: 0,
        endTime: 5,
        style: {
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#FFFFFF',
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'bottom',
          align: 'center'
        }
      }));
      setNewSubtitleText('');
    }
  };
  
  const handleSelectSubtitle = (id) => {
    setSelectedSubtitleId(id);
  };
  
  const handleUpdateSubtitle = (id, changes) => {
    dispatch(updateSubtitle({
      id,
      changes
    }));
  };
  
  const handleRemoveSubtitle = (id) => {
    dispatch(removeSubtitle(id));
    if (selectedSubtitleId === id) {
      setSelectedSubtitleId(null);
    }
  };

  const selectedSubtitle = subtitles.find(s => s.id === selectedSubtitleId);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-black">Subtitle Editor</h2>  
      <div className="flex space-x-2 text-white">
        <Input 
          value={newSubtitleText}
          onChange={(e) => setNewSubtitleText(e.target.value)}
          placeholder="Enter subtitle text"
          className="flex-grow text-white"
        />
        <Button onClick={handleAddSubtitle}>Add</Button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {subtitles.length > 0 ? (
          subtitles.map(subtitle => (
            <SubtitleItem 
              key={subtitle.id}
              subtitle={subtitle}
              isSelected={selectedSubtitleId === subtitle.id}
              onSelect={() => handleSelectSubtitle(subtitle.id)}
              onUpdate={handleUpdateSubtitle}
              onRemove={handleRemoveSubtitle}
            />
          ))
        ) : (
          <div className="py-8 text-center text-gray-500 border border-dashed border-gray-700 rounded">
            No subtitles added yet. Add your first subtitle above.
          </div>
        )}
      </div>
      
      {selectedSubtitle && (
        <SubtitleStyler 
          subtitle={selectedSubtitle}
          onUpdate={(changes) => handleUpdateSubtitle(selectedSubtitleId, changes)}
        />
      )}
    </div>
  );
}
