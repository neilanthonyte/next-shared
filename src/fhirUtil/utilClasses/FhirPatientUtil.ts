import { cloneDeep } from "lodash";
import {
  auPatientProfileMedicareSystem,
  extensionPatientCentreLink,
  extensionPatientDVA,
  extensionPatientIsOptInSms,
  hubExternalResourceIdentifier,
  patientLastDemographicUpdateUrl,
  patientLastMedicalDataUpdateUrl,
  patientLastPaymentMethodUpdateUrl,
  patientLastRecordSyncUrl,
  patientLastRecordUpdateUrl,
  tourLastSeenExtensionUrl,
} from "../../helpers/constants";
import { unixTimestamp } from "../../types/dateTypes";
import { timestampTZToUnixTimestamp } from "../../util/datetimeConversion";
import { FhirPersonUtil } from "./FhirPersonUtil";
import { EOptionalEhrDemographicsRequiredByNext } from "../../types/ICheckForMatchingPatientResult";
import { EEhrKey } from "../../types/EEhrKey";
import { getNextEhrRelationshipText } from "../../types/nextEhrRelationshipTypes";

export class FhirPatientUtil<
  T extends fhir3.Patient = fhir3.Patient,
> extends FhirPersonUtil<any> {
  constructor(public resource: T) {
    super(resource);
  }

  public isProvisional(): boolean {
    if (!this.resource) {
      return false;
    }
    if (
      this.resource.address?.[0]?.line?.length &&
      this.resource.address?.[0]?.postalCode &&
      this.resource.address?.[0]?.city &&
      this.resource.address?.[0]?.state &&
      this.resource.address?.[0]?.country &&
      this.resource.name?.[0]?.given &&
      this.resource.name?.[0]?.family &&
      this.resource.name?.[0]?.prefix &&
      this.resource.gender &&
      this.resource.birthDate &&
      this.resource.telecom?.some(
        (telecom) => telecom.use === "mobile" && telecom.value,
      ) &&
      this.resource.telecom?.some(
        (telecom) => telecom.system === "email" && telecom.value,
      )
    ) {
      return false;
    }
    return true;
  }

  public getMissingNextDetails(): EOptionalEhrDemographicsRequiredByNext[] {
    const missingDetails: EOptionalEhrDemographicsRequiredByNext[] = [];

    // these details can be skipped when creating a patient straight into the EHR
    // without these, we do not currently have a flow that lets them sign up
    // TODO specific for Helix, can be expanded to other EHR
    const patientEmail = this.getPrimaryEmail();
    const patientMobile = this.getPrimaryMobileNumber();
    const prefix = this.resource.name?.[0]?.prefix?.[0] || "";

    if (!patientEmail) {
      missingDetails.push(EOptionalEhrDemographicsRequiredByNext.email);
    }

    if (!patientMobile) {
      missingDetails.push(EOptionalEhrDemographicsRequiredByNext.mobile);
    }

    if (!prefix) {
      missingDetails.push(EOptionalEhrDemographicsRequiredByNext.prefix);
    }

    return missingDetails;
  }

  public permissionToSendSms(): boolean {
    return (
      this.getExtensionBooleanValue(
        "http://medicaldirector.com/Patient/extension/optInSMS",
      ) ||
      this.getExtensionBooleanValue(extensionPatientIsOptInSms) ||
      false
    );
  }

  public getMedicareNumber(): null | fhir3.Identifier {
    const identifiter = this.getIdentifier(auPatientProfileMedicareSystem);
    if (!identifiter || !identifiter.value) {
      return null; // no value
    }

    return identifiter;
  }

  public getDvaNumber(): null | fhir3.Identifier {
    const identifiter = this.getIdentifier(extensionPatientDVA);
    if (!identifiter || !identifiter.value) {
      return null; // no value
    }

    return identifiter;
  }

  public getCCRN(): fhir3.Identifier {
    console.warn("Deprecated function name. Please update to getCRN");
    return this.getCRN();
  }

  public getCRN(): fhir3.Identifier {
    const identifiter = this.getIdentifier(extensionPatientCentreLink);
    if (!identifiter || !identifiter.value) {
      return null; // no value
    }

    return identifiter;
  }

  public getHelixId(): null | string {
    const identifier = this.getIdentifier(hubExternalResourceIdentifier);

    return identifier?.value || null;
  }

  public getFormattedEmergencyContact(
    contact?: fhir3.PatientContact,
  ): null | string {
    const _contact = contact || this.resource.contact[0];
    if (!_contact) return null;

    const name = _contact.name?.text || "";
    const relationship = _contact.relationship[0]?.text || "";
    const phone = _contact.telecom[0]?.value || "";
    return `${name} (${relationship})\n${phone}`;
  }

  public getLastRecordUpdate(): null | unixTimestamp {
    return this.getExtensionIntegerValue(patientLastRecordUpdateUrl) || null;
  }

  public getLastRecordUpdateDemographic(): null | unixTimestamp {
    return (
      this.getExtensionIntegerValue(patientLastDemographicUpdateUrl) || null
    );
  }

  public getLastRecordUpdateObservations(): null | unixTimestamp {
    return (
      this.getExtensionIntegerValue(patientLastMedicalDataUpdateUrl) || null
    );
  }

  public getLastRecordUpdatePaymentMethod(): null | unixTimestamp {
    return (
      this.getExtensionIntegerValue(patientLastPaymentMethodUpdateUrl) || null
    );
  }

  public getTourLastSeen(): null | unixTimestamp {
    const tourLastSeenExtension = this.getExtension(tourLastSeenExtensionUrl);
    if (tourLastSeenExtension?.valueDateTime) {
      return timestampTZToUnixTimestamp(tourLastSeenExtension.valueDateTime);
    }
    return null;
  }

  public getLastRecordSync(ehrId: string): null | unixTimestamp {
    return (
      this.getExtensionIntegerValue(
        `${patientLastRecordSyncUrl}/ehrId/${ehrId}`,
      ) || null
    );
  }

  /**
   * Returns the patient FHIR, as fetched from Connect (using the supplied underlying EHR).
   *
   * HACK to deal with different data types between the EHR and the rest of our system.
   *
   * @param underlyingEhr the underlying EHR
   */
  public getEquivalentEhrFhir(underlyingEhr: EEhrKey) {
    const clonedPatientFhir = cloneDeep(this.resource);

    if (underlyingEhr !== EEhrKey.HelloHealth) {
      // no changes if not using Next EHR
      return clonedPatientFhir;
    }

    const newFhirUtil = new FhirPatientUtil(clonedPatientFhir);

    const originalRelationshipText =
      newFhirUtil.resource.contact?.[0]?.relationship?.[0]?.text;

    if (originalRelationshipText) {
      clonedPatientFhir.contact[0].relationship[0].text =
        getNextEhrRelationshipText(originalRelationshipText);
    }

    const dvaIdentifier = newFhirUtil.getDvaNumber();

    if (dvaIdentifier?.period?.end) {
      // HACK using only the year and month portions if the DVA expiry for comparison
      // TODO roll this back once addressed: https://nextpracticehealth.atlassian.net/browse/NTD-30
      dvaIdentifier.period.end = dvaIdentifier.period.end
        .split("-")
        .slice(0, 2)
        .join("-");
    }

    return clonedPatientFhir;
  }
}
