'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '../../ui/slider';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import Button from '../../ui/Button';
import { addOverlay, updateOverlay, removeOverlay } from '../../../lib/redux/slices/overlaySlice';
import ImageOverlayItem from './ImageOverlayItem';

export default function ImageOverlay() {
  const dispatch = useDispatch();
  const { overlays } = useSelector(state => state.overlay);
  const [selectedOverlayId, setSelectedOverlayId] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      
      dispatch(addOverlay({
        id: Date.now().toString(),
        name: file.name,
        url: imageUrl,
        position: { x: 10, y: 10 },
        size: { width: 200, height: 200 },
        opacity: 100,
        border: {
          width: 0,
          color: '#FFFFFF',
          radius: 0
        },
        rotation: 0,
        zIndex: overlays.length + 1
      }));
    }
  };
  
  const handleSelectOverlay = (id) => {
    setSelectedOverlayId(id);
  };
  
  const handleUpdateOverlay = (id, changes) => {
    dispatch(updateOverlay({
      id,
      changes
    }));
  };
  
  const handleRemoveOverlay = (id) => {
    dispatch(removeOverlay(id));
    if (selectedOverlayId === id) {
      setSelectedOverlayId(null);
    }
  };

  const selectedOverlay = overlays.find(o => o.id === selectedOverlayId);

  return (
    <div className="space-y-6 mx-5">
      <h2 className="text-lg font-semibold text-white">Image Overlay</h2>
      
      <div className="p-4 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-medium text-white mb-3">Upload Image</h3>
        
        <label 
          htmlFor="overlay-image" 
          className="flex items-center justify-center border border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-gray-500"
        >
          <div className="text-center space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <p className="text-sm text-gray-400">
              Upload image (PNG, JPG, SVG)
            </p>
            <p className="text-xs text-gray-500">
              The image will be placed as an overlay on your video
            </p>
          </div>
          <input 
            id="overlay-image" 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {overlays.length > 0 ? (
          overlays.map(overlay => (
            <ImageOverlayItem 
              key={overlay.id}
              overlay={overlay}
              isSelected={selectedOverlayId === overlay.id}
              onSelect={() => handleSelectOverlay(overlay.id)}
              onUpdate={handleUpdateOverlay}
              onRemove={handleRemoveOverlay}
            />
          ))
        ) : (
          <div className="py-8 text-center text-gray-500 border border-dashed border-gray-700 rounded">
            No image overlays added yet. Upload an image to begin.
          </div>
        )}
      </div>
      
      {selectedOverlay && (
        <div className="p-4 bg-slate-800 rounded-lg space-y-4">
          <h3 className="text-sm font-medium text-white mb-2">Adjust Overlay</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position-x" className="text-xs text-gray-400">Position X</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[selectedOverlay.position.x]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleUpdateOverlay(
                    selectedOverlay.id, 
                    { position: { ...selectedOverlay.position, x: value[0] } }
                  )}
                  aria-label="Position X"
                />
                <span className="text-xs text-white w-8">{selectedOverlay.position.x}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position-y" className="text-xs text-gray-400">Position Y</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[selectedOverlay.position.y]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleUpdateOverlay(
                    selectedOverlay.id, 
                    { position: { ...selectedOverlay.position, y: value[0] } }
                  )}
                  aria-label="Position Y"
                />
                <span className="text-xs text-white w-8">{selectedOverlay.position.y}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="width" className="text-xs text-gray-400">Width</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[selectedOverlay.size.width]}
                  min={10}
                  max={800}
                  step={1}
                  onValueChange={(value) => handleUpdateOverlay(
                    selectedOverlay.id, 
                    { size: { ...selectedOverlay.size, width: value[0] } }
                  )}
                  aria-label="Width"
                />
                <span className="text-xs text-white w-12">{selectedOverlay.size.width}px</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height" className="text-xs text-gray-400">Height</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[selectedOverlay.size.height]}
                  min={10}
                  max={800}
                  step={1}
                  onValueChange={(value) => handleUpdateOverlay(
                    selectedOverlay.id, 
                    { size: { ...selectedOverlay.size, height: value[0] } }
                  )}
                  aria-label="Height"
                />
                <span className="text-xs text-white w-12">{selectedOverlay.size.height}px</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="opacity" className="text-xs text-gray-400">Opacity</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[selectedOverlay.opacity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleUpdateOverlay(
                    selectedOverlay.id, 
                    { opacity: value[0] }
                  )}
                  aria-label="Opacity"
                />
                <span className="text-xs text-white w-8">{selectedOverlay.opacity}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rotation" className="text-xs text-gray-400">Rotation</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[selectedOverlay.rotation]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={(value) => handleUpdateOverlay(
                    selectedOverlay.id, 
                    { rotation: value[0] }
                  )}
                  aria-label="Rotation"
                />
                <span className="text-xs text-white w-8">{selectedOverlay.rotation}°</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="border-width" className="text-xs text-gray-400">Border</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="border-width" className="text-xs text-gray-500">Width</Label>
                <Input
                  type="number"
                  min={0}
                  max={20}
                  value={selectedOverlay.border.width}
                  onChange={(e) => handleUpdateOverlay(
                    selectedOverlay.id,
                    { border: { ...selectedOverlay.border, width: parseInt(e.target.value) } }
                  )}
                  className="h-8"
                  aria-label="Border width"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="border-radius" className="text-xs text-gray-500">Radius</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={selectedOverlay.border.radius}
                  onChange={(e) => handleUpdateOverlay(
                    selectedOverlay.id,
                    { border: { ...selectedOverlay.border, radius: parseInt(e.target.value) } }
                  )}
                  className="h-8"
                  aria-label="Border radius"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="border-color" className="text-xs text-gray-500">Color</Label>
                <div className="flex space-x-1">
                  <input
                    type="color"
                    value={selectedOverlay.border.color}
                    onChange={(e) => handleUpdateOverlay(
                      selectedOverlay.id,
                      { border: { ...selectedOverlay.border, color: e.target.value } }
                    )}
                    className="w-8 h-8 rounded overflow-hidden cursor-pointer"
                    aria-label="Border color"
                  />
                  <Input
                    value={selectedOverlay.border.color}
                    onChange={(e) => handleUpdateOverlay(
                      selectedOverlay.id,
                      { border: { ...selectedOverlay.border, color: e.target.value } }
                    )}
                    className="h-8 flex-grow"
                    aria-label="Border color text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
