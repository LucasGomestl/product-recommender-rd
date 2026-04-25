import { render, screen, fireEvent } from '@testing-library/react';
import Features from './Features';

const mockFeatures = ['Feature A', 'Feature B', 'Feature C'];

describe('Features', () => {
  test('should check all checkboxes when "Marcar todos" is clicked', () => {
    render(
      <Features features={mockFeatures} onFeatureChange={jest.fn()} />
    );

    fireEvent.click(screen.getByText('Marcar todos'));

    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).toBeChecked();
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

  test('should uncheck all checkboxes when "Limpar tudo" is clicked', () => {
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={mockFeatures}
        onFeatureChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Limpar tudo'));

    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
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
