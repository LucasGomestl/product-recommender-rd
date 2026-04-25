import React, { useState, useRef, useEffect } from 'react';

function MultiSelectAutocomplete({
  options,
  selected,
  onChange,
  placeholder = 'Selecione...',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setFilter('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleOption = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter((selectedOption) => selectedOption !== option)
      : [...selected, option];
    onChange(newSelected);
    setFilter('');
    inputRef.current?.focus();
  };

  const removeTag = (option, e) => {
    e.stopPropagation();
    onChange(selected.filter((selectedOption) => selectedOption !== option));
  };

  const handleContainerClick = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setFilter('');
      inputRef.current?.blur();
    }
    if (e.key === 'Backspace' && !filter && selected.length > 0) {
      onChange(selected.slice(0, -1));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filter && filteredOptions.length > 0) {
        toggleOption(filteredOptions[0]);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={handleContainerClick}
        className="border border-gray-300 rounded-lg p-2 min-h-[42px] flex flex-wrap items-center gap-1 cursor-text bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors"
      >
        {selected.map((option) => (
          <span
            key={option}
            className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded"
          >
            {option}
            <button
              type="button"
              onClick={(e) => removeTag(option, e)}
              className="text-blue-500 hover:text-blue-900 leading-none text-base"
              aria-label={`Remover ${option}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selected.length === 0 ? placeholder : ''}
          className="flex-1 outline-none text-sm bg-transparent min-w-[60px]"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">
              Nenhuma opção encontrada
            </div>
          ) : (
            <ul>
              {filteredOptions.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => toggleOption(option)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="form-checkbox h-3.5 w-3.5 pointer-events-none"
                      />
                      <span>{option}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiSelectAutocomplete;
