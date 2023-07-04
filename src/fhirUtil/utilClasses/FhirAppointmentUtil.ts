import { FhirResourceUtil } from "./FhirResourceUtil";
import { IMultiHCPDetail } from "../../types/IMultiHCPDetail";
import { fhirUtil } from "..";
import {
  appointmentCmsLocationId,
  appointmentCmsLocationSlug,
  appointmentPaymentsExtensionUrl,
} from "../../helpers/constants";
import { IAppointmentPayment } from "../../types/IAppointmentPayment";
import {
  cancellationTokenExtensionUrl,
  multiHCPDetailsURL,
  nextAppointmentTypeLabel,
  nextAppointmentTypeSlug,
  telehealthUrlExtensionUrl,
} from "../../helpers/constants";
import { extractLastSection } from "../../helpers/extractLastSection";

export class FhirAppointmentUtil<
  T extends fhir3.Appointment = fhir3.Appointment,
> extends FhirResourceUtil<T> {
  public getMultiHCPDetails(): IMultiHCPDetail[] | null {
    const multihcp = this.getExtensionStringValue(multiHCPDetailsURL);
    if (multihcp) {
      return JSON.parse(multihcp);
    }
    return null;
  }

  public getTelehealthUrl(): null | string {
    return this.getExtensionStringValue(telehealthUrlExtensionUrl);
  }

  public getPatientId(): string | null {
    if (!this.resource.participant) {
      return null;
    }

    const patientIds = this.resource.participant
      .filter((x) => x.type[0].coding[0].code === "SBJ") // === patient
      .map((x) => extractLastSection(x.actor.reference));

    if (patientIds.length === 0) {
      return null;
    }

    return patientIds[0];
  }

  public getPractitionerId(): string | null {
    if (!this.resource.participant) {
      return null;
    }

    const practitionerIds = this.resource.participant
      .filter((x) => x.type[0].coding[0].code === "PPRF") // === practitioner
      .map((x) => extractLastSection(x.actor.reference));

    if (practitionerIds.length === 0) {
      return null;
    }

    return practitionerIds[0];
  }

  public getCmsLocationId(): string | null {
    return this.getExtensionStringValue(appointmentCmsLocationId);
  }

  public getCmsLocationSlug(): string | null {
    return this.getExtensionStringValue(appointmentCmsLocationSlug);
  }

  public getLocationId(): string | null {
    if (!this.resource.participant) {
      return null;
    }

    const locationIds = this.resource.participant
      .filter((x) => x.type[0].coding[0].code === "LOC") // === location
      .map((x) => extractLastSection(x.actor.reference));

    if (locationIds.length === 0) {
      return null;
    }

    return locationIds[0];
  }

  public getHelixAppointmentTypeId(): null | string {
    return this.getExtensionStringValue(
      "http://medicaldirector.com/Appointment-Type/extension/ExternalId",
    );
  }

  public getAppointmentTypeSlug(): null | string {
    return this.getExtensionStringValue(nextAppointmentTypeSlug);
  }

  public getNextAppointmentTypeLabel(): null | string {
    return this.getExtensionStringValue(nextAppointmentTypeLabel);
  }

  public getAppointmentTypeLabel(): null | string {
    const appointmentTypeExtension = this.getExtension(
      "http://medicaldirector.com/Schedule/extension/Appointment-Type",
    );

    if (!appointmentTypeExtension) {
      return null;
    }

    return fhirUtil(
      appointmentTypeExtension.valueQuantity,
    ).getExtensionStringValue(
      "http://medicaldirector.com/Appointment-Type/extension/Name",
    );
  }

  public getHelixAppointmentTypeLabel(): null | string {
    return this.getExtensionStringValue(
      "http://medicaldirector.com/Appointment-Type/extension/Name",
    );
  }

  public getCancellationToken(): null | string {
    return this.getExtensionStringValue(cancellationTokenExtensionUrl);
  }

  public recordPayment(
    appointmentPayment: IAppointmentPayment,
  ): fhir3.Appointment {
    const appointmentPayments = this.getPayments();
    appointmentPayments.push(appointmentPayment);

    return this.setExtension({
      url: appointmentPaymentsExtensionUrl,
      valueString: JSON.stringify(appointmentPayments),
    });
  }

  public getPayments(): IAppointmentPayment[] {
    const existingExtension = this.getExtension(
      appointmentPaymentsExtensionUrl,
    );
    if (!existingExtension) {
      return [];
    }

    const parsed = JSON.parse(existingExtension.valueString);

    return parsed instanceof Array ? parsed : [];
  }
}
