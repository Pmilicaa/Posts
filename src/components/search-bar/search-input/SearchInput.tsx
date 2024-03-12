import { ReactElement } from "react";
import { usePostStore } from "../../../store/posts-store";
import styles from "./search-input.module.scss";

export const SearchInput = (): ReactElement => {
  const toDisplayPosts = usePostStore((state) => state.toDisplay);
  const firstPagePosts = usePostStore((state) => state.firstPagePosts);
  const setToDisplay = usePostStore((state) => state.setToDisplay);

  const setSearchQuery = (value: string): void => {
    const posts = value
      ? toDisplayPosts.filter((post) => post.title.includes(value))
      : firstPagePosts;

    setToDisplay(posts);
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
