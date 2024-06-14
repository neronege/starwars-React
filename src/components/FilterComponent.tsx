// FilterComponent.tsx
import React from 'react';

interface Filter {
  label: string;
  value: string | number;
  options: (string | number)[];
  onChange: (value: string | number) => void;
}

interface FilterComponentProps {
  filters: Filter[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filters }) => {
  return (
    <form className="mb-3">
      <div className="row g-3 align-items-center">
        {filters.map((filter, index) => (
          <div key={index} className="col-3">
            <label htmlFor={`filter${index}`} className="form-label">
              {filter.label}:
            </label>
            <select
              id={`filter${index}`}
              className="form-select"
              value={filter.value}
              onChange={e => filter.onChange(e.target.value)}
            >
              <option value="">All</option>
              {filter.options.map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </form>
  );
};

export default FilterComponent;
