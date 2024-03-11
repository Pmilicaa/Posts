import { ChangeEventHandler, ReactElement, useState } from "react";
import styles from "./author-filter.module.scss";
import { useUserStore } from "../../../store/users-store";
import { usePostStore } from "../../../store/posts-store";

export const AuthorFilter = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const users = useUserStore((state) => state.users);
  const setPostsByUserId = usePostStore((state) => state.setPostsByUserId);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e): void => {
    setPostsByUserId(e.target.value as string);
    setValue(e.target.value);
  };

  return (
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
  );
};
