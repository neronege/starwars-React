import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationComponent from './PaginationComponent';

describe('PaginationComponent', () => {
  const paginateMock = jest.fn();

  const renderComponent = (currentPage: number, totalPages: number) => {
    render(
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginateMock}
      />
    );
  };

  test('renders correctly with total pages less than or equal to 3', () => {
    renderComponent(1, 3);
    const pageNumbers = screen.getAllByText(/^\d+$/);
    expect(pageNumbers.length).toBe(3);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('2');
    expect(pageNumbers[2]).toHaveTextContent('3');
  });

  test('renders correctly with currentPage <= 2', () => {
    renderComponent(2, 5);
    const pageNumbers = screen.getAllByText(/^\d+$/);
    expect(pageNumbers.length).toBe(3);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('2');
    expect(pageNumbers[2]).toHaveTextContent('3');
  });

  test('renders correctly with currentPage >= totalPages - 1', () => {
    renderComponent(4, 5);
    const pageNumbers = screen.getAllByText(/^\d+$/);
    expect(pageNumbers.length).toBe(3);
    expect(pageNumbers[0]).toHaveTextContent('3');
    expect(pageNumbers[1]).toHaveTextContent('4');
    expect(pageNumbers[2]).toHaveTextContent('5');
  });

  test('renders correctly with currentPage in the middle', () => {
    renderComponent(3, 5);
    const pageNumbers = screen.getAllByText(/^\d+$/);
    expect(pageNumbers.length).toBe(3);
    expect(pageNumbers[0]).toHaveTextContent('2');
    expect(pageNumbers[1]).toHaveTextContent('3');
    expect(pageNumbers[2]).toHaveTextContent('4');
  });

  test('previous button is disabled on first page', () => {
    renderComponent(1, 5);
    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  test('next button is disabled on last page', () => {
    renderComponent(5, 5);
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test('calls paginate with correct page number when page button is clicked', () => {
    renderComponent(2, 5);
    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);
    expect(paginateMock).toHaveBeenCalledWith(3);
  });

  test('calls paginate with correct page number when previous button is clicked', () => {
    renderComponent(2, 5);
    const previousButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(previousButton);
    expect(paginateMock).toHaveBeenCalledWith(1);
  });

  test('calls paginate with correct page number when next button is clicked', () => {
    renderComponent(2, 5);
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(paginateMock).toHaveBeenCalledWith(3);
  });
});
