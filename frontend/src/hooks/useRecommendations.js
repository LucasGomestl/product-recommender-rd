import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const submitForm = (formData) => {
    const result = recommendationService.getRecommendations(formData, products);
    setRecommendations(result);
  };

  return { recommendations, submitForm };
}

export default useRecommendations;
