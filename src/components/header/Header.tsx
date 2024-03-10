import { getCapitalizedText } from "../../util/helpers";
import "./Header.scss";

interface HeaderProps {
  title: string;
  style: object;
}
export const Header: React.FC<HeaderProps> = ({
  title,
  style,
}: HeaderProps) => {
  return (
    <div className="header" style={style}>
      <p className="header__title">{getCapitalizedText(title)}</p>
    </div>
  );
};
