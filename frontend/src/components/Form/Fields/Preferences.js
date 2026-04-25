// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences)

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

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
      <ul>
        {preferences.map((preference, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-500"
            >
              {preference}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Preferences;
