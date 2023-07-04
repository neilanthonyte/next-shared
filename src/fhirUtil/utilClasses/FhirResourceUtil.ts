import moment from "moment";
import { extractLastSection } from "../../helpers/extractLastSection";
import {
  originEhrIdExtensionUrl,
  originLocationSlugExtensionUrl,
  patientStoreOriginExtensionUrl,
  rejectedReviewItemForAllExtensionUrl,
  reviewItemExtensionUrl,
  reviewItemReviewedExtensionUrl,
  reviewedItemDateExtensionUrl,
  reviewedItemStatusExtensionUrl,
  reviewedItemPerformerExtensionUrl,
  migratedHubObservationOriginalEffectiveDate,
} from "../../helpers/constants";
import { currentUnixTimestamp } from "../../helpers/currentUnixTimestamp";
import { MedicalStaffMember } from "../../models/MedicalStaffMember";
import { unixTimestamp } from "../../types/dateTypes";
import { MedicalResourceType, transcribeItems } from "../../types/types";
import { FhirBaseUtil } from "./FhirBaseUtil";

export class FhirResourceUtil<
  T extends fhir3.Resource = fhir3.Resource,
> extends FhirBaseUtil<T> {
  public isResourceType(resourceType: string) {
    return this.resource.resourceType === resourceType;
  }

  public getMedicalResourceType(): MedicalResourceType | null {
    // items with custom types (eg observations) can override this method
    return this.resource.resourceType as MedicalResourceType;
  }

  public getDisplayName(): string {
    return this.resource.resourceType;
  }

  public getDisplayText(): string {
    throw new Error(`Unimplemented for type ${this.resource.resourceType}`);
  }

  // compare between a fhir id and uri
  // eg, https://api.hub.medicaldirector.com/fhir/Practitioner/MD3115 === MD3115
  public idRefMatches(idRef: string): boolean {
    return extractLastSection(this.resource.id) === extractLastSection(idRef);
  }

  public getLastModified(): unixTimestamp | null {
    // for migrated data, we use the extension
    const originalModifiedDate = this.getExtensionStringValue(
      migratedHubObservationOriginalEffectiveDate,
    );
    if (originalModifiedDate) {
      return moment(originalModifiedDate).unix();
    }

    const lastModifiedStr =
      this.resource.meta && this.resource.meta.lastUpdated;
    if (lastModifiedStr) {
      return moment(lastModifiedStr).unix();
    }

    // fall back to issed
    const issuedStr = (this.resource as any).issued;
    if (issuedStr) {
      return moment(issuedStr).unix();
    }

    return null;
  }

  public getCreationDate(): unixTimestamp | null {
    // try and read a datetime property from the object
    const anyResource = this.resource as any;
    const dateStr = anyResource.effectiveDateTime || anyResource.issued;
    if (dateStr) {
      return moment(dateStr).unix();
    }

    return this.getLastModified(); // fall back to modified date
  }

  public wasUpdatedToday(): boolean {
    const lastUpdated = this.getLastModified();
    return lastUpdated && moment.unix(lastUpdated).isSame(moment(), "day");
  }

  public isReviewItem(locationSlug?: string): boolean {
    // If this has an Id but didn't come from the Next patient store (IRIS), assume it came from an EHR,
    // thus it is _not_ a review item (regardless of extensions)
    if (this.resource.id && this.isNextPatientStore() === false) {
      return false;
    }

    // Check for the generic (and original) review item flag; the NP clients should all set this for
    // patient-entered medical resources. If it's not here, assume this was entered by a staff member
    const reviewItemExtensionBoolean =
      this.getExtensionBooleanValue(reviewItemExtensionUrl) === true;
    if (!reviewItemExtensionBoolean) {
      return false;
    }

    // If there's a blanket reject extension (meaning the patient wanted to remove their
    // own metric entry etc), honour that here:
    if (this.isRejectedReviewItemByPatient()) {
      return false;
    }

    // Support legacy (non-EHR-specific) mode: if no locationSlug is passed in, assume that _any_
    // reviewed status (extension indicating acceptance or rejection) from _any_ location indicates
    // this resource is no longer a 'review item'
    if (!locationSlug) {
      const reviews = this.getMatchingExtensions(
        reviewItemReviewedExtensionUrl,
      );
      if (reviews.length) {
        return false;
      } else {
        return true;
      }
    }

    // If locationSlug is passed, return 'true' (for review) only if there is no EHR-specific
    // accept or reject extension for the specified EHR
    return !this.reviewItemIsReviewedByThisLocation(locationSlug);
  }

  /**
   * This sets the specified status in a 'reviewed' extension for the location of the specified HCP.
   * The extension is used elsewhere to determine if the resource is still 'for review' for a given
   * location.
   *
   * @param status
   * @param medicalStaffMember
   */
  public setReviewItemStatusWithHCP(
    status: "accepted" | "rejected",
    medicalStaffMember: MedicalStaffMember,
  ): T {
    return this.setExtension({
      extension: [
        {
          url: reviewedItemPerformerExtensionUrl,
          valueString: medicalStaffMember.getDisplayName(),
        },
        {
          url: reviewedItemStatusExtensionUrl,
          valueString: status,
        },
        {
          url: reviewedItemDateExtensionUrl,
          valueInteger: currentUnixTimestamp(),
        },
      ],
      url: `${reviewItemReviewedExtensionUrl}/${medicalStaffMember.cmsLocationSlug}`,
    });
  }

  /**
   * Given a location slug, this will return 'true' if an extension exists on this resource
   * indicating it's been accepted or rejected by an HCP at the specified location.
   *
   * @param locationSlug
   * @returns boolean
   */
  private reviewItemIsReviewedByThisLocation(locationSlug: string): boolean {
    const ehrReviewedExtensions = this.getMatchingExtensions(
      reviewItemReviewedExtensionUrl,
    );
    const reviewedLocations = ehrReviewedExtensions.map((extension) => {
      const extensionURL = new URL(extension.url);
      const pathArray = extensionURL.pathname.split("/");
      return pathArray[pathArray.length - 1];
    });
    return reviewedLocations.includes(locationSlug);
  }

  /**
   * This is only intended for use with medical resources that can be entered by the patient
   * (observations, goals, etc).
   *
   * @returns
   */
  private isNextPatientStore(): boolean {
    return (
      this.getExtensionBooleanValue(patientStoreOriginExtensionUrl) === true
    );
  }

  public isRejectedReviewItemByPatient(): boolean {
    return (
      this.getExtensionBooleanValue(rejectedReviewItemForAllExtensionUrl) ===
      true
    );
  }

  public getOriginEhrId(): null | string {
    return this.getExtensionStringValue(originEhrIdExtensionUrl);
  }

  public getOriginLocationSlug(): null | string {
    return this.getExtensionStringValue(originLocationSlugExtensionUrl);
  }

  public isTranscribeItem(locationSlug?: string): boolean {
    return (
      this.isReviewItem(locationSlug) &&
      transcribeItems.indexOf(this.getMedicalResourceType()) !== -1
    );
  }

  public transcribeAction(locationSlug?: string): "accept" | "reject" {
    const acceptableItems = [
      MedicalResourceType.OnboardingForm,
      MedicalResourceType.ReasonForVisit,
      MedicalResourceType.PatientForm,
    ];

    if (!this.isTranscribeItem(locationSlug)) {
      throw new Error(
        "Cannot provide transcribe action, not a transcribe item",
      );
    }

    return acceptableItems.indexOf(this.getMedicalResourceType()) !== -1
      ? "accept"
      : "reject";
  }

  public getIdentifier(system: string): fhir3.Identifier {
    const fhirResource = this.resource as any;

    if (!fhirResource.identifier || fhirResource.identifier.length === 0) {
      return null;
    }

    const matchingValues: fhir3.Identifier[] = fhirResource.identifier.filter(
      (x: fhir3.Identifier) => x.system === system,
    );

    if (matchingValues.length === 0) {
      return null;
    }
    if (matchingValues.length > 1) {
      throw new Error("More than one identifier for system: " + system);
    }

    return matchingValues[0];
  }
}
