'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Slider } from '../../ui/slider';
import { Switch } from '../../ui/switch';

export default function Export() {
  const { videoClips, duration } = useSelector((state: any) => state.video);
  const [exportFormat, setExportFormat] = useState('mp4');
  const [resolution, setResolution] = useState('1080p');
  const [quality, setQuality] = useState(80);
  const [includeSubtitles, setIncludeSubtitles] = useState(true);
  const [includeOverlays, setIncludeOverlays] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleExport = async () => {
    if (!videoClips.length) return;
    
    setIsExporting(true);
    setProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            setProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };
  
  if (!videoClips.length) {
    return (
      <div className="p-6 bg-slate-800 rounded-lg">
        <p className="text-gray-400 text-center">Add video clips to enable export</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Export</h2>
      
      <div className="p-4 bg-slate-800 rounded-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="format" className="text-sm">Format</Label>
            <Select ariaLabel="Select format" value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="bg-slate-900 border-gray-700">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-gray-700">
                <SelectItem className="" value="mp4">MP4 (H.264)</SelectItem>
                <SelectItem className="" value="mov">MOV (QuickTime)</SelectItem>
                <SelectItem className="" value="webm">WebM (VP9)</SelectItem>
                <SelectItem className="" value="gif">GIF (Animated)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resolution" className="text-sm">Resolution</Label>
            <Select ariaLabel="Select resolution" value={resolution} onValueChange={setResolution}>
              <SelectTrigger className="bg-slate-900 border-gray-700">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-gray-700">
                <SelectItem className="" value="480p">480p (SD)</SelectItem>
                <SelectItem className="" value="720p">720p (HD)</SelectItem>
                <SelectItem className="" value="1080p">1080p (Full HD)</SelectItem>
                <SelectItem className="" value="4k">4K (Ultra HD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="quality" className="text-sm">Quality</Label>
            <span className="text-xs text-gray-400">{quality}%</span>
          </div>
          <Slider
            value={[quality]}
            min={10}
            max={100}
            step={1}
            onValueChange={(value) => setQuality(value[0])}
          />
          <p className="text-xs text-gray-500">Higher quality increases file size</p>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="include-subtitles" className="text-sm">Include Subtitles</Label>
              <p className="text-xs text-gray-500">Burn subtitles into the video</p>
            </div>
            <Switch
              id="include-subtitles"
              checked={includeSubtitles}
              onCheckedChange={setIncludeSubtitles}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="include-overlays" className="text-sm">Include Overlays</Label>
              <p className="text-xs text-gray-500">Burn image overlays into the video</p>
            </div>
            <Switch
              id="include-overlays"
              checked={includeOverlays}
              onCheckedChange={setIncludeOverlays}
            />
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm">
              Estimated File Size: <span className="text-white font-medium">
                {((duration * quality * (resolution === '4k' ? 4 : resolution === '1080p' ? 1 : resolution === '720p' ? 0.5 : 0.25)) / 100).toFixed(1)} MB
              </span>
            </p>
            <p className="text-sm">
              Duration: <span className="text-white font-medium">{formatTime(duration)}</span>
            </p>
          </div>
          
          {isExporting ? (
            <div className="space-y-2">
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-gray-400">Exporting... {progress}%</p>
            </div>
          ) : (
            <Button 
              onClick={handleExport}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Export Video
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

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
