export const getCapitalizedText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
export const getSplitBody = (text: string): string[] => {
  return text.split("\n");
};
