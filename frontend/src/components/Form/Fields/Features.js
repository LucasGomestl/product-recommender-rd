import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures)

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

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
      <ul>
        {features.map((feature, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className="text-green-500"
            >
              {feature}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Features;
