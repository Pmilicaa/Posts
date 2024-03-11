import { ReactElement } from "react";
import styles from "./search-input.module.scss";
import { usePostStore } from "../../../store/posts-store";

export const SearchInput = (): ReactElement => {
  const setFilteredPosts = usePostStore((state) => state.setFilteredPosts);
  const currentPagedPosts = usePostStore((state) => state.currentPagedPosts);

  const setSearchQuery = (value: string): void => {
    const posts = currentPagedPosts.filter((post) => {
      return post.title.includes(value);
    });
    setFilteredPosts(posts);
  };
  return (
    <input
      name="search"
      placeholder="Search"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
