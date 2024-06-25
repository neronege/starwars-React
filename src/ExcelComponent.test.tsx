import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExcelComponent from './components/ExcelComponent';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Mock the saveAs function from file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

// Mock the XLSX.write function to prevent actual file creation
jest.mock('xlsx', () => {
  const originalXLSX = jest.requireActual('xlsx');
  return {
    ...originalXLSX,
    write: jest.fn().mockReturnValue(new Uint8Array()),
  };
});



describe('ExcelComponent', () => {
  const data = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Doe', age: 25, city: 'Los Angeles' },
  ];
  const sheetName = 'TestSheet';
  const fileName = 'test_file';

  test('renders correctly', () => {
    render(<ExcelComponent data={data} sheetName={sheetName} fileName={fileName} />);
    expect(screen.getByRole('button', { name: /export to excel/i })).toBeInTheDocument();
  });

  test('exports data to Excel file when button is clicked', () => {
    render(<ExcelComponent data={data} sheetName={sheetName} fileName={fileName} />);
    const button = screen.getByRole('button', { name: /export to excel/i });
    fireEvent.click(button);

    // Check if XLSX.write was called
    expect(XLSX.write).toHaveBeenCalledTimes(1);

    // Check if saveAs was called with the correct parameters
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), `${fileName}.xlsx`);
  });
});
