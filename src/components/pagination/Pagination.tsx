import styles from "./pagination.module.scss";
import nextIcon from "../../assets/next.svg";
import prevIcon from "../../assets/prev.svg";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numberOfPages: number;
}
export const Pagination = ({
  currentPage,
  setCurrentPage,
  numberOfPages,
}: PaginationProps) => {
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const goToNextPage = (): void => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = (): void => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.container}>
      <a className={styles.pointer} onClick={goToPrevPage}>
        <img src={prevIcon} />
      </a>
      {pageNumbers.map((pgNumber) => (
        <div
          key={pgNumber}
          className={`${currentPage === pgNumber ? styles.active : ""} `}
        >
          <button
            onClick={() => setCurrentPage(pgNumber)}
            className={styles.number}
          >
            {pgNumber}
          </button>
        </div>
      ))}
      <a className={styles.pointer} onClick={goToNextPage}>
        <img src={nextIcon} />
      </a>
    </div>
  );
};
