import { ReactElement } from "react";
import { usePostStore } from "../../../store/posts-store";

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
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
