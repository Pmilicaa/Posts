import React, { ReactElement } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  isDisabled?: boolean;
  icon: {
    src: string;
    styles: React.CSSProperties;
    isIconRight: boolean;
  };
}
export const ButtonWithIcon = ({
  onClick,
  label,
  className,
  isDisabled,
  icon,
}: ButtonProps): ReactElement => {
  const renderIcon = (isIconRight: boolean) => {
    return (
      <>
        {isIconRight ? (
          <>
            <span>{label}</span>
            <img
              style={icon.styles}
              className={isDisabled ? styles.disabled : ""}
              src={icon.src}
            />
          </>
        ) : (
          <>
            <img
              style={icon.styles}
              src={icon.src}
              className={isDisabled ? styles.disabled : ""}
            />{" "}
            <span>{label}</span>
          </>
        )}
      </>
    );
  };
  return (
    <button
      className={`${styles.container} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {renderIcon(icon.isIconRight)}
    </button>
  );
};
