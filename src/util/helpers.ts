import rightArrow from "../assets/right-arrow.svg";
import { User } from "../models/User";

export const getCapitalizedText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
export const getSplitBody = (text: string): string[] => {
  return text.split("\n");
};

export const createArrowIcon = (isIconRight: boolean) => {
  return {
    styles: isIconRight
      ? { paddingRight: "2px" }
      : { transform: "matrix(-1, 0, 0, -1, 0, 0)", paddingRight: "2px" },
    src: rightArrow,
    isIconRight: isIconRight,
  };
};

export const getAddressDetails = (author: User): string => {
  if (author?.address) {
    const { city, zipcode, street } = author.address;
    return `${city}, ${zipcode}, ${street}`;
  } else {
    return "Address details not available";
  }
};
