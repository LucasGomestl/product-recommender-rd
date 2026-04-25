import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useForm from '../../hooks/useForm';

function Form({ preferences, features, loading, error, onSubmit }) {
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'SingleProduct',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (error) {
    return (
      <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
        Não foi possível carregar as opções. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selectedRecommendationType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton
        text={loading ? 'Carregando...' : 'Obter recomendação'}
        disabled={loading}
      />
    </form>
  );
}

export default Form;
