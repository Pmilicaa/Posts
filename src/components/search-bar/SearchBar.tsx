import { useState } from "react";
import { usePostStore } from "../../store/posts-store";
import { useUserStore } from "../../store/users-store";
import "./SearchBar.scss";

export const SearchBar: React.FC = () => {
  const users = useUserStore((state) => state.users);
  const [value, setValue] = useState("");
  const setPostsByUserId = usePostStore((state) => state.setPostsByUserId);
  const currentPagedPosts = usePostStore((state) => state.currentPagedPosts);
  const setFilteredPosts = usePostStore((state) => state.setFilteredPosts);

  const handleChange = (e: any): void => {
    setPostsByUserId(e.target.value as string);
    setValue(e.target.value);
  };

  const setSearchQuery = (e: any): void => {
    const posts = currentPagedPosts.filter((post) => {
      return post.title.includes(e);
    });
    setFilteredPosts(posts);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__box">
        <input
          name="search"
          className="search-bar__box__input search-bar__box__input__text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="search-bar__box">
        <select
          name="selectedFruit"
          className={
            value
              ? "search-bar__box__input search-bar__box__input__selected"
              : "search-bar__box__input"
          }
          onChange={handleChange}
        >
          <option disabled selected hidden value="">
            Filter by author name
          </option>
          {users.map((user) => (
            <option
              className="search-bar__box__input__text"
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
