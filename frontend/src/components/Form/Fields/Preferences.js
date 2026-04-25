import React, { useState } from 'react';
import MultiSelectAutocomplete from '../../shared/MultiSelectAutocomplete';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences)

  const handleSelectAll = () => {
    const allPreferences = [...preferences];
    setCurrentPreferences(allPreferences);
    onPreferenceChange(allPreferences);
  };

  const handleClearAll = () => {
    setCurrentPreferences([]);
    onPreferenceChange([]);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Preferências
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
          >
            Marcar todos
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
          >
            Limpar tudo
          </button>
        </div>
      </div>
      <MultiSelectAutocomplete
        options={preferences}
        selected={currentPreferences}
        onChange={(updated) => {
          setCurrentPreferences(updated);
          onPreferenceChange(updated);
        }}
        placeholder="Selecione preferências..."
      />
    </div>
  );
}

export default Preferences;
