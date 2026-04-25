// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const selectedPreferences = formData.selectedPreferences || [];
  const selectedFeatures = formData.selectedFeatures || [];

  const scoredProducts = products.map((product) => {
    const preferenceScore = product.preferences.filter((preference) =>
      selectedPreferences.includes(preference)
    ).length;
    const featureScore = product.features.filter((feature) =>
      selectedFeatures.includes(feature)
    ).length;
    return { product, score: preferenceScore + featureScore };
  });

  if (formData.selectedRecommendationType === 'SingleProduct') {
    const maxScore = Math.max(...scoredProducts.map(({ score }) => score));
    if (maxScore === 0) return [];
    const winner = [...scoredProducts]
      .reverse()
      .find(({ score }) => score === maxScore);
    return [winner.product];
  }

  return scoredProducts
    .filter(({ score }) => score >= 1)
    .map(({ product }) => product);
};

export default { getRecommendations };
