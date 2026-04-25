import { render, screen, fireEvent } from '@testing-library/react';
import Preferences from './Preferences';

const mockPreferences = ['Preference A', 'Preference B', 'Preference C'];

describe('Preferences', () => {
  test('should show all preferences as tags when "Marcar todos" is clicked', () => {
    render(
      <Preferences preferences={mockPreferences} onPreferenceChange={jest.fn()} />
    );

    fireEvent.click(screen.getByText('Marcar todos'));

    mockPreferences.forEach((p) => {
      expect(screen.getByLabelText(`Remover ${p}`)).toBeInTheDocument();
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

  test('should remove all tags when "Limpar tudo" is clicked', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={mockPreferences}
        onPreferenceChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Limpar tudo'));

    mockPreferences.forEach((p) => {
      expect(screen.queryByLabelText(`Remover ${p}`)).not.toBeInTheDocument();
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
