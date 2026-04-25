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
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Funcionalidades:</h2>
      <div className="flex gap-3 mb-2">
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-green-600 hover:underline"
        >
          Marcar todos
        </button>
        <button
          type="button"
          onClick={handleClearAll}
          className="text-sm text-gray-600 hover:underline"
        >
          Limpar tudo
        </button>
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
