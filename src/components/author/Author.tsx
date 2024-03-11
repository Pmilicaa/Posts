import { ReactElement } from "react";
import styles from "./author.module.scss";
import { User } from "../../models/User";
import { getAddressDetails } from "../../util/helpers";

interface AuthorProps {
  author: User;
}
export const Author = ({ author }: AuthorProps): ReactElement => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.authorTitle}>Author name</div>
        <div className={styles.authorDesc}>{author?.name}</div>
      </div>
      <div>
        <div className={styles.authorTitle}>Address</div>
        <div className={styles.authorDesc}>
          {author && getAddressDetails(author)}
        </div>
      </div>
    </div>
  );
};
