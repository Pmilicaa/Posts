import styles from "./pagination.module.scss";
import nextIcon from "../../assets/next.svg";
import { Button } from "../button/Button";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { usePostStore } from "../../store/posts-store";
import { usePaginationStore } from "../../store/pagination-store";

export const Pagination = () => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const availablePosts = usePostStore((state) => state.availablePosts);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const setCurrentPagePosts = usePostStore(
    (state) => state.setCurrentPagePosts
  );
  const setPostsToDisplay = usePostStore((state) => state.setPostsToDisplay);

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
    setCurrentPagePosts(currentRecords);
    setPostsToDisplay(currentRecords);
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
