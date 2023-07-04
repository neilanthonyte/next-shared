/**
 * Returns a shallow copy of fhir extension array with an extension upserted.
 * - Key is the extension.url.
 * - If key exists, then the extension is updated with new value.
 * - If key does not exist, then the extension is inserted.
 */
export const upsertIntoExtensionsByUrl = <
  TExtension extends fhir3.Extension | fhir4.Extension = fhir4.Extension,
>(
  extensions: TExtension[],
  newExtension: TExtension,
): TExtension[] => {
  if (!extensions || extensions?.length === 0 || !newExtension?.url) {
    return extensions;
  }
  return [
    ...extensions.filter(
      (existingExtension) => existingExtension.url !== newExtension.url,
    ),
    newExtension,
  ];
};
