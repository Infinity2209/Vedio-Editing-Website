'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '../../ui/slider';
import { Switch } from '../../ui/switch';
import { addAudioTrack, updateAudioTrack, removeAudioTrack } from '../../../lib/redux/slices/audioSlice';

export default function AudioControl() {
  const dispatch = useDispatch();
  const { audioTracks } = useSelector(state => state.audio);
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setBackgroundMusic(file.name);
      
      dispatch(addAudioTrack({
        id: Date.now().toString(),
        name: file.name,
        url: audioUrl,
        volume: 80,
        isMuted: false,
        type: 'background'
      }));
    }
  };
  
  const handleVolumeChange = (trackId, value) => {
    dispatch(updateAudioTrack({
      id: trackId,
      changes: { volume: value[0] }
    }));
  };
  
  const handleMuteToggle = (trackId, checked) => {
    dispatch(updateAudioTrack({
      id: trackId,
      changes: { isMuted: !checked }
    }));
  };
  
  const handleRemoveTrack = (trackId) => {
    dispatch(removeAudioTrack(trackId));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Audio Control</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-slate-800 rounded-lg">
          <h3 className="text-sm font-medium text-white mb-3">Original Audio</h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Switch id="original-audio" defaultChecked />
              <label htmlFor="original-audio" className="text-sm text-gray-300">Enable</label>
            </div>
            <div className="w-1/2">
              <Slider defaultValue={[80]} max={100} step={1} />
            </div>
          </div>
          
          <div className="h-12 bg-slate-900 rounded relative">
            {/* Simulated waveform */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full flex items-center justify-center space-x-1">
                {[...Array(50)].map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-blue-500 w-1"
                    style={{ 
                      height: `${Math.sin(i * 0.2) * 50 + 20}%`,
                      opacity: 0.5 + Math.sin(i * 0.2) * 0.5
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {audioTracks.map(track => (
          <div key={track.id} className="p-4 bg-slate-800 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-white">{track.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-200"
                onClick={() => handleRemoveTrack(track.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id={`track-${track.id}`} 
                  checked={!track.isMuted}
                  onCheckedChange={(checked) => handleMuteToggle(track.id, checked)}
                />
                <label htmlFor={`track-${track.id}`} className="text-sm text-gray-300">
                  {track.isMuted ? 'Muted' : 'Enabled'}
                </label>
              </div>
              <div className="w-1/2">
                <Slider 
                  value={[track.volume]} 
                  max={100} 
                  step={1}
                  onValueChange={(value) => handleVolumeChange(track.id, value)}
                />
              </div>
            </div>
            
            <div className="h-12 bg-slate-900 rounded relative">
              {/* Simulated waveform for the track */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full flex items-center justify-center space-x-1">
                  {[...Array(50)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-green-500 w-1"
                      style={{ 
                        height: `${Math.cos(i * 0.3) * 40 + 30}%`,
                        opacity: track.isMuted ? 0.2 : (0.5 + Math.cos(i * 0.3) * 0.5)
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-4 bg-slate-800 rounded-lg">
          <h3 className="text-sm font-medium text-white mb-3">Add Background Music</h3>
          
          <div className="flex flex-col space-y-3">
            <label 
              htmlFor="background-music" 
              className="flex items-center justify-center border border-dashed border-gray-600 rounded-lg p-4 cursor-pointer hover:border-gray-500"
            >
              <div className="text-center space-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
                <p className="text-sm text-gray-400">
                  {backgroundMusic ? backgroundMusic : 'Upload audio file (MP3, WAV)'}
                </p>
              </div>
              <input 
                id="background-music" 
                type="file" 
                className="hidden" 
                accept="audio/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
