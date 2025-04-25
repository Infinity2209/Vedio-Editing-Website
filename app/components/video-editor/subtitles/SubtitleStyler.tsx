'use client';

import { useState, useEffect } from 'react';
import { Label } from '../../ui/label';
import { Slider } from '../../ui/slider';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';

export default function SubtitleStyler({ subtitle, onUpdate }) {
    const [style, setStyle] = useState(subtitle.style || {
        fontSize: 14,
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: 'transparent',
        position: 'bottom',
        align: 'center',
    });

    useEffect(() => {
        setStyle(subtitle.style || {
            fontSize: 14,
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: 'transparent',
            position: 'bottom',
            align: 'center',
        });
    }, [subtitle]);

    const handleChange = (field, value) => {
        const newStyle = { ...style, [field]: value };
        setStyle(newStyle);
        onUpdate({ style: newStyle });
    };

    const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];

    return (
        <div className="p-4 bg-slate-800 rounded-lg space-y-4">
            <h3 className="text-sm font-medium text-white mb-2">Style Settings</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="font-size" className="text-xs text-gray-400">Font Size</Label>
                    <div className="flex items-center space-x-2">
                    <Slider
                        value={[style.fontSize]}
                        min={10}
                        max={48}
                        step={1}
                        onValueChange={(value) => handleChange('fontSize', value[0])}
                    />
                        <span className="text-xs text-white w-6">{style.fontSize}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="font-family" className="text-xs text-gray-400">Font Family</Label>
                <Select
                    value={style.fontFamily}
                    onValueChange={(value) => handleChange('fontFamily', value)}
                    ariaLabel="Font family selector"
                >
                        <SelectTrigger className="w-full bg-slate-900 border-gray-700">
                            <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-gray-700">
                            {fontFamilies.map(font => (
                                <SelectItem key={font} value={font} className="text-white">
                                    {font}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="text-color" className="text-xs text-gray-400">Text Color</Label>
                    <div className="flex space-x-2">
                        <input
                            type="color"
                            id="text-color"
                            value={style.color}
                            onChange={(e) => handleChange('color', e.target.value)}
                            className="w-8 h-8 rounded overflow-hidden cursor-pointer"
                            title="Select text color"
                        />
                        <input
                            type="text"
                            value={style.color}
                            onChange={(e) => handleChange('color', e.target.value)}
                            className="flex-grow bg-slate-700 border-none rounded p-2 text-xs text-white"
                            placeholder="Text color hex or rgba"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bg-color" className="text-xs text-gray-400">Background Color</Label>
                    <div className="flex space-x-2">
                        <input
                            type="color"
                            id="bg-color"
                            value={style.backgroundColor.replace(/[^#\w]/g, '#')}
                            onChange={(e) => {
                                const alpha = style.backgroundColor.match(/[^,]+(?=\))/)?.[0] || '0.5';
                                const hex = e.target.value;
                                const r = parseInt(hex.substring(1, 3), 16);
                                const g = parseInt(hex.substring(3, 5), 16);
                                const b = parseInt(hex.substring(5, 7), 16);
                                handleChange('backgroundColor', `rgba(${r},${g},${b},${alpha})`);
                            }}
                            className="w-8 h-8 rounded overflow-hidden cursor-pointer"
                            title="Select background color"
                        />
                        <input
                            type="text"
                            value={style.backgroundColor}
                            onChange={(e) => handleChange('backgroundColor', e.target.value)}
                            className="flex-grow bg-slate-900 border-none rounded p-2 text-xs text-white"
                            placeholder="Background color hex or rgba"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="position" className="text-xs text-gray-400">Position</Label>
                <RadioGroup
                    value={style.position}
                    onValueChange={(value) => handleChange('position', value)}
                    className="grid grid-cols-3 gap-2"
                >
                    <div className="flex items-center text-white space-x-2 bg-slate-900 rounded p-2">
                        <RadioGroupItem value="top" id="position-top" />
                        <Label htmlFor="position-top" className="text-xs flex items-center">Top</Label>
                    </div>
                    <div className="flex items-center text-white space-x-2 bg-slate-900 rounded p-2">
                        <RadioGroupItem value="middle" id="position-middle" />
                        <Label htmlFor="position-middle" className="text-xs">Middle</Label>
                    </div>
                    <div className="flex items-center text-white space-x-2 bg-slate-900 rounded p-2">
                        <RadioGroupItem value="bottom" id="position-bottom" />
                        <Label htmlFor="position-bottom" className="text-xs">Bottom</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="align" className="text-xs text-gray-400">Alignment</Label>
                <RadioGroup
                    value={style.align}
                    onValueChange={(value) => handleChange('align', value)}
                    className="grid grid-cols-3 gap-2"
                >
                    <div className="flex items-center text-white space-x-2 bg-slate-900 rounded p-2">
                        <RadioGroupItem value="left" id="align-left" />
                        <Label htmlFor="align-left" className="text-xs">Left</Label>
                    </div>
                    <div className="flex items-center text-white space-x-2 bg-slate-900 rounded p-2">
                        <RadioGroupItem value="center" id="align-center" />
                        <Label htmlFor="align-center" className="text-xs">Center</Label>
                    </div>
                    <div className="flex items-center text-white space-x-2 bg-slate-900 rounded p-2">
                        <RadioGroupItem value="right" id="align-right" />
                        <Label htmlFor="align-right" className="text-xs">Right</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="bg-slate-900 p-3 rounded">
                <div
                    className="p-2 text-center rounded"
                    style={{
                        color: style.color,
                        backgroundColor: style.backgroundColor,
                        fontFamily: style.fontFamily,
                        fontSize: `${style.fontSize}px`,
                        textAlign: style.align
                    }}
                >
                    Preview Text
                </div>
            </div>
        </div>
    );
}
