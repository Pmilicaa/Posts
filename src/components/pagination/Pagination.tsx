import "./Pagination.scss";
import nextIcon from "../../assets/next.svg";
import prevIcon from "../../assets/prev.svg";

interface PaginationProps {
  currentPage: number;
  setCurrentPage?: any;
  nPages: number;
}
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  nPages,
}: PaginationProps) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="pagination">
      <a className="pagination__icons" onClick={goToPrevPage} href="#">
        <img src={prevIcon} />
      </a>
      {pageNumbers.map((pgNumber) => (
        <div
          key={pgNumber}
          className={`${currentPage === pgNumber ? "active" : ""} `}
        >
          <button
            onClick={() => setCurrentPage(pgNumber)}
            className="pagination__number"
          >
            {pgNumber}
          </button>
        </div>
      ))}
      <a className="pagination__icons" onClick={goToNextPage} href="#">
        <img src={nextIcon} />
      </a>
    </div>
  );
};
