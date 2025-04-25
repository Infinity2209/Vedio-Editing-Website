'use client';

import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`bg-slate-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        />
    );
}
