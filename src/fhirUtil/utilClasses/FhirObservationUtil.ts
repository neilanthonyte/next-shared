import {
  observationDeviceTypeName,
  observationDisplayNameExtensionUrl,
  observationFormSchemaExtensionUrl,
  observationFormSlugExtensionUrl,
  observationTypeExtensionUrl,
} from "../../helpers/constants";
import { MedicalResourceType } from "../../types/types";
// import {fhirUtil} from "../index";
import { FhirResourceUtil } from "./FhirResourceUtil";

const plotableFhirValueTypes = ["valueQuantity"];

// TODO: review this list; it's currently used to store resources in the IRIS data store _as well as_ the EHR
// of a staffMember POSTing patient medical resources (doing this means a patient can retrieve them).
const locallyStoredMedicalResourceTypes: MedicalResourceType[] = [
  MedicalResourceType.ReasonForVisit,
  MedicalResourceType.NoteToPatient,
  MedicalResourceType.Goal,
  MedicalResourceType.OnboardingForm,
  MedicalResourceType.PatientForm,
];

export class FhirObservationUtil<
  T extends fhir3.Observation = fhir3.Observation,
> extends FhirResourceUtil<T> {
  /**
   * Returns the id of the resource with the identifiers stripped
   */
  public getStrippedId(): string {
    return this.resource.id.replace("MD", "");
  }

  public getPerformerIds(): string[] {
    if (!this.resource?.performer) {
      return [];
    }
    return this.resource.performer
      .filter((x) => !!x.reference)
      .map((x) => {
        const splitString = x.reference.split("/");
        // when split by a forward slash, the ID is the last value in the array
        return splitString[splitString.length - 1];
      });
  }

  public getSubjectId(): string {
    const splitString = this.resource.subject.reference.split("/");
    return splitString[splitString.length - 1];
  }

  // NOTE: this is only intended for use with external logical patient references. For normal Next observations,
  // getSubjectId should be used to return patientId.
  public getSubjectExternalIdentifier(): { system: string; value: string } {
    if (this.resource.subject?.identifier) {
      return {
        system: this.resource.subject.identifier.system,
        value: this.resource.subject.identifier.value,
      };
    }
    return { system: null, value: null };
  }

  public getMedicalResourceType(): MedicalResourceType | null {
    const resourceType = this.getExtensionStringValue(
      observationTypeExtensionUrl,
    );

    // extension not found
    if (resourceType === null) {
      return null;
    }

    return resourceType as MedicalResourceType;
  }

  public getObservationDisplayName(): string {
    return this.getExtensionStringValue(observationDisplayNameExtensionUrl);
  }

  public observationDeviceType(): string {
    return this.getExtensionStringValue(observationDeviceTypeName) || "Unknown";
  }

  public getDisplayName(): string {
    return this.getObservationDisplayName();
  }

  public getObservationFormSlug(): string {
    return this.getExtensionStringValue(observationFormSlugExtensionUrl);
  }

  public getObservationFormSchema(): string {
    return this.getExtensionStringValue(observationFormSchemaExtensionUrl);
  }

  public isPlottable(): boolean {
    return (
      this.resource.component &&
      this.resource.component.length > 0 &&
      // every component has a plottable metric attached
      this.resource.component.every((component) =>
        plotableFhirValueTypes.some((valueType) => valueType in component),
      )
    );
  }

  public getDisplayText(decimalRounding = 0): string {
    if (this.resource.component.length === 1) {
      // single component
      const component = this.resource.component[0];
      const value = component.valueQuantity.value;
      return `${
        typeof value !== "number" ? value : value.toFixed(decimalRounding)
      } ${component.valueQuantity.unit}`;
    }

    const units: string[] = [];
    const values: string[] = [];

    this.resource.component.forEach((component) => {
      const value = component.valueQuantity.value;
      values.push(
        typeof value !== "number" ? value : value.toFixed(decimalRounding),
      );
      units.push(component.valueQuantity.unit);
    });

    const dedupedUnits = Array.from(new Set(units));
    const unitsString = dedupedUnits.join("/");
    const valuesString = values.join("/");

    // return a string showing every value in the observation
    // if there are multiple different units, show them as well, seperated by a "/"
    // eg. "85 kg", "130/80 mg[hg]" "2/7 g/cm"
    return `${valuesString} ${unitsString}`;
  }

  public getComponent(code: string): fhir3.ObservationComponent | null {
    return this.resource.component.find(
      (x) =>
        x.code.coding &&
        x.code.coding.length > 0 &&
        x.code.coding[0].code === code,
    );
  }

  public getImageUrl(): string | null {
    // LEGACY support the old structure
    const fhirUrl =
      this.resource.component[0]?.valueAttachment?.url ||
      this.resource.component[0]?.valueString;

    if (!fhirUrl) {
      console.warn("Unable to find image URL");
      return null;
    }

    return fhirUrl;
  }

  public storeInNextIRIS(): boolean {
    // if true, store data in IRIS rather than in EHR
    return (
      locallyStoredMedicalResourceTypes.indexOf(
        this.getMedicalResourceType(),
      ) !== -1
    );
  }
}

/**
 * Builds a blank reason for visit with a form.
 */
export const createBlankObservation = (options: {
  slug?: string;
  type?: MedicalResourceType;
  title?: string;
}): fhir3.Observation => {
  const extension: fhir3.Extension[] = [];
  if (options.type) {
    extension.push({
      url: observationTypeExtensionUrl,
      valueString: options.type,
    });
  }
  if (options.slug) {
    extension.push({
      url: observationFormSlugExtensionUrl,
      valueString: options.slug,
    });
  }
  if (options.title) {
    extension.push({
      url: observationDisplayNameExtensionUrl,
      valueString: options.title,
    });
  }
  return {
    resourceType: "Observation",
    extension,
    status: undefined,
    code: undefined,
  };
};
