import { ReactElement } from "react";
import { usePostStore } from "../../../store/posts-store";
import styles from "./search-input.module.scss";

export const SearchInput = (): ReactElement => {
  const setFilteredPosts = usePostStore((state) => state.setFilteredPosts);
  const currentPagedPosts = usePostStore((state) => state.currentPagedPosts);
  const filteredPosts = usePostStore((state) => state.filteredPosts);

  const setSearchQuery = (value: string): void => {
    const posts = value
      ? filteredPosts.filter((post) => post.title.includes(value))
      : currentPagedPosts;

    setFilteredPosts(posts);
  };

  return (
    <input
      name="search"
      placeholder="Search"
      className={styles.input}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
