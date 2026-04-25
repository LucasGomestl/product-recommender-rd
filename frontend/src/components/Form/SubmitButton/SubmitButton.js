import React from 'react';

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
