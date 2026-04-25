import React from 'react';

function Checkbox({ children, className = '', ...props }) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className={`form-checkbox h-3.5 w-3.5 cursor-pointer ${className}`}
        {...props}
      />
      <span className="ml-2">{children}</span>
    </label>
  );
}

export default Checkbox;
