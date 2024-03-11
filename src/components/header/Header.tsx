import { ReactElement } from "react";
import { getCapitalizedText } from "../../util/helpers";
import styles from "./header.module.scss";

interface HeaderProps {
  title: string;
  className: string;
}
export const Header = ({ title, className }: HeaderProps): ReactElement => {
  return (
    <div className={`${styles.header} ${className}`}>
      <p>{getCapitalizedText(title)}</p>
    </div>
  );
};
