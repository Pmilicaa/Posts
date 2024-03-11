import { ReactElement } from "react";
import styles from "./searchBar.module.scss";
import { SearchInput } from "./search-input/SearchInput";
import { AuthorFilter } from "./author-filter/AuthorFilter";

export const SearchBar = (): ReactElement => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.box}>
        <SearchInput />
      </div>
      <div className={styles.box}>
        <AuthorFilter />
      </div>
    </div>
  );
};
