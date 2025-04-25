'use client';

import * as React from 'react';

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export function Slider({ value, defaultValue, min = 0, max = 100, step = 1, onValueChange }: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || [0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [Number(e.target.value)];
    setInternalValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const currentValue = value !== undefined ? value[0] : internalValue[0];

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={currentValue}
      onChange={handleChange}
      className="w-full"
      aria-label="Slider"
    />
  );
}
