import { render, screen, fireEvent } from '@testing-library/react';
import Features from './Features';

const mockFeatures = ['Feature A', 'Feature B', 'Feature C'];

describe('Features', () => {
  test('should show all features as tags when "Marcar todos" is clicked', () => {
    render(
      <Features features={mockFeatures} onFeatureChange={jest.fn()} />
    );

    fireEvent.click(screen.getByText('Marcar todos'));

    mockFeatures.forEach((f) => {
      expect(screen.getByLabelText(`Remover ${f}`)).toBeInTheDocument();
    });
  });

  test('should call onFeatureChange with all features when "Marcar todos" is clicked', () => {
    const onFeatureChange = jest.fn();
    render(
      <Features features={mockFeatures} onFeatureChange={onFeatureChange} />
    );

    fireEvent.click(screen.getByText('Marcar todos'));

    expect(onFeatureChange).toHaveBeenCalledWith(mockFeatures);
  });

  test('should remove all tags when "Limpar tudo" is clicked', () => {
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={mockFeatures}
        onFeatureChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Limpar tudo'));

    mockFeatures.forEach((f) => {
      expect(screen.queryByLabelText(`Remover ${f}`)).not.toBeInTheDocument();
    });
  });

  test('should call onFeatureChange with empty array when "Limpar tudo" is clicked', () => {
    const onFeatureChange = jest.fn();
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={mockFeatures}
        onFeatureChange={onFeatureChange}
      />
    );

    fireEvent.click(screen.getByText('Limpar tudo'));

    expect(onFeatureChange).toHaveBeenCalledWith([]);
  });
});
