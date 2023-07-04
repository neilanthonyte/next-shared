import { FhirResourceUtil } from "./FhirResourceUtil";

export class FhirPersonUtil<
  T extends fhir3.Person = fhir3.Person,
> extends FhirResourceUtil<T> {
  public getPrimaryEmail(): string | null {
    if (!this.resource.telecom) {
      return null;
    }

    const emailAddresses = this.resource.telecom
      .filter((x) => x.system === "email")
      .map((x) => x.value);

    if (emailAddresses.length === 0) {
      return null;
    }

    return emailAddresses[0];
  }

  public getPrimaryMobileNumber(): string | null {
    if (!this.resource.telecom) {
      return null;
    }

    const mobileNumbers = this.resource.telecom
      .filter((x) => x.system === "phone" && x.use === "mobile")
      .map((x) => x.value)
      .filter((x) => x.startsWith("+614")); // only australian mobile numbers TODO is this check necessary?

    if (mobileNumbers.length === 0) {
      return null;
    }

    return mobileNumbers[0];
  }

  public getDisplayName(): string | null {
    if (!this.resource.name || this.resource.name.length === 0) {
      return null;
    }

    const fhirName = this.resource.name[0];

    const name = [
      fhirName.prefix && fhirName.prefix.length > 0
        ? fhirName.prefix[0]
        : undefined,
      fhirName.given.length > 0 ? fhirName.given[0] : undefined,
      fhirName.family,
    ]
      .filter((x) => x !== undefined)
      .join(" ");

    return name;
  }

  public getFormattedAddress(address?: fhir3.Address): string | null {
    const _address = address || this.resource.address[0];
    if (!_address) return null;
    const secondLine = [_address.city, _address.state, _address.postalCode]
      .filter((x) => !!x)
      .join(" ");
    const lineAddress = (_address.line || []).filter((x) => !!x).join("\n");
    if (!lineAddress.length && !secondLine.length) return null;
    return [lineAddress, secondLine].filter((x) => !!x).join("\n");
  }
}
