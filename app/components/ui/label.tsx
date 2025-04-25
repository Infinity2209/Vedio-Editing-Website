'use client';

export function Label({ htmlFor, children, className }) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}
