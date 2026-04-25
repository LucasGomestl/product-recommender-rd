import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Recomendações</h2>

      {recommendations.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-gray-200 rounded-lg">
          <svg
            className="mx-auto mb-3 h-8 w-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-gray-500 text-sm">
            Selecione preferências e funcionalidades ao lado para receber
            recomendações personalizadas.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-gray-900">
                  {recommendation.name}
                </h3>
                {recommendation.category && (
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full whitespace-nowrap">
                    {recommendation.category}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendationList;
