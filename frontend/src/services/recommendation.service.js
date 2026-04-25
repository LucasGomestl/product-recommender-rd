const strategies = {
  SingleProduct: (scoredProducts) => {
    const maxScore = Math.max(...scoredProducts.map(({ score }) => score));
    if (maxScore === 0) return [];
    const winner = [...scoredProducts]
      .reverse()
      .find(({ score }) => score === maxScore);
    return [winner.product];
  },
  MultipleProducts: (scoredProducts) =>
    scoredProducts
      .filter(({ score }) => score >= 1)
      .map(({ product }) => product),
};

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

  const strategy = strategies[formData.selectedRecommendationType];
  if (!strategy) {
    throw new Error(
      `Unknown recommendation type: ${formData.selectedRecommendationType}`
    );
  }
  return strategy(scoredProducts);
};

const recommendationService = { getRecommendations };

export default recommendationService;
