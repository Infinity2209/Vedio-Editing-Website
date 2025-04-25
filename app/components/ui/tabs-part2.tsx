'use client';

import React, { useContext, ReactNode } from 'react';
import { TabsContext } from './tabs-part1';

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  const { value: activeValue, onValueChange } = context;

  const isActive = value === activeValue;

  const handleClick = () => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${className ? className : ''} ${isActive ? 'data-[state=active]' : ''}`}
      aria-selected={isActive}
      role="tab"
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }
  const { value: activeValue } = context;

  if (value !== activeValue) {
    return null;
  }

  return (
    <div role="tabpanel" className={className} data-state="active">
      {children}
    </div>
  );
}
