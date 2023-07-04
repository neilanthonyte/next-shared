import { upsertIntoExtensionsByUrl } from "../upsertIntoExtensionsByUrl";

describe("upsertIntoExtensionsByUrl", () => {
  it("should add extension to the extensions, if the extension.url doesn't match one that's already in the extensions", () => {
    const mockNewExtensionUrl =
      "http://mock.new.extensionurl.org/mock_extension";
    const mockNewExtension: fhir4.Extension = {
      url: mockNewExtensionUrl,
      valueString: "New Extension Value",
    };

    const mockExistingExtensions: fhir4.Extension[] = [
      {
        url: "extension_url_1",
        valueInteger: 2,
      },
      {
        url: "extension_url_2",
        valueString: "Extension 2",
      },
    ];

    const mockUpdatedExtensions = upsertIntoExtensionsByUrl(
      mockExistingExtensions,
      mockNewExtension,
    );

    expect(mockUpdatedExtensions).toHaveLength(3);
    expect(mockUpdatedExtensions).toContain(mockNewExtension);
  });

  it("should update extension in the extensions, if the extension.url matches one that's already in the extensions", () => {
    const mockNewExtensionUrl =
      "http://mock.new.extensionurl.org/mock_extension";

    const mockExistingExtensionValue = "Updated ExtensionValue";
    const mockNewExtension: fhir4.Extension = {
      url: mockNewExtensionUrl,
      valueString: "New Extension Value",
    };

    const mockExistingExtensions: fhir4.Extension[] = [
      {
        url: "extension_url_1",
        valueInteger: 2,
      },
      {
        url: "extension_url_2",
        valueString: "Extension 2",
      },
      {
        url: mockNewExtensionUrl,
        valueString: mockExistingExtensionValue,
      },
    ];

    const mockUpdatedExtensions = upsertIntoExtensionsByUrl(
      mockExistingExtensions,
      mockNewExtension,
    );

    expect(mockUpdatedExtensions).toHaveLength(3);
    expect(mockUpdatedExtensions).toContain(mockNewExtension);
    expect(mockUpdatedExtensions[2].valueString).not.toEqual(
      mockExistingExtensionValue,
    );
  });
});
