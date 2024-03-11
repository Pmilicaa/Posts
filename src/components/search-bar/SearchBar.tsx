import { ChangeEventHandler, ReactElement, useState } from "react";
import { usePostStore } from "../../store/posts-store";
import { useUserStore } from "../../store/users-store";
import styles from "./searchBar.module.scss";

export const SearchBar = (): ReactElement => {
  const users = useUserStore((state) => state.users);
  const setPostsByUserId = usePostStore((state) => state.setPostsByUserId);
  const currentPagedPosts = usePostStore((state) => state.currentPagedPosts);
  const setFilteredPosts = usePostStore((state) => state.setFilteredPosts);
  const [value, setValue] = useState<string>();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e): void => {
    setPostsByUserId(e.target.value as string);
    setValue(e.target.value);
  };

  const setSearchQuery = (value: string): void => {
    const posts = currentPagedPosts.filter((post) => {
      return post.title.includes(value);
    });
    setFilteredPosts(posts);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.box}>
        <input
          name="search"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.box}>
        <select
          onChange={handleChange}
          className={value ? styles.colorBlack : styles.colorGray}
        >
          <option disabled selected hidden value="">
            Filter by author name
          </option>
          {users.map((user) => (
            <option className={styles.text} value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
