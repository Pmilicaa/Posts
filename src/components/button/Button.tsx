import { ReactElement } from "react";

interface ButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  isDisabled?: boolean;
}
export const Button = ({
  onClick,
  label,
  className,
  isDisabled,
}: ButtonProps): ReactElement => {
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};
