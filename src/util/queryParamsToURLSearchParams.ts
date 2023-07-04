/**
 * Convert query parameters to URLSearchParams object.
 */
export const queryParamsToURLSearchParams = (
  query: string | Record<string, string | string[]>,
): URLSearchParams => {
  if (typeof query === "string") {
    return new URLSearchParams(query);
  }
  const queryEntries = Object.entries(query).reduce(
    (aggregator, [key, item]) => {
      if (Array.isArray(item)) {
        const itemEntries = item.map((itemValue) => [key, itemValue]);
        return [...aggregator, ...itemEntries];
      }
      return [...aggregator, [key, item]];
    },
    [],
  );
  return new URLSearchParams(queryEntries);
};
