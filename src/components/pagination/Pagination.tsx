import styles from "./pagination.module.scss";
import nextIcon from "../../assets/next.svg";
import { Button } from "../button/Button";

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
      <a
        className={currentPage === 1 ? styles.disabled : styles.enabled}
        onClick={goToPrevPage}
      >
        <img
          src={nextIcon}
          className={`${styles.transform} ${
            currentPage === 1 ? styles.disabled : styles.enabled
          }`}
        />
      </a>
      {pageNumbers.map((pgNumber) => (
        <div
          key={pgNumber}
          className={`${currentPage === pgNumber ? styles.active : ""} `}
        >
          <Button
            className={styles.number}
            onClick={() => setCurrentPage(pgNumber)}
            label={pgNumber.toString()}
          />
        </div>
      ))}
      <a
        className={
          currentPage === numberOfPages ? styles.disabled : styles.enabled
        }
        onClick={goToNextPage}
      >
        <img
          src={nextIcon}
          className={
            currentPage === numberOfPages ? styles.disabled : styles.enabled
          }
        />
      </a>
    </div>
  );
};
