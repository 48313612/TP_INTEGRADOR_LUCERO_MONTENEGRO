import React from "react";
import '../css/styles.css';

export const Pagination = ({
  eventosPerPage,
  totalEventos,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalEventos / eventosPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav className="pagination">
      <button
        className="pagination-previous"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <ul className="pagination-list">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              className={`pagination-link ${
                currentPage === i + 1 ? "is-current" : ""
              }`}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="pagination-next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
};
