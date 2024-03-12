import styles from "./pagination.module.scss";
import nextIcon from "../../assets/next.svg";
import { Button } from "../button/Button";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { usePostStore } from "../../store/posts-store";

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const availablePosts = usePostStore((state) => state.availablePosts);
  const setFirstPagePosts = usePostStore((state) => state.setFirstPagePosts);
  const setToDisplay = usePostStore((state) => state.setToDisplay);

  const recordsPerPage = 5;
  const numberOfPages = Math.ceil(availablePosts.length / recordsPerPage);
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const goToNextPage = (): void => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = (): void => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const paginateAndSetDisplay = () => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = availablePosts.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    setFirstPagePosts(currentRecords);
    setToDisplay(currentRecords);
  };

  useEffect(() => {
    paginateAndSetDisplay();
  }, []);

  useEffect(() => {
    paginateAndSetDisplay();
  }, [currentPage, availablePosts]);

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
          key={uuidv4()}
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
