/**
 * Merge new extensions into the source extensions. If new extension's URL is in the source, then
 * the source extension's extension is replaced with the new one, otherwise added.
 */
export const mergeExtensions = (
  sourceExtensions: fhir4.Extension[],
  newExtensions: fhir4.Extension[],
) => {
  const mergedExtensionMap = new Map(
    [...sourceExtensions, ...newExtensions].map((extension) => [
      extension.url,
      extension,
    ]),
  );

  return Array.from(mergedExtensionMap.values());
};
