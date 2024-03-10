import { ReactElement } from "react";
import { getCapitalizedText } from "../../util/helpers";
import styles from "./header.module.scss";

interface HeaderProps {
  title: string;
  style: object;
}
export const Header = ({ title, style }: HeaderProps): ReactElement => {
  return (
    <div className={styles.header} style={style}>
      <p>{getCapitalizedText(title)}</p>
    </div>
  );
};
