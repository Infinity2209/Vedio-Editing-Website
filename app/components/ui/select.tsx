'use client';

import * as React from 'react';

export function Select({ value, onValueChange, children, ariaLabel }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="bg-slate-900 border border-gray-700 rounded text-white p-1 w-full"
      aria-label={ariaLabel || "Select"}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SelectContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SelectItem({ value, children, className }) {
  return (
    <option value={value} className={className}>
      {children}
    </option>
  );
}

export function SelectValue({ placeholder }) {
  return <option value="">{placeholder}</option>;
}
