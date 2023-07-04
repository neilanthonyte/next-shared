/**
 * Function returning first and last initials of a given full name
 * If more than two words name is given, it will return the first and last word initials
 *
 * Examples:
 * "Mark" => "M"
 * "Mark Porter" => "MP"
 * "Mark Porter Junior" => "MJ"
 * "Mark de Ville" => "MV" --- TODO improve to support these scenarios if needed in the future
 */
export const getInitialsFromFullName = (fullName: string): string => {
  if (!fullName) return "";
  const splits = fullName.split(" ").filter((x) => !!x);
  if (!splits.length) return "";
  if (splits.length === 1) {
    return splits[0][0] || "";
  }
  const lastIndex = splits.length - 1;
  const first = splits[0][0] || "";
  const last = splits[lastIndex][0] || "";
  return first + last;
};
