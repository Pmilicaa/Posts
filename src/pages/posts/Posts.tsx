import { ReactElement, useEffect, useState } from "react";
import styles from "./posts.module.scss";
import { HeaderStyle } from "./styles";
import { Header } from "../../components/header/Header";
import { usePostStore } from "../../store/posts-store";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { PostGrid } from "../../components/post-grid/PostGrid";
import { Pagination } from "../../components/pagination/Pagination";

export const PostsPage = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const posts = usePostStore((state) => state.posts);
  const filteredPosts = usePostStore((state) => state.filteredPosts);

  const setCurrentPagedPosts = usePostStore(
    (state) => state.setCurrentPagedPosts
  );

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(posts.length / recordsPerPage);

  useEffect(() => {
    setCurrentPagedPosts(currentRecords);
  }, [posts, currentPage]);

  return (
    <>
      <Header
        title={`Posts found: ${filteredPosts.length}`}
        style={HeaderStyle}
      />
      <div className={styles.container}>
        <SearchBar />
        <PostGrid data={filteredPosts} />
        <div className={styles.paginationContainer}>
          {nPages && (
            <Pagination
              numberOfPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
