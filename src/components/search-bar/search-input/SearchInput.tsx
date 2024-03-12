import { ReactElement } from "react";
import { usePostStore } from "../../../store/posts-store";
import styles from "./search-input.module.scss";

export const SearchInput = (): ReactElement => {
  const postsToDisplay = usePostStore((state) => state.postsToDisplay);
  const currentPagePosts = usePostStore((state) => state.currentPagePosts);
  const setPostsToDisplay = usePostStore((state) => state.setPostsToDisplay);

  const setSearchQuery = (value: string): void => {
    const posts = value
      ? postsToDisplay.filter((post) => post.title.includes(value))
      : currentPagePosts;

    setPostsToDisplay(posts);
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
