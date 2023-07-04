/**
 * Splits a full name into given and surname chunks.
 *
 * Treats all words except the last word as part of the given name. If there's only
 * one word in the name though, it's treated as the given name.
 *
 * Nothing special is done to handle suffixes like "Jr." -- these will be treated as
 * the surname.
 *
 * @param fullName the full name string to split
 * @returns a [string, string] tuple with the given and surname strings respectively
 */
export function splitName(fullName: string): [string, string] {
  const parts = fullName.split(/\s/).filter((s) => s);

  if (parts.length <= 0) {
    return [undefined, undefined];
  }

  if (parts.length === 1) {
    return [fullName, undefined];
  }

  const givenNames = parts.slice(0, -1).join(" ");
  const surname = parts[parts.length - 1];

  return [givenNames, surname];
}
