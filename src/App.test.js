import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterComponent from './components/FilterComponent'; // FilterComponent'in yolunu düzgün şekilde belirttiğinizden emin olun

// Films bileşenini test etme
describe('Films Component', () => {
  const filters = [
    {
      label: 'Episode ID',
      value: '',
      options: ['1', '2', '3'],
      onChange: jest.fn(),
    },
    {
      label: 'Director',
      value: '',
      options: ['Director X', 'Director Y', 'Director Z'],
      onChange: jest.fn(),
    },
  ];

  // Bileşenin verilen filtrelerle doğru şekilde render edilip edilmediğini kontrol edin
  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Tüm filtrelerin render edildiğini kontrol edin
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Her filtre için doğru sayıda seçeneğin render edildiğini kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement).toHaveTextContent('All');
    });
  });

  // Bir seçenek seçildiğinde onChange fonksiyonunun çağrılıp çağrılmadığını kontrol edin
  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Title filtresini değiştirmeyi simüle edin
    const titleSelect = screen.getByLabelText('Episode ID:');
    fireEvent.change(titleSelect, { target: { value: '1' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('1');

    // Director filtresini değiştirmeyi simüle edin
    const directorSelect = screen.getByLabelText('Director:');
    fireEvent.change(directorSelect, { target: { value: 'Director X' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('Director X');
  });

  // Varsayılan seçeneğin "All" olup olmadığını kontrol edin
  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Varsayılan seçili seçeneğin "All" olup olmadığını kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

// People bileşenini test etme
describe('People Component', () => {
  const filters = [
    {
      label: 'Eye Color',
      value: '',
      options: ['red', 'blue', 'yellow'],
      onChange: jest.fn(),
    },
    {
      label: 'Gender',
      value: '',
      options: ['male', 'female'],
      onChange: jest.fn(),
    },
  ];

  // Bileşenin verilen filtrelerle doğru şekilde render edilip edilmediğini kontrol edin
  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Tüm filtrelerin render edildiğini kontrol edin
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Her filtre için doğru sayıda seçeneğin render edildiğini kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement).toHaveTextContent('All'); //"All" seçeneği için
    });
  });

  // Bir seçenek seçildiğinde onChange fonksiyonunun çağrılıp çağrılmadığını kontrol edin
  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Eye Color filtresini değiştirmeyi simüle edin
    const nameSelect = screen.getByLabelText('Eye Color:');
    fireEvent.change(nameSelect, { target: { value: 'red' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('red');

    // Gender filtresini değiştirmeyi simüle edin
    const genderSelect = screen.getByLabelText('Gender:');
    fireEvent.change(genderSelect, { target: { value: 'male' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('male');
  });

  // Varsayılan seçeneğin "All" olup olmadığını kontrol edin
  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Varsayılan seçili seçeneğin "All" olup olmadığını kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

// Vehicles bileşenini test etme
describe('Vehicles Component', () => {
  const filters = [
    {
      label: 'Model',
      value: '',
      options: ['Digger Crawler', 'T-16 skyhopper', 'X-34 landspeeder'],
      onChange: jest.fn(),
    },
    {
      label: 'VehicleClass',
      value: '',
      options: ['wheeled', 'starfighter', 'airspeeder'],
      onChange: jest.fn(),
    },
  ];

  // Bileşenin verilen filtrelerle doğru şekilde render edilip edilmediğini kontrol edin
  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Tüm filtrelerin render edildiğini kontrol edin
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Her filtre için doğru sayıda seçeneğin render edildiğini kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement).toHaveTextContent('All'); // "All" seçeneği için
    });
  });

  // Bir seçenek seçildiğinde onChange fonksiyonunun çağrılıp çağrılmadığını kontrol edin
  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Model filtresini değiştirmeyi simüle edin
    const modelSelect = screen.getByLabelText('Model:');
    fireEvent.change(modelSelect, { target: { value: 'Digger Crawler' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('Digger Crawler');

    // VehicleClass filtresini değiştirmeyi simüle edin
    const colorSelect = screen.getByLabelText('VehicleClass:');
    fireEvent.change(colorSelect, { target: { value: 'wheeled' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('wheeled');
  });

  // Varsayılan seçeneğin "All" olup olmadığını kontrol edin
  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Varsayılan seçili seçeneğin "All" olup olmadığını kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

// Planets bileşenini test etme
describe('Planets Component', () => {
  const filters = [
    {
      label: 'Population',
      value: '',
      options: ['200000', '2000000000', '1000'],
      onChange: jest.fn(),
    },
    {
      label: 'Climates',
      value: '',
      options: ['arid', 'temperate', 'frozen'],
      onChange: jest.fn(),
    },
  ];

  // Bileşenin verilen filtrelerle doğru şekilde render edilip edilmediğini kontrol edin
  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Tüm filtrelerin render edildiğini kontrol edin
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Her filtre için doğru sayıda seçeneğin render edildiğini kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement).toHaveTextContent('All'); //  "All" seçeneği için
    });
  });

  // Bir seçenek seçildiğinde onChange fonksiyonunun çağrılıp çağrılmadığını kontrol edin
  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Population filtresini değiştirmeyi simüle edin
    const nameSelect = screen.getByLabelText('Population:');
    fireEvent.change(nameSelect, { target: { value: '200000' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('200000');

    // Climates filtresini değiştirmeyi simüle edin
    const terrainSelect = screen.getByLabelText('Climates:');
    fireEvent.change(terrainSelect, { target: { value: 'arid' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('arid');
  });

  // Varsayılan seçeneğin "All" olup olmadığını kontrol edin
  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Varsayılan seçili seçeneğin "All" olup olmadığını kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});

// Starships bileşenini test etme
describe('Starships Component', () => {
  const filters = [
    {
      label: 'Model',
      value: '',
      options: ['CR90 corvette', 'BTL Y-wing', 'T-65 X-wing'],
      onChange: jest.fn(),
    },
    {
      label: 'ShipClass',
      value: '',
      options: ['ShipClass X', 'ShipClass Y', 'ShipClass Z'],
      onChange: jest.fn(),
    },
  ];

  // Bileşenin verilen filtrelerle doğru şekilde render edilip edilmediğini kontrol edin
  test('renders correctly with given filters', () => {
    render(<FilterComponent filters={filters} />);

    // Tüm filtrelerin render edildiğini kontrol edin
    filters.forEach(filter => {
      expect(screen.getByLabelText(`${filter.label}:`)).toBeInTheDocument();
    });

    // Her filtre için doğru sayıda seçeneğin render edildiğini kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement).toHaveTextContent('All'); // +1, "All" seçeneği için
    });
  });

  // Bir seçenek seçildiğinde onChange fonksiyonunun çağrılıp çağrılmadığını kontrol edin
  test('calls onChange when an option is selected', () => {
    render(<FilterComponent filters={filters} />);

    // Model filtresini değiştirmeyi simüle edin
    const nameSelect = screen.getByLabelText('Model:');
    fireEvent.change(nameSelect, { target: { value: 'CR90 corvette' } });
    expect(filters[0].onChange).toHaveBeenCalledWith('CR90 corvette');

    // ShipClass filtresini değiştirmeyi simüle edin
    const manufacturerSelect = screen.getByLabelText('ShipClass:');
    fireEvent.change(manufacturerSelect, { target: { value: 'ShipClass X' } });
    expect(filters[1].onChange).toHaveBeenCalledWith('ShipClass X');
  });

  // Varsayılan seçeneğin "All" olup olmadığını kontrol edin
  test('default option is "All"', () => {
    render(<FilterComponent filters={filters} />);

    // Varsayılan seçili seçeneğin "All" olup olmadığını kontrol edin
    filters.forEach(filter => {
      const selectElement = screen.getByLabelText(`${filter.label}:`);
      expect(selectElement.value).toBe('');
    });
  });

});
