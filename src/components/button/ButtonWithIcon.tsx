import { ReactElement } from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  className: string;
  isDisabled?: boolean;
  icon: {
    src: string;
    styles: object;
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
            <span>{label}</span> <img style={icon.styles} src={icon.src} />
          </>
        ) : (
          <>
            <img style={icon.styles} src={icon.src} /> <span>{label}</span>
          </>
        )}
      </>
    );
  };
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {renderIcon(icon.isIconRight)}
    </button>
  );
};
