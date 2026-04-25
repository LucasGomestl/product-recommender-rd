import React, { useState } from 'react';
import MultiSelectAutocomplete from '../../shared/MultiSelectAutocomplete';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures)

  const handleSelectAll = () => {
    const allFeatures = [...features];
    setCurrentFeatures(allFeatures);
    onFeatureChange(allFeatures);
  };

  const handleClearAll = () => {
    setCurrentFeatures([]);
    onFeatureChange([]);
  };

  return (
    <div className="border-t border-gray-100 pt-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Funcionalidades
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
        options={features}
        selected={currentFeatures}
        onChange={(updated) => {
          setCurrentFeatures(updated);
          onFeatureChange(updated);
        }}
        placeholder="Selecione funcionalidades..."
      />
    </div>
  );
}

export default Features;
