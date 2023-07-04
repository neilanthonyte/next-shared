import { FhirResourceUtil } from "./FhirResourceUtil";
import * as _ from "lodash";

export class FhirMedicationRequestUtil<
  T extends fhir3.MedicationRequest = fhir3.MedicationRequest,
> extends FhirResourceUtil<T> {
  public isActive(): boolean {
    return this.resource.status === "active";
  }

  public getDisplayName(): string {
    return "Medication";
  }

  /**
   * Display text is the medical name for medical resource
   */
  public getDisplayText(): string {
    return this.resource.medicationCodeableConcept.text;
  }

  /**
   * PENDING REVIEW: Get the instruction on the dosage. Dosage for medication is
   * an array. This function defaults to the first entry.
   * @param index - Index of the dosage item to get the instruction from.
   */
  public getDosageInstruction(index: number = 0): string {
    // TODO - Check for more appropriate data (i.e. dosageRange, dosgaeQuantity)
    return _.get(
      this.resource,
      `dosageInstruction[${index}].additionalInstruction[0].text`,
    );
  }
  /**
   * Get the route of the medication. (i.e. oral)
   * @param index - Index of the dosage item to get the instruction from.
   */
  public getDosageRoute(index: number = 0): string {
    return _.get(this.resource, `dosageInstruction[${index}].route.text`);
  }

  /**
   * Get the direction of the how to take the medication
   * @param index - Index of the dosage item to get the instruction from.
   */
  public getDirection(index: number = 0): string {
    return _.get(this.resource, `dosageInstruction[${index}].text`);
  }

  // TODO: Remove this function. Let's not hide where the ID is coming from. Because it should always
  // be the ID.
  public getMedicationId(): string {
    const fhirResource = this.resource;

    if (!fhirResource.identifier || fhirResource.identifier.length === 0) {
      return null;
    }

    return this.resource.identifier[0].value;
  }
}
