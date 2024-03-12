import { ReactElement } from "react";
import styles from "./posts.module.scss";
import { Header } from "../../components/header/Header";
import { usePostStore } from "../../store/posts-store";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { PostGrid } from "../../components/post-grid/PostGrid";
import { Pagination } from "../../components/pagination/Pagination";

export const PostsPage = (): ReactElement => {
  const toDisplayPosts = usePostStore((state) => state.toDisplay);
  return (
    <>
      <Header
        title={`Posts found: ${toDisplayPosts.length}`}
        className="headerContainer"
      />
      <div className={styles.container}>
        <SearchBar />
        <PostGrid />
        <div className={styles.paginationContainer}>{<Pagination />}</div>
      </div>
    </>
  );
};
