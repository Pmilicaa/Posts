import styles from "./notFound.module.scss";
import { ReactElement } from "react";

export const NotFoundPage = (): ReactElement => {
  return (
    <div className={styles.notFound}>
      <h1>Oops!</h1>
      <p>Not found</p>
    </div>
  );
};
