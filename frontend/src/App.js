import React from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import useProducts from './hooks/useProducts';
import useRecommendations from './hooks/useRecommendations';

function App() {
  const { preferences, features, products, loading, error } = useProducts();
  const { recommendations, submitForm } = useRecommendations(products);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 flex flex-col items-center">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="col-span-1 md:col-span-2 border-b border-gray-100 pb-4 md:pb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            Recomendador de Produtos RD Station
          </h1>
          <p className="text-sm text-gray-500">
            Selecione suas preferências e funcionalidades para receber
            recomendações personalizadas dos produtos RD Station.
          </p>
        </div>
        <div className="border-b border-gray-100 pb-6 md:border-b-0 md:pb-0 md:border-r md:pr-8">
          <Form
            preferences={preferences}
            features={features}
            loading={loading}
            error={error}
            onSubmit={submitForm}
          />
        </div>
        <div>
          <RecommendationList recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}

export default App;
