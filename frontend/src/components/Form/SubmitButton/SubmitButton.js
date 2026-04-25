import React from 'react';

function SubmitButton({ text, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
