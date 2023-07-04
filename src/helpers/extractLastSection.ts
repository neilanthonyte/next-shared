/**
 * Mainly used for the participant reference to extract the ID.
 * This extracts the last section of a path
 * @param str
 * @returns
 */
export const extractLastSection = (str: string) => {
  if (!str) {
    return null;
  }
  const parts = str.split("/");
  return parts?.[parts.length - 1];
};
