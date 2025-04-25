'use client';

import React from 'react';

export function Tabs({ value, onValueChange, children }) {
  const handleChange = (e) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  return (
    <div data-value={value} onChange={handleChange}>
      {children}
    </div>
  );
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  return <button value={value}>{children}</button>;
}

export function TabsContent({ value, className, children }) {
  return <div className={className}>{children}</div>;
}
