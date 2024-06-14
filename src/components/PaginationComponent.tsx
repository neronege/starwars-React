import React from 'react';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, paginate }) => {
  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pageNumbers;
  };

  return (
    <ul className="pagination justify-content-center">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button onClick={() => paginate(currentPage - 1)} className="page-link" disabled={currentPage === 1}>
          <span aria-hidden="true">&laquo;</span> Previous
        </button>
      </li>
      {getPageNumbers().map((number) => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button onClick={() => paginate(currentPage + 1)} className="page-link" disabled={currentPage === totalPages}>
          Next <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  );
};

export default PaginationComponent;
