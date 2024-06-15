import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterComponent from './components/FilterComponent'; // FilterComponent'in yolunu düzgün şekilde belirttiğinizden emin olun

describe('Films Component', () => {
  const filters = [
    {
      label: 'Title',
      value: '',
      options: ['Film A', 'Film B', 'Film C'],
      onChange: jest.fn(),
    },
    {
      label: 'Director',
      value: '',
      options: ['Director X', 'Director Y', 'Director Z'],
      onChange: jest.fn(),
    },
  ];

  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Check if all filters are rendered
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Check if the correct number of options are rendered for each filter
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.children.length).toBe(filter.options.length + 1); // +1 for the "All" option
    });
  });

  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Simulate changing the Title filter
    const titleSelect = screen.getByLabelText('Title:');
    fireEvent.change(titleSelect, { target: { value: 'Film A' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('Film A');

    // Simulate changing the Director filter
    const directorSelect = screen.getByLabelText('Director:');
    fireEvent.change(directorSelect, { target: { value: 'Director X' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('Director X');
  });

  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Check if the default selected option is "All"
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

describe('People Component', () => {
  const filters = [
    {
      label: 'Name',
      value: '',
      options: ['Person A', 'Person B', 'Person C'],
      onChange: jest.fn(),
    },
    {
      label: 'Gender',
      value: '',
      options: ['male', 'female'],
      onChange: jest.fn(),
    },
  ];

  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Check if all filters are rendered
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Check if the correct number of options are rendered for each filter
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.children.length).toBe(filter.options.length + 1); // +1 for the "All" option
    });
  });

  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Simulate changing the Name filter
    const nameSelect = screen.getByLabelText('Name:');
    fireEvent.change(nameSelect, { target: { value: 'Person A' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('Person A');

    // Simulate changing the Gender filter
    const genderSelect = screen.getByLabelText('Gender:');
    fireEvent.change(genderSelect, { target: { value: 'male' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('male');
  });

  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Check if the default selected option is "All"
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

describe('Vehicles Component', () => {
  const filters = [
    {
      label: 'Model',
      value: '',
      options: ['Car', 'Bus', 'Truck'],
      onChange: jest.fn(),
    },
    {
      label: 'Color',
      value: '',
      options: ['Red', 'Blue', 'Green'],
      onChange: jest.fn(),
    },
  ];

  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Check if all filters are rendered
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Check if the correct number of options are rendered for each filter
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.children.length).toBe(filter.options.length + 1); // +1 for the "All" option
    });
  });

  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Simulate changing the Model filter
    const modelSelect = screen.getByLabelText('Model:');
    fireEvent.change(modelSelect, { target: { value: 'Car' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('Car');

    // Simulate changing the Color filter
    const colorSelect = screen.getByLabelText('Color:');
    fireEvent.change(colorSelect, { target: { value: 'Red' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('Red');
  });

  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Check if the default selected option is "All"
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

describe('Planets Component', () => {
  const filters = [
    {
      label: 'Name',
      value: '',
      options: ['Planet A', 'Planet B', 'Planet C'],
      onChange: jest.fn(),
    },
    {
      label: 'Terrain',
      value: '',
      options: ['Desert', 'Forest', 'Ocean'],
      onChange: jest.fn(),
    },
  ];

  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Check if all filters are rendered
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Check if the correct number of options are rendered for each filter
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.children.length).toBe(filter.options.length + 1); // +1 for the "All" option
    });
  });

  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Simulate changing the Name filter
    const nameSelect = screen.getByLabelText('Name:');
    fireEvent.change(nameSelect, { target: { value: 'Planet A' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('Planet A');

    // Simulate changing the Terrain filter
    const terrainSelect = screen.getByLabelText('Terrain:');
    fireEvent.change(terrainSelect, { target: { value: 'Desert' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('Desert');
  });

  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Check if the default selected option is "All"
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

describe('Starships Component', () => {
  const filters = [
    {
      label: 'Name',
      value: '',
      options: ['Starship A', 'Starship B', 'Starship C'],
      onChange: jest.fn(),
    },
    {
      label: 'Manufacturer',
      value: '',
      options: ['Manufacturer X', 'Manufacturer Y', 'Manufacturer Z'],
      onChange: jest.fn(),
    },
  ];

  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Check if all filters are rendered
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Check if the correct number of options are rendered for each filter
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.children.length).toBe(filter.options.length + 1); // +1 for the "All" option
    });
  });

  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Simulate changing the Name filter
    const nameSelect = screen.getByLabelText('Name:');
    fireEvent.change(nameSelect, { target: { value: 'Starship A' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('Starship A');

    // Simulate changing the Manufacturer filter
    const manufacturerSelect = screen.getByLabelText('Manufacturer:');
    fireEvent.change(manufacturerSelect, { target: { value: 'Manufacturer X' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('Manufacturer X');
  });

  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Check if the default selected option is "All"
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});
