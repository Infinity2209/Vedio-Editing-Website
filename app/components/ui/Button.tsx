import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={
        'px-4 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-md shadow-lg hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition transform hover:scale-105 active:scale-95 ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
