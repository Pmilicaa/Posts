import { ChangeEventHandler, ReactElement, useState } from "react";
import styles from "./author-filter.module.scss";
import { useUserStore } from "../../../store/users-store";
import { usePostStore } from "../../../store/posts-store";
import { postServiceInstance } from "../../../services/PostService";

export const AuthorFilter = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const users = useUserStore((state) => state.users);
  const setAvailablePosts = usePostStore((state) => state.setAvailablePosts);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (
    e
  ): Promise<void> => {
    setValue(e.target.value);
    await fetchData(e.target.value);
  };

  const fetchData = async (userId: string): Promise<void> => {
    if (userId) {
      const responseCommentData =
        await postServiceInstance.getFilteredPostsByUserId(userId);
      if (responseCommentData) {
        setAvailablePosts(responseCommentData);
      }
    }
  };

  return (
    <select
      onChange={handleChange}
      className={value ? styles.colorBlack : styles.colorGray}
    >
      <option disabled selected hidden>
        Filter by author name
      </option>
      {users.map((user) => (
        <option className={styles.text} value={user.id} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
