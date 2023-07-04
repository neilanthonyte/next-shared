// no fhir type specified, any type can be given (resources, extensions ext)
export class FhirBaseUtil<T = any> {
  constructor(public resource: T) {}

  // get extension --------------------------------------------------------
  public getExtension(extensionUrl: string): fhir3.Extension | null {
    // fhir type definitions dont have a single base class with a definition of .extension
    const fhirResource = this.resource as any;

    if (!fhirResource.extension || fhirResource.extension.length === 0) {
      return null;
    }

    const matchingValues = fhirResource.extension.filter(
      (x: fhir3.Extension) => x.url === extensionUrl,
    );

    if (matchingValues.length === 0) {
      return null;
    }
    if (matchingValues.length > 1) {
      throw new Error("More than one extension for url: " + extensionUrl);
    }

    return matchingValues[0];
  }

  /**
   * Retrieves all extensions where URI beings with the passed-in extensionUrl argument
   *
   * @param extensionUrl
   * @returns
   */
  public getMatchingExtensions(extensionUrl: string): fhir3.Extension[] {
    // fhir type definitions dont have a single base class with a definition of .extension
    const fhirResource = this.resource as any;

    if (!fhirResource.extension || fhirResource.extension.length === 0) {
      return [];
    }

    const matchingValues = fhirResource.extension.filter((x: fhir3.Extension) =>
      x.url.startsWith(extensionUrl),
    );

    return matchingValues;
  }

  public getExtensionStringValue(extensionUrl: string): string | null {
    const extension = this.getExtension(extensionUrl);
    if (extension === null) {
      return null;
    }

    if (extension.valueString === undefined) {
      throw new Error(
        `Extension '${extensionUrl}' does not have a string value`,
      );
    }

    return extension.valueString;
  }

  public getExtensionIntegerValue(extensionUrl: string): number | null {
    const extension = this.getExtension(extensionUrl);
    if (extension === null) {
      return null;
    }

    if (extension.valueInteger === undefined) {
      throw new Error(
        `Extension '${extensionUrl}' does not have a boolean value`,
      );
    }

    return extension.valueInteger;
  }

  public getExtensionBooleanValue(extensionUrl: string): boolean | null {
    const extension = this.getExtension(extensionUrl);
    if (extension === null) {
      return null;
    }

    if (extension.valueBoolean === undefined) {
      throw new Error(
        `Extension '${extensionUrl}' does not have a boolean value`,
      );
    }

    return extension.valueBoolean;
  }

  // set extension --------------------------------------------------------
  public setExtension(extension: fhir3.Extension): T {
    // remove any existing extension with the same url
    const fhirObject = { ...(this.resource as any) }; // typescript doesnt like spreads and generics

    if (!fhirObject.extension) {
      fhirObject.extension = [];
    }

    fhirObject.extension = fhirObject.extension.filter(
      (x: fhir3.Extension) => x.url !== extension.url,
    );

    fhirObject.extension.push(extension);
    return fhirObject;
  }

  public deleteExtension(url: string) {
    // remove any existing extension with the same url
    const fhirObject = { ...(this.resource as any) }; // typescript doesnt like spreads and generics

    if (!fhirObject.extension) {
      fhirObject.extension = [];
    }

    fhirObject.extension = fhirObject.extension.filter(
      (x: fhir3.Extension) => x.url !== url,
    );

    return fhirObject;
  }
}
