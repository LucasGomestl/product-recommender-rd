import { render, screen, fireEvent } from '@testing-library/react';
import Preferences from './Preferences';

const mockPreferences = ['Preference A', 'Preference B', 'Preference C'];

describe('Preferences', () => {
  test('should check all checkboxes when "Marcar todos" is clicked', () => {
    render(
      <Preferences preferences={mockPreferences} onPreferenceChange={jest.fn()} />
    );

    fireEvent.click(screen.getByText('Marcar todos'));

    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test('should call onPreferenceChange with all preferences when "Marcar todos" is clicked', () => {
    const onPreferenceChange = jest.fn();
    render(
      <Preferences preferences={mockPreferences} onPreferenceChange={onPreferenceChange} />
    );

    fireEvent.click(screen.getByText('Marcar todos'));

    expect(onPreferenceChange).toHaveBeenCalledWith(mockPreferences);
  });

  test('should uncheck all checkboxes when "Limpar tudo" is clicked', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={mockPreferences}
        onPreferenceChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Limpar tudo'));

    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test('should call onPreferenceChange with empty array when "Limpar tudo" is clicked', () => {
    const onPreferenceChange = jest.fn();
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={mockPreferences}
        onPreferenceChange={onPreferenceChange}
      />
    );

    fireEvent.click(screen.getByText('Limpar tudo'));

    expect(onPreferenceChange).toHaveBeenCalledWith([]);
  });
});
