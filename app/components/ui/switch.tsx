'use client';

import * as React from 'react';

interface SwitchProps {
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({ id, checked, defaultChecked, onCheckedChange }: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);

  const isControlled = checked !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    if (onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  const currentChecked = isControlled ? checked : internalChecked;

  return (
    <label htmlFor={id} className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={currentChecked}
        onChange={handleChange}
        className="sr-only peer"
        aria-label={id}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 relative">
        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out absolute top-0.5 left-0.5 peer-checked:translate-x-full`}></div>
      </div>
    </label>
  );
}
