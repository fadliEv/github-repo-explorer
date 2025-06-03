import { type FC } from 'react';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pages: (number | 'dots')[] = [];
  const siblings = 1;

  const startPage = Math.max(2, currentPage - siblings);
  const endPage = Math.min(totalPages - 1, currentPage + siblings);

  pages.push(1);
  if (startPage > 2) pages.push('dots');

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) pages.push('dots');
  if (totalPages > 1) pages.push(totalPages);

  const onClickPage = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const onNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-container">
      {/* Mobile controls */}
      <div className="pagination-mobile-controls">
        <button onClick={onPrevious} disabled={currentPage === 1} className="pagination-button">
          Previous
        </button>
        <button onClick={onNext} disabled={currentPage === totalPages} className="pagination-button">
          Next
        </button>
      </div>

      {/* Desktop controls */}
      <div className="pagination-desktop-controls">
        <div className="pagination-info">
          <p>
            Showing{' '}
            <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        <nav className="pagination-nav" aria-label="Pagination Navigation">
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            aria-label="Previous"
            className="pagination-arrow-button pagination-arrow-button-rounded-left"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 010 1.06L8.06 10l3.72 3.72a.75.75 0 11-1.06 1.06L5.75 10l4.97-4.97a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {pages.map((page, idx) =>
            page === 'dots' ? (
              <span key={`dots-${idx}`} className="pagination-dots">
                &hellip;
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onClickPage(page as number)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`pagination-page-button ${
                  page === currentPage
                    ? 'pagination-page-button-current'
                    : 'pagination-page-button-default'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            aria-label="Next"
            className="pagination-arrow-button pagination-arrow-button-rounded-right"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
