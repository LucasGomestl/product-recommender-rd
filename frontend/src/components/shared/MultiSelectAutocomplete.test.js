import { render, screen, fireEvent } from '@testing-library/react';
import MultiSelectAutocomplete from './MultiSelectAutocomplete';

const mockOptions = ['Option A', 'Option B', 'Option C'];

describe('MultiSelectAutocomplete', () => {
  test('should render the placeholder when no options are selected', () => {
    render(
      <MultiSelectAutocomplete
        options={mockOptions}
        selected={[]}
        onChange={jest.fn()}
        placeholder="Select..."
      />
    );
    expect(screen.getByPlaceholderText('Select...')).toBeInTheDocument();
  });

  test('should open the dropdown and show all options when the input is focused', () => {
    render(
      <MultiSelectAutocomplete options={mockOptions} selected={[]} onChange={jest.fn()} />
    );
    fireEvent.focus(screen.getByRole('textbox'));
    mockOptions.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument();
    });
  });

  test('should filter options based on the typed text', () => {
    render(
      <MultiSelectAutocomplete options={mockOptions} selected={[]} onChange={jest.fn()} />
    );
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Option A' } });
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.queryByText('Option B')).not.toBeInTheDocument();
    expect(screen.queryByText('Option C')).not.toBeInTheDocument();
  });

  test('should show empty state message when no options match the filter', () => {
    render(
      <MultiSelectAutocomplete options={mockOptions} selected={[]} onChange={jest.fn()} />
    );
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'xyz' } });
    expect(screen.getByText('Nenhuma opção encontrada')).toBeInTheDocument();
  });

  test('should call onChange with the option added when an option is clicked', () => {
    const onChange = jest.fn();
    render(
      <MultiSelectAutocomplete options={mockOptions} selected={[]} onChange={onChange} />
    );
    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText('Option A'));
    expect(onChange).toHaveBeenCalledWith(['Option A']);
  });

  test('should display a tag for each selected option', () => {
    render(
      <MultiSelectAutocomplete
        options={mockOptions}
        selected={['Option A', 'Option B']}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Remover Option A')).toBeInTheDocument();
    expect(screen.getByLabelText('Remover Option B')).toBeInTheDocument();
  });

  test('should call onChange without the option when its remove button is clicked', () => {
    const onChange = jest.fn();
    render(
      <MultiSelectAutocomplete
        options={mockOptions}
        selected={['Option A', 'Option B']}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Remover Option A'));
    expect(onChange).toHaveBeenCalledWith(['Option B']);
  });

  test('should call onChange removing the last tag when Backspace is pressed with empty input', () => {
    const onChange = jest.fn();
    render(
      <MultiSelectAutocomplete
        options={mockOptions}
        selected={['Option A', 'Option B']}
        onChange={onChange}
      />
    );
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith(['Option A']);
  });

  test('should close the dropdown when Escape is pressed', () => {
    render(
      <MultiSelectAutocomplete options={mockOptions} selected={[]} onChange={jest.fn()} />
    );
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByText('Option A')).not.toBeInTheDocument();
  });

  test('should select the first filtered option when Enter is pressed', () => {
    const onChange = jest.fn();
    render(
      <MultiSelectAutocomplete options={mockOptions} selected={[]} onChange={onChange} />
    );
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Option A' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['Option A']);
  });
});
