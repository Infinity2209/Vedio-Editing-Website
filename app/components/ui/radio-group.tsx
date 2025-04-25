'use client';

import * as React from 'react';

export function RadioGroup({ value, onValueChange, children, className }) {
  return (
    <div role="radiogroup" className={className} aria-label="Radio group">
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null;
        const childValue = child.props.value;
        return React.cloneElement(child, {
          name: 'radio-group',
          checked: childValue === value,
          onChange: () => onValueChange(childValue),
        });
      })}
    </div>
  );
}

export function RadioGroupItem({ value, id }) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      className="peer hidden"
      aria-checked="false"
      tabIndex={-1}
      readOnly
    />
  );
}
