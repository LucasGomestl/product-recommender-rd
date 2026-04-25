import React from 'react';

const options = [
  { value: 'SingleProduct', label: 'Produto Único' },
  { value: 'MultipleProducts', label: 'Múltiplos Produtos' },
];

function RecommendationType({
  selectedRecommendationType,
  onRecommendationTypeChange,
}) {
  return (
    <div className="border-t border-gray-100 pt-4 mb-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
        Tipo de Recomendação
      </h2>
      <div role="radiogroup" className="grid grid-cols-2 gap-2">
        {options.map(({ value, label }) => {
          const isActive = selectedRecommendationType === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onRecommendationTypeChange(value)}
              className={
                'py-2 px-3 rounded-lg border text-sm font-medium transition-colors ' +
                (isActive
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300')
              }
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendationType;
